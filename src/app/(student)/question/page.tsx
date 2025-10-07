import AddQuestionButton from "@/components/atoms/AddQuestionButton";
import PageTitle from "@/components/atoms/PageTitle";
import Chats from "@/components/organisms/ChatsList";
import styles from "./page.module.css";
import { Suspense } from "react";
import ChatsListLoading from "@/components/organisms/ChatsList/Loading";

export default async function QuestionPage() {
  return (
    <div className={styles.container}>
      <PageTitle title="探究ノート" />
      <div className={styles.buttonContainer}>
        <AddQuestionButton />
      </div>
      <Suspense fallback={<ChatsListLoading />}>
        <Chats />
      </Suspense>
    </div>
  );
}
