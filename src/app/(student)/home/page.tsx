import Button from "@/components/atoms/Button";
import Chats from "@/components/organisms/ChatsList";
import ChatsListLoading from "@/components/organisms/ChatsList/Loading";
import Quests from "@/components/organisms/QuestsList";
import QuestsListLoading from "@/components/organisms/QuestsList/Loading";
import { convertGrade } from "@/utils/convertGrade";
import { getProfile } from "@/actions/profile";
import { BookOpen, Swords } from "lucide-react";
import { Suspense } from "react";
import styles from "./page.module.css";

export default async function HomePage() {
  const userData = await getProfile();

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
        <Suspense fallback={<QuestsListLoading />}>
          <Quests limit={3} assigned />
        </Suspense>
      </div>
      <div className={`${styles.section} ${styles.questionSection}`}>
        <h2>最近の問い</h2>
        <Suspense fallback={<ChatsListLoading />}>
          <Chats limit={3} />
        </Suspense>
      </div>
    </div>
  );
}
