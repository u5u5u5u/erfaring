"use client";
import styles from "./index.module.css";
import { FileOutput } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
interface QuestionProps {
  text: string;
  image: string;
}

const Question = ({ text, image }: QuestionProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className={styles.Question}>
      <div className={styles.text}>
        <p>{text}</p>
        <input type="text" size={40}></input>
      </div>
      <div className={styles.image}>
        <p>{image}</p>
        <div className={styles.filemix}>
          <input
            className={styles.file}
            type="file"
            onChange={handleFileChange}
          ></input>
          {preview && (
            <Image
              className={styles.Image}
              fill
              alt="画像"
              src={preview}
            ></Image>
          )}
          <FileOutput className={styles.FileOutput}></FileOutput>
        </div>
      </div>
    </div>
  );
};

export default Question;
