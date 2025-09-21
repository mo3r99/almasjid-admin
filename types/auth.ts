import { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      roles: string[];
      teacher_id?: number;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    email: string;
    name: string;
    image?: string;
    roles: string[];
    teacher_id?: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    roles: string[];
    teacher_id?: number;
  }
}

export type UserRole = 'admin' | 'teacher' | 'student' | 'parent';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  roles: UserRole[];
  teacher_id?: number;
}
