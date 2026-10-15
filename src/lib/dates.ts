const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** "October 6, 2026" from an ISO timestamp or YYYY-MM-DD string. Uses the date part as written. */
export function formatLongDate(iso: string): string {
  const [year, month, day] = iso.slice(0, 10).split("-").map(Number);
  const monthName = MONTHS[month - 1];
  if (!year || !monthName || !day) return iso.slice(0, 10);
  return `${monthName} ${day}, ${year}`;
}

export function sameCalendarDay(a: string, b: string): boolean {
  return a.slice(0, 10) === b.slice(0, 10);
}
