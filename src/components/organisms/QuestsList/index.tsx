import { getQuestsData, getAssignedQuestsData } from "@/actions/quest";
import Quest from "@/components/molecules/Quest";
import styles from "./index.module.css";

interface QuestsProps {
  limit?: number;
  assigned?: boolean;
}

const Quests = async ({ limit, assigned = false }: QuestsProps) => {
  const quests = assigned
    ? await getAssignedQuestsData(limit)
    : await getQuestsData(limit);

  return (
    <ul className={styles.list}>
      {quests?.map((quest) =>
        assigned
          ? quest.quest_id && (
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
          : quest.id && (
              <li key={quest.id}>
                <Quest
                  type="quest"
                  theme={quest.title}
                  people={quest.organization_id.name}
                  link={`/quest/${quest.id}`}
                  status={quest.status}
                />
              </li>
            )
      )}
    </ul>
  );
};

export default Quests;
