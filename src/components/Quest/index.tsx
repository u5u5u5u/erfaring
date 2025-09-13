import { ChevronRight } from "lucide-react";
import React from "react";
import styles from "./index.module.css";
import Link from "next/link";

interface QuestProps {
  theme?: React.ReactNode;
  people?: React.ReactNode;
  color?: string;
  link: string;
}

const Quest = ({ color, theme, people, link }: QuestProps) => {
  return (
    <div className={styles.quest} style={{ backgroundColor: color }}>
      <div className={styles.infomation}>
        <h1 className={styles.theme}>{theme}</h1>
        <div className={styles.people}>{people}</div>
      </div>
      <Link className={styles.link} href={link}>
        詳しく見る
        <ChevronRight className={styles.arrow} size={25}></ChevronRight>
      </Link>
    </div>
  );
};

export default Quest;
