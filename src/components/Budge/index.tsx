import styles from "./index.module.css";

interface BudgeProps {
  name: string;
  icon: React.ReactNode;
}

const Budge = ({ name, icon }: BudgeProps) => {
  return (
    <div className={styles.budge}>
      {icon}
      <p className={styles.name}>{name}</p>
    </div>
  );
};

export default Budge;
