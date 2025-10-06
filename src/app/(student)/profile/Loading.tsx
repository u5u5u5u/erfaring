import styles from "./Loading.module.css";

export const ProfileIconLoading = () => {
  return (
    <div className={styles.profileIcon}>
      <div className={styles.avatarSkeleton}></div>
      <div className={styles.information}>
        <div className={styles.nameSkeleton}></div>
        <div className={styles.schoolSkeleton}></div>
      </div>
    </div>
  );
};

export const AcquireNumbersLoading = () => {
  return (
    <>
      <p className={styles.title}>これまでの記録</p>
      <div className={styles.items}>
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className={styles.acquireNumberSkeleton}>
            <div className={styles.labelSkeleton}></div>
            <div className={styles.numberSkeleton}></div>
          </div>
        ))}
      </div>
    </>
  );
};

export const BadgeListLoading = () => {
  return (
    <>
      <p className={styles.title}>獲得したバッジ</p>
      <ul className={styles.badgeList}>
        {Array.from({ length: 5 }).map((_, index) => (
          <li key={index} className={styles.badgeSkeleton}></li>
        ))}
      </ul>
    </>
  );
};

export const QuestListLoading = () => {
  return (
    <>
      <p className={styles.title}>クリアしたクエスト</p>
      <ul className={styles.questList}>
        {Array.from({ length: 5 }).map((_, index) => (
          <li key={index} className={styles.questItemSkeleton}></li>
        ))}
      </ul>
    </>
  );
};

export const ChatListLoading = () => {
  return (
    <>
      <p className={styles.title}>解決した問い</p>
      <ul className={styles.chatList}>
        {Array.from({ length: 5 }).map((_, index) => (
          <li key={index} className={styles.chatItemSkeleton}></li>
        ))}
      </ul>
    </>
  );
};
