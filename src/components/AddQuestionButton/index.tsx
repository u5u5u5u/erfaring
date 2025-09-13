"use client";

import { Plus } from "lucide-react";
import styles from "./index.module.css";
import Link from "next/link";

const AddQuestionButton = () => {
  return (
    <Link className={styles.addButton} href="/question/registration">
      <div className={styles.iconContainer}>
        <Plus size={24} className={styles.plusIcon} />
      </div>
      <span className={styles.buttonText}>新しい問いを追加</span>
    </Link>
  );
};

export default AddQuestionButton;
