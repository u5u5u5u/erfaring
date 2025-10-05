import PageTitle from "@/components/atoms/PageTitle";
import Quests from "@/components/organisms/QuestsList";
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
