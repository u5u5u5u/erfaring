import ChatIcon from "../ChatIcon";
import ChatSpeechBubble from "../ChatSpeechBubble";
import styles from "./index.module.css";
import type { Message } from "@/types/question";
import { formatDateTime } from "@/utils/formatDateTime";

interface ChatItemProps {
  message: Message;
}

const ChatItem = ({ message }: ChatItemProps) => {
  return (
    <div className={styles.chatItem}>
      <ChatIcon
        icon={
          message.role === "user"
            ? message.chat_id?.user_id?.avatar_url || ""
            : ""
        }
        name={
          message.role === "user"
            ? message.chat_id?.user_id?.username || ""
            : "AIメンター"
        }
      />
      <ChatSpeechBubble
        text={message.content}
        time={formatDateTime(message.created_at?.toLocaleString() || "")}
      />
    </div>
  );
};

export default ChatItem;
