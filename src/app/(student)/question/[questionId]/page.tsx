import MessageForm from "@/components/organisms/MessageForm";
import { Suspense } from "react";
import { MessageListLoading } from "./Loading";
import { MessageList, getMessageHistory } from "./MessageList";
import styles from "./page.module.css";

interface ChatPageProps {
  params: Promise<{ questionId: string }>;
}

export default async function ChatPage({ params }: ChatPageProps) {
  const { questionId } = await params;

  // メッセージ履歴を取得（フォーム用）
  const history = await getMessageHistory(questionId);

  return (
    <div className={styles.container}>
      <Suspense fallback={<MessageListLoading />}>
        <MessageList questionId={questionId} />
      </Suspense>
      <div className={styles.inputContainer}>
        <MessageForm chat_id={questionId} history={history} />
      </div>
    </div>
  );
}
