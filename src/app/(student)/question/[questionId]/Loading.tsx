import styles from "./Loading.module.css";

export const MessageListLoading = () => {
  return (
    <>
      <div className={styles.titleSkeleton}></div>
      <div className={styles.chatContainer}>
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className={`${styles.messageItemSkeleton} ${
              index % 2 === 0 ? styles.user : styles.ai
            }`}
          >
            <div className={styles.iconSkeleton}></div>
            <div className={styles.bubbleContainer}>
              <div className={styles.nameSkeleton}></div>
              <div className={styles.messageSkeleton}>
                <div className={styles.textLine} style={{ width: "90%" }}></div>
                <div className={styles.textLine} style={{ width: "75%" }}></div>
                <div className={styles.textLine} style={{ width: "60%" }}></div>
              </div>
              <div className={styles.timeSkeleton}></div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
