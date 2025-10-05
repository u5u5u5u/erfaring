"use server";

import { createClient } from "@/utils/supabase/server";
import { getUser } from "@/utils/supabase/actions";

export async function getProfile() {
  const supabase = await createClient();
  const user = await getUser();

  if (!user) {
    return null;
  }

  const { data: profileData, error } = await supabase
    .from("profiles")
    .select("*, user_schools(school_id(name), grade)")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }

  return profileData;
}
