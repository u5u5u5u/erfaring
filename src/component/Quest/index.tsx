import React from "react";
import { isContext } from "vm";
import styles from "./index.module.css";
import { ChevronRight } from "lucide-react";
import { useSelectedLayoutSegments } from "next/navigation";

interface ButtonProps {
  theme?: React.ReactNode;
  people?: React.ReactNode;
  color?: string;
  link?: string;
}

const Quest = ({ color, theme, people, link }: ButtonProps) => {
  return (
    <div className={styles.quest} style={{ backgroundColor: color }}>
      <div className={styles.infomation}>
        <h1 className={styles.theme}>{theme}</h1>
        <div className={styles.people}>{people}</div>
      </div>
      <a className={styles.link} href={link}>
        詳しく見る
        <ChevronRight className={styles.arrow} size={25}></ChevronRight>
      </a>
    </div>
  );
};

export default Quest;
