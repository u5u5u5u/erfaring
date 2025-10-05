"use server";

import { createClient } from "@/utils/supabase/server";
import { getUser } from "@/utils/supabase/actions";

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
