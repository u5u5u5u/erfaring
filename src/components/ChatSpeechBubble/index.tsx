import styles from "./index.module.css";
import ReactMarkdown from "react-markdown";

interface ChatSpeechBubbleProps {
  text?: string;
  time?: string;
}

const ChatSpeechBubble = ({ text, time }: ChatSpeechBubbleProps) => {
  return (
    <div className={styles.speechBubble}>
      <div>
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>
      <p className={styles.time}>{time}</p>
    </div>
  );
};

export default ChatSpeechBubble;
