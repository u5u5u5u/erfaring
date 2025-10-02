"use server";

import { createClient } from "@/utils/supabase/server";
import { getUser } from "@/utils/supabase/actions";

export async function getChatsData() {
  const supabase = await createClient();
  const user = await getUser();

  if (!user) {
    return null;
  }

  const { data: chatsData, error: chatsError } = await supabase
    .from("chats")
    .select("*")
    .eq("user_id", user?.id)
    .order("created_at", { ascending: false })
    .limit(3);

  if (chatsError) {
    console.error("Error fetching chat data:", chatsError);
    return null;
  }

  return chatsData;
}

export async function getQuestsData() {
  const supabase = await createClient();
  const user = await getUser();

  if (!user) {
    return null;
  }

  const { data: questsData, error: questsError } = await supabase
    .from("quest_assignments")
    .select("*, quest_id(id, title, organization_id(name), status)")
    .eq("user_id", user?.id)
    .eq("quest_id.status", "open");

  if (questsError) {
    console.error("Error fetching quests:", questsError);
    return null;
  }

  return questsData;
}
