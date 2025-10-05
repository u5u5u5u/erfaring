import Button from "@/components/atoms/Button";
import Hashtag from "@/components/atoms/Hashtag";
import MessageBubble from "@/components/atoms/MessageBubble";
import OrangeButton from "@/components/atoms/OrangeButton";
import ChatIcon from "@/components/molecules/ChatIcon";
import Quest from "@/components/molecules/Quest";
import QuestDetail from "@/components/molecules/QuestDetail";
import QuestionForm from "@/components/organisms/QuestionForm";
import { Swords } from "lucide-react";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Button color="#d399abff" icon={<Swords></Swords>} link="/">
          クエストに挑戦
        </Button>
        <Quest
          type="quest"
          color="white"
          theme="未来の給食メニューを考えよう"
          people="栄養士　○○さん"
          link="/"
        ></Quest>
        <ChatIcon icon="" name="airi"></ChatIcon>

        <MessageBubble
          text="カブトムシを拾ってきたよ"
          time="2025年9月10日11:51"
        ></MessageBubble>

        <OrangeButton text="このクエストに挑戦する"></OrangeButton>
        <QuestDetail
          title="このクエストのミッション"
          text="地域の魅力を伝えるにはどんな写真を撮ったらいいか考えよう！"
        ></QuestDetail>

        <QuestionForm></QuestionForm>

        <Hashtag text="まちづくり"></Hashtag>

        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
      </main>
    </div>
  );
}
