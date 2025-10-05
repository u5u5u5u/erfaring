import Hashtag from "@/components/atoms/Hashtag";
import OrangeButton from "@/components/atoms/OrangeButton";
import QuestDetail from "@/components/molecules/QuestDetail";
import { createClient } from "@/utils/supabase/server";
import styles from "./page.module.css";
import Status from "@/components/atoms/Status";
import { getQuestData } from "./actions";
import { useState, useEffect } from "react";

interface QuestDetail {
  params: Promise<{ questId: string }>;
}

interface QuestData {
  title: string;
  status: "draft" | "open" | "closed" | "archived";
  organization_id: { name: string };
  quest_tags: { tag_id: { name: string } }[];
  description: string;
}

export default function QuestPage({ params }: QuestDetail) {
  const [questId, setQuestId] = useState<string>("");
  const [questData, setQuestData] = useState<QuestData | null>(null);
  const [isAccepted, setIsAccepted] = useState(false);

  useEffect(() => {
    const initializeData = async () => {
      const { questId: id } = await params;
      setQuestId(id);
      const data = await getQuestData(id);
      setQuestData(data);
    };
    initializeData();
  }, [params]);

  const handleQuestAccept = async () => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { error } = await supabase
        .from("quest_assignments")
        .insert({ user_id: user.id, quest_id: questId });

      if (error) {
        console.error("Error accepting quest:", error);
      } else {
        setIsAccepted(true);
      }
    }
  };

  if (!questData) {
    return <div>Loading...</div>;
  }

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

      {!isAccepted ? (
        <div className={styles.buttonContainer}>
          <OrangeButton
            text="このクエストに挑戦する"
            onClick={handleQuestAccept}
          />
        </div>
      ) : (
        <div className={styles.challengeSection}>
          <div className={styles.buttonGrid}>
            <OrangeButton
              text="達人とチャットする"
              onClick={() => (window.location.href = `/quest/${questId}/chat`)}
            />
            <OrangeButton text="進捗報告" onClick={() => {}} />
            <OrangeButton text="成果報告" onClick={() => {}} />
          </div>
        </div>
      )}
    </div>
  );
}
