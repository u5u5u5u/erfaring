import styles from "./page.module.css";
import Chatitem from "@/components/chatitem";
import Inputbutton from "@/components/Inputbutton";
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
    .eq("chat_id", questionId)
    .single();

  console.log("messagesData", messagesData);

  const dummyQuestions = [
    {
      id: "1",
      name: "airi",
      text: "カブトムシ拾った",
      time: "2025/9/10/12:17",
    },
    {
      id: "2",
      name: "AIメンター",
      text: "カブトムシのオスとメスの見分け方を調べてみよう！",
      time: "2025/9/10/12:17",
    },
    {
      id: "3",
      name: "airi",
      text: "オスは大きな角があって、メスは小さいんだね！",
      time: "2025/9/10/12:17",
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>カブトムシのひみつ</h1>
      {dummyQuestions.map((question) => (
        <div key={question.id} className={styles.questionItem}>
          <Chatitem
            icon="/globe.svg"
            name={question.name}
            text={question.text}
            time={question.time}
          />
        </div>
      ))}
      <div className={styles.inputContainer}>
        <Inputbutton />
      </div>
    </div>
  );
}
