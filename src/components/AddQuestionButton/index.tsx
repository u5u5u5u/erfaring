"use client";

import { Plus } from "lucide-react";
import styles from "./index.module.css";

interface AddQuestionButtonProps {
  onClick?: () => void;
  disabled?: boolean;
}

const AddQuestionButton = ({
  onClick,
  disabled = false,
}: AddQuestionButtonProps) => {
  return (
    <button className={styles.addButton} onClick={onClick} disabled={disabled}>
      <div className={styles.iconContainer}>
        <Plus size={24} className={styles.plusIcon} />
      </div>
      <span className={styles.buttonText}>新しい問いを追加</span>
    </button>
  );
};

export default AddQuestionButton;
