import PageTitle from "@/components/atoms/PageTitle";
import QuestionForm from "@/components/organisms/QuestionForm";
import styles from "./page.module.css";

export default function QuestionRegistrationPage() {
  return (
    <div className={styles.container}>
      <PageTitle title="新しい問いを追加" />
      <QuestionForm />
    </div>
  );
}
