import Avatar from "@/components/Avatar";
import type { UserProfile } from "@/types/user";
import { User as UserIcon } from "lucide-react";
import styles from "./index.module.css";
import { convertGrade } from "@/utils/convertGrade";

interface ProfileIconProps {
  user: UserProfile | null;
}

const ProfileIcon = ({ user }: ProfileIconProps) => {
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
          {user?.school_id?.name && user?.school_id?.name}
          <span>{convertGrade(user?.grade && user?.grade)}年生</span>
        </p>
      </div>
    </div>
  );
};

export default ProfileIcon;
