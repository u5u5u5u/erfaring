import { getMessagesData } from "@/actions/message";
import { SolvedSwitch } from "@/components/molecules/SolvedSwitch";
import CareerButton from "@/components/molecules/CareerButton";
import MessageItem from "@/components/organisms/MessageItem";
import type { Message } from "@/types/question";
import styles from "./index.module.css";

interface MessageListProps {
  questionId: string;
}

export const MessageList = async ({ questionId }: MessageListProps) => {
  const messagesData = await getMessagesData(questionId);

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>{messagesData?.[0].chat_id.title}</h1>
        <div className={styles.controls}>
          <SolvedSwitch
            questionId={questionId}
            initialChecked={messagesData?.[0].chat_id.is_solved}
          />
          <CareerButton
            chatId={questionId}
            isSolved={messagesData?.[0].chat_id.is_solved || false}
          />
        </div>
      </div>
      <div className={styles.chatContainer}>
        {messagesData?.map((message) => (
          <div key={message.id} className={styles.questionItem}>
            <MessageItem message={message as unknown as Message} />
          </div>
        ))}
      </div>
    </>
  );
};
