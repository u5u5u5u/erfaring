"use client";

import { toggleChatSolved } from "@/actions/chat";
import Switch from "@/components/atoms/Switch";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SolvedSwitchProps {
  questionId: string;
  initialChecked?: boolean;
}

export const SolvedSwitch = ({
  questionId,
  initialChecked = false,
}: SolvedSwitchProps) => {
  const [isChecked, setIsChecked] = useState(initialChecked);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleToggleSolved = async (checked: boolean) => {
    setIsLoading(true);
    setIsChecked(checked);

    try {
      await toggleChatSolved(questionId);
      router.refresh();
    } catch (error) {
      console.error("Error toggling solved status:", error);
      setIsChecked(!checked);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Switch
      checked={isChecked}
      label="解決済み"
      handleChange={handleToggleSolved}
      disabled={isLoading}
    />
  );
};
