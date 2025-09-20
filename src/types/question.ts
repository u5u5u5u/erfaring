export interface Question {
  id: string;
  title: string;
  createdAt?: Date;
}

export interface Message {
  id: string;
  chat_id: {
    user_id: {
      avatar_url: string | null;
      username: string | null;
    } | null;
  } | null;
  role: "user" | "model";
  content: string;
  created_at?: Date;
}
