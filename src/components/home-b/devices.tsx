import { Section, SectionHead } from "@/components/shared/section";
import { IllustrativeBadge, Spark } from "./mock-ui";
import { cn } from "@/lib/utils";

/**
 * "One view on any screen": the same owner overview rendered on an
 * Android-style phone, an iPhone-style phone and a laptop dashboard.
 * Generic device frames only, no vendor logos or trademarked UI.
 * All numbers are placeholder sample data.
 */

const KPIS = [
  { label: "Revenue (month)", value: "$84,200", delta: "+6% vs last month" },
  { label: "Leads", value: "132", delta: "+18 this week" },
  { label: "Jobs", value: "47", delta: "open · 12 this week" },
  { label: "Cash on hand", value: "$61,500", delta: "as of today" },
];

const TREND = [38, 46, 42, 55, 61, 58, 70, 76];

const JOBS = [
  { name: "Harbour St fit-out", stage: "In progress", due: "Thu" },
  { name: "Mills & Co. service", stage: "Scheduled", due: "Fri" },
  { name: "Rivera kitchen", stage: "Quote sent", due: "Mon" },
];

function Kpi({ label, value, delta, compact }: { label: string; value: string; delta?: string; compact?: boolean }) {
  return (
    <div className={cn("grid gap-0.5 rounded-md border border-border bg-background", compact ? "p-1.5" : "p-2.5")}>
      <span className={cn("font-medium uppercase tracking-[0.05em] text-muted-foreground", compact ? "text-[7px]" : "text-[10px]")}>
        {label}
      </span>
      <span className={cn("font-display font-extrabold tabular-nums tracking-tight", compact ? "text-[11px]" : "text-base")}>
        {value}
      </span>
      {!compact && delta && <span className="text-[10px] tabular-nums text-muted-foreground">{delta}</span>}
    </div>
  );
}

/** Compact owner overview used inside both phones. */
function PhoneOverview() {
  return (
    <div className="grid gap-1.5 bg-muted p-2">
      <div className="flex items-center justify-between px-0.5">
        <span className="text-[8px] font-bold">Owner overview</span>
        <span className="text-[7px] text-muted-foreground">Today</span>
      </div>
      <div className="grid grid-cols-2 gap-1">
        {KPIS.map((k) => (
          <Kpi key={k.label} {...k} compact />
        ))}
      </div>
      <div className="rounded-md border border-border bg-background p-1.5">
        <span className="block text-[7px] font-medium uppercase tracking-[0.05em] text-muted-foreground">Revenue trend</span>
        <Spark points={TREND} className="h-7" />
      </div>
    </div>
  );
}

/** Android-style frame: squarer corners, punch-hole camera, three-button nav. */
function AndroidPhone() {
  return (
    <div className="mx-auto w-full max-w-[150px] sm:max-w-[160px]" aria-hidden="true">
      <div className="rounded-[18px] border-[6px] border-slate-800 bg-slate-800 shadow-[0_18px_40px_-20px_rgba(15,30,51,0.45)]">
        <div className="relative overflow-hidden rounded-[12px] bg-muted">
          <div className="relative flex h-5 items-center justify-between bg-muted px-2 text-[6px] text-muted-foreground">
            <span>9:41</span>
            <span className="absolute left-1/2 top-1.5 h-2 w-2 -translate-x-1/2 rounded-full bg-slate-800" />
            <span className="flex gap-0.5">
              <i className="block h-1.5 w-1.5 rounded-[1px] bg-slate-400" />
              <i className="block h-1.5 w-2.5 rounded-[1px] bg-slate-400" />
            </span>
          </div>
          <PhoneOverview />
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
          <div className="relative flex h-5 items-center justify-between bg-muted px-2.5 text-[6px] text-muted-foreground">
            <span>9:41</span>
            <span className="absolute left-1/2 top-1 h-2.5 w-8 -translate-x-1/2 rounded-full bg-slate-900" />
            <span className="flex gap-0.5">
              <i className="block h-1.5 w-1.5 rounded-[1px] bg-slate-400" />
              <i className="block h-1.5 w-2.5 rounded-[1px] bg-slate-400" />
            </span>
          </div>
          <PhoneOverview />
          <div className="flex h-4 items-center justify-center bg-muted">
            <i className="block h-0.5 w-9 rounded-full bg-slate-400" />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Laptop frame with the fuller dashboard. Key numbers match the phones. */
function Laptop() {
  return (
    <div className="mx-auto w-full min-w-0 max-w-[460px] sm:col-span-2 lg:col-span-1" aria-hidden="true">
      <div className="rounded-t-xl border-[5px] border-b-0 border-slate-800 bg-slate-800 pb-0">
        <div className="overflow-hidden rounded-t-lg bg-background">
          <div className="flex items-center gap-2 border-b border-border bg-muted px-2.5 py-1.5">
            <span className="flex gap-1">
              <i className="block h-1.5 w-1.5 rounded-full bg-tint-strong" />
              <i className="block h-1.5 w-1.5 rounded-full bg-tint-strong" />
              <i className="block h-1.5 w-1.5 rounded-full bg-tint-strong" />
            </span>
            <span className="text-[9px] font-medium text-muted-foreground">Owner overview</span>
          </div>
          <div className="grid gap-2 bg-muted p-2.5">
            <div className="grid grid-cols-4 gap-1.5">
              {KPIS.map((k) => (
                <Kpi key={k.label} {...k} />
              ))}
            </div>
            <div className="grid gap-1.5 sm:grid-cols-[1.3fr_1fr]">
              <div className="rounded-md border border-border bg-background p-2">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-medium uppercase tracking-[0.05em] text-muted-foreground">Revenue trend</span>
                  <span className="text-[9px] text-muted-foreground">8 weeks</span>
                </div>
                <Spark points={TREND} className="h-14" />
              </div>
              <div className="rounded-md border border-border bg-background p-2">
                <span className="block text-[9px] font-medium uppercase tracking-[0.05em] text-muted-foreground">Jobs this week</span>
                <ul className="mt-1 grid gap-1">
                  {JOBS.map((j) => (
                    <li key={j.name} className="flex items-center justify-between gap-2 text-[9px]">
                      <span className="truncate font-medium">{j.name}</span>
                      <span className="shrink-0 text-muted-foreground">{j.stage} · {j.due}</span>
                    </li>
                  ))}
                </ul>
              </div>
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
        lede="We build custom software that runs on phones and dashboards, so owners see the whole business wherever they are."
      />
      <div className="relative mt-10">
        <p className="sr-only">
          Illustration: the same owner overview on an Android-style phone, an iPhone-style phone and a laptop. Sample data:
          revenue $84,200 this month, 132 leads, 47 open jobs, $61,500 cash on hand.
        </p>
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
