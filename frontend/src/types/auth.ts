export type UserRole = "admin" | "member" | "guest";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  membershipNumber?: string;
  phone?: string;
  address?: string;
  joinDate: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: Omit<User, "id" | "joinDate">) => Promise<void>;
}
