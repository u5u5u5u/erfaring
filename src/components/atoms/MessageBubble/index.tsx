import ReactMarkdown from "react-markdown";
import styles from "./index.module.css";

interface MessageBubbleProps {
  text?: string;
  time?: string;
  isMine: boolean;
}

const MessageBubble = ({ text, time, isMine }: MessageBubbleProps) => {
  const bubbleClasses = `${styles.messageBubble} ${
    isMine ? styles.mine : styles.other
  }`;

  return (
    <div className={bubbleClasses}>
      <div className={styles.content}>
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>
      <p className={styles.time}>{time}</p>
    </div>
  );
};

export default MessageBubble;
