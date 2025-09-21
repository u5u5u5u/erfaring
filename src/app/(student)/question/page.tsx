import AddQuestionButton from "@/components/AddQuestionButton";
import PageTitle from "@/components/PageTitle";
import Quest from "@/components/Quest";
import { createClient } from "@/utils/supabase/server";
import styles from "./page.module.css";

export default async function QuestionPage() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  const { data: chatsData, error: chatsError } = await supabase
    .from("chats")
    .select("*")
    .eq("user_id", data?.user?.id)
    .order("created_at", { ascending: false });

  if (chatsError) {
    console.error("Error fetching chats:", chatsError);
  }

  return (
    <div className={styles.container}>
      <PageTitle title="探究ノート" />
      <div className={styles.buttonContainer}>
        <AddQuestionButton />
      </div>
      <div>
        <ul className={styles.questionList}>
          {chatsData?.map((chat) => (
            <li key={chat.id} className={styles.chatItem}>
              <Quest
                type="question"
                theme={chat.title}
                people={chat.created_at}
                link={`/question/${chat.id}`}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
