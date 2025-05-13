import {
  getDocs,
  collection,
  Timestamp,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase";

export interface User {
  id: string;
  uid: string;
  display_name: string;
  email: string;
  created_time: Timestamp;
}

export async function getUsers(): Promise<User[]> {
  const querySnapshot = await getDocs(collection(db, "Users"));
  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data as User[];
}

export async function getUser(userId: string): Promise<User> {
  const querySnapshot = await getDoc(doc(db, "Users", userId));
  if (querySnapshot.exists()) {
    return querySnapshot.data() as User;
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
  return {} as User;
}
