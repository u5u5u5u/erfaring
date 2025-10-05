import AcquireNumber from "@/components/atoms/AcquireNumber";
import ProfileIcon from "@/components/molecules/ProfileIcon";
import AcquiredBadgeList from "@/components/organisms/AcquiredBadgeList";
import ClearQuestList from "@/components/organisms/ClearQuestList";
import SolvedChatList from "@/components/organisms/SolvedChatList";
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
