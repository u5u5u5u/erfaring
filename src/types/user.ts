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
  website?: string | null;
  role: "administration" | "student" | "teacher" | "expert" | "organization";
  user_schools: {
    school_id: {
      name: string;
    };
    grade: number;
  }[];
}
