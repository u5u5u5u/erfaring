"use client";

import {
  acceptQuest,
  submitMissionAnswer,
  submitQuestPlan,
  getQuestHintsForUser,
  submitProgressMemo,
  getUserQuestSubmissions,
} from "@/actions/quest";
import OrangeButton from "@/components/atoms/OrangeButton";
import HintModal from "@/components/organisms/HintModal";
import MissionForm from "@/components/organisms/MissionForm";
import PlanForm from "@/components/organisms/PlanForm";
import ProgressMemoForm from "@/components/organisms/ProgressMemoForm";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import styles from "./index.module.css";

interface QuestActionsProps {
  questId: string;
  userId: string;
  isParticipating: boolean;
}

const QuestActions = ({
  questId,
  userId,
  isParticipating,
}: QuestActionsProps) => {
  const router = useRouter();
  const [showHint, setShowHint] = useState(false);
  const [showMissionForm, setShowMissionForm] = useState(false);
  const [showPlanForm, setShowPlanForm] = useState(false);
  const [showProgressMemoForm, setShowProgressMemoForm] = useState(false);
  const [hints, setHints] = useState<
    Array<{ hint_content: string; created_at: string }>
  >([]);
  const [hasPlan, setHasPlan] = useState(false);
  const [hasHints, setHasHints] = useState(false);

  // クエストの状態をチェック
  useEffect(() => {
    const checkQuestStatus = async () => {
      if (!isParticipating) return;

      // 提出物を取得してプランが存在するかチェック
      const submissions = await getUserQuestSubmissions(questId);
      if (submissions) {
        const planExists = submissions.some((sub) => sub.type === "plan");
        setHasPlan(planExists);
      }

      // ヒントが存在するかチェック
      const hintsResult = await getQuestHintsForUser(questId);
      if (hintsResult.success && hintsResult.data) {
        setHints(hintsResult.data);
        setHasHints(true);
      }
    };

    checkQuestStatus();
  }, [isParticipating, questId]);

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

  const handleShowPlanForm = () => {
    setShowPlanForm(true);
  };

  const handleShowProgressMemoForm = async () => {
    // 最新のヒントを取得
    const hintsResult = await getQuestHintsForUser(questId);
    if (hintsResult.success && hintsResult.data) {
      setHints(hintsResult.data);
      setShowProgressMemoForm(true);
    } else {
      alert(
        "ヒントがまだ登録されていません。達人からのフィードバックをお待ちください。"
      );
    }
  };

  const handleSubmitPlan = async (plan: string) => {
    try {
      const result = await submitQuestPlan(questId, plan);
      if (result.success) {
        alert("プランを提出しました！達人からのヒントをお待ちください。");
        setHasPlan(true);
        router.refresh();
      } else {
        alert(result.error || "プランの提出に失敗しました");
      }
    } catch (error) {
      console.error("プラン提出エラー:", error);
      throw error;
    }
  };

  const handleSubmitProgressMemo = async (memo: string) => {
    try {
      const result = await submitProgressMemo(questId, memo);
      if (result.success) {
        alert("意見を提出しました！");
        router.refresh();
      } else {
        alert(result.error || "意見の提出に失敗しました");
      }
    } catch (error) {
      console.error("意見提出エラー:", error);
      throw error;
    }
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
        {!hasPlan && (
          <button className={styles.actionButton} onClick={handleShowPlanForm}>
            クエストクリアのプランを立てる
          </button>
        )}
        {hasPlan && !hasHints && (
          <div className={styles.waitingMessage}>
            プランを提出しました。達人からのヒントをお待ちください。
          </div>
        )}
        {hasHints && (
          <>
            <button className={styles.actionButton} onClick={handleShowHint}>
              達人からのヒントを見る
            </button>
            <button
              className={styles.actionButton}
              onClick={handleShowProgressMemoForm}
            >
              ミッションクリアのための意見を提出
            </button>
          </>
        )}
        <button className={styles.actionButton} onClick={handleShowMission}>
          ミッションに挑む
        </button>
      </div>

      <PlanForm
        isOpen={showPlanForm}
        onClose={() => setShowPlanForm(false)}
        onSubmit={handleSubmitPlan}
      />

      <ProgressMemoForm
        isOpen={showProgressMemoForm}
        onClose={() => setShowProgressMemoForm(false)}
        onSubmit={handleSubmitProgressMemo}
        hints={hints}
      />

      <HintModal
        isOpen={showHint}
        onClose={() => setShowHint(false)}
        questId={questId}
        userId={userId}
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
