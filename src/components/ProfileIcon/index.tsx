import Avatar from "@/components/Avatar";
import { User as UserIcon } from "lucide-react";
import styles from "./index.module.css";
import type { UserProfile } from "@/types/user";

interface ProfileIconProps {
  user: UserProfile | null;
}

const ProfileIcon = ({ user }: ProfileIconProps) => {
  console.log("ProfileIcon", { user });
  return (
    <div className={styles.profileIcon}>
      {user?.avatar_url ? (
        <Avatar uid={user.id} url={user.avatar_url} size={80} />
      ) : (
        <UserIcon className={styles.defaultIcon} size={80} />
      )}
      <div className={styles.information}>
        <h1>{user?.full_name}</h1>
        <p>
          {user?.school_id && user?.school_id} {user?.grade && user?.grade}年生
        </p>
      </div>
    </div>
  );
};

export default ProfileIcon;
