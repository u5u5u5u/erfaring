"use server";

import { getUser } from "@/utils/supabase/actions";
import { createClient } from "@/utils/supabase/server";

export async function getQuestsData(limit?: number) {
  const supabase = await createClient();

  let query = supabase
    .from("quests")
    .select("*, organization_id(name)")
    .eq("status", "open")
    .order("created_at", { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data: questsData, error: questsError } = await query;

  if (questsError) {
    console.error("Error fetching quest data:", questsError);
    return null;
  }

  return questsData;
}

export async function getAssignedQuestsData(limit?: number) {
  const supabase = await createClient();
  const user = await getUser();

  if (!user) {
    return null;
  }

  let query = supabase
    .from("quest_assignments")
    .select("*, quest_id(id, title, organization_id(name), status)")
    .eq("user_id", user?.id)
    .eq("quest_id.status", "open")
    .order("created_at", { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data: questsData, error: questsError } = await query;

  if (questsError) {
    console.error("Error fetching quest data:", questsError);
    return null;
  }

  return questsData;
}

export async function getClearQuestsCount() {
  const supabase = await createClient();
  const user = await getUser();

  if (!user) {
    return 0;
  }

  const { count, error } = await supabase
    .from("quest_assignments")
    .select("quest_id, quests!inner()", { count: "exact" })
    .eq("user_id", user?.id)
    .eq("quests.status", "archived");

  if (error) {
    console.error("Error fetching clear quests count:", error);
    return 0;
  }

  return count || 0;
}

export async function getClearQuestsData(limit?: number) {
  const supabase = await createClient();
  const user = await getUser();

  if (!user) {
    return null;
  }

  let query = supabase
    .from("quest_assignments")
    .select("*, quests!inner(title, status)")
    .eq("user_id", user?.id)
    .eq("quests.status", "archived");

  if (limit) {
    query = query.limit(limit);
  }

  const { data: clearQuestsData, error: clearQuestsError } = await query;

  if (clearQuestsError) {
    console.error("Error fetching clear quest data:", clearQuestsError);
    return null;
  }

  return clearQuestsData;
}

export async function getQuestData(questId: string) {
  const supabase = await createClient();

  const { data: questData, error: questError } = await supabase
    .from("quests")
    .select("*, organization_id(name), quest_tags(tag_id(name))")
    .eq("id", questId)
    .single();

  if (questError) {
    console.error("Error fetching quest:", questError);
  }

  return questData;
}

export async function checkUserQuestParticipation(questId: string) {
  const supabase = await createClient();
  const user = await getUser();

  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from("quest_assignments")
    .select("quest_id")
    .eq("user_id", user.id)
    .eq("quest_id", questId)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("Error checking quest participation:", error);
    return null;
  }

  return !!data;
}

export async function acceptQuest(questId: string) {
  const supabase = await createClient();
  const user = await getUser();

  if (!user) {
    return null;
  }

  const { error } = await supabase
    .from("quest_assignments")
    .insert({ user_id: user.id, quest_id: questId });

  if (error) {
    console.error("Error accepting quest:", error);
    return null;
  }
}

export async function submitMissionAnswer(questId: string, answer: string) {
  const supabase = await createClient();
  const user = await getUser();

  if (!user) {
    return null;
  }

  // TODO: ミッションの回答を保存するロジックを実装
  console.log("Mission answer submitted:", {
    questId,
    answer,
    userId: user.id,
  });
}

export async function getQuestHints(questId: string, userId: string) {
  const supabase = await createClient();

  const { data: hintsData, error: hintsError } = await supabase
    .from("quest_hints")
    .select("*")
    .eq("quest_id", questId)
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (hintsError) {
    console.error("Error fetching quest hints:", hintsError);
    return null;
  }

  return hintsData;
}

// 1. プランを提出する
export async function submitQuestPlan(questId: string, planContent: string) {
  const supabase = await createClient();
  const user = await getUser();

  if (!user) {
    return { success: false, error: "User not authenticated" };
  }

  // quest_assignmentsにレコードが存在するか確認
  const { data: assignment, error: assignmentError } = await supabase
    .from("quest_assignments")
    .select("*")
    .eq("quest_id", questId)
    .eq("user_id", user.id)
    .single();

  if (assignmentError || !assignment) {
    return { success: false, error: "Quest assignment not found" };
  }

  // プランを提出
  const { data, error } = await supabase
    .from("quest_submissions")
    .insert({
      assignment_quest_id: questId,
      assignment_user_id: user.id,
      type: "plan",
      content: planContent,
    })
    .select()
    .single();

  if (error) {
    console.error("Error submitting quest plan:", error);
    return { success: false, error: error.message };
  }

  // quest_assignmentsのstatusを更新
  await supabase
    .from("quest_assignments")
    .update({ status: "awaiting_feedback" })
    .eq("quest_id", questId)
    .eq("user_id", user.id);

  return { success: true, data };
}

// 2. プラン提出後に達人が登録したヒントを取得
export async function getQuestHintsForUser(questId: string) {
  const user = await getUser();

  if (!user) {
    return { success: false, error: "User not authenticated" };
  }

  const supabase = await createClient();

  // プランが提出されているか確認
  const { data: planSubmission, error: planError } = await supabase
    .from("quest_submissions")
    .select("*")
    .eq("assignment_quest_id", questId)
    .eq("assignment_user_id", user.id)
    .eq("type", "plan")
    .single();

  if (planError || !planSubmission) {
    return { success: false, error: "Plan not submitted yet" };
  }

  // 達人が登録したヒントを取得
  const hintsData = await getQuestHints(questId, user.id);

  if (!hintsData || hintsData.length === 0) {
    return {
      success: false,
      error:
        "Hints not available yet. Please wait for the expert to provide feedback.",
    };
  }

  return { success: true, data: hintsData };
}

// 3. ヒント参照後に意見・回答を提出
export async function submitProgressMemo(questId: string, memoContent: string) {
  const supabase = await createClient();
  const user = await getUser();

  if (!user) {
    return { success: false, error: "User not authenticated" };
  }

  // ヒントが登録されているか確認
  const hints = await getQuestHints(questId, user.id);
  if (!hints || hints.length === 0) {
    return {
      success: false,
      error: "Hints not found. Please wait for the expert to provide hints.",
    };
  }

  // 途中経過のメモを提出
  const { data, error } = await supabase
    .from("quest_submissions")
    .insert({
      assignment_quest_id: questId,
      assignment_user_id: user.id,
      type: "progress_memo",
      content: memoContent,
    })
    .select()
    .single();

  if (error) {
    console.error("Error submitting progress memo:", error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

// 最終回答を提出
export async function submitFinalAnswer(
  questId: string,
  answerContent: string
) {
  const supabase = await createClient();
  const user = await getUser();

  if (!user) {
    return { success: false, error: "User not authenticated" };
  }

  // 最終回答を提出
  const { data, error } = await supabase
    .from("quest_submissions")
    .insert({
      assignment_quest_id: questId,
      assignment_user_id: user.id,
      type: "final_answer",
      content: answerContent,
    })
    .select()
    .single();

  if (error) {
    console.error("Error submitting final answer:", error);
    return { success: false, error: error.message };
  }

  // quest_assignmentsのstatusを更新
  await supabase
    .from("quest_assignments")
    .update({ status: "awaiting_feedback" })
    .eq("quest_id", questId)
    .eq("user_id", user.id);

  return { success: true, data };
}

// ユーザーの提出物を全て取得
export async function getUserQuestSubmissions(questId: string) {
  const supabase = await createClient();
  const user = await getUser();

  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from("quest_submissions")
    .select("*")
    .eq("assignment_quest_id", questId)
    .eq("assignment_user_id", user.id)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching quest submissions:", error);
    return null;
  }

  return data;
}

// クエストの現在の状態を取得
export async function getQuestAssignmentStatus(questId: string) {
  const supabase = await createClient();
  const user = await getUser();

  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from("quest_assignments")
    .select("*")
    .eq("quest_id", questId)
    .eq("user_id", user.id)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("Error fetching quest assignment status:", error);
    return null;
  }

  return data;
}
