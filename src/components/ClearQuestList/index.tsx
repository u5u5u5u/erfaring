import { getClearQuestsData } from "@/actions/quest";
import styles from "./index.module.css";

const ClearQuestList = async () => {
  const clearQuests = await getClearQuestsData(5);

  return (
    <ul className={styles.list}>
      {clearQuests?.map((quest) => (
        <li key={quest.quest_id}>{quest.quests.title}</li>
      ))}
    </ul>
  );
};

export default ClearQuestList;
