import AcquiredBadgeList from "@/components/AcquiredBadgeList";
import AcquireNumber from "@/components/AcquireNumber";
import ClearQuestList from "@/components/ClearQuestList";
import ProfileIcon from "@/components/ProfileIcon";
import SolvedChatList from "@/components/SolvedChatList";
import styles from "./page.module.css";

export default async function ProfilePage() {
  return (
    <div className={styles.container}>
      <ProfileIcon />
      <div className={styles.sections}>
        <div className={styles.section}>
          <p className={styles.title}>これまでの記録</p>
          <div className={styles.items}>
            <AcquireNumber name="quest" />
            <AcquireNumber name="question" />
            <AcquireNumber name="budge" />
          </div>
        </div>
        <div className={styles.section}>
          <p className={styles.title}>獲得したバッジ</p>
          <AcquiredBadgeList />
        </div>
        <div className={styles.section}>
          <p className={styles.title}>クリアしたクエスト</p>
          <ClearQuestList />
        </div>
        <div className={styles.section}>
          <p className={styles.title}>解決した問い</p>
          <SolvedChatList />
        </div>
      </div>
    </div>
  );
}
