import { ChevronRight } from "lucide-react";
import React from "react";
import styles from "./index.module.css";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  color?: string;
  icon?: React.ReactNode;
  link: string;
  className?: string;
}

const Button = ({ children, color, icon, link, className }: ButtonProps) => {
  return (
    <Link
      href={link}
      className={`${styles.button} ${className}`}
      style={{ "--button-color": color } as React.CSSProperties}
    >
      {icon && <div className={styles.icon}>{icon}</div>}
      <span className={styles.text}>{children}</span>
      <ChevronRight className={styles.arrow} size={24} />
    </Link>
  );
};
export default Button;
