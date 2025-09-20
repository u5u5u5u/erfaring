"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function sendMessage(formData: FormData) {
  const supabase = await createClient();

  const message = formData.get("message") as string;
  const chatId = formData.get("chat_id") as string;
  const history = formData.get("history") as string;

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

  console.log(
    JSON.stringify({
      userInput: message,
      chatHistory: history ? JSON.parse(history) : [],
    })
  );

  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userInput: message,
        chatHistory: history ? JSON.parse(history) : [],
      }),
    });

    if (!response.ok) {
      console.error("Error calling /api/chat:", response.statusText);
      return;
    }

    const result = await response.json();
    console.log("Response from /api/chat:", result);

    // AIの応答をデータベースに保存
    if (result.response) {
      const aiMessage = {
        chat_id: chatId,
        role: "model",
        content: result.response,
      };

      const { error: aiError } = await supabase
        .from("messages")
        .insert([aiMessage]);

      if (aiError) {
        console.error("Error inserting AI response:", aiError);
      }
    }
  } catch (error) {
    console.error("Error in sendMessage:", error);
    return;
  }

  // 成功時のみリダイレクト
  redirect(`/question/${chatId}`);
}
