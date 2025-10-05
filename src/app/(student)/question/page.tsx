import AddQuestionButton from "@/components/atoms/AddQuestionButton";
import PageTitle from "@/components/atoms/PageTitle";
import Chats from "@/components/organisms/ChatsList";
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
