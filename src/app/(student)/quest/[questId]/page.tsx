import { Suspense } from "react";
import { QuestDetailLoading } from "./Loading";
import { QuestContent } from "./QuestContent";
import styles from "./page.module.css";

interface QuestPageProps {
  params: Promise<{ questId: string }>;
}

export default async function QuestPage({ params }: QuestPageProps) {
  const { questId } = await params;

  return (
    <div className={styles.container}>
      <Suspense fallback={<QuestDetailLoading />}>
        <QuestContent questId={questId} />
      </Suspense>
    </div>
  );
}
