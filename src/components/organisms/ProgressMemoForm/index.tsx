"use client";

import React, { useState } from "react";
import styles from "./index.module.css";

interface ProgressMemoFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (memo: string) => Promise<void>;
  hints?: Array<{ hint_content: string; created_at: string }>;
}

const ProgressMemoForm = ({
  isOpen,
  onClose,
  onSubmit,
  hints,
}: ProgressMemoFormProps) => {
  const [memo, setMemo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!memo.trim()) {
      alert("意見・回答を入力してください");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(memo);
      setMemo("");
      onClose();
    } catch (error) {
      console.error("意見提出エラー:", error);
      alert("意見の提出に失敗しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>ミッションクリアのための意見・回答</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        <div className={styles.content}>
          {hints && hints.length > 0 && (
            <div className={styles.hintsSection}>
              <h3>達人からのヒント</h3>
              {hints.map((hint, index) => (
                <div key={index} className={styles.hintItem}>
                  <p>{hint.hint_content}</p>
                </div>
              ))}
            </div>
          )}
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="memo">
                ヒントを参考にしながら、ミッションクリアのための意見や回答を入力してください
              </label>
              <textarea
                id="memo"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                placeholder="意見や回答を入力してください..."
                className={styles.textarea}
                rows={8}
                disabled={isSubmitting}
              />
            </div>
            <div className={styles.buttonGroup}>
              <button
                type="button"
                onClick={onClose}
                className={styles.cancelButton}
                disabled={isSubmitting}
              >
                キャンセル
              </button>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? "提出中..." : "意見を提出"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProgressMemoForm;
