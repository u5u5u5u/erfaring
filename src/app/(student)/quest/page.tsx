import PageTitle from "@/components/atoms/PageTitle";
import Quests from "@/components/organisms/QuestsList";
import QuestsListLoading from "@/components/organisms/QuestsList/Loading";
import { Suspense } from "react";
import styles from "./page.module.css";

export default async function QuestionPage() {
  return (
    <div className={styles.container}>
      <PageTitle title="クエスト一覧" />
      <Suspense fallback={<QuestsListLoading />}>
        <Quests />
      </Suspense>
    </div>
  );
}
