import styles from "./index.module.css";

interface OrangebuttonProps {
  text: string;
  link: string;
}

const Orangebutton = ({ text, link }: OrangebuttonProps) => {
  return (
    <div className={styles.Orange}>
      <a href={link}>{text}</a>
    </div>
  );
};

export default Orangebutton;
