// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { ENV } from "./utilities/env";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = ENV.FIREBASE_CONFIG;
// Initialize Firebase

const app = initializeApp(firebaseConfig);
const secApp = initializeApp(firebaseConfig, "Secondary");
// Export firestore database
// It will be imported into your react app whenever it is needed
export const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
export const fbAuth = getAuth(app);
export const secFbAuth = getAuth(secApp);
// Initialize Analytics and get a reference to the service
export const fbAnalytics = getAnalytics(app);
