import { getDocs, collection, getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export interface Activity {
  id: string;
  EXERCISE: string;
  Howdoesitwork: string;
  HowtoUseit: string;
  Whatsitfor: string;
  WhentoUseit: string;
  category: string;
  description: string;
  title: string;
  weight: number;
}

export async function getActivities(): Promise<Activity[]> {
  const querySnapshot = await getDocs(collection(db, "Activities"));
  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data as Activity[];
}

export async function getActivity(aid: string): Promise<Activity> {
  const querySnapshot = await getDoc(doc(db, "Activities", aid));
  if (querySnapshot.exists()) {
    console.log("Document data:", querySnapshot.data());
    return querySnapshot.data() as Activity;
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
  return {} as Activity;
}
