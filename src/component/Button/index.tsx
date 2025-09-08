import React from "react";
import { isContext } from "vm";
import styles from "./index.module.css";
import { ChevronRight } from 'lucide-react';

interface ButtonProps {
    children: React.ReactNode;
    color?: string;
    icon?: React.ReactNode;
    link?: string;
    
}

const Button = ({children, color, icon, link}: ButtonProps) => {
    return <a><button className={styles.button} style={{backgroundColor: color}}>
    <div className={styles.icon}>{icon}</div>
    <div className={styles.moji}>{children}</div>
    <div className={styles.arrow}><ChevronRight size={30}></ChevronRight></div>
    </button></a>
};
export default Button;