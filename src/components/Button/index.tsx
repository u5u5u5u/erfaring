import { ChevronRight } from "lucide-react";
import React from "react";
import styles from "./index.module.css";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  color?: string;
  icon?: React.ReactNode;
  link: string;
}

const Button = ({ children, color, icon, link }: ButtonProps) => {
  return (
    <Link className={styles.button} style={{ backgroundColor: color }} href={link}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.moji}>{children}</div>
      <div className={styles.arrow}>
        <ChevronRight size={30}></ChevronRight>
      </div>
    </Link>
  );
};
export default Button;
