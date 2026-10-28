import Link from "next/link";
import { Fragment } from "react";
import { AlertTriangle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { SceneTabs, type SceneTab } from "@/components/home-c/scene-tabs";

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
        "relative flex min-h-[220px] min-w-0 flex-col p-4 sm:p-5",
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
      <div className="min-w-0 flex-1">{children}</div>
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

function Cross() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  );
}

/** Compact report table on the dark pane. Scrolls sideways on narrow screens. */
function DataTable({
  head,
  rows,
  foot,
  minW,
}: {
  head: string[];
  rows: string[][];
  foot?: string[];
  minW?: string;
}) {
  return (
    <div className="-mx-1 overflow-x-auto px-1">
      <table className={cn("w-full border-collapse text-[0.68rem] tabular-nums", minW ?? "min-w-[240px]")}>
        <thead>
          <tr className="text-left text-white/55">
            {head.map((h, i) => (
              <th key={h} scope="col" className={cn("pb-1.5 font-semibold", i > 0 && "text-right")}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]} className="border-t border-white/10">
              {r.map((c, i) => (
                <td key={i} className={cn("py-1.5 pr-2 whitespace-nowrap", i > 0 && "text-right pr-0 pl-2")}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        {foot && (
          <tfoot>
            <tr className="border-t border-white/25 font-bold">
              {foot.map((c, i) => (
                <td key={i} className={cn("pt-1.5 pr-2 whitespace-nowrap", i > 0 && "text-right pr-0 pl-2")}>
                  {c}
                </td>
              ))}
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}

function Stat({ k, v, sub }: { k: string; v: string; sub?: string }) {
  return (
    <div className="min-w-0 rounded-sm bg-white/5 p-2.5">
      <p className="text-[0.64rem] font-semibold text-white/60">{k}</p>
      <p className="font-display text-base font-extrabold tabular-nums tracking-tight sm:text-lg">{v}</p>
      {sub && <p className="text-[0.62rem] text-white/50 tabular-nums">{sub}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Scene 1: AI in marketing                                            */
/* Spend / leads / sales per source. CPS = spend ÷ sales, rounded to   */
/* whole dollars.                                                      */
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
          {[0, 1, 2].map((i) => (
            <span key={i} aria-hidden="true" className="rounded-sm bg-ink/10 py-1 before:content-['?']" />
          ))}
        </div>
      </div>
    </div>
  );
}

const SOURCES = [
  { src: "Google Ads", spend: 4200, leads: 84, sales: 21 },
  { src: "Meta", spend: 2400, leads: 60, sales: 10 },
  { src: "Referral", spend: 600, leads: 24, sales: 12 },
];
const MKT_SPEND = SOURCES.reduce((a, s) => a + s.spend, 0); // 7,200
const MKT_LEADS = SOURCES.reduce((a, s) => a + s.leads, 0); // 168
const MKT_SALES = SOURCES.reduce((a, s) => a + s.sales, 0); // 43

const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

function MarketingAfter() {
  return (
    <div className="rounded-sm bg-white/5 p-3">
      <p className="mb-2 flex items-center justify-between text-[0.7rem] font-semibold text-white/70">
        Leads by source
      </p>
      <DataTable
        minW="min-w-[240px]"
        head={["Source", "Spend", "Leads", "Sales", "CPS"]}
        rows={SOURCES.map((s) => [s.src, usd(s.spend), String(s.leads), String(s.sales), usd(s.spend / s.sales)])}
        foot={["Total", usd(MKT_SPEND), String(MKT_LEADS), String(MKT_SALES), usd(MKT_SPEND / MKT_SALES)]}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Scene 2: Operations funnel                                          */
/* Stage counts are the source of truth. Every drop-off % and "x of y" */
/* warning below is computed from them, never typed by hand.           */
/* ------------------------------------------------------------------ */

const FUNNEL = [
  { label: "Inquiries", count: 400 },
  { label: "Quotes sent", count: 180 },
  { label: "Jobs won", count: 60 },
  { label: "Repeat customers", count: 22 },
];

/** What stalls between stage i and stage i+1, and the fix for it. */
const STALLS: { warn: (lost: number, from: number, pct: number) => string; fix: string }[] = [
  { warn: (lost, from, pct) => `${lost} of ${from} inquiries (${pct}%) never quoted`, fix: "Instant quote" },
  { warn: (lost, from, pct) => `Quotes sit 9 days, no follow-up. ${lost} of ${from} (${pct}%) never won`, fix: "Auto follow-up" },
  { warn: (lost, from, pct) => `${lost} of ${from} customers (${pct}%) never rebook`, fix: "Repeat reminder" },
];

const DROPS = FUNNEL.slice(0, -1).map((s, i) => {
  const next = FUNNEL[i + 1].count;
  const lost = s.count - next; // 220, 120, 38
  const pct = Math.round((lost / s.count) * 100); // 55, 67, 63
  return { lost, pct, warn: STALLS[i].warn(lost, s.count, pct), fix: STALLS[i].fix };
});

function FunnelStage({ s }: { s: (typeof FUNNEL)[number] }) {
  const width = `${(s.count / FUNNEL[0].count) * 100}%`;
  return (
    <div className="rounded-sm bg-white/5 p-3">
      <p className="text-[0.66rem] font-semibold text-white/60">{s.label}</p>
      <p className="font-display text-xl font-extrabold tabular-nums tracking-tight sm:text-2xl">{s.count}</p>
      <span className="mt-1.5 block h-1.5 w-full rounded-full bg-white/10">
        <span className="block h-full rounded-full bg-brand" style={{ width }} />
      </span>
    </div>
  );
}

function FunnelDrop({ d }: { d: (typeof DROPS)[number] }) {
  return (
    <div className="relative grid gap-1.5 border-l-2 border-dashed border-white/25 py-1 pl-3 lg:border-l-0 lg:border-t-2 lg:px-1 lg:pt-3">
      <p className="text-[0.68rem] font-bold text-[#fcd34d] tabular-nums">{`${d.pct}% drop`}</p>
      <p className="flex items-start gap-1 text-[0.64rem] font-semibold leading-snug text-[#fde68a]">
        <AlertTriangle className="mt-px h-3 w-3 shrink-0" role="img" aria-label="Stall" />
        {d.warn}
      </p>
      <p className="inline-flex w-fit items-center gap-1 rounded-sm bg-brand px-1.5 py-1 text-[0.62rem] font-semibold leading-tight text-white">
        <Sparkles className="h-3 w-3 shrink-0" role="img" aria-label="Fix" />
        {d.fix}
      </p>
    </div>
  );
}

function Funnel() {
  return (
    <div className="grid gap-3">
      <ol className="grid gap-2 lg:grid-cols-[4fr_5fr_4fr_5fr_4fr_5fr_4fr] lg:items-start lg:gap-2">
        {FUNNEL.map((s, i) => (
          <Fragment key={s.label}>
            <li className="list-none">
              <FunnelStage s={s} />
            </li>
            {i < DROPS.length && (
              <li className="list-none" aria-label={`Between ${s.label} and ${FUNNEL[i + 1].label}`}>
                <FunnelDrop d={DROPS[i]} />
              </li>
            )}
          </Fragment>
        ))}
      </ol>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Scene 3: Finance and numbers                                        */
/* One home-services company, margin by job type.                      */
/* Margin $ = revenue − cost. Margin % = margin ÷ revenue, rounded.    */
/* Exactly one job type loses money; the leak callout quotes its loss. */
/* ------------------------------------------------------------------ */

function FinanceBefore() {
  return (
    <div className="grid gap-3">
      <div className="grid grid-cols-2 gap-2">
        {["Sales.csv", "Jobs.xlsx", "Payroll.csv", "Bank.pdf"].map((f) => (
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

const JOB_TYPES = [
  { job: "Installs", rev: 48000, cost: 36000 },
  { job: "Repairs", rev: 22500, cost: 13500 },
  { job: "Maintenance", rev: 9600, cost: 5760 },
  { job: "Emergency calls", rev: 6400, cost: 8000 },
];
const FIN_REV = JOB_TYPES.reduce((a, s) => a + s.rev, 0); // 86,500
const FIN_COST = JOB_TYPES.reduce((a, s) => a + s.cost, 0); // 63,260
const margin = (rev: number, cost: number) => rev - cost;
const pct = (rev: number, cost: number) => `${Math.round((margin(rev, cost) / rev) * 100)}%`;
const signed = (n: number) => (n < 0 ? `−${usd(-n)}` : usd(n));
const LEAK = JOB_TYPES.find((s) => margin(s.rev, s.cost) < 0)!; // Emergency calls, −$1,600

function FinanceAfter() {
  return (
    <div className="grid gap-3">
      <div className="rounded-sm bg-white/5 p-3">
        <p className="flex items-center justify-between text-[0.7rem] font-semibold text-white/70">
          Margin by job type <span className="text-white/45">September</span>
        </p>
        <div className="mt-2 -mx-1 overflow-x-auto px-1">
          <table className="w-full min-w-[300px] border-collapse text-[0.68rem] tabular-nums">
            <thead>
              <tr className="text-left text-white/55">
                {["Job type", "Revenue", "Cost", "Margin", "%"].map((h, i) => (
                  <th key={h} scope="col" className={cn("pb-1.5 font-semibold", i > 0 && "text-right")}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {JOB_TYPES.map((s) => {
                const m = margin(s.rev, s.cost);
                const loss = m < 0;
                return (
                  <tr key={s.job} className={cn("border-t border-white/10", loss && "font-bold text-[#fca5a5]")}>
                    <td className="py-1.5 pr-2 whitespace-nowrap">{s.job}</td>
                    <td className="py-1.5 pl-2 text-right whitespace-nowrap">{usd(s.rev)}</td>
                    <td className="py-1.5 pl-2 text-right whitespace-nowrap">{usd(s.cost)}</td>
                    <td className="py-1.5 pl-2 text-right whitespace-nowrap">{signed(m)}</td>
                    <td className="py-1.5 pl-2 text-right whitespace-nowrap">{pct(s.rev, s.cost)}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="border-t border-white/25 font-bold">
                <td className="pt-1.5 pr-2">Total</td>
                <td className="pt-1.5 pl-2 text-right whitespace-nowrap">{usd(FIN_REV)}</td>
                <td className="pt-1.5 pl-2 text-right whitespace-nowrap">{usd(FIN_COST)}</td>
                <td className="pt-1.5 pl-2 text-right whitespace-nowrap">{signed(margin(FIN_REV, FIN_COST))}</td>
                <td className="pt-1.5 pl-2 text-right whitespace-nowrap">{pct(FIN_REV, FIN_COST)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <p className="flex items-start gap-2 rounded-sm border border-[#fca5a5]/40 bg-[#fca5a5]/10 p-2.5 text-[0.72rem] leading-snug">
        <AlertTriangle className="mt-px h-3.5 w-3.5 shrink-0 text-[#fca5a5]" aria-hidden="true" />
        <span>
          <strong className="text-[#fca5a5]">Here&rsquo;s the leak:</strong> {LEAK.job.toLowerCase()} lost{" "}
          <strong className="tabular-nums">{usd(-margin(LEAK.rev, LEAK.cost))}</strong> in September.
        </span>
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Scene 4: Customer service                                           */
/* Resolution rate = resolved ÷ tickets.                               */
/* ------------------------------------------------------------------ */

function ServiceBefore() {
  return (
    <div className="grid gap-3">
      <div className="grid gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-2 rounded-sm border border-ink/15 bg-white/70 px-2 py-1.5">
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#b42318]" />
            <Lines widths={[i % 2 ? "70%" : "55%"]} className="flex-1" />
            <span className="text-[0.62rem] font-semibold text-ink/50">{i === 2 ? "Missed call" : "Unread"}</span>
          </div>
        ))}
      </div>
      <p className="flex items-center gap-1.5 text-[0.72rem] font-semibold text-[#b42318]">
        <Cross /> Who answers, and when?
      </p>
    </div>
  );
}

const WEEKS = [
  { wk: "Wk 1", tickets: 142, resolved: 131 },
  { wk: "Wk 2", tickets: 156, resolved: 144 },
  { wk: "Wk 3", tickets: 138, resolved: 127 },
  { wk: "Wk 4", tickets: 164, resolved: 150 },
];
const SVC_TICKETS = WEEKS.reduce((a, w) => a + w.tickets, 0); // 600
const SVC_RESOLVED = WEEKS.reduce((a, w) => a + w.resolved, 0); // 552
const MAX_TICKETS = Math.max(...WEEKS.map((w) => w.tickets));
const rate = (resolved: number, tickets: number) => `${Math.round((resolved / tickets) * 100)}%`;

function ServiceAfter() {
  return (
    <div className="grid gap-3">
      <div className="grid grid-cols-2 gap-2">
        <Stat k="Median response" v="14 min" />
        <Stat k="Resolution rate" v={rate(SVC_RESOLVED, SVC_TICKETS)} sub={`${SVC_RESOLVED}/${SVC_TICKETS}`} />
      </div>
      <div className="rounded-sm bg-white/5 p-3">
        <p className="flex items-center justify-between text-[0.7rem] font-semibold text-white/70">
          Tickets/resolved
        </p>
        <div className="mt-2 grid gap-1.5">
          {WEEKS.map((w) => (
            <div key={w.wk} className="grid grid-cols-[36px_1fr_auto] items-center gap-2 text-[0.68rem]">
              <span className="text-white/70">{w.wk}</span>
              <span className="block h-2 rounded-r-[4px] bg-brand" style={{ width: `${(w.tickets / MAX_TICKETS) * 100}%` }} />
              <span className="whitespace-nowrap text-right tabular-nums">
                {w.tickets}<span className="text-white/50">/{w.resolved}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* The section                                                         */
/* ------------------------------------------------------------------ */

type Scene = {
  n: string;
  label: string;
} & ({ before: React.ReactNode; after: React.ReactNode; full?: never } | { full: React.ReactNode; before?: never; after?: never });

const SCENES: Scene[] = [
  { n: "01", label: "Sales & Marketing", before: <MarketingBefore />, after: <MarketingAfter /> },
  { n: "02", label: "Operations", full: <Funnel /> },
  { n: "03", label: "Finance", before: <FinanceBefore />, after: <FinanceAfter /> },
  { n: "04", label: "Customer Service", before: <ServiceBefore />, after: <ServiceAfter /> },
];

function ScenePanel({ s }: { s: Scene }) {
  return (
    <figure className="grid min-w-0 overflow-hidden border border-border bg-background">
      <figcaption className="px-5 pt-4 pb-3 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        Illustrative example · sample data
      </figcaption>
      {s.full ? (
        <Pane tone="after" label="Funnel">
          {s.full}
        </Pane>
      ) : (
        <div className="grid min-w-0 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <Pane tone="before" label="Before">
            {s.before}
          </Pane>
          <Pane tone="after" label="After">
            {s.after}
          </Pane>
        </div>
      )}
    </figure>
  );
}

const TABS: SceneTab[] = SCENES.map((s) => ({ n: s.n, label: s.label, panel: <ScenePanel s={s} /> }));

export function UseCasesC() {
  return (
    <section id="use-cases" className="bg-tint py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-4 md:grid-cols-12 md:items-end">
          <p className="eyebrow md:col-span-3">Use cases</p>
          <h2 className="text-3xl font-bold leading-[1.1] sm:text-4xl md:col-span-9 md:text-5xl">
            Before and after, across your business.
          </h2>
        </div>

        <div className="mt-10 sm:mt-12">
          <SceneTabs tabs={TABS} />
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          <Link href="/work" className="font-semibold text-primary hover:text-primary/80">
            Real case studies &rarr;
          </Link>
        </p>
      </div>
    </section>
  );
}
