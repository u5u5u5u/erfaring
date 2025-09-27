import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import styles from "./index.module.css";
import { formatDateTime } from "@/utils/formatDateTime";
import Status from "@/components/Status";

interface QuestProps {
  theme: React.ReactNode;
  people: string;
  color?: string;
  link: string;
  type: "question" | "quest";
  status?: "draft" | "open" | "closed" | "archived";
}

const Quest = ({ color, theme, people, link, type, status }: QuestProps) => {
  return (
    <div className={styles.quest} style={{ backgroundColor: color }}>
      <div className={styles.information}>
        <div className={styles.infoHead}>
          <h1 className={styles.theme}>{theme}</h1>
          {type === "quest" && <Status status={status} />}
        </div>
        <div className={styles.people}>
          {type === "question" ? formatDateTime(people) : people}
        </div>
      </div>
      <Link className={styles.link} href={link}>
        詳しく見る
        <ChevronRight className={styles.arrow} size={25}></ChevronRight>
      </Link>
    </div>
  );
};

export default Quest;
