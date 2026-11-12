// Date helpers on plain "YYYY-MM-DD" strings, in UTC so a stay never shifts by a day across time zones.

const pad = (n: number) => String(n).padStart(2, "0");

export const fromISO = (iso: string) => new Date(`${iso}T00:00:00Z`);

/** Month may overflow (13 → next January); Date.UTC normalises it. */
export const isoOf = (y: number, m: number, d: number) => {
  const t = new Date(Date.UTC(y, m, d));
  return `${t.getUTCFullYear()}-${pad(t.getUTCMonth() + 1)}-${pad(t.getUTCDate())}`;
};

/** Today in Dubai (UTC+4), which is where the stay happens. */
export const todayISO = () => new Date(Date.now() + 4 * 3600_000).toISOString().slice(0, 10);

export const addDays = (iso: string, n: number) => {
  const d = fromISO(iso);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
};

export const nightsBetween = (a: string, b: string) => Math.round((fromISO(b).getTime() - fromISO(a).getTime()) / 86_400_000);

export const monthLabel = (y: number, m: number) =>
  new Date(Date.UTC(y, m, 1)).toLocaleDateString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });

export const shortDate = (iso: string) =>
  fromISO(iso).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" });
