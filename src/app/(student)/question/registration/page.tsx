import Question from "@/components/Question";
import styles from "./page.module.css";
import Orangebutton from "@/components/Orangebutton";

export default function QuestionRegistrationPage() {
  return (
    <div className={styles.container}>
      <h1>新しい問いを追加</h1>
      <div className={styles.questionContainer}>
        <Question text="問い" image="画像" />
      </div>
      <div className={styles.buttonContainer}>
        <Orangebutton text="AIメンターに尋ねる" link={""} />
      </div>
    </div>
  );
}
