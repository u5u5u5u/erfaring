"use client";

import OrangeButton from "@/components/OrangeButton";
import { FileOutput } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import styles from "./index.module.css";

const QuestionForm = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || loading) {
      return;
    }

    setLoading(true);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("User not authenticated:", userError);
        throw new Error("User not authenticated");
      }

      let imageUrl = null;

      if (file && file.size > 0) {
        const fileExt = file.name.split(".").pop();
        const filePath = `conversation-${Math.random()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("conversation_images")
          .upload(filePath, file);

        if (uploadError) {
          console.error(uploadError);
          throw uploadError;
        }

        const {
          data: { publicUrl },
        } = supabase.storage.from("conversation_images").getPublicUrl(filePath);

        imageUrl = publicUrl;
      }

      const data = {
        title: title,
        image_url: imageUrl,
        user_id: user.id,
      };

      const { data: chatData, error } = await supabase
        .from("chats")
        .insert([data])
        .select("id");

      if (error) {
        console.error(error);
        throw error;
      }

      if (chatData) {
        const chatId = chatData[0].id;

        // ユーザーのメッセージを保存
        const { error: messageError } = await supabase.from("messages").insert({
          chat_id: chatId,
          content: title,
          role: "user",
        });

        if (messageError) {
          console.error("Message insert error:", messageError);
          throw messageError;
        }

        // AIのレスポンスを取得
        const baseUrl =
          process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
        const response = await fetch(`${baseUrl}/api/chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userInput: title,
            chatHistory: [],
          }),
        });

        if (response.ok) {
          const aiResponse = await response.json();

          // AIのメッセージを保存
          const { error: aiMessageError } = await supabase
            .from("messages")
            .insert({
              chat_id: chatId,
              content: aiResponse.response,
              role: "model",
            });

          if (aiMessageError) {
            console.error("AI message insert error:", aiMessageError);
          }
        } else {
          console.error("Failed to get AI response:", response.status);
        }

        router.push(`/question/${chatId}`);
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      alert("質問の送信に失敗しました。もう一度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.question} onSubmit={handleSubmit}>
      <div className={styles.text}>
        <label htmlFor="title" className={styles.inputLabel}>
          問い
        </label>
        <input
          id="title"
          name="title"
          type="text"
          size={40}
          className={styles.input}
          placeholder="問いを入力してください"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
        />
      </div>
      <div className={styles.image}>
        <label htmlFor="image_url" className={styles.imageLabel}>
          画像
        </label>
        <div className={styles.filemix}>
          <input
            id="image_url"
            name="image_url"
            type="file"
            className={styles.file}
            onChange={handleFileChange}
            disabled={loading}
          />
          {preview && (
            <Image className={styles.Image} fill alt="画像" src={preview} />
          )}
          <FileOutput className={styles.FileOutput} size={50}></FileOutput>
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <OrangeButton
          text="AIメンターに尋ねる"
          type="submit"
          disabled={loading || !title.trim()}
          loading={loading}
        />
      </div>
    </form>
  );
};

export default QuestionForm;
