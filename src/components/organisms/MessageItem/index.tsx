import MessageBubble from "@/components/atoms/MessageBubble";
import ChatIcon from "@/components/molecules/ChatIcon";
import type { Message } from "@/types/question";
import { formatDateTime } from "@/utils/formatDateTime";
import styles from "./index.module.css";

interface MessageItemProps {
  message: Message;
}

const MessageItem = ({ message }: MessageItemProps) => {
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
      <MessageBubble
        text={message.content}
        time={formatDateTime(message.created_at?.toLocaleString() || "")}
        isMine={message.role === "user"}
      />
    </div>
  );
};

export default MessageItem;
