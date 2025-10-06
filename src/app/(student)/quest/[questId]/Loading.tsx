import styles from "./Loading.module.css";

export const QuestDetailLoading = () => {
  return (
    <>
      {/* Header Skeleton */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.titleSkeleton}></div>
          <div className={styles.statusSkeleton}></div>
        </div>
        <div className={styles.organizationSkeleton}></div>
      </div>

      {/* Hashtags Skeleton */}
      <div className={styles.hashtags}>
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className={styles.hashtagSkeleton}></div>
        ))}
      </div>

      {/* Quest Details Skeleton */}
      <div className={styles.questDetails}>
        <div className={styles.detailCard}>
          <div className={styles.detailTitleSkeleton}></div>
          <div className={styles.detailContent}>
            <div className={styles.textLine} style={{ width: "100%" }}></div>
            <div className={styles.textLine} style={{ width: "95%" }}></div>
            <div className={styles.textLine} style={{ width: "88%" }}></div>
            <div className={styles.textLine} style={{ width: "92%" }}></div>
          </div>
        </div>
      </div>

      {/* Action Buttons Skeleton */}
      <div className={styles.buttonGrid}>
        <div className={styles.buttonSkeleton}></div>
      </div>
    </>
  );
};
