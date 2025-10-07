"use client";

import styles from "./index.module.css";

interface SwitchProps {
  checked?: boolean;
  handleChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

const Switch = ({ checked, handleChange, label, disabled }: SwitchProps) => {
  return (
    <label className={styles.switchContainer}>
      {label && <span className={styles.label}>{label}</span>}
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => handleChange?.(e.target.checked)}
        disabled={disabled}
        className={styles.input}
      />
      <span className={styles.slider}></span>
    </label>
  );
};

export default Switch;
