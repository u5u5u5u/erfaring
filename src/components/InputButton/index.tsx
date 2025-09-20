import styles from "./index.module.css";
import { Send } from "lucide-react";

interface InputButtonProps {
  text?: string;
}

const InputButton = ({ text }: InputButtonProps) => {
  return (
    <div className={styles.inputButton}>
      <input
        className={styles.form}
        type="text"
        placeholder="気づいたこと調べたことを記録しよう"
        size={40}
      >
        {text}
      </input>
      <button className={styles.button}>
        <Send className={styles.send} size={35}></Send>
      </button>
    </div>
  );
};
export default InputButton;
