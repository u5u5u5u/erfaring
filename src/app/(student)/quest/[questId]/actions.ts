"use server";

import { createClient } from "@/utils/supabase/server";

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