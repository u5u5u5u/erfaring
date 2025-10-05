import AddQuestionButton from "@/components/AddQuestionButton";
import Chats from "@/components/ChatsList";
import PageTitle from "@/components/PageTitle";
import styles from "./page.module.css";

export default async function QuestionPage() {

  return (
    <div className={styles.container}>
      <PageTitle title="探究ノート" />
      <div className={styles.buttonContainer}>
        <AddQuestionButton />
      </div>
      <div>
        <Chats />
      </div>
    </div>
  );
}
