import type quest from "@/types/quest";
import Quest from "@/component/Quest";
import { userAgent } from "next/server";

export default function QuestionPage() {
  const DummyQuests: quest[] = [
    { id: "airi1", name: "airi1gou", title: "title1" },
    { id: "airi2", name: "airi2gou", title: "title2" },
    { id: "airi3", name: "airi3gou", title: "title3" },
  ];

  return (
    <>
      <div>クエスト一覧</div>
      {DummyQuests.map((quest) => (
        <Quest
          color="white"
          theme={quest.title}
          people={quest.name}
          link="/"
          key={quest.id}
        ></Quest>
      ))}
    </>
  );
}
