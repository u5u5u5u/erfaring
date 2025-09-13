export interface User {
  id: string;
  name: string;
  email?: string;
  password: string;
  imageUrl?: string;
  role: "admin" | "student" | "teacher" | "guest";
  schoolId?: string;
  grade?: number;
}
