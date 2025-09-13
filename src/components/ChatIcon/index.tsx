import Image from "next/image";
import styles from "./index.module.css";

interface ChatIconProps {
  icon: string;
  name: string;
}

const ChatIcon = ({ icon, name }: ChatIconProps) => {
  return (
    <div className={styles.ChatIcon}>
      <Image
        className={styles.image}
        height={50}
        width={50}
        alt="ChatIcon"
        src={icon}
      ></Image>
      <p className={styles.name}>{name}</p>
    </div>
  );
};

export default ChatIcon;
