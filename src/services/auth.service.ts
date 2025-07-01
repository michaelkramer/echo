import { createUserWithEmailAndPassword } from "firebase/auth";
import { fbAuth, secFbAuth } from "../firebase";
import { createUser } from "./users.service";

export const isAuth = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const unsubscribe = fbAuth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(!!user);
    });
  });
};

export const createAuthUser = async (user: {
  email: string;
  password: string;
  displayName: string;
}): Promise<string> => {
  const { email, password, displayName } = user;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      secFbAuth,
      email,
      password,
    );
    const userCred = userCredential.user;
    secFbAuth.signOut();

    const newUser = {
      display_name: displayName,
      email: userCred.email,
      uid: userCred.uid,
      role: null,
    };
    return await createUser(newUser);
  } catch (error: any) {
    console.error("Error signing up:", error.code, error.message);
    return "error";
  }
};
