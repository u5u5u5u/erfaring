import styles from "./index.module.css";
import Link from "next/link";

interface OrangebuttonProps {
  text: string;
  link: string;
}

const Orangebutton = ({ text, link }: OrangebuttonProps) => {
  return (
    <div className={styles.Orange}>
      <Link href={link}>{text}</Link>
    </div>
  );
};

export default Orangebutton;
