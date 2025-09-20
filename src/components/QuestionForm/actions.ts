"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function submitQuestion(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error("User not authenticated:", userError);
    return;
  }

  const file = formData.get("image_url") as File;
  let imageUrl = null;

  if (file && file.size > 0) {
    const fileExt = file.name.split(".").pop();
    const filePath = `conversation-${Math.random()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("conversation_images")
      .upload(filePath, file);

    if (uploadError) {
      console.error(uploadError);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("conversation_images").getPublicUrl(filePath);

    imageUrl = publicUrl;
  }

  const title = formData.get("title") as string;

  const data = {
    title: title,
    image_url: imageUrl,
    user_id: user.id,
  };

  const { data: chatData, error } = await supabase
    .from("chats")
    .insert([data])
    .select("id");

  if (error) {
    console.error(error);
    return;
  }

  if (chatData) {
    const chatId = chatData[0].id;

    // ユーザーのメッセージを保存
    const { error: messageError } = await supabase.from("messages").insert({
      chat_id: chatId,
      content: title,
      role: "user",
    });

    if (messageError) {
      console.error("Message insert error:", messageError);
      return;
    }

    // AIのレスポンスを取得
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/api/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userInput: title,
            chatHistory: [],
          }),
        }
      );

      if (response.ok) {
        const aiResponse = await response.json();

        // AIのメッセージを保存
        const { error: aiMessageError } = await supabase
          .from("messages")
          .insert({
            chat_id: chatId,
            content: aiResponse.response,
            role: "model",
          });

        if (aiMessageError) {
          console.error("AI message insert error:", aiMessageError);
        }
      } else {
        console.error("Failed to get AI response:", response.status);
      }
    } catch (fetchError) {
      console.error("Error calling chat API:", fetchError);
    }

    console.log("Created chat:", chatData);
    redirect(`/question/${chatId}`);
  }
}
