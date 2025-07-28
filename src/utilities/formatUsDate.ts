// Add this helper function at the top or in a utils file
export function formatUSDate(dateStr: string): string {
  // Handles YYYYMMDD or YYYY-MM-DD or similar
  if (!dateStr) return "";
  // Try to parse YYYYMMDD
  if (/^\d{8}$/.test(dateStr)) {
    const year = dateStr.slice(0, 4);
    const month = dateStr.slice(4, 6);
    const day = dateStr.slice(6, 8);
    return `${month}/${day}/${year}`;
  }
  // Try to parse YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const [year, month, day] = dateStr.split("-");
    return `${month}/${day}/${year}`;
  }
  return dateStr;
}
