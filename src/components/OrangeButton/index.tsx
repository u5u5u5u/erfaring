import styles from "./index.module.css";

interface OrangeButtonProps {
  text: string;
  formAction?: (formData: FormData) => Promise<void>;
}

const OrangeButton = ({ text, formAction }: OrangeButtonProps) => {
  return (
    <button className={styles.orange} formAction={formAction}>
      {text}
    </button>
  );
};

export default OrangeButton;
