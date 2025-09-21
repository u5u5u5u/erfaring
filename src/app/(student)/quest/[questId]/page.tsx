import Hashtag from "@/components/Hashtag";
import OrangeButton from "@/components/OrangeButton";
import Questditail from "@/components/Questditail";
import { createClient } from "@/utils/supabase/server";
import styles from "./page.module.css";

interface QuestDetail {
  params: Promise<{ questId: string }>;
}

export default async function QuestPage({ params }: QuestDetail) {
  const supabase = await createClient();
  const { questId } = await params;

  const { data: questData, error: questError } = await supabase
    .from("quests")
    .select("*, organization_id(name), quest_tags(tag_id(name))")
    .eq("id", questId)
    .single();

  if (questError) {
    console.error("Error fetching quest:", questError);
  }

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
        <h1>{questData.title}</h1>
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
        <Questditail
          title="このクエストのミッション"
          text={questData.description}
        />
        <Questditail title="達人からのヒント" text={""} />
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
