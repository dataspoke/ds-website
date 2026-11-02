import { Fragment, type ReactNode } from "react";
import { Section, SectionHead } from "@/components/shared/section";
import { USE_CASES_HEAD } from "./content";
import { UseCaseTabs, type UseCaseTab } from "./use-case-tabs";

// All figures below are invented sample data for illustration. Derived values
// (cost per sale, the highlighted row, call totals) are computed from the
// inputs so the arithmetic always matches. Newspaper rule: each chart
// highlights one thing in brand blue and mutes the rest.

const usd = (n: number) => `${n < 0 ? "-" : ""}$${Math.abs(Math.round(n)).toLocaleString("en-US")}`;

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
  hideSm = [],
}: {
  head: string[];
  rows: (string | number)[][];
  foot?: (string | number)[];
  rowClass?: (row: (string | number)[]) => string;
  /** Column indexes hidden below sm, so the key column fits a phone without scrolling. */
  hideSm?: number[];
}) {
  const cell = (i: number) => `${i === 0 ? "text-left" : "pl-2 text-right"} ${hideSm.includes(i) ? "hidden sm:table-cell" : ""}`;
  return (
    <div className="-mx-3 max-w-[calc(100%+1.5rem)] overflow-x-auto px-3">
      <table className="w-full min-w-[250px] border-collapse text-[11px] leading-tight tabular-nums">
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

/* ---------- Shared marks: one highlighted item, everything else muted ---------- */

/** Callout under a chart for the one highlighted item. */
function Callout({ children }: { children: ReactNode }) {
  return (
    <p className="mt-2.5 rounded-lg border border-brand bg-tint px-2.5 py-2 text-[11px] font-semibold leading-snug text-primary">{children}</p>
  );
}

/** Horizontal bars: label, bar, value. The row named `hi` is brand blue; the rest are muted. */
function Bars({ rows, hi, fmt, badge }: { rows: { name: string; v: number }[]; hi: string; fmt: (v: number) => string; badge?: string }) {
  const max = Math.max(...rows.map((r) => r.v));
  return (
    <div className="grid grid-cols-[minmax(0,8.5rem)_1fr_auto] items-center gap-x-2.5 gap-y-1.5 text-[11px] leading-tight tabular-nums sm:grid-cols-[10rem_1fr_auto]">
      {rows.map((r) => {
        const on = r.name === hi;
        return (
          <Fragment key={r.name}>
            <span className={`min-w-0 ${on ? "font-bold text-primary" : "text-muted-foreground"}`}>
              {r.name}
              {on && badge && (
                <span className="ml-1 inline-block rounded-full bg-brand px-1.5 py-px align-[1px] text-[9px] font-bold uppercase tracking-[0.06em] text-white">{badge}</span>
              )}
            </span>
            <span className="h-2.5 rounded bg-tint" aria-hidden>
              <span className={`block h-full rounded ${on ? "bg-brand" : "bg-tint-strong"}`} style={{ width: `${(r.v / max) * 100}%` }} />
            </span>
            <span className={`text-right ${on ? "font-bold text-primary" : "text-muted-foreground"}`}>{fmt(r.v)}</span>
          </Fragment>
        );
      })}
    </div>
  );
}

/* ---------- Sales & Marketing: spend to revenue ---------- */

/** By channel, last 90 days. Spend = leads × CPL; CPS is computed from spend and sales. */
const CHANNELS = [
  { name: "Google Search", leads: 612, qualified: 388, sales: 71, cpl: 52 },
  { name: "Lead marketplace", leads: 540, qualified: 211, sales: 18, cpl: 31 },
  { name: "Paid social", leads: 377, qualified: 164, sales: 22, cpl: 44 },
  { name: "Referral partners", leads: 148, qualified: 121, sales: 46, cpl: 0 },
];
const cps = (c: (typeof CHANNELS)[number]) => (c.cpl === 0 ? null : (c.leads * c.cpl) / c.sales);
const PAID = CHANNELS.filter((c) => c.cpl > 0);
const WORST = PAID.reduce((a, c) => (cps(c)! > cps(a)! ? c : a)); // lowest CPL, highest CPS

function MarketingScene() {
  return (
    <Frame label={`Sample report, leads and sales by channel for the last 90 days. ${WORST.name} has the lowest cost per lead and the highest cost per sale, ${usd(cps(WORST)!)}.`}>
      <Panel title="By channel" note="last 90 days">
        <Table
          head={["Channel", "Leads", "Qualified", "Sales", "CPL", "CPS"]}
          rows={CHANNELS.map((c) => [c.name, c.leads, c.qualified, c.sales, usd(c.cpl), cps(c) === null ? "—" : usd(cps(c)!)])}
          rowClass={(r) => (r[0] === WORST.name ? "bg-tint font-bold text-primary" : "text-muted-foreground")}
          hideSm={[2]}
        />
        <Callout>{`${WORST.name}: lowest CPL. Highest CPS.`}</Callout>
        <p className="mt-2 text-[10.5px] text-muted-foreground">
          Median speed to lead <strong className="font-bold tabular-nums text-ink">2m 41s</strong>
        </p>
      </Panel>
    </Frame>
  );
}

/* ---------- Operations: the bottleneck step ---------- */

const STEPS = [
  { name: "Scheduled", v: 1.2 },
  { name: "In progress", v: 3.4 },
  { name: "Waiting on approval", v: 6.8 },
  { name: "Quality check", v: 0.9 },
];
const BOTTLENECK = STEPS.reduce((a, s) => (s.v > a.v ? s : a));

function OpsScene() {
  return (
    <Frame label={`Sample operations report, median days in each step: ${STEPS.map((s) => `${s.name} ${s.v}`).join(", ")}. ${BOTTLENECK.name} is the bottleneck.`}>
      <Panel title="Median days in each step" note="order to delivery">
        <Bars rows={STEPS} hi={BOTTLENECK.name} fmt={(v) => `${v.toFixed(1)}d`} />
      </Panel>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <Tile label="Deals past 14 days" value="37" />
        <Tile label="On-time delivery" value="78%" note="target 92%" />
      </div>
    </Frame>
  );
}

/* ---------- Finance: forecast from the real pipeline ---------- */

/** Revenue in $K. The first four months are actual, the last two are forecast. */
const MONTHS = [
  { m: "Jul", v: 412 },
  { m: "Aug", v: 438 },
  { m: "Sep", v: 401 },
  { m: "Oct", v: 467 },
  { m: "Nov", v: 489, forecast: true },
  { m: "Dec", v: 455, forecast: true },
];
const HATCH = "bg-[repeating-linear-gradient(135deg,var(--brand)_0_3px,var(--tint)_3px_6px)]";

function ForecastScene() {
  const max = Math.max(...MONTHS.map((x) => x.v));
  const col = (x: (typeof MONTHS)[number]) => (
    <div key={x.m} className="grid h-full min-w-0 flex-1 content-end justify-items-center gap-1 text-[10px]">
      <span className={`tabular-nums ${x.forecast ? "font-bold text-primary" : "text-muted-foreground"}`}>{`$${x.v}K`}</span>
      <span className={`w-full max-w-10 rounded-t ${x.forecast ? `border-[1.5px] border-b-0 border-brand ${HATCH}` : "bg-tint-strong"}`} style={{ height: `${(x.v / max) * 76}px` }} />
      <span className={x.forecast ? "font-semibold text-primary" : "text-muted-foreground"}>{x.m}</span>
    </div>
  );
  const actual = MONTHS.filter((x) => !x.forecast);
  const ahead = MONTHS.filter((x) => x.forecast);
  return (
    <Frame label={`Sample revenue chart, actual July to October and forecast for November ($${ahead[0].v}K) and December ($${ahead[1].v}K). Forecast error fell from 24% to 7%.`}>
      <Panel title="Revenue, actual and forecast" note="$K by month">
        <div className="flex h-32 items-stretch gap-1.5 sm:gap-2.5">
          {actual.map(col)}
          <div className="relative w-0 border-l-[1.5px] border-dashed border-ink/40" aria-hidden>
            <span className="absolute -top-1 left-1 rounded bg-white px-1 text-[9px] font-bold uppercase tracking-[0.06em] text-muted-foreground">Today</span>
          </div>
          {ahead.map(col)}
        </div>
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-muted-foreground" aria-hidden>
          <span className="inline-flex items-center gap-1"><span className="size-2.5 rounded-sm bg-tint-strong" />Actual</span>
          <span className="inline-flex items-center gap-1"><span className={`size-2.5 rounded-sm border border-brand ${HATCH}`} />Forecast</span>
        </div>
        <Callout>
          Forecast error <span className="tabular-nums">24% → 7%</span>
        </Callout>
      </Panel>
    </Frame>
  );
}

/* ---------- Calls: why deals are really lost ---------- */

/** Loss reasons AI-tagged from recorded lost-deal calls. */
const REASONS = [
  { name: "Went with a competitor", v: 17 },
  { name: "Slow response", v: 14 },
  { name: "Price", v: 12 },
  { name: "Not ready yet", v: 9 },
  { name: "Bad fit", v: 6 },
];
const SURPRISE = "Slow response";
const CALLS = REASONS.reduce((a, r) => a + r.v, 0); // 58

function CallsScene() {
  return (
    <Frame label={`Sample call analysis: loss reasons tagged by AI from ${CALLS} lost-deal calls. ${REASONS.map((r) => `${r.name} ${r.v}`).join(", ")}. Slow response is the surprise. 1 in 3 losses had the wrong reason in the CRM.`}>
      <Panel title="Why we lost, from the calls" note={`AI-tagged · ${CALLS} calls`}>
        <Bars rows={REASONS} hi={SURPRISE} fmt={String} badge="Surprise" />
        <blockquote className="mt-3 border-l-2 border-brand pl-2.5 text-[11px] italic leading-snug text-ink">
          &ldquo;We called three companies. You got back to us on Thursday, and by then we&rsquo;d signed.&rdquo;
        </blockquote>
      </Panel>
      <div className="mt-3">
        <Tile label="Losses with the wrong reason in the CRM" value="1 in 3" />
      </div>
    </Frame>
  );
}

const TABS: UseCaseTab[] = [
  { label: "Sales & Marketing", caption: "Your cheapest leads can be your most expensive sales.", scene: <MarketingScene /> },
  { label: "Operations", caption: "Find the step that slows everything else down.", scene: <OpsScene /> },
  { label: "Finance", caption: "Know next quarter before it happens.", scene: <ForecastScene /> },
  { label: "Calls", caption: "Slow replies lose more deals than price.", scene: <CallsScene /> },
];

export function UseCases() {
  return (
    <Section id="use-cases">
      <SectionHead eyebrow={USE_CASES_HEAD.eyebrow} title={USE_CASES_HEAD.title} />
      <UseCaseTabs tabs={TABS} />
    </Section>
  );
}
