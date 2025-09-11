import type quest from "@/types/quest";
import Quest from "@/component/Quest";
import { userAgent } from "next/server";
import styles from "./page.module.css";

export default function QuestionPage() {
  const dummyQuests: quest[] = [
    { id: "airi1", name: "airi1gou", title: "title1" },
    { id: "airi2", name: "airi2gou", title: "title2" },
    { id: "airi3", name: "airi3gou", title: "title3" },
    { id: "airi4", name: "airi4gou", title: "title4" },
    { id: "airi5", name: "airi5gou", title: "title5" },
  ];

  return (
    <div className={styles.container}>
      <h1>探究ノート</h1>
      <div>
        <ul className={styles.questList}>
          {dummyQuests.map((question) => (
            <li key={question.id} className={styles.questionItem}>
              <Quest theme={question.title} people={question.name} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
