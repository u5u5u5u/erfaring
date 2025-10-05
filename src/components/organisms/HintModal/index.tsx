"use client";

import { getQuestHints } from "@/actions/quest";
import { useEffect, useState } from "react";
import styles from "./index.module.css";

interface HintModalProps {
  isOpen: boolean;
  onClose: () => void;
  questId: string;
}

const HintModal = ({ isOpen, onClose, questId }: HintModalProps) => {
  const [hint, setHint] = useState<string | null>(null);

  useEffect(() => {
    const fetchHint = async () => {
      try {
        const hints = await getQuestHints(questId);
        if (hints && hints.length > 0) {
          setHint(hints[0].content);
        } else {
          setHint("ヒントはまだ準備されていません。");
        }
      } catch (error) {
        console.error("Error fetching hints:", error);
        setHint("ヒントの取得中にエラーが発生しました。");
      }
    };

    fetchHint();
  }, [questId]);

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
