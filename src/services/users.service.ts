import {
  getDocs,
  collection,
  Timestamp,
  getDoc,
  doc,
  updateDoc,
  deleteField,
  setDoc,
  where,
  query,
  documentId,
} from "firebase/firestore";
import { ROLES } from "../constant/roles";
import { db } from "../firebase";
import { ResponseType } from "../types/response-type";

export interface User {
  id: string;
  uid: string;
  display_name: string;
  email: string;
  created_time: Timestamp;
  updated_time?: Timestamp;
  phone_number?: string;
  address?: { street: string; city: string; state: string; zip: string };
  role: "SuperAdmin" | "Admin" | "Clinician" | null;
}

export async function getUsers(): Promise<User[]> {
  const collectionRef = collection(db, "Users");
  //const queries: QueryConstraint[] = [];
  // if (filters) {
  //   // Apply filters if provided
  //   Object.entries(filters).forEach(([key, value]) => {
  //     if (value === null) {
  //       queries.push(where(key, "!=", null));
  //     }
  //     if (value !== undefined && value !== null) {
  //       queries.push(where(key, "==", value));
  //     }
  //   });
  // }
  const querySnapshot = await getDocs(collectionRef);
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
  console.log("setUserRole", userId, role);
  try {
    if (role === ROLES.CLIENT) {
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

export async function createUser(user: User | null): Promise<string> {
  if (!user || !user.uid) {
    console.error("User or user.uid is null, cannot set user.");
    return "error";
  }
  try {
    await setDoc(doc(db, "Users", user.uid), {
      display_name: user.display_name,
      email: user.email,
      created_time: Timestamp.now(),
      updated_time: Timestamp.now(),
      uid: user.uid,
    });
    return "success";
  } catch (error) {
    console.error("Error setting user: ", error);
    return "error";
  }
}

export async function updateUser(user: User): Promise<ResponseType> {
  if (!user || !user.uid) {
    return {
      success: false,
      message: "User or user.uid is null, cannot update user.",
    };
  }
  try {
    const userRef = doc(db, "Users", user.uid);
    await updateDoc(userRef, {
      // can't update uid and email
      display_name: user.display_name,
      phone_number: user.phone_number,
      address: user.address,
      updated_time: Timestamp.now(),
    });
    return { success: true, message: "User updated successfully." };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An error occurred while updating user.",
    };
  }
}

export async function getUsersById(userIds: string[]): Promise<User[]> {
  if (!userIds || userIds.length === 0) {
    console.error("No user IDs provided.");
    return [];
  }
  const users: User[] = [];
  const userRef = collection(db, "Users");
  const q = query(userRef, where(documentId(), "in", userIds));
  const userSnapshot = await getDocs(q);
  for (const docSnap of userSnapshot.docs) {
    const user = docSnap.data() as User;
    user.id = docSnap.id;
    users.push(user);
  }
  return users;
}
