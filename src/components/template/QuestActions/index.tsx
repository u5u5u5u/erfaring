"use client";

import { acceptQuest, submitMissionAnswer } from "@/actions/quest";
import OrangeButton from "@/components/atoms/OrangeButton";
import HintModal from "@/components/organisms/HintModal";
import MissionForm from "@/components/organisms/MissionForm";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from "./index.module.css";

interface QuestActionsProps {
  questId: string;
  isParticipating: boolean;
}

const QuestActions = ({ questId, isParticipating }: QuestActionsProps) => {
  const router = useRouter();
  const [showHint, setShowHint] = useState(false);
  const [showMissionForm, setShowMissionForm] = useState(false);

  const handleAcceptQuest = async () => {
    try {
      await acceptQuest(questId);
      router.refresh();
    } catch (error) {
      console.error("クエスト参加エラー:", error);
      return null;
    }
  };

  const handleAddNote = () => {
    router.push(`/question/registration?questId=${questId}`);
  };

  const handleShowHint = () => {
    setShowHint(true);
  };

  const handleShowMission = () => {
    setShowMissionForm(true);
  };

  const handleSubmitMission = async (answer: string) => {
    try {
      await submitMissionAnswer(questId, answer);
      alert("ミッションの回答を提出しました！");
    } catch (error) {
      console.error("ミッション提出エラー:", error);
      return null;
    }
  };

  if (!isParticipating) {
    return (
      <div className={styles.buttonContainer}>
        <OrangeButton
          text="このクエストに挑戦する"
          onClick={handleAcceptQuest}
        />
      </div>
    );
  }

  return (
    <>
      <div className={styles.challengeSection}>
        <button className={styles.actionButton} onClick={handleAddNote}>
          探求ノートを追加
        </button>
        <button className={styles.actionButton} onClick={handleShowHint}>
          達人からのヒントを見る
        </button>
        <button className={styles.actionButton} onClick={handleShowMission}>
          ミッションに挑む
        </button>
      </div>

      <HintModal
        isOpen={showHint}
        onClose={() => setShowHint(false)}
        questId={questId}
      />

      <MissionForm
        isOpen={showMissionForm}
        onClose={() => setShowMissionForm(false)}
        onSubmit={handleSubmitMission}
      />
    </>
  );
};

export default QuestActions;
