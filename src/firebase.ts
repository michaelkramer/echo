// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWC7vXBk79inf39-x6AF-FBEu5WU_YdYU",
  authDomain: "reassist-4n2m1t.firebaseapp.com",
  projectId: "reassist-4n2m1t",
  storageBucket: "reassist-4n2m1t.firebasestorage.app",
  messagingSenderId: "1029447828231",
  appId: "1:1029447828231:web:30e66de5393fad89ecfba2",
  measurementId: "G-FH8GW82NNR",
};
// Initialize Firebase

const app = initializeApp(firebaseConfig);
// Export firestore database
// It will be imported into your react app whenever it is needed
export const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
export const fbAuth = getAuth(app);

// Initialize Analytics and get a reference to the service
export const fbAnalytics = getAnalytics(app);
