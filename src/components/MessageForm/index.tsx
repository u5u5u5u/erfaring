import { Send } from "lucide-react";
import { sendMessage } from "./actions";
import styles from "./index.module.css";

interface MessageFormProps {
  chat_id?: string;
  history?: { role: string; parts: { text: string }[] }[];
}

const MessageForm = ({ chat_id, history }: MessageFormProps) => {
  return (
    <form className={styles.messageForm}>
      <label htmlFor="chat_id" />
      <input
        id="chat_id"
        name="chat_id"
        type="hidden"
        value={chat_id}
        readOnly
      />
      <label htmlFor="history" />
      <input
        id="history"
        name="history"
        type="hidden"
        value={JSON.stringify(history)}
        readOnly
      />
      <label htmlFor="message" />
      <input
        id="message"
        name="message"
        type="text"
        className={styles.form}
        placeholder="気づいたこと調べたことを記録しよう"
        size={40}
      />
      <button className={styles.button} formAction={sendMessage}>
        <Send className={styles.send} size={35}></Send>
      </button>
    </form>
  );
};
export default MessageForm;
