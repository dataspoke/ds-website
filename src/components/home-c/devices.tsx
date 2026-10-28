import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* One invented trades company, Tidewater Plumbing & Heating, seen on   */
/* three screens. Layout follows the DataSpoke CRM "Today" dashboard:   */
/* dark top bar with wordmark and pill tabs, a four-tile stat row where */
/* the tiles needing action get a warn tone, then titled cards with a   */
/* header (title + meta) and compact rows carrying status chips. Every  */
/* figure is sample data, and the lists below are the single source for */
/* all three devices so the numbers always agree.                       */
/* ------------------------------------------------------------------ */

type JobStatus = "Done" | "On site" | "En route" | "Scheduled";

const JOBS: { time: string; job: string; crew: string; status: JobStatus }[] = [
  { time: "7:30", job: "Water heater", crew: "Priya", status: "Done" },
  { time: "9:00", job: "Boiler no-heat", crew: "Marcus", status: "On site" },
  { time: "10:30", job: "Drain clearing", crew: "Dana", status: "En route" },
  { time: "1:00", job: "Furnace tune-up", crew: "Leo", status: "Scheduled" },
];

/** One row per crew member: where they are now, derived from JOBS. */
const CREW = [
  { name: "Marcus", where: "On site", note: "Boiler no-heat" },
  { name: "Dana", where: "En route", note: "12 min out" },
  { name: "Priya", where: "Done", note: "Clear" },
  { name: "Leo", where: "Shop", note: "Next 1:00" },
];

const OVERDUE = [
  { inv: "#1042", days: 31, amt: 3200 },
  { inv: "#1047", days: 24, amt: 2750 },
  { inv: "#1051", days: 17, amt: 2400 },
];
const OVERDUE_TOTAL = OVERDUE.reduce((a, o) => a + o.amt, 0); // 8,350
const LEADS_WAITING = 7;
const CASH = 61500;

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;
const count = (s: JobStatus) => JOBS.filter((j) => j.status === s).length;

const PILL: Record<string, string> = {
  Done: "bg-emerald-400/15 text-emerald-300",
  "On site": "bg-brand/25 text-sky-200",
  "En route": "bg-amber-300/15 text-amber-200",
  Scheduled: "bg-white/8 text-white/60",
  Shop: "bg-white/8 text-white/60",
};

function Pill({ s }: { s: string }) {
  return (
    <span className={cn("shrink-0 rounded-full px-1.5 py-0.5 text-[0.5rem] font-bold whitespace-nowrap", PILL[s])}>
      {s}
    </span>
  );
}

/** Status bar row shared by both phones. Generic glyphs only. */
function StatusBar() {
  return (
    <div className="flex items-center justify-between px-4 pt-2.5 text-[0.55rem] font-semibold text-white/80">
      <span>9:41</span>
      <span className="flex items-center gap-1" aria-hidden="true">
        <svg viewBox="0 0 12 10" className="h-2 w-2.5" fill="currentColor">
          <rect x="0" y="6" width="2" height="4" />
          <rect x="3.3" y="4" width="2" height="6" />
          <rect x="6.6" y="2" width="2" height="8" />
          <rect x="10" y="0" width="2" height="10" />
        </svg>
        <svg viewBox="0 0 20 10" className="h-2 w-4" fill="none" stroke="currentColor" strokeWidth="1.2">
          <rect x="0.6" y="0.6" width="16" height="8.8" rx="2" />
          <rect x="2" y="2" width="11" height="6" fill="currentColor" stroke="none" />
          <path d="M18 3.5v3" />
        </svg>
      </span>
    </div>
  );
}

/** Bottom tab glyphs: today (calendar), crew (people), jobs (list), me (person). */
const TAB_ICONS = [
  "M2 4h12v10H2zM2 7h12M5 2v3M11 2v3",
  "M6 8a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM1.5 14a4.5 4.5 0 019 0M11 7.5a2 2 0 100-4M14.5 13a3.5 3.5 0 00-3-3.4",
  "M3 4h10M3 8h10M3 12h7",
  "M8 8a3 3 0 100-6 3 3 0 000 6zM2.5 14a5.5 5.5 0 0111 0",
];

/** App chrome shared by both phones: company name, screen title, bottom tabs. */
function PhoneScreen({ title, active, children }: { title: string; active: number; children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col px-3 pb-3 pt-2.5 text-white">
      <p className="text-[0.5rem] font-bold uppercase tracking-[0.14em] text-brand">Tidewater Plumbing &amp; Heating</p>
      <p className="mt-0.5 text-[0.78rem] font-bold leading-tight">{title}</p>
      <div className="mt-2 flex-1">{children}</div>
      <nav aria-hidden="true" className="mt-2 flex justify-around rounded-full bg-white/8 px-2 py-1 text-white/50">
        {TAB_ICONS.map((d, i) => (
          <span key={d} className={cn("rounded-full px-2 py-0.5", i === active && "bg-brand text-white")}>
            <svg viewBox="0 0 16 16" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d={d} />
            </svg>
          </span>
        ))}
      </nav>
    </div>
  );
}

function JobsToday() {
  return (
    <PhoneScreen title="Jobs today" active={0}>
      <p className="text-[0.5rem] text-white/55 tabular-nums">
        {count("Done")} done · {count("On site")} on site
      </p>
      <ul className="mt-1.5 grid gap-1">
        {JOBS.map((j) => (
          <li key={j.time} className="grid grid-cols-[26px_1fr_auto] items-center gap-1 rounded-md bg-white/8 px-1.5 py-1">
            <span className="text-[0.5rem] text-white/55 tabular-nums">{j.time}</span>
            <span className="min-w-0 truncate text-[0.55rem] font-semibold">{j.job}</span>
            <Pill s={j.status} />
          </li>
        ))}
      </ul>
    </PhoneScreen>
  );
}

function CrewStatus() {
  return (
    <PhoneScreen title="Crew status" active={1}>
      <ul className="mt-1.5 grid gap-1.5">
        {CREW.map((c) => (
          <li key={c.name} className="rounded-md bg-white/8 px-2 py-1.5">
            <div className="flex items-center justify-between gap-1">
              <span className="flex min-w-0 items-center gap-1.5">
                <span aria-hidden="true" className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand/40 text-[0.45rem] font-bold">
                  {c.name[0]}
                </span>
                <span className="truncate text-[0.58rem] font-semibold">{c.name}</span>
              </span>
              <Pill s={c.where} />
            </div>
            <p className="mt-0.5 truncate text-[0.5rem] text-white/55">{c.note}</p>
          </li>
        ))}
      </ul>
    </PhoneScreen>
  );
}

/** Generic Android-style handset: squarer corners, centred punch-hole camera. */
function AndroidPhone() {
  return (
    <div className="relative mx-auto w-full max-w-[168px] rounded-[1.25rem] bg-[#1c2230] p-[5px] shadow-[0_12px_30px_-12px_rgba(15,30,51,0.5)] ring-1 ring-black/40">
      <span aria-hidden="true" className="absolute top-[22%] -right-[3px] h-9 w-[3px] rounded-r bg-[#2b3344]" />
      <div className="relative flex aspect-[9/19] flex-col overflow-hidden rounded-[0.95rem] bg-ink">
        <span aria-hidden="true" className="absolute top-2 left-1/2 z-10 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-black ring-1 ring-white/10" />
        <StatusBar />
        <JobsToday />
      </div>
    </div>
  );
}

/** Generic iPhone-style handset: rounder corners, pill cut-out at the top. */
function IosPhone() {
  return (
    <div className="relative mx-auto w-full max-w-[168px] rounded-[2rem] bg-[#2a2f3a] p-[6px] shadow-[0_12px_30px_-12px_rgba(15,30,51,0.5)] ring-1 ring-black/40">
      <span aria-hidden="true" className="absolute top-[18%] -left-[3px] h-5 w-[3px] rounded-l bg-[#3a4050]" />
      <span aria-hidden="true" className="absolute top-[27%] -left-[3px] h-8 w-[3px] rounded-l bg-[#3a4050]" />
      <span aria-hidden="true" className="absolute top-[22%] -right-[3px] h-11 w-[3px] rounded-r bg-[#3a4050]" />
      <div className="relative flex aspect-[9/19] flex-col overflow-hidden rounded-[1.65rem] bg-ink">
        <span aria-hidden="true" className="absolute top-2 left-1/2 z-10 h-3.5 w-12 -translate-x-1/2 rounded-full bg-black" />
        <StatusBar />
        <CrewStatus />
      </div>
    </div>
  );
}

type Tone = "ok" | "warn";

/** Dashboard stat tile. Warn tiles flag the two numbers the owner should act on. */
function Stat({ k, v, sub, tone = "ok" }: { k: string; v: string; sub?: string; tone?: Tone }) {
  return (
    <li
      className={cn(
        "min-w-0 rounded-md p-2 ring-1 ring-inset",
        tone === "warn" ? "bg-amber-300/8 ring-amber-300/30" : "bg-white/8 ring-white/5"
      )}
    >
      <p className="truncate text-[0.52rem] text-white/60">{k}</p>
      <p
        className={cn(
          "mt-0.5 font-display text-[0.95rem] font-extrabold leading-none tracking-tight tabular-nums sm:text-[1.05rem]",
          tone === "warn" && "text-amber-200"
        )}
      >
        {v}
      </p>
      {sub && <p className="mt-1 truncate text-[0.5rem] text-white/50 tabular-nums">{sub}</p>}
    </li>
  );
}

/** Titled card with a header row (title + meta) and a body, as on the CRM Today view. */
function Card({ title, meta, children }: { title: string; meta: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0 rounded-md bg-white/8 ring-1 ring-inset ring-white/5">
      <div className="flex items-baseline justify-between gap-2 border-b border-white/10 px-2.5 py-1.5 text-[0.52rem]">
        <span className="font-semibold text-white/85">{title}</span>
        <span className="text-white/45 tabular-nums">{meta}</span>
      </div>
      <ul className="grid gap-1 px-2.5 py-2 text-[0.52rem]">{children}</ul>
    </div>
  );
}

/** Small rounded chip, used for job status and "days late". */
function Chip({ children, tone = "ok" }: { children: React.ReactNode; tone?: Tone | "late" }) {
  return (
    <span
      className={cn(
        "shrink-0 rounded-full px-1.5 py-px text-[0.48rem] font-bold whitespace-nowrap tabular-nums",
        tone === "late" && "bg-[#fca5a5]/15 text-[#fca5a5]",
        tone === "warn" && "bg-amber-300/15 text-amber-200",
        tone === "ok" && "bg-white/8 text-white/60"
      )}
    >
      {children}
    </span>
  );
}

const LEADS = [
  { lead: "Boiler quote", days: 4 },
  { lead: "Bath rough-in", days: 3 },
  { lead: "Service plan", days: 2 },
];

/** Laptop: the owner overview. Same jobs, crew and invoices as the phones. */
function Laptop() {
  return (
    <div className="mx-auto w-full max-w-[560px]">
      <div className="rounded-t-xl bg-[#2a2f3a] p-[6px] pb-0 ring-1 ring-black/40">
        <div className="relative overflow-hidden rounded-t-lg bg-ink text-white">
          <span aria-hidden="true" className="absolute top-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-black ring-1 ring-white/10" />

          {/* Top bar: wordmark, pill tabs, context pill */}
          <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2 pt-3 text-[0.5rem] sm:px-4">
            <span className="font-bold">
              Tidewater <span className="text-brand">Ops</span>
            </span>
            <nav aria-hidden="true" className="ml-1 hidden gap-0.5 font-semibold text-white/50 sm:flex">
              {["Today", "Jobs", "Invoices", "Leads"].map((t, i) => (
                <span key={t} className={cn("rounded-full px-1.5 py-0.5", i === 0 && "bg-white/12 text-white")}>
                  {t}
                </span>
              ))}
            </nav>
            <span className="flex-1" />
            <span aria-hidden="true" className="h-3 w-3 rounded-full bg-brand/60" />
          </div>

          <div className="min-w-0 p-3 sm:p-4">
            <p className="text-[0.55rem] font-bold uppercase tracking-[0.14em] text-brand">Owner overview</p>

            <ul className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
              <Stat k="Jobs today" v={String(JOBS.length)} sub={`${count("Scheduled")} to go`} />
              <Stat k="Overdue invoices" v={usd(OVERDUE_TOTAL)} sub={`${OVERDUE.length} invoices`} tone="warn" />
              <Stat k="Leads to follow up" v={String(LEADS_WAITING)} sub={`oldest ${LEADS[0].days} days`} tone="warn" />
              <Stat k="Cash on hand" v={usd(CASH)} />
            </ul>

            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              <Card title="Overdue invoices" meta={`${OVERDUE.length} · ${usd(OVERDUE_TOTAL)}`}>
                {OVERDUE.map((o) => (
                  <li key={o.inv} className="grid grid-cols-[30px_1fr_auto] items-center gap-1.5 tabular-nums">
                    <span className="text-white/45">{o.inv}</span>
                    <span className="font-semibold">{usd(o.amt)}</span>
                    <Chip tone="late">{`${o.days}d late`}</Chip>
                  </li>
                ))}
              </Card>
              <Card title="Leads to follow up" meta={`${LEADS_WAITING} · ${LEADS_WAITING - LEADS.length} more`}>
                {LEADS.map((l) => (
                  <li key={l.lead} className="grid grid-cols-[1fr_auto] items-center gap-1.5">
                    <span className="truncate">{l.lead}</span>
                    <Chip tone="warn">{`${l.days}d`}</Chip>
                  </li>
                ))}
              </Card>
            </div>
          </div>
        </div>
      </div>
      {/* Base / hinge */}
      <div className="h-2.5 rounded-b-[0.4rem] bg-[#3a4050] ring-1 ring-black/40 sm:h-3" aria-hidden="true">
        <span className="mx-auto block h-1 w-16 rounded-b bg-[#1c2230] sm:w-24" />
      </div>
    </div>
  );
}

/** One trades business on three devices. All figures are sample data. */
export function DevicesC() {
  return (
    <section id="any-screen" className="overflow-hidden border-t border-border bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-4 md:grid-cols-12 md:items-end">
          <p className="eyebrow md:col-span-3">Custom software</p>
          <div className="md:col-span-9">
            <h2 className="text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl">
              One view of your business, on any screen.
            </h2>
          </div>
        </div>

        <figure className="mt-12 sm:mt-16">
          <div className="grid items-end gap-8 lg:grid-cols-[168px_168px_minmax(0,1fr)] lg:gap-10">
            <div className="grid grid-cols-2 gap-5 lg:contents">
              <AndroidPhone />
              <IosPhone />
            </div>
            <Laptop />
          </div>
          <figcaption className="mt-6 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Illustrative example · sample data
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
