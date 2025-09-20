"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function sendMessage(formData: FormData) {
  const supabase = await createClient();

  const message = formData.get("message") as string;
  const chatId = formData.get("chat_id") as string;

  if (!message || !chatId) {
    console.error("Message or chat_id is missing");
    return;
  }

  const data = {
    chat_id: chatId,
    role: "user",
    content: message,
  };

  const { error } = await supabase.from("messages").insert([data]);

  if (error) {
    console.error("Error inserting message:", error);
    return;
  }

  redirect(`/question/${chatId}`);
}
