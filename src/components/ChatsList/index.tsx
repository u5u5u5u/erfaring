import { getChatsData } from "@/actions/chat";
import Quest from "@/components/Quest";
import styles from "./index.module.css";

const Chats = async ({ limit }: { limit?: number }) => {
  const chats = await getChatsData(limit);

  return (
    <ul className={styles.list}>
      {chats?.map((chat) => (
        <li key={chat.id}>
          <Quest
            type="question"
            theme={chat.title}
            people={chat.created_at}
            link={`/question/${chat.id}`}
          />
        </li>
      ))}
    </ul>
  );
};

export default Chats;
