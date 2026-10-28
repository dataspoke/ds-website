import { Section, SectionHead } from "@/components/shared/section";
import { IllustrativeBadge } from "./mock-ui";
import { cn } from "@/lib/utils";

/**
 * "One view on any screen": a field-service app for an invented plumbing
 * company, shown on an Android-style phone (jobs today), an iPhone-style
 * phone (crew status) and a laptop (owner overview).
 *
 * Layout and UI patterns follow the DataSpoke CRM "Today" dashboard: a header
 * with pill tabs, a row of KPI tiles (warning tone on the one that needs
 * attention), then cards with a title, a count in the header and compact rows
 * with a chip and a status pill (see crmmain docs/mocks/today-dashboard).
 *
 * Generic device frames only, no vendor logos or trademarked UI. The business,
 * crew first names, customers and every number are invented sample data, and
 * the same figures appear on all three screens.
 */

const BUSINESS = "Birch Hollow Plumbing";

type Status = "Done" | "On site" | "En route" | "Next";

const JOBS: { time: string; title: string; status: Status; crew: string }[] = [
  { time: "8:00", title: "Boiler service", status: "Done", crew: "Priya" },
  { time: "9:30", title: "Leak repair", status: "On site", crew: "Dana" },
  { time: "11:00", title: "Water heater", status: "En route", crew: "Luis" },
  { time: "1:30", title: "Furnace tune-up", status: "Next", crew: "Priya" },
];

/** One row per crew member: their current (or next) job. */
const CREW = ["Dana", "Luis", "Priya"].map((name) => {
  const job = JOBS.find((j) => j.crew === name && j.status !== "Done") ?? JOBS.find((j) => j.crew === name)!;
  return { name, status: job.status, title: job.title };
});

/* Customers are shown as invoice number and job only; no names or addresses. */
const OVERDUE = [
  { invoice: "#1042 · Boiler install", amount: 4900, days: 31 },
  { invoice: "#1057 · Repipe", amount: 5200, days: 19 },
  { invoice: "#1063 · Water heater", amount: 2380, days: 12 },
];
const OVERDUE_TOTAL = OVERDUE.reduce((a, o) => a + o.amount, 0); // 12,480

const LEADS = [
  { need: "Repipe quote", source: "Web form", days: 6 },
  { need: "Boiler quote", source: "Phone", days: 4 },
  { need: "Sump pump", source: "Referral", days: 2 },
];

const CASH = 61500;

const money = (n: number) => `$${n.toLocaleString("en-US")}`;

const STATUS_TONE: Record<Status, string> = {
  Done: "bg-emerald-50 text-emerald-700",
  "On site": "bg-tint text-primary",
  "En route": "bg-amber-50 text-amber-800",
  Next: "bg-muted text-muted-foreground",
};

function Pill({ status, compact }: { status: Status; compact?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center whitespace-nowrap rounded-full font-semibold",
        compact ? "px-1 py-px text-[6px]" : "px-1.5 py-0.5 text-[8px]",
        STATUS_TONE[status]
      )}
    >
      {status}
    </span>
  );
}

/** App chrome shared by both phones: title bar with the screen name and a count. */
function PhoneScreen({ title, count, children }: { title: string; count: number; children: React.ReactNode }) {
  return (
    <div className="grid gap-1.5 bg-muted p-1.5">
      <div className="flex items-center justify-between px-0.5">
        <span className="text-[8px] font-bold">{title}</span>
        <span className="rounded-full bg-tint px-1 text-[6px] font-semibold tabular-nums text-primary">{count}</span>
      </div>
      <ul className="grid gap-1">{children}</ul>
    </div>
  );
}

function JobsTodayScreen() {
  return (
    <PhoneScreen title="Jobs today" count={JOBS.length}>
      {JOBS.map((j) => (
        <li key={j.time} className="flex items-center gap-1 rounded-md border border-border bg-background p-1.5">
          <span className="w-5 shrink-0 text-[6px] font-semibold tabular-nums text-muted-foreground">{j.time}</span>
          <span className="min-w-0 flex-1 truncate text-[7px] font-medium">{j.title}</span>
          <Pill status={j.status} compact />
        </li>
      ))}
    </PhoneScreen>
  );
}

function CrewScreen() {
  return (
    <PhoneScreen title="Crew" count={CREW.length}>
      {CREW.map((c) => (
        <li key={c.name} className="flex items-center gap-1.5 rounded-md border border-border bg-background p-1.5">
          <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-tint text-[6px] font-bold text-primary">
            {c.name[0]}
          </span>
          <span className="grid min-w-0 flex-1">
            <span className="truncate text-[7px] font-medium">{c.name}</span>
            <span className="truncate text-[6px] text-muted-foreground">{c.title}</span>
          </span>
          <Pill status={c.status} compact />
        </li>
      ))}
    </PhoneScreen>
  );
}

/** Android-style frame: squarer corners, punch-hole camera, three-button nav. */
function AndroidPhone() {
  return (
    <div className="mx-auto w-full max-w-[150px] sm:max-w-[160px]" aria-hidden="true">
      <div className="rounded-[18px] border-[6px] border-slate-800 bg-slate-800 shadow-[0_18px_40px_-20px_rgba(15,30,51,0.45)]">
        <div className="relative overflow-hidden rounded-[12px] bg-muted">
          <div className="relative flex h-5 items-center justify-end bg-muted px-2">
            <span className="absolute left-1/2 top-1.5 h-2 w-2 -translate-x-1/2 rounded-full bg-slate-800" />
            <span className="flex gap-0.5">
              <i className="block h-1.5 w-1.5 rounded-[1px] bg-slate-400" />
              <i className="block h-1.5 w-2.5 rounded-[1px] bg-slate-400" />
            </span>
          </div>
          <JobsTodayScreen />
          <div className="flex h-4 items-center justify-center gap-4 bg-muted">
            <i className="block h-1.5 w-1.5 border-l border-t border-slate-400 -rotate-45" />
            <i className="block h-1.5 w-1.5 rounded-full border border-slate-400" />
            <i className="block h-1.5 w-1.5 border border-slate-400" />
          </div>
        </div>
      </div>
    </div>
  );
}

/** iPhone-style frame: rounder corners, pill cutout, home indicator bar. */
function IosPhone() {
  return (
    <div className="mx-auto w-full max-w-[150px] sm:max-w-[160px]" aria-hidden="true">
      <div className="rounded-[28px] border-[6px] border-slate-900 bg-slate-900 shadow-[0_18px_40px_-20px_rgba(15,30,51,0.45)]">
        <div className="relative overflow-hidden rounded-[22px] bg-muted">
          <div className="relative flex h-5 items-center justify-end bg-muted px-2.5">
            <span className="absolute left-1/2 top-1 h-2.5 w-8 -translate-x-1/2 rounded-full bg-slate-900" />
            <span className="flex gap-0.5">
              <i className="block h-1.5 w-1.5 rounded-[1px] bg-slate-400" />
              <i className="block h-1.5 w-2.5 rounded-[1px] bg-slate-400" />
            </span>
          </div>
          <CrewScreen />
          <div className="flex h-4 items-center justify-center bg-muted">
            <i className="block h-0.5 w-9 rounded-full bg-slate-400" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Tile({ label, value, sub, warn }: { label: string; value: string; sub?: string; warn?: boolean }) {
  return (
    <div className={cn("grid gap-0.5 rounded-md border bg-background p-2", warn ? "border-amber-300" : "border-border")}>
      <span className="text-[7px] font-medium uppercase tracking-[0.05em] text-muted-foreground">{label}</span>
      <span className={cn("font-display text-sm font-extrabold tabular-nums tracking-tight", warn && "text-amber-800")}>
        {value}
      </span>
      {sub && <span className="text-[7px] tabular-nums text-muted-foreground">{sub}</span>}
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0 rounded-md border border-border bg-background">
      <div className="border-b border-border px-2 py-1">
        <span className="text-[8px] font-bold">{title}</span>
      </div>
      <ul className="grid gap-1 p-1.5">{children}</ul>
    </div>
  );
}

/** Laptop frame with the owner overview. Key numbers match the phones. */
function Laptop() {
  return (
    <div className="mx-auto w-full min-w-0 max-w-[460px] sm:col-span-2 lg:col-span-1" aria-hidden="true">
      <div className="rounded-t-xl border-[5px] border-b-0 border-slate-800 bg-slate-800 pb-0">
        <div className="overflow-hidden rounded-t-lg bg-background">
          <div className="flex items-center gap-2 border-b border-border bg-background px-2.5 py-1.5">
            <span className="text-[9px] font-bold">{BUSINESS}</span>
            <span className="ml-1 flex gap-1 text-[7px] font-semibold">
              <span className="rounded-full bg-tint px-1.5 py-0.5 text-primary">Today</span>
              <span className="px-1.5 py-0.5 text-muted-foreground">Schedule</span>
              <span className="px-1.5 py-0.5 text-muted-foreground">Invoices</span>
            </span>
            <span className="ml-auto size-3 rounded-full bg-tint-strong" />
          </div>
          <div className="grid gap-2 bg-muted p-2.5">
            <div className="grid grid-cols-4 gap-1.5">
              <Tile label="Jobs today" value={String(JOBS.length)} />
              <Tile label="Overdue invoices" value={String(OVERDUE.length)} sub={money(OVERDUE_TOTAL)} warn />
              <Tile label="Leads to follow up" value={String(LEADS.length)} />
              <Tile label="Cash" value={money(CASH)} />
            </div>
            <div className="grid gap-1.5 sm:grid-cols-2">
              <Card title="Overdue invoices">
                {OVERDUE.map((o) => (
                  <li key={o.invoice} className="flex items-center gap-1.5 rounded bg-muted px-1.5 py-1 text-[8px]">
                    <span className="min-w-0 flex-1 truncate font-medium">{o.invoice}</span>
                    <span className="tabular-nums">{money(o.amount)}</span>
                    <span className="rounded-full bg-amber-50 px-1 text-[7px] font-semibold tabular-nums text-amber-800">{`${o.days}d`}</span>
                  </li>
                ))}
              </Card>
              <Card title="Leads to follow up">
                {LEADS.map((l) => (
                  <li key={l.need} className="flex items-center gap-1.5 rounded bg-muted px-1.5 py-1 text-[8px]">
                    <span className="min-w-0 flex-1 truncate font-medium">{l.need}</span>
                    <span className="truncate text-muted-foreground">{l.source}</span>
                    <span className="rounded-full bg-tint px-1 text-[7px] font-semibold tabular-nums text-primary">{`${l.days}d`}</span>
                  </li>
                ))}
              </Card>
            </div>
          </div>
        </div>
      </div>
      <div className="h-2.5 rounded-b-md bg-slate-700 shadow-[0_18px_40px_-20px_rgba(15,30,51,0.45)]" />
      <div className="mx-auto h-1 w-[18%] rounded-b-md bg-slate-600" />
    </div>
  );
}

export function DevicesB() {
  return (
    <Section id="any-screen">
      <SectionHead
        eyebrow="Custom software"
        title="One view of your business, on any screen."
      />
      <div className="relative mt-10">
        <p className="sr-only">Illustration: three device screens.</p>
        <div className="grid items-end gap-8 sm:grid-cols-2 lg:grid-cols-[auto_auto_1fr] lg:gap-10">
          <AndroidPhone />
          <IosPhone />
          <Laptop />
        </div>
        <div className="mt-6 flex justify-center">
          <IllustrativeBadge sample />
        </div>
      </div>
    </Section>
  );
}
