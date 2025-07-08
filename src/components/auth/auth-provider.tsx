import { onAuthStateChanged, User as FbUser } from "firebase/auth";
import { useState, useEffect, useMemo } from "react";
import { ROLES } from "../../constant/roles";
import { fbAuth } from "../../firebase";
import { getUser, User } from "../../services/users.service";
import { AuthUser } from "../../types/auth-user";
import { AuthContext } from "./auth-context";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const isSuperAdmin = useMemo(() => {
    if (user && user.role) {
      return user.role === ROLES.SUPER_ADMIN;
    }
    return false;
  }, [user]);

  const isAdmin = useMemo(() => {
    if (user && user.role) {
      return user.role === ROLES.ADMIN;
    }
    return false;
  }, [user]);

  const isClinician = useMemo(() => {
    if (user && user.role) {
      return user.role === ROLES.CLINICIAN;
    }
    return false;
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      fbAuth,
      async (user: FbUser | null) => {
        if (user) {
          const userData = await getUser(user.uid);
          setAuthUser({
            email: user.email,
            uid: user.uid,
            display_name: userData.display_name,
            role: userData.role,
          });
        } else {
          setAuthUser(null);
        }
      },
    );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      if (authUser && authUser.uid) {
        const userData = await getUser(authUser.uid);
        setUser(userData);
      }
    };
    fetchUser();
  }, [authUser]);

  return (
    <AuthContext.Provider
      value={{ authUser, setAuthUser, isSuperAdmin, isAdmin, isClinician }}
    >
      {children}
    </AuthContext.Provider>
  );
}
