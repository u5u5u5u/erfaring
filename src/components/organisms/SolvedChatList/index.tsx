import { getSolvedChatsData } from "@/actions/chat";
import styles from "./index.module.css";

const SolvedChatList = async () => {
  const solvedChats = await getSolvedChatsData(5);

  return (
    <ul className={styles.list}>
      {solvedChats?.map((chat) => (
        <li key={chat.id}>{chat.title}</li>
      ))}
    </ul>
  );
};

export default SolvedChatList;
