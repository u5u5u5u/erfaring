import Status from "@/components/atoms/Status";
import { formatDateTime } from "@/utils/formatDateTime";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import styles from "./index.module.css";

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
    <Link href={link} className={styles.questLink}>
      <div className={styles.quest} style={{ borderLeftColor: color }}>
        <div className={styles.information}>
          <div className={styles.infoHead}>
            <h1 className={styles.theme}>{theme}</h1>
            {type === "quest" && <Status status={status} />}
          </div>
          <div className={styles.people}>
            {type === "question" ? formatDateTime(people) : people}
          </div>
        </div>
        <div className={styles.details}>
          <ChevronRight className={styles.arrow} size={25}></ChevronRight>
        </div>
      </div>
    </Link>
  );
};

export default Quest;
