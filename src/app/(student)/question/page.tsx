"use client";

import AddQuestionButton from "@/components/AddQuestionButton";
import PageTitle from "@/components/PageTitle";
import Quest from "@/components/Quest";
import type { Question } from "@/types/question";
import styles from "./page.module.css";

export default function QuestionPage() {
  const dummyQuestions: Question[] = [
    { id: "1", title: "空はなぜ青いのか？", createdAt: new Date() },
    { id: "2", title: "なぜ人は夢を見るのか？", createdAt: new Date() },
    { id: "3", title: "時間とは何か？", createdAt: new Date() },
    {
      id: "4",
      title: "音楽はどのように感情に影響を与えるのか？",
      createdAt: new Date(),
    },
    { id: "5", title: "なぜ猫は箱が好きなのか？", createdAt: new Date() },
    {
      id: "6",
      title: "宇宙の果てはどうなっているのか？",
      createdAt: new Date(),
    },
    { id: "7", title: "言語はどのように進化するのか？", createdAt: new Date() },
  ];

  return (
    <div className={styles.container}>
      <PageTitle title="探究ノート" />
      <div className={styles.buttonContainer}>
        <AddQuestionButton />
      </div>
      <div>
        <ul className={styles.questionList}>
          {dummyQuestions.map((question) => (
            <li key={question.id} className={styles.questionItem}>
              <Quest
                theme={question.title}
                people={question.createdAt?.toLocaleDateString()}
                link={`/question/${question.id}`}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
