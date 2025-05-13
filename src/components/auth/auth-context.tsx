import { createContext } from "react";
import { AuthUser } from "../../types/auth-user";

interface AuthContextType {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
