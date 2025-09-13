import ChatIcon from "../ChatIcon";
import ChatSpeechBubble from "../ChatSpeechBubble";
import styles from "./index.module.css";

interface ChatItemProps {
  name: string;
  icon: string;
  text: string;
  time: string;
}

const Chatitem = ({ name, icon, text, time }: ChatItemProps) => {
  return (
    <div className={styles.chatItem}>
      <ChatIcon icon={icon} name={name}></ChatIcon>
      <ChatSpeechBubble text={text} time={time}></ChatSpeechBubble>
    </div>
  );
};

export default Chatitem;
