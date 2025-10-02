import styles from "./page.module.css";
import ChatItem from "@/components/ChatItem";
import MessageForm from "@/components/MessageForm";
import { createClient } from "@/utils/supabase/server";

interface ChatPageProps {
  params: Promise<{ questionId: string }>;
}

export default async function ChatPage({ params }: ChatPageProps) {
  const supabase = await createClient();
  const { questionId } = await params;

  const { data: messagesData, error: messagesError } = await supabase
    .from("messages")
    .select("*, chat_id(title, user_id(avatar_url, username))")
    .eq("chat_id", questionId)
    .order("created_at", { ascending: true });

  if (messagesError) {
    console.error("Error fetching messages:", messagesError);
    return <div>Error loading messages</div>;
  }

  const history = messagesData.map((message) => ({
    role: message.role,
    parts: [
      {
        text: message.content,
      },
    ],
  }));

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{messagesData[0].chat_id.title}</h1>
      <div className={styles.chatContainer}>
        {messagesData.map((message, index) => (
          <div key={message.id} className={styles.questionItem}>
            <ChatItem message={messagesData[index]} />
          </div>
        ))}
      </div>
      <div className={styles.inputContainer}>
        <MessageForm chat_id={questionId} history={history} />
      </div>
    </div>
  );
}
