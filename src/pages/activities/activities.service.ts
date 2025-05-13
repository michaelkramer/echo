import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase";

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
