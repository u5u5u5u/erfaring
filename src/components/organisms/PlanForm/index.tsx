"use client";

import React, { useState } from "react";
import styles from "./index.module.css";

interface PlanFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (plan: string) => Promise<void>;
}

const PlanForm = ({ isOpen, onClose, onSubmit }: PlanFormProps) => {
  const [plan, setPlan] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!plan.trim()) {
      alert("プランを入力してください");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(plan);
      setPlan("");
      onClose();
    } catch (error) {
      console.error("プラン提出エラー:", error);
      alert("プランの提出に失敗しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>ミッション解決のためのプランを提出</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="plan">
              ミッションを解決するためのプランを立ててください
            </label>
            <textarea
              id="plan"
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              placeholder="ミッション解決のためのプランを入力してください..."
              className={styles.textarea}
              rows={12}
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
              {isSubmitting ? "提出中..." : "プランを提出"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlanForm;
