import styles from "./index.module.css";

interface OrangeButtonProps {
  text: string;
  onClick?: () => void;
  formAction?: (formData: FormData) => Promise<void>;
}

const OrangeButton = ({ text, onClick, formAction }: OrangeButtonProps) => {
  return (
    <button className={styles.orange} formAction={formAction} onClick={onClick}>
      {text}
    </button>
  );
};

export default OrangeButton;
