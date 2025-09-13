import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>ようこそエファインへ！</h1>
      <Link href={"/home"}>アプリを使用する→</Link>
    </div>
  );
}
