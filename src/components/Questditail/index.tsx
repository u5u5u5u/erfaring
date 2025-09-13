import styles from "./index.module.css";

interface QuestditailProps {
  title: string;
  text: string;
}

const Questditail = ({ title, text }: QuestditailProps) => {
  return (
    <div className={styles.Questditail}>
      <div className={styles.theme}>
        <div className={styles.title}>{title}</div>
        <p className={styles.text}>{text}</p>
      </div>
    </div>
  );
};

export default Questditail;
