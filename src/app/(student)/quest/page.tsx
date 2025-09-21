import PageTitle from "@/components/PageTitle";
import Quest from "@/components/Quest";
import type { quest } from "@/types/quest";
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
      <PageTitle title="クエスト一覧" />
      <div>
        <ul className={styles.questList}>
          {dummyQuests.map((quest) => (
            <li key={quest.id} className={styles.questItem}>
              <Quest
                type="quest"
                theme={quest.title}
                people={quest.name}
                link={`/quest/${quest.id}`}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
