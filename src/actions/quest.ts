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
