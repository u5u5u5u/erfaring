import AcquireNumber from "@/components/atoms/AcquireNumber";
import ProfileIcon from "@/components/molecules/ProfileIcon";
import AcquiredBadgeList from "@/components/organisms/AcquiredBadgeList";
import ClearQuestList from "@/components/organisms/ClearQuestList";
import SolvedChatList from "@/components/organisms/SolvedChatList";
import { Suspense } from "react";
import {
  AcquireNumbersLoading,
  BadgeListLoading,
  ChatListLoading,
  ProfileIconLoading,
  QuestListLoading,
} from "./Loading";
import styles from "./page.module.css";

export default async function ProfilePage() {
  return (
    <div className={styles.container}>
      <Suspense fallback={<ProfileIconLoading />}>
        <ProfileIcon />
      </Suspense>
      <div className={styles.sections}>
        <div className={styles.section}>
          <Suspense fallback={<AcquireNumbersLoading />}>
            <p className={styles.title}>これまでの記録</p>
            <div className={styles.items}>
              <AcquireNumber name="quest" />
              <AcquireNumber name="question" />
              <AcquireNumber name="budge" />
            </div>
          </Suspense>
        </div>
        <div className={styles.section}>
          <Suspense fallback={<BadgeListLoading />}>
            <p className={styles.title}>獲得したバッジ</p>
            <AcquiredBadgeList />
          </Suspense>
        </div>
        <div className={styles.section}>
          <Suspense fallback={<QuestListLoading />}>
            <p className={styles.title}>クリアしたクエスト</p>
            <ClearQuestList />
          </Suspense>
        </div>
        <div className={styles.section}>
          <Suspense fallback={<ChatListLoading />}>
            <p className={styles.title}>解決した問い</p>
            <SolvedChatList />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
