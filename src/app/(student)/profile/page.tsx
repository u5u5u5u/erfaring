import ProfileIcon from "@/components/ProfileIcon";
import type { User } from "@/types/user";
import AcquireNumber from "@/components/AcquireNumber";
import styles from "./page.module.css";

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

  return (
    <div className={styles.container}>
      <ProfileIcon user={dummyUser} />
      <div className={styles.sections}>
        <div className={styles.acquireNumberSection}>
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
      </div>
    </div>
  );
}
