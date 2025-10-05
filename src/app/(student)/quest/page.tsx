import PageTitle from "@/components/PageTitle";
import Quests from "@/components/QuestsList";
import styles from "./page.module.css";

export default async function QuestionPage() {
  return (
    <div className={styles.container}>
      <PageTitle title="クエスト一覧" />
      <div>
        <Quests />
      </div>
    </div>
  );
}
