import styles from "./page.module.css";
import Questditail from "@/components/Questditail";
import Hashtag from "@/components/Hashtag";

export default function QuestPage() {
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
        <h1>{dummyQuest.title}</h1>
        <p>{dummyQuest.name}</p>
      </div>
      <div className={styles.hashtagContainer}>
        {dummyQuest.HashTags.map((tag, index) => (
          <Hashtag key={index} text={tag} />
        ))}
      </div>
      <div className={styles.questDetailContainer}>
        <Questditail
          title="このクエストのミッション"
          text={dummyQuest.mission}
        />
        <Questditail title="達人からのヒント" text={dummyQuest.hint} />
      </div>
    </div>
  );
}
