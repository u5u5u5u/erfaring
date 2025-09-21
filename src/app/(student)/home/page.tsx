import Button from "@/components/Button";
import Quest from "@/components/Quest";
import type { quest } from "@/types/quest";
import type { Question } from "@/types/question";
import { convertGrade } from "@/utils/convertGrade";
import { createClient } from "@/utils/supabase/server";
import { BookOpen, Swords } from "lucide-react";
import styles from "./page.module.css";

export default async function HomePage() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  const { data: userData, error } = await supabase
    .from("profiles")
    .select("*, user_schools(school_id(name), grade)")
    .eq("id", data?.user?.id)
    .single();
  console.log("userData", userData);

  if (error) {
    console.error("Error fetching user data:", error);
  }

  const dummyQuests: quest[] = [
    {
      id: "1",
      name: "市役所の人",
      title: "〇〇市の魅力を発信しよう",
    },
    {
      id: "2",
      name: "図書館の人",
      title: "未来の図書館を考えよう",
    },
  ];

  const dummyQuestions: Question[] = [
    {
      id: "1",
      title: "なぜ空は青いの？",
      createdAt: new Date(),
    },
    {
      id: "2",
      title: "なぜ海は塩辛いの？",
      createdAt: new Date(),
    },
  ];

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
        <Button color="#21C55D" icon={<BookOpen size={30} />} link="/question">
          問いを探究
        </Button>
      </div>
      <div className={`${styles.section} ${styles.questSection}`}>
        <h2>参加中のクエスト</h2>
        <ul>
          {dummyQuests.map((quest) => (
            <li key={quest.id}>
              <Quest
                theme={quest.title}
                people={quest.name}
                link={`/quest/${quest.id}`}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className={`${styles.section} ${styles.questionSection}`}>
        <h2>最近の問い</h2>
        <ul>
          {dummyQuestions.map((question) => (
            <li key={question.id}>
              <Quest
                theme={question.title}
                people={question.createdAt?.toLocaleDateString()}
                link={`/question/${question.id}`}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
