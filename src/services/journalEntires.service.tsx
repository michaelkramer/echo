import { getDocs, query, collection, where, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { JournalEntry } from "../types/JournalEntry";

export async function getJournalEntiresByUserId(
  userId: string,
): Promise<JournalEntry[]> {
  const querySnapshot = await getDocs(
    query(
      collection(db, "journalEntires"),
      where("userID", "==", userId),
      orderBy("date", "desc"),
    ),
  );
  const data = querySnapshot.docs
    .map<JournalEntry>(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as JournalEntry,
    )
    .sort((a, b) => b.updatedAt.seconds - a.updatedAt.seconds);
  return data;
}
