import { getProfile } from "@/actions/profile";
import Avatar from "@/components/Avatar";
import { convertGrade } from "@/utils/convertGrade";
import { User as UserIcon } from "lucide-react";
import styles from "./index.module.css";

const ProfileIcon = async () => {
  const profile = await getProfile();

  return (
    <div className={styles.profileIcon}>
      {profile?.avatar_url ? (
        <Avatar uid={profile.id} url={profile.avatar_url} size={80} />
      ) : (
        <UserIcon className={styles.defaultIcon} size={80} />
      )}
      <div className={styles.information}>
        <h1>{profile?.full_name}</h1>
        <p>
          {profile?.user_schools[0]?.school_id.name}
          <span>{convertGrade(profile?.user_schools[0].grade)}年生</span>
        </p>
      </div>
    </div>
  );
};

export default ProfileIcon;
