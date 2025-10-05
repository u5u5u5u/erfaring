import Button from "@/components/Button";
import Chats from "@/components/ChatsList";
import Quests from "@/components/QuestsList";
import { convertGrade } from "@/utils/convertGrade";
import { getUserProfile } from "@/utils/supabase/actions";
import { BookOpen, Swords } from "lucide-react";
import styles from "./page.module.css";

export default async function HomePage() {
  const userData = await getUserProfile();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>{userData?.full_name}の学びのあしあと</h1>
        <p>
          {userData?.user_schools[0]?.school_id.name}
          <span>{convertGrade(userData?.user_schools[0]?.grade)}年生</span>
        </p>
      </div>
      <div className={styles.buttons}>
        <Button color="#2463EB" icon={<Swords size={30} />} link="/quest">
          クエストに挑戦
        </Button>
        <Button
          color="#21C55D"
          icon={<BookOpen size={30} />}
          link="/question/registration"
        >
          問いを探究
        </Button>
      </div>
      <div className={`${styles.section} ${styles.questSection}`}>
        <h2>参加中のクエスト</h2>
        <Quests limit={3}/>
      </div>
      <div className={`${styles.section} ${styles.questionSection}`}>
        <h2>最近の問い</h2>
        <Chats limit={3} />
      </div>
    </div>
  );
}
