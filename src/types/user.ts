export interface User {
  id: string;
  full_name: string;
  email?: string;
  password: string;
  avatar_url?: string;
  role: "administration" | "student" | "teacher" | "expert" | "organization";
  schoolId?: string;
  grade?: number;
}

export interface UserProfile {
  id: string;
  full_name?: string | null;
  avatar_url?: string | null;
  school_id?: { name: string } | null;
  grade?: number | null;
}
