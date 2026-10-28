import type { ReactNode } from "react";
import { Section, SectionHead } from "@/components/shared/section";
import { EVERY_DEVICE_HEAD } from "./content";

// Sample owner overview, shared by all three screens so the numbers always
// match. All figures are invented for illustration.
const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

const OVERVIEW = {
  revenue: 84200,
  leads: 132,
  jobsOpen: 47,
  jobsWeek: 12,
  cash: 61500,
};

/** Weekly revenue trend (sample), oldest first. */
const TREND = [16.1, 17.4, 16.9, 18.8, 19.6, 19.2, 20.7, 21.5];

const WEEK_JOBS = [
  { day: "Mon", n: 3 },
  { day: "Tue", n: 2 },
  { day: "Wed", n: 3 },
  { day: "Thu", n: 2 },
  { day: "Fri", n: 2 },
]; // sums to OVERVIEW.jobsWeek (12)

const TILES = [
  { label: "Revenue", value: usd(OVERVIEW.revenue), note: "this month" },
  { label: "Leads", value: String(OVERVIEW.leads), note: "this month" },
  { label: "Jobs", value: String(OVERVIEW.jobsOpen), note: `open · ${OVERVIEW.jobsWeek} this week` },
  { label: "Cash", value: usd(OVERVIEW.cash), note: "on hand" },
];

const ARIA = `Sample owner overview: revenue ${usd(OVERVIEW.revenue)} this month, ${OVERVIEW.leads} leads, ${OVERVIEW.jobsOpen} open jobs with ${OVERVIEW.jobsWeek} this week, cash on hand ${usd(OVERVIEW.cash)}, and a rising revenue trend`;

/* ---------- Screen contents ---------- */

function Sparkline({ className = "" }: { className?: string }) {
  const w = 100;
  const h = 32;
  const min = Math.min(...TREND);
  const max = Math.max(...TREND);
  const pts = TREND.map((v, i) => {
    const x = (i / (TREND.length - 1)) * w;
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

function Tile({ label, value, note, big }: { label: string; value: string; note: string; big?: boolean }) {
  return (
    <div className="min-w-0 rounded-lg border border-tint-strong bg-white p-2">
      <div className="truncate text-[9px] text-muted-foreground">{label}</div>
      <div className={`mt-0.5 truncate font-bold leading-none tabular-nums ${big ? "text-base" : "text-[13px]"}`}>{value}</div>
      <div className="mt-1 truncate text-[8px] text-muted-foreground">{note}</div>
    </div>
  );
}

function ScreenHead({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[10px] font-bold">{title}</span>
      <span className="text-[8px] text-muted-foreground">Today</span>
    </div>
  );
}

/** Phone layout: four tiles and the trend. */
function PhoneScreen() {
  return (
    <div className="grid gap-2 bg-tint p-2.5 text-ink">
      <ScreenHead title="Overview" />
      <div className="grid grid-cols-2 gap-1.5">
        {TILES.map((t) => (
          <Tile key={t.label} {...t} />
        ))}
      </div>
      <div className="rounded-lg border border-tint-strong bg-white p-2">
        <div className="text-[8px] text-muted-foreground">Revenue trend · 8 weeks</div>
        <Sparkline className="mt-1 h-7" />
      </div>
    </div>
  );
}

/** Desktop layout: same numbers with a little more room for detail. */
function DesktopScreen() {
  const max = Math.max(...WEEK_JOBS.map((j) => j.n));
  return (
    <div className="grid h-full grid-cols-[52px_1fr] bg-tint text-ink">
      <div aria-hidden className="grid content-start gap-2 border-r border-tint-strong bg-white p-2.5">
        <span className="size-5 rounded-md bg-brand" />
        {[1, 2, 3, 4].map((i) => (
          <span key={i} className={`h-1.5 rounded ${i === 1 ? "bg-brand/50" : "bg-tint-strong"}`} />
        ))}
      </div>
      <div className="grid content-start gap-2 p-2.5">
        <ScreenHead title="Owner overview" />
        <div className="grid grid-cols-4 gap-1.5">
          {TILES.map((t) => (
            <Tile key={t.label} {...t} big />
          ))}
        </div>
        <div className="grid grid-cols-[3fr_2fr] gap-1.5">
          <div className="rounded-lg border border-tint-strong bg-white p-2">
            <div className="flex justify-between text-[8px] text-muted-foreground">
              <span>Revenue trend · 8 weeks</span>
              <span>weekly</span>
            </div>
            <Sparkline className="mt-1 h-12" />
          </div>
          <div className="rounded-lg border border-tint-strong bg-white p-2">
            <div className="text-[8px] text-muted-foreground">Jobs this week · {OVERVIEW.jobsWeek}</div>
            <div className="mt-1.5 grid gap-1">
              {WEEK_JOBS.map((j) => (
                <div key={j.day} className="grid grid-cols-[22px_1fr_10px] items-center gap-1 text-[8px]">
                  <span>{j.day}</span>
                  <span className="h-1.5 rounded bg-tint">
                    <span className="block h-full rounded bg-brand" style={{ width: `${(j.n / max) * 100}%` }} />
                  </span>
                  <span className="text-right font-semibold tabular-nums">{j.n}</span>
                </div>
              ))}
            </div>
          </div>
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
      className={`relative mx-auto w-full max-w-[172px] bg-ink p-[6px] shadow-xl shadow-ink/20 ${ios ? "rounded-[2.1rem]" : "rounded-[1.35rem]"}`}
    >
      {/* side buttons */}
      <span aria-hidden className="absolute -left-[2px] top-[22%] h-7 w-[2px] rounded-l bg-ink/80" />
      <span aria-hidden className="absolute -right-[2px] top-[28%] h-10 w-[2px] rounded-r bg-ink/80" />
      <div className={`relative overflow-hidden bg-tint ${ios ? "rounded-[1.75rem]" : "rounded-[1rem]"}`}>
        {/* status bar with camera cut-out */}
        <div className="relative flex h-6 items-end justify-between bg-tint px-3 pb-0.5 text-[7px] font-semibold text-ink">
          <span>9:41</span>
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
      <SectionHead eyebrow={EVERY_DEVICE_HEAD.eyebrow} title={EVERY_DEVICE_HEAD.title} lede={EVERY_DEVICE_HEAD.lede} />
      <figure className="mt-10 grid gap-4 rounded-3xl border border-tint-strong bg-gradient-to-b from-white to-tint/60 p-4 sm:p-6">
        <span className="max-w-full justify-self-end rounded-full bg-white px-2.5 py-0.5 text-center text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground ring-1 ring-tint-strong">
          Illustrative example · sample data
        </span>
        <div role="img" aria-label={`${ARIA}, shown identically on two phones and a laptop`} className="grid grid-cols-2 items-end gap-x-4 gap-y-8 lg:grid-cols-[180px_180px_1fr] lg:gap-x-8">
          <Phone kind="android">
            <PhoneScreen />
          </Phone>
          <Phone kind="ios">
            <PhoneScreen />
          </Phone>
          <div className="col-span-2 lg:col-span-1">
            <Laptop>
              <DesktopScreen />
            </Laptop>
          </div>
        </div>
        <figcaption className="text-center text-sm text-muted-foreground">Same numbers on every phone and every desktop.</figcaption>
      </figure>
    </Section>
  );
}
