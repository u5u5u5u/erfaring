import styles from "./page.module.css";
import Chatitem from "@/components/chatitem";
import Inputbutton from "@/components/Inputbutton";

interface ChatPageProps {
  params: Promise<{ questionId: string }>;
}

export default async function ChatPage({ params }: ChatPageProps) {
  const { questionId } = await params;
  console.log("questionId:", questionId);

  const dummyQuestions = [
    {
      id: "1",
      name: "airi",
      text: "カブトムシ拾った",
      time: "2025/9/10/12:17",
    },
    {
      id: "2",
      name: "AIメンター",
      text: "カブトムシのオスとメスの見分け方を調べてみよう！",
      time: "2025/9/10/12:17",
    },
    {
      id: "3",
      name: "airi",
      text: "オスは大きな角があって、メスは小さいんだね！",
      time: "2025/9/10/12:17",
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>カブトムシのひみつ</h1>
      {dummyQuestions.map((question) => (
        <div key={question.id} className={styles.questionItem}>
          <Chatitem
            icon="/globe.svg"
            name={question.name}
            text={question.text}
            time={question.time}
          />
        </div>
      ))}
      <div className={styles.inputContainer}>
        <Inputbutton />
      </div>
    </div>
  );
}
