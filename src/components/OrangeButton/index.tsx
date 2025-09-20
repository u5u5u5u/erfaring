import styles from "./index.module.css";

interface OrangeButtonProps {
  text: string;
  formAction?: () => void;
}

const OrangeButton = ({ text, formAction }: OrangeButtonProps) => {
  return (
    <button className={styles.orange} formAction={formAction}>
      {text}
    </button>
  );
};

export default OrangeButton;
