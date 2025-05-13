import { sendPasswordResetEmail } from "firebase/auth";
import { fbAuth } from "../firebase";

export const resetPassword = (email: string): Promise<void> => {
  sendPasswordResetEmail(fbAuth, email)
    .then(() => {
      // Password reset email sent!
      // ..
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
};
