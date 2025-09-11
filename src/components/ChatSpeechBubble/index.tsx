import styles from "./index.module.css";

interface ChatSpeechBubbleProps {
  text?: string;
  time?: string;
}

const ChatSpeechBubble = ({ text, time }: ChatSpeechBubbleProps) => {
  return (
    <div className={styles.speechbubble}>
      <h1>{text}</h1>
      <p>{time}</p>
    </div>
  );
};

export default ChatSpeechBubble;
