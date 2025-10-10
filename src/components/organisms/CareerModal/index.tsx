"use client";

import { useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";
import { createCareerAndLinkToChat, getCareerByChatId } from "@/actions/career";
import styles from "./index.module.css";

interface CareerModalProps {
  chatId: string;
  isOpen: boolean;
  onClose: () => void;
}

interface CareerData {
  name: string;
  description: string;
}

export default function CareerModal({
  chatId,
  isOpen,
  onClose,
}: CareerModalProps) {
  const [career, setCareer] = useState<CareerData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && !career) {
      generateCareer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, chatId]);

  const generateCareer = async () => {
    setLoading(true);
    setError(null);

    try {
      // まず既存のキャリアをチェック
      const existingCareer = await getCareerByChatId(chatId);
      if (existingCareer) {
        setCareer({
          name: existingCareer.name,
          description: existingCareer.description,
        });
        setLoading(false);
        return;
      }

      // Gemini APIでキャリアを生成
      const response = await fetch("/api/career", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chatId }),
      });

      if (!response.ok) {
        throw new Error("キャリアの生成に失敗しました");
      }

      const data = await response.json();
      setCareer(data);

      // Server Actionでキャリアを保存してチャットに紐付け
      const savedCareer = await createCareerAndLinkToChat(
        chatId,
        data.name,
        data.description
      );
      if (!savedCareer) {
        console.error("キャリアの保存に失敗しました");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <X size={24} />
        </button>

        <h2 className={styles.title}>あなたにおすすめのキャリア</h2>

        {loading && (
          <div className={styles.loading}>
            <Loader2 className={styles.spinner} size={32} />
            <p>キャリアを分析中...</p>
          </div>
        )}

        {error && <div className={styles.error}>{error}</div>}

        {career && !loading && (
          <>
            <div className={styles.careerName}>{career.name}</div>
            <div className={styles.description}>{career.description}</div>
          </>
        )}
      </div>
    </div>
  );
}
