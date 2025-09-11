"use client";

import AddQuestionButton from "@/component/AddQuestionButton";
import styles from "./page.module.css";

export default function QuestionPage() {
  return (
    <div className={styles.container}>
      <h1>探究ノート</h1>
      <div className={styles.buttonContainer}>
        <AddQuestionButton onClick={() => console.log("新しい問いを追加")} />
      </div>
    </div>
  );
}
