import styles from "./index.module.css";

interface StatusProps {
  status?: "draft" | "open" | "closed" | "archived";
}

const Status = ({ status }: StatusProps) => {
  const statusText = {
    draft: "下書き",
    open: "募集中",
    closed: "締切",
    archived: "アーカイブ",
  };
  const statusColors = {
    draft: "#6c757d", // Gray
    open: "#10b981", // Modern Green
    closed: "#ef4444", // Modern Red
    archived: "#3b82f6", // Modern Blue
  };

  return (
    <span
      style={{
        backgroundColor: statusColors[status || "archived"],
      }}
      className={styles.status}
    >
      {statusText[status || "archived"]}
    </span>
  );
};

export default Status;
