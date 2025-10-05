import Hashtag from "@/components/atoms/Hashtag";
import OrangeButton from "@/components/atoms/OrangeButton";
import QuestDetail from "@/components/molecules/QuestDetail";
import { createClient } from "@/utils/supabase/server";
import styles from "./page.module.css";
import Status from "@/components/atoms/Status";
import { getQuestData } from "./actions";

interface QuestDetail {
  params: Promise<{ questId: string }>;
}

export default async function QuestPage({ params }: QuestDetail) {
  const { questId } = await params;
  const questData = await getQuestData(questId);

  const handleQuestAccept = async () => {
    "use server";
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { error } = await supabase
        .from("quest_assignments")
        .insert({ user_id: user.id, quest_id: questId });

      if (error) {
        console.error("Error accepting quest:", error);
      }
    }
  };

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
        {/* <QuestDetail title="達人からのヒント" text={""} /> */}
      </div>
      <div className={styles.buttonContainer}>
        <OrangeButton
          text="このクエストに挑戦する"
          onClick={handleQuestAccept}
        />
      </div>
    </div>
  );
}
