import styles from "./index.module.css";

interface StatusProps {
  status: "draft" | "open" | "closed" | "archived";
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
    open: "#28a745", // Green
    closed: "#dc3545", // Red
    archived: "#007bff", // Blue
  };

  return (
    <span
      style={{
        backgroundColor: statusColors[status],
      }}
      className={styles.status}
    >
      {statusText[status]}
    </span>
  );
};

export default Status;
