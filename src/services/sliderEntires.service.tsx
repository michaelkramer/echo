import { getDocs, query, collection, where, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { SliderEntry } from "../types/SliderEntry";

export async function getSliderEntiresByUserId(
  userId: string,
): Promise<SliderEntry[]> {
  const querySnapshot = await getDocs(
    query(
      collection(db, "sliderEntires"),
      where("userID", "==", userId),
      orderBy("date", "desc"),
    ),
  );
  if (querySnapshot.empty) {
    return [];
  }
  const data = querySnapshot.docs.map<SliderEntry>(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as SliderEntry,
  );
  // .sort((a, b) => b.updatedAt.seconds - a.updatedAt.seconds);
  return data;
}
