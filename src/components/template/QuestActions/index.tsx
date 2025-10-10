"use client";

import {
  acceptQuest,
  submitQuestPlan,
  getQuestHintsForUser,
  submitFinalAnswer,
  getUserQuestSubmissions,
} from "@/actions/quest";
import OrangeButton from "@/components/atoms/OrangeButton";
import HintModal from "@/components/organisms/HintModal";
import MissionForm from "@/components/organisms/MissionForm";
import PlanForm from "@/components/organisms/PlanForm";
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
  const [hasPlan, setHasPlan] = useState(false);
  const [hasHints, setHasHints] = useState(false);
  const [hasFinalAnswer, setHasFinalAnswer] = useState(false);

  // クエストの状態をチェック
  useEffect(() => {
    const checkQuestStatus = async () => {
      if (!isParticipating) return;

      // 提出物を取得してプランが存在するかチェック
      const submissions = await getUserQuestSubmissions(questId);
      if (submissions) {
        const planExists = submissions.some((sub) => sub.type === "plan");
        const finalAnswerExists = submissions.some(
          (sub) => sub.type === "final_answer"
        );
        setHasPlan(planExists);
        setHasFinalAnswer(finalAnswerExists);
      }

      // ヒントが存在するかチェック
      const hintsResult = await getQuestHintsForUser(questId);
      if (hintsResult.success && hintsResult.data) {
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

  const handleSubmitMission = async (answer: string) => {
    try {
      const result = await submitFinalAnswer(questId, answer);
      if (result.success) {
        alert(
          "ミッションクリアのための解決策を提出しました！企業からのフィードバックをお待ちください。"
        );
        setHasFinalAnswer(true);
        router.refresh();
      } else {
        alert(result.error || "解決策の提出に失敗しました");
      }
    } catch (error) {
      console.error("解決策提出エラー:", error);
      throw error;
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

        {/* ステップ1: プランを提出 */}
        {!hasPlan && (
          <button className={styles.actionButton} onClick={handleShowPlanForm}>
            プランを提出する
          </button>
        )}

        {/* ステップ2: プラン提出後、ヒント待ち */}
        {hasPlan && !hasHints && (
          <div className={styles.waitingMessage}>
            プランを提出しました。達人からのヒントをお待ちください。
          </div>
        )}

        {/* ステップ3: ヒントが来たら表示可能 */}
        {hasPlan && hasHints && (
          <>
            <button className={styles.actionButton} onClick={handleShowHint}>
              達人からのヒントを見る
            </button>

            {/* ステップ4: 解決策を提出 */}
            {!hasFinalAnswer && (
              <button
                className={styles.actionButton}
                onClick={handleShowMission}
              >
                ミッションクリアのための解決策を提出
              </button>
            )}

            {/* ステップ5: フィードバック待ち */}
            {hasFinalAnswer && (
              <div className={styles.waitingMessage}>
                解決策を提出しました。企業からのフィードバックをお待ちください。
              </div>
            )}
          </>
        )}
      </div>

      <PlanForm
        isOpen={showPlanForm}
        onClose={() => setShowPlanForm(false)}
        onSubmit={handleSubmitPlan}
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
