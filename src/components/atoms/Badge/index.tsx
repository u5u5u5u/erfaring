import styles from "./index.module.css";
import DynamicIcon from "../DynamicIcon";
import dynamicIconImports from "lucide-react/dynamicIconImports";

type IconName = keyof typeof dynamicIconImports;
interface BudgeProps {
  name: string;
  icon: IconName;
  color?: string;
}

const Badge = ({ name, icon, color }: BudgeProps) => {
  return (
    <div className={styles.budge}>
      <DynamicIcon name={icon} color={color} className={styles.icon} />
      <p className={styles.name}>{name}</p>
    </div>
  );
};

export default Badge;
