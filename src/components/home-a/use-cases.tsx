import { Fragment, type ReactNode } from "react";
import { Section, SectionHead } from "@/components/shared/section";
import { USE_CASES_HEAD } from "./content";
import { UseCaseTabs, type UseCaseTab } from "./use-case-tabs";

// All figures below are invented sample data for illustration. The derived
// columns (cost per sale, drop-off %, margin %, resolution rate) are
// computed from the inputs so the arithmetic always matches.

const usd = (n: number) => `${n < 0 ? "-" : ""}$${Math.abs(Math.round(n)).toLocaleString("en-US")}`;
const pct = (n: number, d: number) => `${((n / d) * 100).toFixed(1)}%`;

/* ---------- Shared chrome (matches the hub-and-spoke scene style) ---------- */

function Frame({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div role="img" aria-label={label} className="min-w-0 max-w-full rounded-xl border-[1.5px] border-tint-strong bg-tint p-3 text-ink">
      {children}
    </div>
  );
}

function Panel({ title, note, className = "", children }: { title?: string; note?: string; className?: string; children: ReactNode }) {
  return (
    <div className={`min-w-0 max-w-full rounded-xl border-[1.5px] border-tint-strong bg-white p-3 ${className}`}>
      {(title || note) && (
        <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5">
          {title && <span className="text-xs font-bold">{title}</span>}
          {note && <span className="text-[10.5px] text-muted-foreground">{note}</span>}
        </div>
      )}
      {children}
    </div>
  );
}

function Tile({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <Panel>
      <div className="text-[10.5px] text-muted-foreground">{label}</div>
      <div className="mt-1 text-xl font-bold leading-none">{value}</div>
      {note && <div className="mt-1.5 text-[10px] text-muted-foreground">{note}</div>}
    </Panel>
  );
}

function Table({
  head,
  rows,
  foot,
  rowClass,
}: {
  head: string[];
  rows: (string | number)[][];
  foot?: (string | number)[];
  rowClass?: (row: (string | number)[]) => string;
}) {
  const cell = (i: number) => (i === 0 ? "text-left" : "text-right");
  return (
    <div className="-mx-3 max-w-[calc(100%+1.5rem)] overflow-x-auto px-3">
      <table className="w-full min-w-[300px] border-collapse text-[11px] leading-tight tabular-nums">
        <thead>
          <tr className="text-[10px] uppercase tracking-[0.04em] text-muted-foreground">
            {head.map((h, i) => (
              <th key={h} className={`whitespace-nowrap pb-1.5 font-semibold ${cell(i)}`}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={String(r[0])} className={`border-t border-tint-strong ${rowClass?.(r) ?? ""}`}>
              {r.map((c, i) => (
                <td key={i} className={`whitespace-nowrap py-1.5 ${cell(i)} ${i === 0 ? "font-medium" : ""}`}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
        {foot && (
          <tfoot>
            <tr className="border-t-2 border-tint-strong font-bold">
              {foot.map((c, i) => (
                <td key={i} className={`whitespace-nowrap pt-1.5 ${cell(i)}`}>{c}</td>
              ))}
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}

/* ---------- Sample data shared by the marketing and finance scenes ---------- */

const SOURCES = [
  { name: "Google Ads", spend: 4200, sales: 12 },
  { name: "Meta", spend: 2400, sales: 6 },
  { name: "Referral", spend: 600, sales: 7 },
];

/** Marketing: leads by source with spend, cost per lead and cost per sale. */
function MarketingScene() {
  const max = Math.max(...SOURCES.map((s) => s.sales));
  return (
    <Frame label="Sample marketing report: sales by source with spend and cost per sale">
      <Panel title="Sales by source">
        <div className="mb-2.5 grid gap-1.5" aria-hidden>
          {SOURCES.map((s) => (
            <div key={s.name} className="h-2.5 rounded bg-tint">
              <span className="block h-full rounded bg-brand" style={{ width: `${(s.sales / max) * 100}%` }} />
            </div>
          ))}
        </div>
        <Table
          head={["Source", "Spend", "Sales", "CPS"]}
          rows={SOURCES.map((s) => [s.name, usd(s.spend), s.sales, usd(s.spend / s.sales)])}
        />
      </Panel>
    </Frame>
  );
}

/** Operations: a four-stage funnel with the drop-off between stages computed from the counts. */
const FUNNEL = [
  { name: "Inquiries", n: 400 },
  { name: "Quotes sent", n: 180 },
  { name: "Jobs won", n: 60 },
  { name: "Repeat customers", n: 22 },
];
/** Stall at each step: what the numbers say, and the fix. Lost counts come from FUNNEL. */
const lost = (i: number) => FUNNEL[i].n - FUNNEL[i + 1].n;
const dropPct = (i: number) => Math.round((lost(i) / FUNNEL[i].n) * 100);
const STALLS = [
  { warn: `${lost(0)} of ${FUNNEL[0].n} never quoted`, opp: "Instant quote" },
  { warn: `Quotes sit 9 days, no follow-up. ${lost(1)} of ${FUNNEL[1].n} never won`, opp: "Auto follow-up" },
  { warn: `${lost(2)} of ${FUNNEL[2].n} don't return`, opp: "Repeat reminder" },
];

function Marker({ kind, text }: { kind: "warn" | "opp"; text: string }) {
  const warn = kind === "warn";
  return (
    <span
      className={`inline-flex max-w-full items-start gap-1 rounded-md px-1.5 py-0.5 text-left text-[10px] font-semibold leading-tight ${
        warn ? "bg-amber-50 text-amber-800 ring-1 ring-amber-300" : "bg-tint text-primary ring-1 ring-brand"
      }`}
    >
      <span aria-hidden className={`mt-px inline-block size-2.5 shrink-0 rounded-full ${warn ? "bg-amber-400" : "bg-brand"}`} />
      {text}
    </span>
  );
}

function FunnelScene() {
  const top = FUNNEL[0].n;
  return (
    <Frame
      label={`Sample sales funnel: ${FUNNEL.map((f) => `${f.name} ${f.n}`).join(", ")}, with the drop-off between stages, where customers stall and the fix at each stall`}
    >
      <Panel>
        {/* Below md: stacked, stage then stall. From md: stages left to right with the stall between. */}
        <div className="grid gap-2 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] md:items-stretch">
          {FUNNEL.map((f, i) => (
            <Fragment key={f.name}>
              <div className="min-w-0 rounded-xl border-[1.5px] border-tint-strong bg-tint p-3">
                <div className="text-[10.5px] text-muted-foreground">{f.name}</div>
                <div className="mt-1 text-xl font-bold leading-none tabular-nums">{f.n}</div>
                <div className="mt-2 h-2 rounded bg-white" aria-hidden>
                  <span className="block h-full rounded bg-brand" style={{ width: `${(f.n / top) * 100}%` }} />
                </div>
              </div>
              {i < FUNNEL.length - 1 && (
                <div className="ml-4 grid content-start justify-items-start gap-1 border-l-2 border-amber-300 py-1 pl-3 md:ml-0 md:w-36 md:content-center md:justify-items-center md:border-0 md:px-1 md:py-0 md:text-center">
                  <span className="text-[11px] font-bold tabular-nums text-amber-800 before:content-['↓_'] md:before:content-none md:after:content-['_→']">{`${dropPct(i)}% drop`}</span>
                  <Marker kind="warn" text={STALLS[i].warn} />
                  <Marker kind="opp" text={STALLS[i].opp} />
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </Panel>
    </Frame>
  );
}

/** Finance: margin by job type for one sample home-services company. One job type loses money. */
const JOB_TYPES = [
  { name: "Furnace installs", revenue: 48000, cost: 33600 },
  { name: "Service calls", revenue: 21000, cost: 15120 },
  { name: "Water heaters", revenue: 18000, cost: 11700 },
  { name: "Duct cleaning", revenue: 6400, cost: 7100 },
];
const REV = JOB_TYPES.reduce((a, s) => a + s.revenue, 0); // 93,400
const COST = JOB_TYPES.reduce((a, s) => a + s.cost, 0); // 67,520
const LEAK = JOB_TYPES.find((s) => s.cost > s.revenue)!;

function FinanceScene() {
  return (
    <Frame label={`Sample finance report for a home-services company: margin by job type, with ${LEAK.name.toLowerCase()} losing ${usd(LEAK.cost - LEAK.revenue)}`}>
      <Panel title="Margin by job type" note="home-services company">
        <Table
          head={["Job type", "Revenue", "Cost", "Margin", "%"]}
          rows={JOB_TYPES.map((s) => [s.name, usd(s.revenue), usd(s.cost), usd(s.revenue - s.cost), pct(s.revenue - s.cost, s.revenue)])}
          foot={["Total", usd(REV), usd(COST), usd(REV - COST), pct(REV - COST, REV)]}
          rowClass={(r) => (r[0] === LEAK.name ? "bg-red-50 font-semibold text-red-700" : "")}
        />
        <p className="mt-2.5 rounded-lg border border-red-200 bg-red-50 px-2.5 py-2 text-[11px] leading-snug text-red-800">
          <strong>Here&rsquo;s the leak:</strong>{` ${LEAK.name} lost ${usd(LEAK.cost - LEAK.revenue)} on ${usd(LEAK.revenue)} of revenue.`}
        </p>
      </Panel>
    </Frame>
  );
}

/** Customer service: response times, weekly ticket volume and resolution rate. */
const DAYS = [
  { d: "Mon", n: 31 },
  { d: "Tue", n: 27 },
  { d: "Wed", n: 24 },
  { d: "Thu", n: 22 },
  { d: "Fri", n: 18 },
];
const TICKETS = DAYS.reduce((a, x) => a + x.n, 0); // 122
const RESOLVED = 110;

function ServiceScene() {
  const max = Math.max(...DAYS.map((x) => x.n));
  return (
    <Frame label="Sample customer service dashboard: tickets this week and resolution rate">
      <div className="mb-3 grid grid-cols-2 gap-3">
        <Tile label="Resolution rate" value={pct(RESOLVED, TICKETS)} note={`${RESOLVED} of ${TICKETS}`} />
      </div>
      <Panel title="Tickets this week">
        <div className="flex h-24 items-end gap-2">
          {DAYS.map((x) => (
            <div key={x.d} className="grid flex-1 content-end justify-items-center gap-1 text-[10px] text-muted-foreground">
              <span className="text-[10.5px] font-semibold tabular-nums text-ink">{x.n}</span>
              <span className="w-full rounded-t bg-brand" style={{ height: `${(x.n / max) * 56}px` }} />
              <span>{x.d}</span>
            </div>
          ))}
        </div>
      </Panel>
    </Frame>
  );
}

const TABS: UseCaseTab[] = [
  { label: "Sales & Marketing", caption: "Every lead, one place.", scene: <MarketingScene /> },
  { label: "Operations", caption: "Where customers stall.", scene: <FunnelScene /> },
  { label: "Finance", caption: "Margin, one screen.", scene: <FinanceScene /> },
  { label: "Customer Service", caption: "Drafted replies, human-approved.", scene: <ServiceScene /> },
];

export function UseCases() {
  return (
    <Section id="use-cases">
      <SectionHead eyebrow={USE_CASES_HEAD.eyebrow} title={USE_CASES_HEAD.title} />
      <UseCaseTabs tabs={TABS} />
    </Section>
  );
}
