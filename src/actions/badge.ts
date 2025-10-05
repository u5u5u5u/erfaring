"use server";

import { createClient } from "@/utils/supabase/server";
import { getUser } from "@/utils/supabase/actions";

export async function getAcquireBadgeCount() {
  const supabase = await createClient();
  const user = await getUser();

  if (!user) {
    return 0;
  }

  const { count, error } = await supabase
    .from("user_badges")
    .select("badge_id", { count: "exact" })
    .eq("user_id", user.id);

  if (error) {
    console.error("Error fetching acquire badge count:", error);
    return 0;
  }

  return count || 0;
}

export async function getAcquiredBadgesData(limit?: number) {
  const supabase = await createClient();
  const user = await getUser();

  if (!user) {
    return [];
  }

  let query = supabase

    .from("user_badges")
    .select("*, badge_id(id, name, icon, color)")
    .eq("user_id", user.id)
    .order("earned_at", { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching acquired badges data:", error);
    return [];
  }

  return data || [];
}
