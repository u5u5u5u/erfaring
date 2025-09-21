import Button from "@/components/Button";
import ChatIcon from "@/components/ChatIcon";
import ChatSpeechBubble from "@/components/ChatSpeechBubble";
import Hashtag from "@/components/Hashtag";
import OrangeButton from "@/components/OrangeButton";
import Quest from "@/components/Quest";
import Questditail from "@/components/Questditail";
import QuestionForm from "@/components/QuestionForm";
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

        <ChatSpeechBubble
          text="カブトムシを拾ってきたよ"
          time="2025年9月10日11:51"
        ></ChatSpeechBubble>

        <OrangeButton text="このクエストに挑戦する"></OrangeButton>
        <Questditail
          title="このクエストのミッション"
          text="地域の魅力を伝えるにはどんな写真を撮ったらいいか考えよう！"
        ></Questditail>

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
