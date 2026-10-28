import Link from "next/link";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Small building blocks for the mock scenes. Everything is sample data. */
/* ------------------------------------------------------------------ */

function Pane({
  tone,
  label,
  children,
  className,
}: {
  tone: "before" | "after";
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  const before = tone === "before";
  return (
    <div
      className={cn(
        "relative flex min-h-[220px] flex-col p-4 sm:p-5",
        before ? "bg-[#eceff3] text-ink/60" : "bg-ink text-white",
        className
      )}
    >
      <p
        className={cn(
          "mb-3 text-[0.68rem] font-bold uppercase tracking-[0.16em]",
          before ? "text-ink/45" : "text-brand"
        )}
      >
        {label}
      </p>
      <div className="flex-1">{children}</div>
    </div>
  );
}

/** Grey text placeholder bars standing in for words. */
function Lines({ widths, className }: { widths: string[]; className?: string }) {
  return (
    <div className={cn("grid gap-1.5", className)}>
      {widths.map((w, i) => (
        <span key={i} className="block h-1.5 rounded-full bg-current opacity-30" style={{ width: w }} />
      ))}
    </div>
  );
}

function Tag({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-sm px-1.5 py-0.5 text-[0.66rem] font-semibold",
        dark ? "bg-white/10 text-white" : "bg-ink/10 text-ink/70"
      )}
    >
      {children}
    </span>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8.5l3 3 7-7" />
    </svg>
  );
}

function Cross() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  );
}

function Arrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("h-4 w-4", className)} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Scene 1: AI in marketing                                            */
/* ------------------------------------------------------------------ */

function MarketingBefore() {
  return (
    <div className="grid gap-3">
      <div className="grid grid-cols-3 gap-2">
        {["Ads", "Web forms", "CRM"].map((t) => (
          <div key={t} className="rounded-sm border border-dashed border-ink/30 bg-white/60 p-2">
            <p className="text-[0.7rem] font-bold">{t}</p>
            <Lines widths={["80%", "55%"]} className="mt-1.5" />
          </div>
        ))}
      </div>
      <div className="rounded-sm border border-ink/15 bg-white/70 p-2">
        <p className="text-[0.7rem] font-bold">Which leads came from where?</p>
        <div className="mt-1.5 grid grid-cols-4 gap-1 text-center text-[0.68rem] font-semibold">
          {["?", "?", "?", "?"].map((q, i) => (
            <span key={i} className="rounded-sm bg-ink/10 py-1">{q}</span>
          ))}
        </div>
      </div>
      <p className="flex items-center gap-1.5 text-[0.72rem] font-semibold text-[#b42318]">
        <Cross /> Follow-up sat all weekend
      </p>
    </div>
  );
}

const LEAD_BARS = [
  { label: "Google", v: 78 },
  { label: "Referral", v: 56 },
  { label: "Meta", v: 41 },
  { label: "Walk-in", v: 22 },
];

function MarketingAfter() {
  return (
    <div className="grid gap-3 sm:grid-cols-[1.1fr_1fr]">
      <div className="rounded-sm bg-white/5 p-3">
        <p className="text-[0.7rem] font-semibold text-white/70">Leads by source</p>
        <div className="mt-2 grid gap-1.5">
          {LEAD_BARS.map((b) => (
            <div key={b.label} className="grid grid-cols-[52px_1fr] items-center gap-2 text-[0.68rem]">
              <span className="text-white/70">{b.label}</span>
              <span className="block h-2 rounded-r-[4px] bg-brand" style={{ width: `${b.v}%` }} />
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-sm bg-white/5 p-3">
        <p className="flex items-center justify-between text-[0.7rem] font-semibold text-white/70">
          AI draft reply <Tag dark>Ready</Tag>
        </p>
        <Lines widths={["95%", "88%", "70%"]} className="mt-2 text-white" />
        <p className="mt-2 flex items-center gap-1.5 text-[0.72rem] font-semibold text-brand">
          <Check /> Sent within minutes
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Scene 2: AI in operations                                           */
/* ------------------------------------------------------------------ */

const NOTES = [
  { t: "Call back re: job #", rot: "-rotate-3", c: "bg-[#fde68a]" },
  { t: "Crew B — Thurs?", rot: "rotate-2", c: "bg-[#fbcfe8]" },
  { t: "Retype into QB", rot: "-rotate-1", c: "bg-[#bae6fd]" },
  { t: "Where's the PO", rot: "rotate-3", c: "bg-[#fde68a]" },
];

function OpsBefore() {
  return (
    <div className="grid gap-3">
      <div className="grid grid-cols-2 gap-2">
        {NOTES.map((n) => (
          <div key={n.t} className={cn("p-2 text-[0.7rem] font-semibold text-ink/70 shadow-sm", n.rot, n.c)}>
            {n.t}
          </div>
        ))}
      </div>
      <p className="flex items-center gap-1.5 text-[0.72rem] font-semibold text-[#b42318]">
        <Cross /> Typed in three places
      </p>
    </div>
  );
}

const FLOW = ["Order in", "Scheduled", "Crew notified", "Invoice out"];

function OpsAfter() {
  return (
    <div className="grid gap-4">
      <ol className="grid grid-cols-2 gap-x-3 gap-y-2.5">
        {FLOW.map((f, i) => (
          <li key={f} className="flex items-center gap-2">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-[0.7rem] font-bold text-white">
              {i + 1}
            </span>
            <span className="text-[0.72rem] font-semibold leading-tight">{f}</span>
            {i % 2 === 0 && <Arrow className="ml-auto shrink-0 text-brand/70" />}
          </li>
        ))}
      </ol>
      <div className="rounded-sm bg-white/5 p-3">
                <div className="mt-2 grid grid-cols-3 gap-1.5">
          {["Crew A", "Crew B", "Crew C"].map((c, i) => (
            <div key={c} className="rounded-sm bg-white/10 p-1.5">
              <p className="text-[0.66rem] font-semibold">{c}</p>
              <Lines widths={i === 1 ? ["90%", "60%", "75%"] : ["80%", "70%"]} className="mt-1 text-white" />
            </div>
          ))}
        </div>
        <p className="mt-2 flex items-center gap-1.5 text-[0.72rem] font-semibold text-brand">
          <Check /> Entered once
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Scene 3: Finance and numbers                                        */
/* ------------------------------------------------------------------ */

function FinanceBefore() {
  return (
    <div className="grid gap-3">
      <div className="grid grid-cols-2 gap-2">
        {["Export 1.csv", "Export 2.xlsx", "Export 3.csv", "Export 4.pdf"].map((f) => (
          <div key={f} className="rounded-sm border border-ink/15 bg-white/70 p-2">
            <p className="truncate text-[0.68rem] font-bold">{f}</p>
            <Lines widths={["70%", "50%", "85%"]} className="mt-1.5" />
          </div>
        ))}
      </div>
      <p className="flex items-center gap-1.5 text-[0.72rem] font-semibold text-[#b42318]">
        <Cross /> Four reports, three different totals
      </p>
    </div>
  );
}

const SPARK = [18, 22, 20, 26, 25, 31, 29, 36, 34, 40];

function Sparkline() {
  const w = 120;
  const h = 32;
  const max = Math.max(...SPARK);
  const pts = SPARK.map((v, i) => `${(i / (SPARK.length - 1)) * w},${h - (v / max) * h}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} aria-hidden="true" className="h-8 w-full" preserveAspectRatio="none">
      <polyline points={pts} fill="none" stroke="#4a90e2" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

const TILES = [
  { k: "Revenue", v: "$1,234" },
  { k: "Margin", v: "12.3%" },
  { k: "Cash", v: "$5,678" },
];

function FinanceAfter() {
  return (
    <div className="grid gap-3">
      <div className="grid grid-cols-3 gap-2">
        {TILES.map((t) => (
          <div key={t.k} className="rounded-sm bg-white/5 p-2.5">
            <p className="text-[0.66rem] font-semibold text-white/60">{t.k}</p>
            <p className="font-display text-base font-extrabold tabular-nums tracking-tight sm:text-lg">{t.v}</p>
          </div>
        ))}
      </div>
      <div className="rounded-sm bg-white/5 p-3">
        <p className="flex items-center justify-between text-[0.7rem] font-semibold text-white/70">
          Owner scorecard <Tag dark>Updates itself</Tag>
        </p>
        <div className="mt-2">
          <Sparkline />
        </div>
        <p className="mt-2 flex items-center gap-1.5 text-[0.72rem] font-semibold text-brand">
          <Check /> One number everyone agrees on
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Scene 4: Customer service                                           */
/* ------------------------------------------------------------------ */

function ServiceBefore() {
  return (
    <div className="grid gap-3">
      <div className="grid gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-2 rounded-sm border border-ink/15 bg-white/70 px-2 py-1.5">
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#b42318]" />
            <Lines widths={[i % 2 ? "70%" : "55%"]} className="flex-1" />
            <span className="text-[0.62rem] font-semibold text-ink/50">{i === 3 ? "Missed call" : "Unread"}</span>
          </div>
        ))}
      </div>
      <p className="flex items-center gap-1.5 text-[0.72rem] font-semibold text-[#b42318]">
        <Cross /> Who answers, and when?
      </p>
    </div>
  );
}

const TRIAGE = [
  { tag: "Billing", who: "Draft ready" },
  { tag: "Scheduling", who: "Booked" },
  { tag: "Urgent", who: "Sent to you" },
];

function ServiceAfter() {
  return (
    <div className="grid gap-3">
      <div className="flex items-center gap-2 text-[0.7rem] font-semibold text-white/70">
        <span className="rounded-sm bg-white/10 px-2 py-1">Email · Phone · Web chat</span>
        <Arrow className="text-brand" />
        <span className="rounded-sm bg-brand px-2 py-1 text-white">AI sorts it</span>
      </div>
      <ul className="grid gap-1.5">
        {TRIAGE.map((t) => (
          <li key={t.tag} className="flex items-center gap-2 rounded-sm bg-white/5 px-2.5 py-2">
            <Tag dark>{t.tag}</Tag>
            <Lines widths={["60%"]} className="flex-1 text-white" />
            <span className="flex items-center gap-1 text-[0.68rem] font-semibold text-brand">
              <Check /> {t.who}
            </span>
          </li>
        ))}
      </ul>
      <p className="text-[0.72rem] font-semibold text-white/70">A person approves every reply.</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* The section                                                         */
/* ------------------------------------------------------------------ */

const SCENES = [
  {
    n: "01",
    title: "AI in marketing",
    caption: "Every lead in one place, first reply drafted for you.",
    before: <MarketingBefore />,
    after: <MarketingAfter />,
  },
  {
    n: "02",
    title: "AI in operations",
    caption: "Entered once, it flows to the schedule, the crew and the invoice.",
    before: <OpsBefore />,
    after: <OpsAfter />,
  },
  {
    n: "03",
    title: "Finance and numbers",
    caption: "One scorecard fed by accounting and sales. Month-end is a glance.",
    before: <FinanceBefore />,
    after: <FinanceAfter />,
  },
  {
    n: "04",
    title: "Customer service",
    caption: "Messages sorted and drafted in your voice. Your team stays in control.",
    before: <ServiceBefore />,
    after: <ServiceAfter />,
  },
];

export function UseCasesC() {
  return (
    <section id="use-cases" className="bg-tint py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-4 md:grid-cols-12 md:items-end">
          <p className="eyebrow md:col-span-3">Where it shows up</p>
          <h2 className="text-3xl font-bold leading-[1.1] sm:text-4xl md:col-span-9 md:text-5xl">
            Before and after, in four parts of your business.
          </h2>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-10">
          {SCENES.map((s, i) => (
            <figure
              key={s.n}
              className={cn("grid overflow-hidden border border-border bg-background", i % 2 === 1 && "lg:mt-16")}
            >
              <figcaption className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-5 pt-5 pb-4">
                <h3 className="flex items-baseline gap-3 font-display text-2xl font-extrabold tracking-tight">
                  <span className="text-brand">{s.n}</span>
                  {s.title}
                </h3>
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Illustrative example
                </span>
              </figcaption>
              <div className="grid sm:grid-cols-2">
                <Pane tone="before" label="Before">
                  {s.before}
                </Pane>
                <Pane tone="after" label="After">
                  {s.after}
                </Pane>
              </div>
              <p className="px-5 py-4 text-[0.95rem] leading-snug text-muted-foreground">{s.caption}</p>
            </figure>
          ))}
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          Sample data, not client results.{" "}
          <Link href="/work" className="font-semibold text-primary hover:text-primary/80">
            Read real case studies &rarr;
          </Link>
        </p>
      </div>
    </section>
  );
}
