/**
 * Campaign parameters an ad click puts on the landing URL.
 * Only `utm_*` keys are copied. Other query params stay off the booking URL.
 */
export function withUtmParams(
  url: string,
  search: URLSearchParams | Record<string, string | string[] | undefined>,
): string {
  const entries = search instanceof URLSearchParams ? [...search] : entriesFromRecord(search);
  const utm = entries.filter(([key, value]) => key.toLowerCase().startsWith("utm_") && value);
  if (utm.length === 0) return url;

  const dest = new URL(url);
  for (const [key, value] of utm) dest.searchParams.set(key, value);
  return dest.toString();
}

function entriesFromRecord(
  search: Record<string, string | string[] | undefined>,
): [string, string][] {
  const entries: [string, string][] = [];
  for (const [key, value] of Object.entries(search)) {
    const first = Array.isArray(value) ? value.find((item) => item.length > 0) : value;
    if (first) entries.push([key, first]);
  }
  return entries;
}
