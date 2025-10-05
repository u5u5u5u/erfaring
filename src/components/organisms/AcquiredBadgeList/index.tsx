import { getAcquiredBadgesData } from "@/actions/badge";
import styles from "./index.module.css";
import Badge from "@/components/atoms/Badge";

const AcquiredBadgeList = async () => {
  const acquiredBadges = await getAcquiredBadgesData(5);

  return (
    <ul className={styles.list}>
      {acquiredBadges?.map((badge) => (
        <li key={badge.badge_id.id}>
          <Badge
            name={badge.badge_id.name}
            icon={badge.badge_id.icon}
            color={badge.badge_id.color}
          />
        </li>
      ))}
    </ul>
  );
};

export default AcquiredBadgeList;
