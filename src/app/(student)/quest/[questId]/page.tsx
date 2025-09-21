import styles from "./page.module.css";
import Questditail from "@/components/Questditail";
import Hashtag from "@/components/Hashtag";
import { createClient } from "@/utils/supabase/server";

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
  console.log(questData);

  if (questError) {
    console.error("Error fetching quest:", questError);
  }

  const dummyQuest = {
    id: "airi1",
    name: "○×市役所",
    title: "地域の魅力を写真で伝えよう！",
    HashTags: ["まちづくり", "アイデア"],
    mission: "地域の魅力を伝えるにはどんな写真を撮ったらいいか考えよう！",
    hint: "住んでいる地域で有名なものは何かな？",
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
        <Questditail title="達人からのヒント" text={dummyQuest.hint} />
      </div>
    </div>
  );
}
