import { getQuestsData } from "@/actions/quest";
import Quest from "@/components/molecules/Quest";
import styles from "./index.module.css";

const Quests = async ({ limit }: { limit?: number }) => {
  const quests = await getQuestsData(limit);

  return (
    <ul className={styles.list}>
      {quests?.map(
        (quest) =>
          quest.quest_id && (
            <li key={quest.quest_id.id}>
              <Quest
                type="quest"
                theme={quest.quest_id.title}
                people={quest.quest_id.organization_id.name}
                link={`/quest/${quest.quest_id.id}`}
                status={quest.quest_id.status}
              />
            </li>
          )
      )}
    </ul>
  );
};

export default Quests;
