import { getAcquireBadgeCount } from "@/actions/badge";
import { getSolvedChatsCount } from "@/actions/chat";
import { getClearQuestsCount } from "@/actions/quest";
import styles from "./index.module.css";

interface AcquireNumberProps {
  name: "quest" | "question" | "budge";
}

const AcquireNumber = async ({ name }: AcquireNumberProps) => {
  const number =
    name === "quest"
      ? await getClearQuestsCount()
      : name === "question"
      ? await getSolvedChatsCount()
      : name === "budge"
      ? await getAcquireBadgeCount()
      : 0;

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
