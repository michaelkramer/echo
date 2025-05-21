import { createContext } from "react";
import { AuthUser } from "../../types/auth-user";

interface AuthContextType {
  authUser: AuthUser | null;
  setAuthUser: (user: AuthUser | null) => void;
  isSuperAdmin: boolean;
  isAdmin: boolean;
  isClinician: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);
