import ProfileIcon from "@/components/ProfileIcon";
import type { User } from "@/types/user";

export default function ProfilePage() {
  const dummyUser: User = {
    id: "1",
    name: "ゆうご",
    email: "yugo@example.com",
    password: "password123",
    imageUrl: "/vercel.svg",
    role: "student",
    schoolId: "〇〇市立〇〇小学校",
    grade: 5,
  };

  return (
    <div>
      <ProfileIcon user={dummyUser} />
    </div>
  );
}
