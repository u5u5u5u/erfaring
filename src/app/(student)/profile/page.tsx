import ProfileIcon from "@/components/ProfileIcon";
import type { User } from "@/types/user";
import AcquireNumber from "@/components/AcquireNumber";
import styles from "./page.module.css";
import Budge from "@/components/Budge";
import { BadgeCheck } from "lucide-react";
import type { Budge as BudgeType } from "@/types/budge";

export default function ProfilePage() {
  const dummyUser: User = {
    id: "1",
    name: "ゆうご",
    email: "yugo@example.com",
    password: "password123",
    imageUrl: "/vercel.svg",
    role: "student",
    schoolId: "〇〇市立〇〇小学校",
    grade: 5,
  };

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
      <ProfileIcon user={dummyUser} />
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
