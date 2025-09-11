import type { User } from "@/types/user";
import Button from "@/component/Button";
import { BookOpen, Swords } from "lucide-react";
import Quest from "@/component/Quest";
import type { quest } from "@/types/quest";
import type { Question } from "@/types/question";

export default function HomePage() {
  const dummyUser: User = {
    id: "1",
    name: "ゆうご",
    email: "jinnai@example.com",
    password: "password",
    imageUrl: "https://example.com/avatar.jpg",
    role: "student",
    schoolId: "〇〇市立〇〇小学校",
    grade: 5,
  };

  const dummyQuests: quest[] = [
    {
      id: "1",
      name: "市役所の人",
      title: "〇〇市の魅力を発信しよう",
    },
    {
      id: "2",
      name: "図書館の人",
      title: "未来の図書館を考えよう",
    },
    {
      id: "3",
      name: "消防署の人",
      title: "防災マップを作ろう",
    },
  ];

  const dummyQuestions: Question[] = [
    {
      id: "1",
      title: "なぜ空は青いの？",
    },
    {
      id: "2",
      title: "なぜ海は塩辛いの？",
    },
    {
      id: "3",
      title: "なぜ葉っぱは緑色なの？",
    },
  ];

  return (
    <div>
      <div>
        <h1>{dummyUser.name}の学びのあしあと</h1>
        <p>
          {dummyUser.schoolId}
          {dummyUser.grade}年生
        </p>
      </div>
      <div>
        <div>
          <Button color="#2463EB" icon={<Swords />} link="/quest">
            クエストに挑戦
          </Button>
          <Button color="#21C55D" icon={<BookOpen />} link="/question">
            問いを探究
          </Button>
        </div>
        <div>
          <h2>参加中のクエスト</h2>
          <ul>
            {dummyQuests.map((quest) => (
              <li key={quest.id}>
                <Quest theme={quest.title} people={quest.name} />
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>最近の問い</h2>
          <ul>
            {dummyQuestions.map((question) => (
              <li key={question.id}>
                <Quest theme={question.title} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
