import type { ReactNode } from "react";
import { Section, SectionHead } from "@/components/shared/section";
import { EVERY_DEVICE_HEAD } from "./content";

// Sample field-service app for an invented trades company. Layout and UI
// patterns are modeled on the DropGym staff app (bottom tab bar, rounded
// cards, time-first schedule rows with a status pill, big-numeral home
// tiles). All names, jobs and figures are invented. One data set feeds all
// three screens so the numbers always match.
const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

const COMPANY = "Saltmarsh Plumbing & Heating";

type Status = "done" | "on site" | "en route" | "scheduled";

const JOBS: { time: string; job: string; crew: string; status: Status }[] = [
  { time: "7:30", job: "Boiler service", crew: "Luis", status: "done" },
  { time: "9:30", job: "Water heater", crew: "Luis", status: "on site" },
  { time: "10:00", job: "Drain clearing", crew: "Dana", status: "en route" },
  { time: "1:30", job: "Repipe estimate", crew: "Priya", status: "scheduled" },
];

const CREW = ["Luis", "Dana", "Priya"].map((name) => {
  const now = JOBS.find((j) => j.crew === name && (j.status === "on site" || j.status === "en route"));
  const next = JOBS.find((j) => j.crew === name && j.status === "scheduled");
  const done = JOBS.filter((j) => j.crew === name && j.status === "done").length;
  return { name, now, next, done };
});

const OVERDUE = [
  { id: "#1042", job: "Repipe", amount: 5400, days: 31 },
  { id: "#1057", job: "Water heater", amount: 2250, days: 24 },
  { id: "#1061", job: "Boiler service", amount: 640, days: 19 },
];
const OVERDUE_COUNT = 7; // three listed, four more
const OVERDUE_TOTAL = 12840; // includes the four not listed
const LEADS_TO_FOLLOW_UP = 9;
const CASH = 61500;
/** Cash in bank by week (sample, thousands), oldest first; the last point is CASH. */
const CASH_TREND = [48.2, 51.0, 49.6, 53.3, 55.1, 54.4, 58.9, CASH / 1000];
const JOBS_DONE = JOBS.filter((j) => j.status === "done").length;

const ARIA = `Sample field-service app for ${COMPANY}: ${JOBS.length} jobs today with ${JOBS_DONE} done, crew status for ${CREW.length} technicians, ${OVERDUE_COUNT} overdue invoices totalling ${usd(OVERDUE_TOTAL)}, ${LEADS_TO_FOLLOW_UP} leads needing follow-up and ${usd(CASH)} cash`;

/* ---------- Shared UI ---------- */

function Sparkline({ className = "" }: { className?: string }) {
  const w = 100;
  const h = 32;
  const min = Math.min(...CASH_TREND);
  const max = Math.max(...CASH_TREND);
  const pts = CASH_TREND.map((v, i) => {
    const x = (i / (CASH_TREND.length - 1)) * w;
    const y = h - 3 - ((v - min) / (max - min)) * (h - 6);
    return [x, y] as const;
  });
  const line = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const area = `${line} L${w} ${h} L0 ${h} Z`;
  const [lx, ly] = pts[pts.length - 1];
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className={`block w-full ${className}`} aria-hidden>
      <path d={area} className="fill-brand/15" />
      <path d={line} className="fill-none stroke-brand" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      <circle cx={lx} cy={ly} r="2.5" className="fill-brand" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

const STATUS: Record<Status, { dot: string; pill: string }> = {
  done: { dot: "bg-emerald-500", pill: "border-emerald-300 bg-emerald-50 text-emerald-700" },
  "on site": { dot: "bg-brand", pill: "border-brand bg-tint text-primary" },
  "en route": { dot: "bg-amber-400", pill: "border-amber-300 bg-amber-50 text-amber-800" },
  scheduled: { dot: "bg-tint-strong", pill: "border-tint-strong bg-white text-muted-foreground" },
};

function Pill({ status }: { status: Status }) {
  return (
    <span className={`shrink-0 rounded-full border px-1.5 py-px text-[7px] font-extrabold uppercase tracking-[0.08em] ${STATUS[status].pill}`}>
      {status}
    </span>
  );
}

function Card({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`min-w-0 rounded-xl border border-tint-strong bg-white ${className}`}>{children}</div>;
}

function JobRow({ j }: { j: (typeof JOBS)[number] }) {
  return (
    <div className="flex items-center gap-2 px-2 py-1.5">
      <span className="w-7 shrink-0 text-right text-[10px] font-bold tabular-nums leading-none">{j.time}</span>
      <span className="min-w-0 flex-1">
        <span className="block text-[9px] font-semibold leading-tight">{j.job}</span>
        <span className="flex items-center gap-1 text-[8px] text-muted-foreground">
          <span aria-hidden className={`size-1.5 rounded-full ${STATUS[j.status].dot}`} />
          {j.crew}
        </span>
      </span>
      <Pill status={j.status} />
    </div>
  );
}

function Avatar({ name, size = "size-6" }: { name: string; size?: string }) {
  return (
    <span
      data-initial={name[0]}
      className={`grid ${size} shrink-0 place-items-center rounded-full bg-brand text-[8px] font-bold text-white before:content-[attr(data-initial)]`}
      aria-hidden
    />
  );
}

function CrewRow({ c }: { c: (typeof CREW)[number] }) {
  const status: Status = c.now?.status ?? (c.next ? "scheduled" : "done");
  const line = c.now ? c.now.job : c.next ? `Next ${c.next.time}` : `${c.done} done`;
  return (
    <div className="flex items-center gap-2 px-2 py-1.5">
      <Avatar name={c.name} />
      <span className="min-w-0 flex-1">
        <span className="block text-[9px] font-semibold leading-tight">{c.name}</span>
        <span className="flex items-center gap-1 text-[8px] leading-tight text-muted-foreground">
          <span aria-hidden className={`size-1.5 shrink-0 rounded-full ${STATUS[status].dot}`} />
          {line}
        </span>
      </span>
      <Pill status={status} />
    </div>
  );
}

function Tile({ label, value, sub, alert, big }: { label: string; value: string; sub?: string; alert?: boolean; big?: boolean }) {
  return (
    <Card className={`p-2 ${alert ? "border-red-200 bg-red-50" : ""}`}>
      <div className="truncate text-[7px] uppercase tracking-[0.08em] text-muted-foreground">{label}</div>
      <div className={`mt-0.5 truncate font-bold leading-none tabular-nums ${big ? "text-base" : "text-[13px]"} ${alert ? "text-red-700" : ""}`}>{value}</div>
      {sub && <div className="mt-0.5 truncate text-[7.5px] text-muted-foreground">{sub}</div>}
    </Card>
  );
}

function ScreenHead({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="flex items-end justify-between">
      <span>
        <span className="block text-[11px] font-bold leading-none">{title}</span>
        {sub && <span className="mt-0.5 block text-[7.5px] text-muted-foreground">{sub}</span>}
      </span>
      <Avatar name="S" size="size-5" />
    </div>
  );
}

/** Bottom tab bar, as on the staff app. Icons are simple shapes; the active tab is tinted. */
function TabBar({ active }: { active: number }) {
  return (
    <div aria-hidden className="grid grid-cols-4 border-t border-tint-strong bg-white px-1 py-1.5">
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className="grid justify-items-center gap-0.5">
          <span className={`h-2.5 w-3 rounded-[3px] ${i === active ? "bg-brand" : "bg-tint-strong"}`} />
          <span className={`h-1 w-4 rounded ${i === active ? "bg-brand/60" : "bg-tint-strong/70"}`} />
        </span>
      ))}
    </div>
  );
}

/* ---------- Screen contents ---------- */

/** Phone 1: today's jobs in time order. */
function JobsScreen() {
  return (
    <div className="grid gap-2 bg-tint p-2.5 text-ink">
      <ScreenHead title="Jobs today" sub={`${JOBS.length} jobs · ${JOBS_DONE} done`} />
      <Card className="divide-y divide-tint-strong">
        {JOBS.map((j) => (
          <JobRow key={j.time + j.crew} j={j} />
        ))}
      </Card>
    </div>
  );
}

/** Phone 2: who is where right now. */
function CrewScreen() {
  const out = CREW.filter((c) => c.now).length;
  return (
    <div className="grid gap-2 bg-tint p-2.5 text-ink">
      <ScreenHead title="Crew" sub={`${out} of ${CREW.length} out`} />
      <Card className="divide-y divide-tint-strong">
        {CREW.map((c) => (
          <CrewRow key={c.name} c={c} />
        ))}
      </Card>
    </div>
  );
}

/** Desktop: the owner's overview with the same jobs and crew behind the tiles. */
function DesktopScreen() {
  const nav = ["Overview", "Jobs", "Crew", "Invoices"];
  return (
    <div className="grid h-full grid-cols-[64px_1fr] bg-tint text-ink">
      <div className="grid content-start gap-1.5 border-r border-tint-strong bg-white p-2">
        <span aria-hidden className="mb-1 h-3 w-3 rounded bg-brand" />
        {nav.map((n, i) => (
          <span key={n} className={`rounded px-1.5 py-1 text-[7.5px] font-semibold ${i === 0 ? "bg-tint text-primary" : "text-muted-foreground"}`}>
            {n}
          </span>
        ))}
      </div>
      <div className="grid content-start gap-2 p-2.5">
        <ScreenHead title={COMPANY} />
        <div className="grid grid-cols-4 gap-1.5">
          <Tile label={`${OVERDUE_COUNT} overdue invoices`} value={usd(OVERDUE_TOTAL)} alert big />
          <Tile label="Open leads" value={String(LEADS_TO_FOLLOW_UP)} big />
          <Tile label="Jobs today" value={String(JOBS.length)} sub={`${JOBS_DONE} done`} big />
          <Tile label="Cash" value={usd(CASH)} big />
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          <Card>
            <div className="border-b border-tint-strong px-2 py-1 text-[7.5px] font-bold uppercase tracking-[0.08em] text-muted-foreground">Overdue invoices</div>
            {OVERDUE.map((o) => (
              <div key={o.id} className="flex items-center gap-1.5 border-b border-tint-strong px-2 py-1 text-[8px] last:border-0">
                <span className="w-8 shrink-0 font-semibold tabular-nums text-muted-foreground">{o.id}</span>
                <span className="min-w-0 flex-1 truncate font-semibold">{o.job}</span>
                <span className="shrink-0 text-red-700">{`${o.days}d`}</span>
                <span className="w-10 shrink-0 text-right font-bold tabular-nums">{usd(o.amount)}</span>
              </div>
            ))}
            <div className="px-2 py-1 text-[7.5px] text-muted-foreground">+{OVERDUE_COUNT - OVERDUE.length} more</div>
          </Card>
          <Card className="p-2">
            <div className="text-[7.5px] font-bold uppercase tracking-[0.08em] text-muted-foreground">Cash</div>
            <Sparkline className="mt-1 h-12" />
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ---------- Device chrome (generic, no vendor marks) ---------- */

function Phone({ kind, children }: { kind: "android" | "ios"; children: ReactNode }) {
  const ios = kind === "ios";
  return (
    <div
      className={`relative mx-auto w-full max-w-[196px] bg-ink p-[6px] shadow-xl shadow-ink/20 ${ios ? "rounded-[2.1rem]" : "rounded-[1.35rem]"}`}
    >
      {/* side buttons */}
      <span aria-hidden className="absolute -left-[2px] top-[22%] h-7 w-[2px] rounded-l bg-ink/80" />
      <span aria-hidden className="absolute -right-[2px] top-[28%] h-10 w-[2px] rounded-r bg-ink/80" />
      <div className={`relative overflow-hidden bg-tint ${ios ? "rounded-[1.75rem]" : "rounded-[1rem]"}`}>
        {/* status bar with camera cut-out */}
        <div className="relative flex h-6 items-end justify-between bg-tint px-3 pb-0.5 text-[7px] font-semibold text-ink">
          <span aria-hidden className="h-1.5 w-5 rounded-sm bg-ink/70" />
          {ios ? (
            <span aria-hidden className="absolute left-1/2 top-1.5 h-[9px] w-10 -translate-x-1/2 rounded-full bg-ink" />
          ) : (
            <span aria-hidden className="absolute left-1/2 top-1.5 size-[7px] -translate-x-1/2 rounded-full bg-ink" />
          )}
          <span aria-hidden className="flex items-end gap-0.5">
            <span className="h-1 w-0.5 rounded-sm bg-ink" />
            <span className="h-1.5 w-0.5 rounded-sm bg-ink" />
            <span className="h-2 w-0.5 rounded-sm bg-ink" />
            <span className="ml-0.5 h-1.5 w-3 rounded-[2px] border border-ink" />
          </span>
        </div>
        {children}
        {/* bottom nav hint */}
        <div className="flex h-5 items-center justify-center bg-tint">
          {ios ? (
            <span aria-hidden className="h-[3px] w-12 rounded-full bg-ink/70" />
          ) : (
            <span aria-hidden className="flex items-center gap-3">
              <span className="h-[5px] w-[5px] border-y-[5px] border-r-[6px] border-y-transparent border-r-ink/60" />
              <span className="size-2 rounded-full border border-ink/60" />
              <span className="size-2 rounded-[2px] border border-ink/60" />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function Laptop({ children }: { children: ReactNode }) {
  return (
    <div className="w-full">
      <div className="mx-auto w-[92%] rounded-t-xl bg-ink p-[6px] pb-0 shadow-xl shadow-ink/20">
        <span aria-hidden className="mx-auto mb-1 block size-[5px] rounded-full bg-ink ring-1 ring-white/20" />
        <div className="aspect-[16/10] overflow-hidden rounded-t-md bg-tint">{children}</div>
      </div>
      <div className="h-2.5 rounded-b-lg bg-gradient-to-b from-tint-strong to-tint-strong/70 shadow-md">
        <span aria-hidden className="mx-auto block h-1 w-16 rounded-b bg-ink/15" />
      </div>
    </div>
  );
}

/* ---------- Section ---------- */

export function EveryDeviceA() {
  return (
    <Section id="every-device">
      <SectionHead eyebrow={EVERY_DEVICE_HEAD.eyebrow} title={EVERY_DEVICE_HEAD.title} />
      <figure className="mt-10 grid gap-4 rounded-3xl border border-tint-strong bg-gradient-to-b from-white to-tint/60 p-4 sm:p-6">
        <span className="max-w-full justify-self-end rounded-full bg-white px-2.5 py-0.5 text-center text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground ring-1 ring-tint-strong">
          Illustrative example · sample data
        </span>
        <div role="img" aria-label={`${ARIA}, on two phones and a laptop`} className="grid grid-cols-2 items-end gap-x-4 gap-y-8 lg:grid-cols-[200px_200px_1fr] lg:gap-x-8">
          <Phone kind="android">
            <JobsScreen />
            <TabBar active={0} />
          </Phone>
          <Phone kind="ios">
            <CrewScreen />
            <TabBar active={2} />
          </Phone>
          <div className="col-span-2 lg:col-span-1">
            <Laptop>
              <DesktopScreen />
            </Laptop>
          </div>
        </div>
        <figcaption className="text-center text-sm text-muted-foreground">Crew on phones, owner on desktop, same numbers.</figcaption>
      </figure>
    </Section>
  );
}
