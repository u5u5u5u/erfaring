import styles from "./page.module.css";
import Questditail from "@/components/Questditail";
import Hashtag from "@/components/Hashtag";

export default function QuestPage() {
  return (
    <div className={styles.container}>
      <div>
        <h1>クエストタイトル</h1>
        <p>クエスト投稿者</p>
      </div>
      <div className={styles.hashtagContainer}>
        <Hashtag text="まちづくり" />
        <Hashtag text="アイデア" />
      </div>
      <div className={styles.questDetailContainer}>
        <Questditail
          title="このクエストのミッション"
          text="地域の魅力を伝えるにはどんな写真を撮ったらいいか考えよう！"
        />
        <Questditail
          title="達人からのヒント"
          text="住んでいる地域で有名なものは何かな？"
        />
      </div>
    </div>
  );
}
