import React from "react";
import { isContext } from "vm";
import styles from "./index.module.css";
import { ChevronRight } from 'lucide-react';

interface ButtonProps {
    children: React.ReactNode;
    color?: string;
    icon?: React.ReactNode;
    
    
}

const Button = ({children, color, icon, arrow}: ButtonProps) => {
    return <button className={styles.button} style={{backgroundColor: color}}>
    <div className={styles.icon}>{icon}</div>
    <div className={styles.moji}>{children}</div>
    <div className={styles.arrow}><ChevronRight size={30}></ChevronRight></div>
    </button>
};

export default Button;