import styles from "./page.module.css";
import ChatItem from "@/components/ChatItem";
import InputButton from "@/components/InputButton";
import { createClient } from "@/utils/supabase/server";

interface ChatPageProps {
  params: Promise<{ questionId: string }>;
}

export default async function ChatPage({ params }: ChatPageProps) {
  const supabase = await createClient();
  const { questionId } = await params;

  const { data: messagesData, error: messagesError } = await supabase
    .from("messages")
    .select("*, chat_id(user_id(avatar_url, username))")
    .eq("chat_id", questionId);

  console.log("messagesData", messagesData);

  if (messagesError) {
    console.error("Error fetching messages:", messagesError);
    return <div>Error loading messages</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>カブトムシのひみつ</h1>
      {messagesData.map((message, index) => (
        <div key={message.id} className={styles.questionItem}>
          <ChatItem message={messagesData[index]} />
        </div>
      ))}
      <div className={styles.inputContainer}>
        <InputButton />
      </div>
    </div>
  );
}
