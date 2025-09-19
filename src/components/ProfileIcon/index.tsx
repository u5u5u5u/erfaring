import Avatar from "@/components/Avatar";
import type { User as UserType } from "@/types/user";
import { User } from "lucide-react";
import styles from "./index.module.css";

interface ProfileIconProps {
  user: UserType;
}

const ProfileIcon = ({ user }: ProfileIconProps) => {
  return (
    <div className={styles.profileIcon}>
      {user.imageUrl ? (
        <Avatar
          uid={user.id}
          url={user.imageUrl}
          size={80}
        />
      ) : (
        <User className={styles.defaultIcon} size={80} />
      )}
      <div className={styles.information}>
        <h1>{user.name}</h1>
        <p>
          {user.schoolId}
          {user.grade}年生
        </p>
      </div>
    </div>
  );
};

export default ProfileIcon;
