import React from "react";
import styles from "./index.module.css";

interface HintModalProps {
  isOpen: boolean;
  onClose: () => void;
  hint: string;
}

const HintModal = ({ isOpen, onClose, hint }: HintModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>達人からのヒント</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        <div className={styles.content}>
          <p>{hint || "ヒントはまだ準備されていません。"}</p>
        </div>
      </div>
    </div>
  );
};

export default HintModal;
