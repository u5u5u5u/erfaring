"use server";

import { createClient } from "@/utils/supabase/server";

export async function getUser() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  return user;
}

export async function getUserProfile() {
  const supabase = await createClient();
  const user = await getUser();

  if (!user) {
    return null;
  }
  
  const { data: userData, error } = await supabase
    .from("profiles")
    .select("*, user_schools(school_id(name), grade)")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("Error fetching user data:", error);
    return null;
  }

  return userData;
}
