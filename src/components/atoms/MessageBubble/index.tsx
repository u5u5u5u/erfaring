import ReactMarkdown from "react-markdown";
import styles from "./index.module.css";

interface MessageBubbleProps {
  text?: string;
  time?: string;
}

const MessageBubble = ({ text, time }: MessageBubbleProps) => {
  return (
    <div className={styles.speechBubble}>
      <div>
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>
      <p className={styles.time}>{time}</p>
    </div>
  );
};

export default MessageBubble;
