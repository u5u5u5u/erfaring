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

  return (
    <div className={styles.container}>
      <ProfileIcon user={dummyUser} />
      <div className={styles.sections}>
        <div className={styles.section}>
          <p className={styles.title}>これまでの記録</p>
          <div className={styles.list}>
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
          <div className={styles.list}>
            {dummyBudges.map((budge) => (
              <Budge
                key={budge.id}
                name={budge.name}
                icon={<BadgeCheck size={48} color="#FFD700" />}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
