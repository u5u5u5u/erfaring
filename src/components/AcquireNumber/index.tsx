import styles from "./index.module.css";

interface AcquireNumberProps {
  name: "quest" | "question" | "budge";
  number: number;
}

const AcquireNumber = ({ name, number }: AcquireNumberProps) => {
  return (
    <div className={styles.acquireNumber}>
      <p className={styles.name}>
        {name === "quest"
          ? "クリアクエスト"
          : name === "question"
          ? "解決した問い"
          : name === "budge"
          ? "獲得バッジ"
          : ""}
      </p>
      <p
        className={`${styles.number} ${
          name === "quest"
            ? styles.quest
            : name === "question"
            ? styles.question
            : name === "budge"
            ? styles.budge
            : ""
        }`}
      >
        {number}
      </p>
    </div>
  );
};

export default AcquireNumber;
