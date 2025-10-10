import { checkUserQuestParticipation, getQuestData } from "@/actions/quest";
import Hashtag from "@/components/atoms/Hashtag";
import Status from "@/components/atoms/Status";
import QuestDetail from "@/components/molecules/QuestDetail";
import QuestActions from "@/components/template/QuestActions";
import styles from "./page.module.css";
import { getUser } from "@/utils/supabase/actions";

interface QuestContentProps {
  questId: string;
}

export const QuestContent = async ({ questId }: QuestContentProps) => {
  const questData = await getQuestData(questId);
  const isParticipating = await checkUserQuestParticipation(questId);
  const user = await getUser();

  return (
    <>
      <header className={styles.header}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>{questData.title}</h1>
          <Status status={questData.status} />
        </div>
        <p className={styles.organization}>{questData.organization_id.name}</p>
      </header>
      <div className={styles.hashtags}>
        {questData.quest_tags.map(
          (tag: { tag_id: { name: string } }, index: number) => (
            <Hashtag key={index} text={tag.tag_id.name} />
          )
        )}
      </div>
      <section className={styles.questDetails}>
        <QuestDetail
          title="このクエストのミッション"
          text={questData.description}
        />
      </section>
      <QuestActions
        questId={questId}
        userId={user?.id || ""}
        isParticipating={isParticipating || false}
      />
    </>
  );
};
