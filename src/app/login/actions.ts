"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

interface LoginFormData {
  email: string;
  password: string;
}

export async function login(formData: FormData): Promise<void> {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data: LoginFormData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.error(error);
    redirect("/error");
  }
  redirect("/profile");
}

interface SignupFormData {
  email: string;
  password: string;
}

export async function signup(formData: FormData): Promise<void> {
  const supabase = await createClient();

  const data: SignupFormData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
}
