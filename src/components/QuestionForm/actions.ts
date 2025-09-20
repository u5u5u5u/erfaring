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

  const data = {
    title: formData.get("title") as string,
    image_url: imageUrl,
    user_id: user.id,
  };

  const { data: chatData, error } = await supabase
    .from("chats")
    .insert([data])
    .select("id");

  if (error) {
    console.error(error);
  }

  if (chatData) {
    console.log("Created chat:", chatData);
    redirect(`/question/${chatData[0].id}`);
  }
}
