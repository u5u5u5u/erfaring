import Image from "next/image";
import styles from "./index.module.css";
import { User } from "lucide-react";
import type { User as UserType } from "@/types/user";

interface ProfileIconProps {
  user: UserType;
}

const ProfileIcon = ({ user }: ProfileIconProps) => {
  return (
    <div className={styles.profileIcon}>
      {user.imageUrl ? (
        <Image
          className={styles.image}
          height={80}
          width={80}
          alt="Profile Icon"
          src={user.imageUrl}
        />
      ) : (
        <User className={styles.defaultIcon} size={80} />
      )}
      <div className={styles.information}>
        <h1>{user.name}</h1>
        <p>
          {user.schoolId}{user.grade}年生
        </p>
      </div>
    </div>
  );
};

export default ProfileIcon;
