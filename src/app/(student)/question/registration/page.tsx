import QuestionForm from "@/components/QuestionForm";
import styles from "./page.module.css";
import PageTitle from "@/components/PageTitle";

export default function QuestionRegistrationPage() {
  return (
    <div className={styles.container}>
      <PageTitle title="新しい問いを追加" />
      <QuestionForm />
    </div>
  );
}
