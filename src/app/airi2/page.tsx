import Image from "next/image";
import styles from "./page.module.css";
import Button from "@/components/Button";
import { Swords } from "lucide-react";
import Quest from "@/components/Quest";
import ChatIcon from "@/components/ChatIcon";
import ChatSpeechBubble from "@/components/ChatSpeechBubble";
import Chatitem from "@/components/ChatItem";
import Orangebutton from "@/components/Orangebutton";
import Questditail from "@/components/Questditail";
import Question from "@/components/Question";
import Hashtag from "@/components/Hashtag";
import Inputbutton from "@/components/Inputbutton";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Button color="#d399abff" icon={<Swords></Swords>} link="/">
          クエストに挑戦
        </Button>
        <Quest
          color="white"
          theme="未来の給食メニューを考えよう"
          people="栄養士　○○さん"
          link="/"
        ></Quest>
        <ChatIcon icon="/globe.svg" name="airi"></ChatIcon>

        <ChatSpeechBubble
          text="カブトムシを拾ってきたよ"
          time="2025年9月10日11:51"
        ></ChatSpeechBubble>

        <Chatitem
          icon="globe.svg"
          name="airi"
          text="カブトムシ拾った"
          time="2025/9/10/12:17"
        ></Chatitem>
        <Orangebutton link="/" text="このクエストに挑戦する"></Orangebutton>
        <Questditail
          title="このクエストのミッション"
          text="地域の魅力を伝えるにはどんな写真を撮ったらいいか考えよう！"
        ></Questditail>

        <Question text="問い" image="画像"></Question>

        <Hashtag text="まちづくり"></Hashtag>

        <Inputbutton></Inputbutton>

        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <ol>
          <li>
            Get started by editing <code>src/app/page.tsx</code>.
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
