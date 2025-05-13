import { fbAuth } from "../firebase";

export const isAuth = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const unsubscribe = fbAuth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(!!user);
    });
  });
};
