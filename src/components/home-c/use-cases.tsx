import Link from "next/link";
import {
  AlertTriangle,
  FileText,
  MessageSquare,
  RefreshCw,
  Search,
  ShoppingCart,
  Sparkles,
  Wrench,
} from "lucide-react";
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
/* Spend / leads / sales per source. CPL = spend ÷ leads,              */
/* CPS = spend ÷ sales, rounded to whole dollars.                      */
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

const SOURCES = [
  { src: "Google Ads", spend: 4200, leads: 84, sales: 21 },
  { src: "Meta", spend: 2400, leads: 60, sales: 10 },
  { src: "Email", spend: 300, leads: 30, sales: 6 },
  { src: "Referral", spend: 600, leads: 24, sales: 12 },
];
const MKT_SPEND = SOURCES.reduce((a, s) => a + s.spend, 0); // 7,500
const MKT_LEADS = SOURCES.reduce((a, s) => a + s.leads, 0); // 198
const MKT_SALES = SOURCES.reduce((a, s) => a + s.sales, 0); // 49
const MAX_LEADS = Math.max(...SOURCES.map((s) => s.leads));

const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

function MarketingAfter() {
  return (
    <div className="grid gap-3">
      <div className="rounded-sm bg-white/5 p-3">
        <p className="flex items-center justify-between text-[0.7rem] font-semibold text-white/70">
          Leads by source <span className="text-white/45">Last 30 days</span>
        </p>
        <div className="mt-2 grid gap-1.5">
          {SOURCES.map((s) => (
            <div key={s.src} className="grid grid-cols-[68px_1fr_24px] items-center gap-2 text-[0.68rem]">
              <span className="truncate text-white/70">{s.src}</span>
              <span className="block h-2 rounded-r-[4px] bg-brand" style={{ width: `${(s.leads / MAX_LEADS) * 100}%` }} />
              <span className="text-right tabular-nums">{s.leads}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-sm bg-white/5 p-3">
        <DataTable
          minW="min-w-[270px]"
          head={["Source", "Spend", "Leads", "CPL", "Sales", "CPS"]}
          rows={SOURCES.map((s) => [
            s.src,
            usd(s.spend),
            String(s.leads),
            usd(s.spend / s.leads),
            String(s.sales),
            usd(s.spend / s.sales),
          ])}
          foot={[
            "Total",
            usd(MKT_SPEND),
            String(MKT_LEADS),
            usd(MKT_SPEND / MKT_LEADS),
            String(MKT_SALES),
            usd(MKT_SPEND / MKT_SALES),
          ]}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Scene 2: Customer journey                                           */
/* One flow, friction points marked amber, opportunities marked blue.  */
/* ------------------------------------------------------------------ */

type Marker = { kind: "friction" | "opportunity"; text: string };

const JOURNEY: { label: string; icon: React.ReactNode; markers: Marker[] }[] = [
  { label: "Discover", icon: <Search />, markers: [] },
  {
    label: "Inquire",
    icon: <MessageSquare />,
    markers: [
      { kind: "friction", text: "40% drop-off" },
      { kind: "opportunity", text: "Auto follow-up" },
    ],
  },
  {
    label: "Quote",
    icon: <FileText />,
    markers: [
      { kind: "friction", text: "Takes 3 days" },
      { kind: "opportunity", text: "Instant quote" },
    ],
  },
  { label: "Buy", icon: <ShoppingCart />, markers: [] },
  {
    label: "Service",
    icon: <Wrench />,
    markers: [
      { kind: "friction", text: "No review ask" },
      { kind: "opportunity", text: "Review request" },
    ],
  },
  {
    label: "Repeat",
    icon: <RefreshCw />,
    markers: [{ kind: "opportunity", text: "Renewal reminder" }],
  },
];

function MarkerChip({ m }: { m: Marker }) {
  const friction = m.kind === "friction";
  return (
    <span
      className={cn(
        "inline-flex w-full items-center gap-1 rounded-sm px-1.5 py-1 text-[0.62rem] font-semibold leading-tight",
        friction ? "bg-[#fde68a] text-[#7a4b00]" : "bg-brand text-white"
      )}
    >
      {friction ? (
        <AlertTriangle className="h-3 w-3 shrink-0" aria-hidden="true" />
      ) : (
        <Sparkles className="h-3 w-3 shrink-0" aria-hidden="true" />
      )}
      <span className="sr-only">{friction ? "Friction: " : "Opportunity: "}</span>
      {m.text}
    </span>
  );
}

function JourneyMap() {
  return (
    <div className="grid gap-3">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.64rem] font-semibold text-white/60">
        <span className="inline-flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded-sm bg-[#fde68a]" /> Friction
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded-sm bg-brand" /> Opportunity
        </span>
      </div>
      <div className="-mx-4 overflow-x-auto px-4 sm:-mx-5 sm:px-5">
        <ol className="grid min-w-[480px] grid-cols-6 gap-1.5">
          {JOURNEY.map((s, i) => (
            <li key={s.label} className="relative grid content-start gap-2">
              {i < JOURNEY.length - 1 && (
                <span aria-hidden="true" className="absolute top-[18px] left-[calc(50%+22px)] h-px w-[calc(100%-44px)] bg-white/25" />
              )}
              <div className="grid justify-items-center gap-1.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-brand [&>svg]:h-4 [&>svg]:w-4">
                  {s.icon}
                </span>
                <span className="text-[0.72rem] font-bold">{s.label}</span>
              </div>
              {s.markers.map((m) => (
                <MarkerChip key={m.text} m={m} />
              ))}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Scene 3: Finance and numbers                                        */
/* CPA = marketing spend ÷ new customers (same totals as scene 1).     */
/* Margin % = (revenue − cost) ÷ revenue.                              */
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

const SERVICES = [
  { svc: "Installs", rev: 48000, cost: 31200 },
  { svc: "Repairs", rev: 22500, cost: 12150 },
  { svc: "Maintenance", rev: 9600, cost: 3840 },
];
const FIN_REV = SERVICES.reduce((a, s) => a + s.rev, 0); // 80,100
const FIN_COST = SERVICES.reduce((a, s) => a + s.cost, 0); // 47,190
const pct = (rev: number, cost: number) => `${Math.round(((rev - cost) / rev) * 100)}%`;

function FinanceAfter() {
  return (
    <div className="grid gap-3">
      <div className="grid grid-cols-3 gap-2">
        <Stat k="Marketing spend" v={usd(MKT_SPEND)} />
        <Stat k="New customers" v={String(MKT_SALES)} />
        <Stat k="Cost per acquisition" v={usd(MKT_SPEND / MKT_SALES)} sub="spend ÷ customers" />
      </div>
      <div className="rounded-sm bg-white/5 p-3">
        <p className="flex items-center justify-between text-[0.7rem] font-semibold text-white/70">
          Margin by service <Tag dark>Updates itself</Tag>
        </p>
        <div className="mt-2">
          <DataTable
            head={["Service", "Revenue", "Cost", "Margin"]}
            rows={SERVICES.map((s) => [s.svc, usd(s.rev), usd(s.cost), pct(s.rev, s.cost)])}
            foot={["Total", usd(FIN_REV), usd(FIN_COST), pct(FIN_REV, FIN_COST)]}
          />
        </div>
      </div>
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
      <div className="grid grid-cols-3 gap-2">
        <Stat k="Median response" v="14 min" />
        <Stat k="Avg response" v="38 min" />
        <Stat k="Resolution rate" v={rate(SVC_RESOLVED, SVC_TICKETS)} sub={`${SVC_RESOLVED} / ${SVC_TICKETS}`} />
      </div>
      <div className="rounded-sm bg-white/5 p-3">
        <p className="flex items-center justify-between text-[0.7rem] font-semibold text-white/70">
          Tickets by week <span className="text-white/45">Last 4 weeks</span>
        </p>
        <div className="mt-2 grid gap-1.5">
          {WEEKS.map((w) => (
            <div key={w.wk} className="grid grid-cols-[36px_1fr_auto] items-center gap-2 text-[0.68rem]">
              <span className="text-white/70">{w.wk}</span>
              <span className="block h-2 rounded-r-[4px] bg-brand" style={{ width: `${(w.tickets / MAX_TICKETS) * 100}%` }} />
              <span className="whitespace-nowrap text-right tabular-nums">
                {w.tickets} <span className="text-white/50">· {w.resolved} resolved</span>
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
  title: string;
  caption: string;
} & ({ before: React.ReactNode; after: React.ReactNode; full?: never } | { full: React.ReactNode; before?: never; after?: never });

const SCENES: Scene[] = [
  {
    n: "01",
    title: "AI in marketing",
    caption: "Every lead in one place, first reply drafted for you.",
    before: <MarketingBefore />,
    after: <MarketingAfter />,
  },
  {
    n: "02",
    title: "Customer journey",
    caption: "Every stage from first click to repeat order, with the stalls marked.",
    full: <JourneyMap />,
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
              className={cn("grid min-w-0 overflow-hidden border border-border bg-background", i % 2 === 1 && "lg:mt-16")}
            >
              <figcaption className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-5 pt-5 pb-4">
                <h3 className="flex items-baseline gap-3 font-display text-2xl font-extrabold tracking-tight">
                  <span className="text-brand">{s.n}</span>
                  {s.title}
                </h3>
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Illustrative example · sample data
                </span>
              </figcaption>
              {s.full ? (
                <Pane tone="after" label="Stage by stage">
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
