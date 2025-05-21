export interface JournalEntry {
  id: string;
  updatedAt: { seconds: number };
  activityName: string;
  journalValue: string;
  // Add other fields as needed
}
