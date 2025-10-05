import { checkUserQuestParticipation, getQuestData } from "@/actions/quest";
import Hashtag from "@/components/atoms/Hashtag";
import Status from "@/components/atoms/Status";
import QuestDetail from "@/components/molecules/QuestDetail";
import QuestActions from "@/components/template/QuestActions";
import styles from "./page.module.css";

interface QuestPageProps {
  params: Promise<{ questId: string }>;
}

export default async function QuestPage({ params }: QuestPageProps) {
  const { questId } = await params;
  const questData = await getQuestData(questId);
  const isParticipating = await checkUserQuestParticipation(questId);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>
          {questData.title}
          <Status status={questData.status} />
        </h1>
        <p>{questData.organization_id.name}</p>
      </div>
      <div className={styles.hashtags}>
        {questData.quest_tags.map(
          (tag: { tag_id: { name: string } }, index: number) => (
            <Hashtag key={index} text={tag.tag_id.name} />
          )
        )}
      </div>
      <div className={styles.questDetails}>
        <QuestDetail
          title="このクエストのミッション"
          text={questData.description}
        />
      </div>
      <QuestActions
        questId={questId}
        isParticipating={isParticipating || false}
      />
    </div>
  );
}
