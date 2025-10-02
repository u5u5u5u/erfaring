import Button from "@/components/Button";
import Quest from "@/components/Quest";
import { convertGrade } from "@/utils/convertGrade";
import { getUserProfile } from "@/utils/supabase/actions";
import { BookOpen, Swords } from "lucide-react";
import { getChatsData, getQuestsData } from "./actions";
import styles from "./page.module.css";

export default async function HomePage() {
  const userData = await getUserProfile();
  const chatsData = await getChatsData();
  const questsData = await getQuestsData();

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
        <ul>
          {questsData?.map((quest) => (
            <li key={quest.quest_id.id}>
              <Quest
                type="quest"
                theme={quest.quest_id.title}
                people={quest.quest_id.organization_id.name}
                link={`/quest/${quest.quest_id.id}`}
                status={quest.quest_id.status}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className={`${styles.section} ${styles.questionSection}`}>
        <h2>最近の問い</h2>
        <ul>
          {chatsData?.map((chat) => (
            <li key={chat.id}>
              <Quest
                type="question"
                theme={chat.title}
                people={chat.created_at}
                link={`/question/${chat.id}`}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
