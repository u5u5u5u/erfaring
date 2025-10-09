"use server";

import { createClient } from "@/utils/supabase/server";

export async function getCareerByChatId(chatId: string) {
  const supabase = await createClient();

  // chatsテーブルからsuggested_career_idを取得
  const { data: chatData, error: chatError } = await supabase
    .from("chats")
    .select("suggested_career_id")
    .eq("id", chatId)
    .single();

  if (chatError || !chatData?.suggested_career_id) {
    return null;
  }

  // careersテーブルからキャリア情報を取得
  const { data: careerData, error: careerError } = await supabase
    .from("careers")
    .select("*")
    .eq("id", chatData.suggested_career_id)
    .single();

  if (careerError) {
    console.error("Error fetching career:", careerError);
    return null;
  }

  return careerData;
}

export async function createCareerAndLinkToChat(
  chatId: string,
  name: string,
  description: string
) {
  const supabase = await createClient();

  // careersテーブルにキャリアを作成
  const { data: careerData, error: careerError } = await supabase
    .from("careers")
    .insert([
      {
        name,
        description,
      },
    ])
    .select()
    .single();

  if (careerError || !careerData) {
    console.error("Error creating career:", careerError);
    return null;
  }

  // chatsテーブルのsuggested_career_idを更新
  const { error: updateError } = await supabase
    .from("chats")
    .update({ suggested_career_id: careerData.id })
    .eq("id", chatId);

  if (updateError) {
    console.error("Error linking career to chat:", updateError);
    return null;
  }

  return careerData;
}
