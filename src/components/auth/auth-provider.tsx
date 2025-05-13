import { onAuthStateChanged, User } from "firebase/auth";
import { useState, useEffect } from "react";
import { fbAuth } from "../../firebase";
import { AuthUser } from "../../types/auth-user";
import { AuthContext } from "./auth-context";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(fbAuth, (user: User | null) => {
      setUser(
        user
          ? {
              displayName: user.displayName,
              email: user.email,
              uid: user.uid,
            }
          : null,
      );
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
