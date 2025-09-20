"use client";

import OrangeButton from "@/components/OrangeButton";
import { FileOutput } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import styles from "./index.module.css";
import { submitQuestion } from "./actions";

const QuestionForm = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <form className={styles.question}>
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
          />
          {preview && (
            <Image className={styles.Image} fill alt="画像" src={preview} />
          )}
          <FileOutput className={styles.FileOutput} size={50}></FileOutput>
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <OrangeButton text="AIメンターに尋ねる" formAction={submitQuestion} />
      </div>
    </form>
  );
};

export default QuestionForm;
