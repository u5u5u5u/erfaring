"use client";

import { useState } from "react";
import CareerModal from "@/components/organisms/CareerModal";
import styles from "./index.module.css";

interface CareerButtonProps {
  chatId: string;
  isSolved: boolean;
}

export default function CareerButton({ chatId, isSolved }: CareerButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!isSolved) {
    return null;
  }

  return (
    <>
      <button
        className={styles.careerButton}
        onClick={() => setIsModalOpen(true)}
      >
        キャリアを見る
      </button>
      <CareerModal
        chatId={chatId}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
