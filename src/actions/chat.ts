"use server";

import { createClient } from "@/utils/supabase/server";
import { getUser } from "@/utils/supabase/actions";

export async function getChatsData(limit?: number) {
  const supabase = await createClient();
  const user = await getUser();

  if (!user) {
    return null;
  }

  let query = supabase
    .from("chats")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data: chatsData, error: chatsError } = await query;

  if (chatsError) {
    console.error("Error fetching chat data:", chatsError);
    return null;
  }

  return chatsData;
}

export async function getSolvedChatsCount() {
  const supabase = await createClient();
  const user = await getUser();

  if (!user) {
    return 0;
  }
  const { count, error } = await supabase
    .from("chats")
    .select("is_solved", { count: "exact" })
    .eq("user_id", user.id)
    .eq("is_solved", true);

  if (error) {
    console.error("Error fetching solved chats count:", error);
    return 0;
  }

  return count || 0;
}

export async function getSolvedChatsData(limit?: number) {
  const supabase = await createClient();
  const user = await getUser();

  if (!user) {
    return null;
  }

  let query = supabase
    .from("chats")
    .select("*")
    .eq("user_id", user.id)
    .eq("is_solved", true)
    .order("created_at", { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data: solvedChatsData, error: solvedChatsError } = await query;

  if (solvedChatsError) {
    console.error("Error fetching solved chats data:", solvedChatsError);
    return null;
  }

  return solvedChatsData;
}

export async function insertChatWithQuest(questId: string) {
  const supabase = await createClient();
  const user = await getUser();

  if (!user) {
    return null;
  }
  const { data, error } = await supabase
    .from("chats")
    .insert([
      {
        user_id: user.id,
        quest_id: questId,
        is_solved: false,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Error inserting chat:", error);
    return null;
  }

  return data;
}

export async function toggleChatSolved(chatId: string) {
  const supabase = await createClient();

  const { data: currentChat, error: fetchError } = await supabase
    .from("chats")
    .select("is_solved")
    .eq("id", chatId)
    .single();

  if (fetchError) {
    console.error("Error fetching chat:", fetchError);
    return null;
  }

  const { data, error } = await supabase
    .from("chats")
    .update({ is_solved: !currentChat.is_solved })
    .eq("id", chatId)
    .select()
    .single();

  if (error) {
    console.error("Error toggling chat solved status:", error);
    return null;
  }

  return data;
}
