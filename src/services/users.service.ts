import {
  getDocs,
  collection,
  Timestamp,
  getDoc,
  doc,
  updateDoc,
  deleteField,
} from "firebase/firestore";
import { db } from "../firebase";

export interface User {
  id: string;
  uid: string;
  display_name: string;
  email: string;
  created_time: Timestamp;
  role: "SuperAdmin" | "Admin" | "Clinician" | null;
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

export async function setUserRole(
  userId: string,
  role: string,
): Promise<string> {
  try {
    if (role === "Client") {
      await updateDoc(doc(db, "Users", userId), { role: deleteField() });
    } else {
      await updateDoc(doc(db, "Users", userId), { role: role });
    }
  } catch (error) {
    console.error("Error updating user role: ", error);
    return "error";
  }
  return "success";
}
