import MessageItem from "@/components/organisms/MessageItem";
import type { Message } from "@/types/question";
import { createClient } from "@/utils/supabase/server";
import styles from "./index.module.css";

interface MessageListProps {
  questionId: string;
}

interface ChatData {
  title: string;
  user_id: {
    avatar_url: string;
    username: string;
  };
}

interface MessageData {
  id: string;
  chat_id: ChatData;
  role: "user" | "model";
  content: string;
  created_at: string;
}

export const MessageList = async ({ questionId }: MessageListProps) => {
  const supabase = await createClient();

  const { data: messagesData, error: messagesError } = await supabase
    .from("messages")
    .select("*, chat_id(title, user_id(avatar_url, username))")
    .eq("chat_id", questionId)
    .order("created_at", { ascending: true });

  if (messagesError) {
    console.error("Error fetching messages:", messagesError);
    return <div>Error loading messages</div>;
  }

  const typedMessagesData = messagesData as unknown as MessageData[];

  if (!typedMessagesData || typedMessagesData.length === 0) {
    return <div>No messages found</div>;
  }

  return (
    <>
      <h1 className={styles.title}>{typedMessagesData[0].chat_id.title}</h1>
      <div className={styles.chatContainer}>
        {typedMessagesData.map((message) => (
          <div key={message.id} className={styles.questionItem}>
            <MessageItem message={message as unknown as Message} />
          </div>
        ))}
      </div>
    </>
  );
};
