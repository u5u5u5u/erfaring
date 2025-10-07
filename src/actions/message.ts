import { createClient } from "@/utils/supabase/server";

export const getMessagesData = async (questionId: string) => {
  const supabase = await createClient();

  const { data: messagesData, error: messagesError } = await supabase
    .from("messages")
    .select("*, chat_id(title, is_solved, user_id(avatar_url, username))")
    .eq("chat_id", questionId)
    .order("created_at", { ascending: true });

  if (messagesError) {
    console.error("Error fetching messages:", messagesError);
    return null;
  }

  return messagesData;
};

export const getMessageHistory = async (questionId: string) => {
  const supabase = await createClient();

  const { data: messagesData, error: messagesError } = await supabase
    .from("messages")
    .select("role, content")
    .eq("chat_id", questionId)
    .order("created_at", { ascending: true });

  if (messagesError) {
    console.error("Error fetching messages:", messagesError);
    return [];
  }

  return messagesData.map((message) => ({
    role: message.role,
    parts: [
      {
        text: message.content,
      },
    ],
  }));
};
