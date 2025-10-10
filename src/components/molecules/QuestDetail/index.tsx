import styles from "./index.module.css";

interface QuestDetailProps {
  title: string;
  text: string;
}

const QuestDetail = ({ title, text }: QuestDetailProps) => {
  return (
    <div className={styles.questDetail}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default QuestDetail;
