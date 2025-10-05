import { Loader2 } from "lucide-react";
import styles from "./index.module.css";

interface OrangeButtonProps {
  text: string;
  onClick?: () => void;
  formAction?: (formData: FormData) => Promise<void>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
}

const OrangeButton = ({
  text,
  onClick,
  formAction,
  type = "button",
  disabled = false,
  loading = false,
}: OrangeButtonProps) => {
  return (
    <button
      className={`${styles.orange} ${disabled ? styles.disabled : ""}`}
      formAction={formAction}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {loading ? (
        <div className={styles.loadingContainer}>
          <Loader2 className={styles.spinner} size={20} />
          <span className={styles.loadingText}>処理中...</span>
        </div>
      ) : (
        text
      )}
    </button>
  );
};

export default OrangeButton;
