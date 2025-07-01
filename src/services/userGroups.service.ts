import {
  getDocs,
  collection,
  query,
  where,
  writeBatch,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";

export async function getUserGroup(userId: string): Promise<string[]> {
  console.log("getUserGroup", userId);
  try {
    const userGroupsRef = collection(db, "UserGroups");
    const q = query(userGroupsRef, where("uid", "==", userId)); // Query for user groups by user ID
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      console.log(`No user groups found for user ${userId}.`);
      return [];
    }
    const clientUserIds: string[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.client_uid) {
        clientUserIds.push(data.client_uid);
      }
    });
    console.log(`User group for user ${userId}:`, clientUserIds);
    return clientUserIds;
  } catch (error) {
    console.error("Error getting user group:", error);
    return Promise.reject("error");
  }
}

export async function setUserGroup(
  userId: string,
  client_userIds: string[],
): Promise<string> {
  console.log("setUserGroup", userId, client_userIds);
  try {
    const deleteResponse = await deleteUserGroup(userId);
    if (deleteResponse !== "success") {
      console.error("Error deleting existing user group:", deleteResponse);
      //return Promise.reject("error");
    }

    const batch = writeBatch(db);
    //const userGroupCollectionRef = collection(db, "UserGroups");
    client_userIds.forEach((client_userId) => {
      const userGroupData = {
        uid: userId,
        client_uid: client_userId,
      };
      batch.set(doc(collection(db, "UserGroups")), userGroupData);
    });
    await batch.commit();
    return "success";
  } catch (error) {
    console.error("Error setting user group:", error);
    return Promise.reject("error");
  }
}

export async function deleteUserGroup(userId: string): Promise<string> {
  try {
    const userGroupsRef = collection(db, "UserGroups");
    const q = query(userGroupsRef, where("uid", "==", userId));

    const batch = writeBatch(db);

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });
    } else {
      console.log(
        `No user groups found for user ${userId}. Nothing to delete.`,
      );
      return "success"; // No groups to delete, return success
    }
    await batch.commit();
    console.log(`User group for user ${userId} deleted successfully.`);
    return "success";
  } catch (error) {
    console.error("Error deleting user group:", error);
    return "error";
  }
}
