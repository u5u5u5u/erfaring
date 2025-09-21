import PageTitle from "@/components/PageTitle";
import Quest from "@/components/Quest";
import { createClient } from "@/utils/supabase/server";
import styles from "./page.module.css";

export default async function QuestionPage() {
  const supabase = await createClient();

  const { data: questsData, error: questsError } = await supabase
    .from("quests")
    .select("*, organization_id(name)");

  if (questsError) {
    console.error("Error fetching quests:", questsError);
  }

  return (
    <div className={styles.container}>
      <PageTitle title="クエスト一覧" />
      <div>
        <ul className={styles.questList}>
          {questsData?.map((quest) => (
            <li key={quest.id} className={styles.questItem}>
              <Quest
                type="quest"
                theme={quest.title}
                people={quest.organization_id.name}
                link={`/quest/${quest.id}`}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
