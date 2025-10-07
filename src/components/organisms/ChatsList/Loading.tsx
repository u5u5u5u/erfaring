import styles from "./Loading.module.css";

const ChatsListLoading = () => {
  return (
    <ul className={styles.list}>
      {Array.from({ length: 3 }).map((_, index) => (
        <li key={index} className={styles.skeletonItem}>
          <div className={styles.skeleton}></div>
        </li>
      ))}
    </ul>
  );
};

export default ChatsListLoading;
