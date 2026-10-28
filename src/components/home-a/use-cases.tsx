import type { ReactNode } from "react";
import { Section, SectionHead } from "@/components/shared/section";
import { Glyph } from "./illustrations";
import { USE_CASES_HEAD } from "./content";

// All figures below are invented sample data for illustration. The derived
// columns (cost per lead, cost per sale, margin %, resolution rate) are
// computed from the inputs so the arithmetic always matches.

const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;
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

function Tile({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <Panel>
      <div className="text-[10.5px] text-muted-foreground">{label}</div>
      <div className="mt-1 text-xl font-bold leading-none">{value}</div>
      <div className="mt-1.5 text-[10px] text-muted-foreground">{note}</div>
    </Panel>
  );
}

function Table({ head, rows, foot }: { head: string[]; rows: (string | number)[][]; foot?: (string | number)[] }) {
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
            <tr key={String(r[0])} className="border-t border-tint-strong">
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
  { name: "Google Ads", spend: 4200, leads: 42, sales: 12 },
  { name: "Meta", spend: 2400, leads: 30, sales: 6 },
  { name: "Referral", spend: 600, leads: 15, sales: 7 },
  { name: "Email", spend: 300, leads: 12, sales: 4 },
];
const TOTAL_SPEND = SOURCES.reduce((a, s) => a + s.spend, 0); // 7,500
const TOTAL_LEADS = SOURCES.reduce((a, s) => a + s.leads, 0); // 99
const TOTAL_SALES = SOURCES.reduce((a, s) => a + s.sales, 0); // 29

/** Marketing: leads by source with spend, cost per lead and cost per sale. */
function MarketingScene() {
  const max = Math.max(...SOURCES.map((s) => s.leads));
  return (
    <Frame label="Sample marketing report: leads by source with spend, cost per lead, sales and cost per sale">
      <Panel title="Leads by source" note="Sample data · this month">
        <div className="mb-2.5 grid gap-1.5">
          {SOURCES.map((s) => (
            <div key={s.name} className="grid grid-cols-[72px_1fr_24px] items-center gap-2 text-[11px]">
              <span className="truncate">{s.name}</span>
              <span className="h-2.5 rounded bg-tint">
                <span className="block h-full rounded bg-brand" style={{ width: `${(s.leads / max) * 100}%` }} />
              </span>
              <span className="text-right font-semibold tabular-nums">{s.leads}</span>
            </div>
          ))}
        </div>
        <Table
          head={["Source", "Spend", "Leads", "CPL", "Sales", "CPS"]}
          rows={SOURCES.map((s) => [s.name, usd(s.spend), s.leads, usd(s.spend / s.leads), s.sales, usd(s.spend / s.sales)])}
          foot={["Total", usd(TOTAL_SPEND), TOTAL_LEADS, usd(TOTAL_SPEND / TOTAL_LEADS), TOTAL_SALES, usd(TOTAL_SPEND / TOTAL_SALES)]}
        />
      </Panel>
    </Frame>
  );
}

/** Customer journey: six stages with friction points and optimization opportunities. */
const STAGES: { name: string; glyph: "search" | "chat" | "doc" | "cart" | "wrench" | "repeat"; warn?: string; opp?: string }[] = [
  { name: "Discover", glyph: "search", opp: "Reviews on Google" },
  { name: "Inquire", glyph: "chat", warn: "40% drop-off to quote", opp: "Auto follow-up" },
  { name: "Quote", glyph: "doc", warn: "Quote takes 3 days", opp: "Instant quote" },
  { name: "Buy", glyph: "cart", opp: "Online payment" },
  { name: "Service", glyph: "wrench", warn: "2 reschedules per week" },
  { name: "Repeat", glyph: "repeat", opp: "Review request" },
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
      <span className="sr-only">{warn ? "Friction: " : "Opportunity: "}</span>
      {text}
    </span>
  );
}

function JourneyScene() {
  return (
    <Frame label="Sample customer journey map: discover, inquire, quote, buy, service, repeat, with friction points and opportunities marked">
      <Panel title="Customer journey" note="Sample data">
        <div className="-mx-3 max-w-[calc(100%+1.5rem)] overflow-x-auto px-3">
          {/* Below sm: a vertical list (icon beside the stage name and markers). From sm: six columns joined by a line. */}
          <ol className="grid gap-2.5 sm:min-w-[520px] sm:grid-cols-6 sm:gap-1.5">
            {STAGES.map((s, i) => (
              <li
                key={s.name}
                className="relative grid grid-cols-[2.5rem_minmax(0,1fr)] content-start items-start gap-x-2.5 gap-y-1 text-left sm:grid-cols-1 sm:justify-items-center sm:gap-1.5 sm:text-center"
              >
                {/* Vertical connector (mobile) */}
                {i < STAGES.length - 1 && <span aria-hidden className="absolute bottom-[-0.625rem] left-5 top-10 w-0.5 -translate-x-1/2 bg-brand/60 sm:hidden" />}
                {/* Horizontal connector (sm and up) */}
                {i > 0 && <span aria-hidden className="absolute left-[-50%] right-[50%] top-[19px] hidden h-0.5 bg-brand/60 sm:block" />}
                <span className="relative row-span-3 grid size-10 place-items-center rounded-full border-[1.5px] border-tint-strong bg-white sm:row-span-1">
                  <svg viewBox="0 0 24 24" className="size-6" aria-hidden>
                    <Glyph name={s.glyph} x={12} y={12} size={22} />
                  </svg>
                </span>
                <span className="col-start-2 self-center text-[11px] font-semibold sm:col-start-auto sm:self-auto">{s.name}</span>
                {s.warn && <span className="col-start-2 sm:col-start-auto"><Marker kind="warn" text={s.warn} /></span>}
                {s.opp && <span className="col-start-2 sm:col-start-auto"><Marker kind="opp" text={s.opp} /></span>}
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-2.5 flex gap-3 border-t border-tint-strong pt-2 text-[10px] text-muted-foreground">
          <span className="inline-flex items-center gap-1"><span className="size-2 rounded-full bg-amber-400" /> Friction</span>
          <span className="inline-flex items-center gap-1"><span className="size-2 rounded-full bg-brand" /> Opportunity</span>
        </div>
      </Panel>
    </Frame>
  );
}

/** Finance: cost per acquisition (from the marketing totals) and margin by service. */
const SERVICES = [
  { name: "Installs", revenue: 48000, cost: 31200 },
  { name: "Repairs", revenue: 22000, cost: 12100 },
  { name: "Maintenance", revenue: 15000, cost: 6000 },
];
const REV = SERVICES.reduce((a, s) => a + s.revenue, 0); // 85,000
const COST = SERVICES.reduce((a, s) => a + s.cost, 0); // 49,300

function FinanceScene() {
  return (
    <Frame label="Sample finance report: cost per acquisition and margin by service">
      <div className="mb-3 grid grid-cols-3 gap-3">
        <Tile label="Marketing spend" value={usd(TOTAL_SPEND)} note="this month" />
        <Tile label="New customers" value={String(TOTAL_SALES)} note="this month" />
        <Tile label="Cost per acquisition" value={usd(TOTAL_SPEND / TOTAL_SALES)} note="spend ÷ new customers" />
      </div>
      <Panel title="Margin by service" note="Sample data · this month">
        <Table
          head={["Service", "Revenue", "Cost", "Margin", "Margin %"]}
          rows={SERVICES.map((s) => [s.name, usd(s.revenue), usd(s.cost), usd(s.revenue - s.cost), pct(s.revenue - s.cost, s.revenue)])}
          foot={["Total", usd(REV), usd(COST), usd(REV - COST), pct(REV - COST, REV)]}
        />
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
  { d: "Sat", n: 6 },
];
const TICKETS = DAYS.reduce((a, x) => a + x.n, 0); // 128
const RESOLVED = 116;

function ServiceScene() {
  const max = Math.max(...DAYS.map((x) => x.n));
  return (
    <Frame label="Sample customer service dashboard: median and average response time, tickets this week and resolution rate">
      <div className="mb-3 grid grid-cols-2 gap-3">
        <Tile label="Median response" value="42 min" note="avg 1 h 10 min" />
        <Tile label="Resolution rate" value={pct(RESOLVED, TICKETS)} note={`${RESOLVED} of ${TICKETS} resolved`} />
      </div>
      <Panel title="Tickets this week" note={`${TICKETS} total · sample data`}>
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

const SCENES = [
  { title: "AI in marketing", text: "Every lead lands in one place and the follow-up is drafted for you.", scene: <MarketingScene /> },
  { title: "Customer journey", text: "See where customers stall and where a small fix pays off.", scene: <JourneyScene /> },
  { title: "Finance and numbers", text: "Cash, invoices and margin on one screen, updated on their own.", scene: <FinanceScene /> },
  { title: "Customer service", text: "Replies drafted from your own records. A person approves every one.", scene: <ServiceScene /> },
];

export function UseCases() {
  return (
    <Section id="use-cases">
      <SectionHead eyebrow={USE_CASES_HEAD.eyebrow} title={USE_CASES_HEAD.title} />
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {SCENES.map((s) => (
          <figure
            key={s.title}
            className="grid min-w-0 content-start gap-4 rounded-3xl border border-tint-strong bg-gradient-to-b from-white to-tint/60 p-4 sm:p-6"
          >
            <div className="grid min-w-0 gap-2">
              <span className="max-w-full justify-self-end rounded-full bg-white px-2.5 py-0.5 text-center text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground ring-1 ring-tint-strong">
                Illustrative example · sample data
              </span>
              {s.scene}
            </div>
            <figcaption className="grid gap-1 px-1">
              <h3 className="text-xl font-bold">{s.title}</h3>
              <p className="text-muted-foreground">{s.text}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
