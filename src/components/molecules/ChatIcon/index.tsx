import Avatar from "@/components/atoms/Avatar";
import styles from "./index.module.css";

interface ChatIconProps {
  icon: string;
  name: string;
}

const ChatIcon = ({ icon, name }: ChatIconProps) => {
  return (
    <div className={styles.chatIcon}>
      <Avatar url={icon} size={40} />
      <p className={styles.name}>{name}</p>
    </div>
  );
};

export default ChatIcon;
