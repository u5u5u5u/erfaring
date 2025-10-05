import React, { useState } from "react";
import styles from "./index.module.css";

interface MissionFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (answer: string) => void;
}

const MissionForm: React.FC<MissionFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [answer, setAnswer] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim()) {
      onSubmit(answer);
      setAnswer("");
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>ミッションに挑む</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        <div className={styles.content}>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="answer" className={styles.label}>
                あなたの回答・取り組み内容を入力してください
              </label>
              <textarea
                id="answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className={styles.textarea}
                placeholder="ここに回答や取り組み内容を入力してください..."
                rows={8}
                required
              />
            </div>
            <div className={styles.actions}>
              <button
                type="button"
                onClick={onClose}
                className={styles.cancelButton}
              >
                キャンセル
              </button>
              <button type="submit" className={styles.submitButton}>
                提出する
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MissionForm;
