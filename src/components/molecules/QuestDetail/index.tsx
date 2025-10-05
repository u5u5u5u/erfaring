import styles from "./index.module.css";

interface QuestDetailProps {
  title: string;
  text: string;
}

const QuestDetail = ({ title, text }: QuestDetailProps) => {
  return (
    <div className={styles.QuestDetail}>
      <div className={styles.title}>{title}</div>
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default QuestDetail;
