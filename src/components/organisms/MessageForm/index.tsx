"use client";

import { createClient } from "@/utils/supabase/client";
import { Loader2, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./index.module.css";

interface MessageFormProps {
  chat_id?: string;
  history?: { role: string; parts: { text: string }[] }[];
}

const MessageForm = ({ chat_id, history }: MessageFormProps) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim() || !chat_id || loading) {
      return;
    }

    setLoading(true);

    try {
      const userMessageData = {
        chat_id: chat_id,
        role: "user",
        content: message,
      };

      const { error: userMessageError } = await supabase
        .from("messages")
        .insert([userMessageData]);

      if (userMessageError) {
        console.error("Error inserting user message:", userMessageError);
        throw userMessageError;
      }

      const baseUrl =
        process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
      const response = await fetch(`${baseUrl}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userInput: message,
          chatHistory: history || [],
        }),
      });

      if (!response.ok) {
        console.error("Error calling /api/chat:", response.statusText);
        throw new Error("API call failed");
      }

      const result = await response.json();

      // AIの応答をデータベースに保存
      if (result.response) {
        const aiMessage = {
          chat_id: chat_id,
          role: "model",
          content: result.response,
        };

        const { error: aiError } = await supabase
          .from("messages")
          .insert([aiMessage]);

        if (aiError) {
          console.error("Error inserting AI response:", aiError);
        }
      }

      // フォームをリセット
      setMessage("");

      // ページをリフレッシュ
      router.refresh();
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      alert("メッセージの送信に失敗しました。もう一度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.messageForm} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.form}
        placeholder="気づいたこと調べたことを記録しよう"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={loading}
        size={40}
      />
      <button
        type="submit"
        className={styles.button}
        disabled={loading || !message.trim()}
      >
        {loading ? (
          <Loader2 className={styles.spinner} size={35} />
        ) : (
          <Send className={styles.send} size={35} />
        )}
      </button>
    </form>
  );
};
export default MessageForm;
