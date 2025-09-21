import AcquireNumber from "@/components/AcquireNumber";
import Budge from "@/components/Budge";
import ProfileIcon from "@/components/ProfileIcon";
import type { Budge as BudgeType } from "@/types/budge";
import { createClient } from "@/utils/supabase/server";
import { BadgeCheck } from "lucide-react";
import styles from "./page.module.css";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  const { data: userData, error } = await supabase
    .from("profiles")
    .select("*, user_schools(school_id(name), grade)")
    .eq("id", data?.user?.id)
    .single();
  
  console.log(userData);

  if (error) {
    console.error("Error fetching user profile:", error);
  }

  const dummyAcquireNumbers = [
    { name: "quest", number: 12 },
    { name: "question", number: 34 },
    { name: "budge", number: 5 },
  ] as const;

  const dummyBudges: BudgeType[] = [
    { id: "1", name: "探究マスター", icon: "Search" },
    { id: "2", name: "質問王", icon: "MessageCircleQuestionMark" },
    { id: "3", name: "回答の達人", icon: "HandHelping" },
  ];

  const dummyClearQuests = [
    { id: "1", title: "地球温暖化の原因と対策" },
    { id: "2", title: "日本の歴史と文化" },
    { id: "3", title: "宇宙の神秘" },
  ];

  const dummyClearQuestions = [
    { id: "1", title: "なぜ空は青いのか？" },
    { id: "2", title: "なぜ人は夢を見るのか？" },
    { id: "3", title: "時間とは何か？" },
  ];

  return (
    <div className={styles.container}>
      <ProfileIcon user={userData} />
      <div className={styles.sections}>
        <div className={styles.section}>
          <p className={styles.title}>これまでの記録</p>
          <div className={styles.items}>
            {dummyAcquireNumbers.map((item) => (
              <AcquireNumber
                key={item.name}
                name={item.name}
                number={item.number}
              />
            ))}
          </div>
        </div>
        <div className={styles.section}>
          <p className={styles.title}>獲得したバッジ</p>
          <div className={styles.items}>
            {dummyBudges.map((budge) => (
              <Budge
                key={budge.id}
                name={budge.name}
                icon={<BadgeCheck size={48} color="#FFD700" />}
              />
            ))}
          </div>
        </div>
        <div className={styles.section}>
          <p className={styles.title}>クリアしたクエスト</p>
          <div className={styles.list}>
            {dummyClearQuests.map((quest) => (
              <li key={quest.id} className={styles.quest}>
                {quest.title}
              </li>
            ))}
          </div>
        </div>
        <div className={styles.section}>
          <p className={styles.title}>解決した問い</p>
          <div className={styles.list}>
            {dummyClearQuestions.map((questions) => (
              <li key={questions.id} className={styles.questions}>
                {questions.title}
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
