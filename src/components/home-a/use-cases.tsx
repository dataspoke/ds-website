import type { CSSProperties, ReactNode } from "react";
import { Section, SectionHead } from "@/components/shared/section";
import { USE_CASES_HEAD } from "./content";
import { UseCaseTabs, type UseCaseTab } from "./use-case-tabs";
import { CountUp, DashPanel } from "./dash";
import s from "./dash.module.css";

// All figures below are invented sample data for illustration. Derived values
// (cost per sale, the highlighted row, bar widths) are computed from the inputs
// so the arithmetic always matches. Chart treatments follow homepage
// prototype 6, simplified so each panel reads in a few seconds: one chart,
// at most about six numbers, one highlight. Pass variant="dark" to DashPanel
// for the dark dashboard look.

const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;
/** CSS custom properties for bar width/height and stagger delay. */
const vars = (v: Record<string, string>) => v as CSSProperties;
const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

/* ---------- Layout: copy on the left, chart panel on the right ---------- */

function Feature({
  group,
  headline,
  body,
  big,
  bigLabel,
  label,
  children,
}: {
  group: string;
  headline: string;
  body: string;
  big: string;
  bigLabel: string;
  /** Text alternative for the chart. */
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="grid min-w-0 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)] lg:gap-12">
      <div className="min-w-0">
        <div className="text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground">{group}</div>
        <h3 className="mt-3 max-w-[18ch] font-display text-[1.7rem] font-bold leading-[1.1] tracking-tight text-ink sm:text-[2.1rem]">{headline}</h3>
        <p className="mt-4 max-w-md text-muted-foreground">{body}</p>
        <div className="mt-6 border-t border-tint-strong pt-5">
          <div className="font-display text-4xl font-bold leading-none tracking-tight text-primary tabular-nums sm:text-5xl">{big}</div>
          <div className="mt-2 text-sm text-muted-foreground">{bigLabel}</div>
        </div>
      </div>
      <div role="img" aria-label={label} className="grid min-w-0">
        {children}
      </div>
    </div>
  );
}

type Fmt = "pct" | "dec" | "int";
const FMT: Record<Fmt, (v: number) => string> = {
  pct: (v) => `${v}%`,
  dec: (v) => v.toFixed(1),
  int: (v) => String(v),
};

/** Horizontal bars. `hi` names the one highlighted row; its value counts up. */
function HBars({ rows, hi, fmt }: { rows: { name: string; v: number }[]; hi: string; fmt: Fmt }) {
  const max = Math.max(...rows.map((r) => r.v));
  return (
    <div className={s.body}>
      {rows.map((r, k) => {
        const on = r.name === hi;
        return (
          <div key={r.name} className={cx(s.hb, on && s.hi)}>
            <span className={s.l}>{r.name}</span>
            <span className={s.t}>
              <b style={vars({ "--w": `${(r.v / max) * 100}%`, "--d": `${k * 90}ms` })} />
            </span>
            <span className={s.v}>
              {on ? (
                <CountUp to={r.v} format={fmt}>
                  {FMT[fmt](r.v)}
                </CountUp>
              ) : (
                FMT[fmt](r.v)
              )}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- Sales: cost per lead vs cost per sale ---------- */

/** By channel, last 90 days. Spend = leads × CPL; CPS is computed from spend and sales. */
const CHANNELS = [
  { name: "Google Search", leads: 612, sales: 71, cpl: 52 },
  { name: "Lead marketplace", leads: 540, sales: 18, cpl: 31 },
  { name: "Paid social", leads: 377, sales: 22, cpl: 44 },
];
const cps = (c: (typeof CHANNELS)[number]) => (c.leads * c.cpl) / c.sales;
const WORST = CHANNELS.reduce((a, c) => (cps(c) > cps(a) ? c : a)); // lowest CPL, highest CPS

function SalesScene() {
  return (
    <Feature
      group="Sales · spend to revenue"
      headline="Your cheapest leads can be your most expensive sales."
      body="We follow each lead from ad to closed deal, so you judge channels by cost per sale."
      big={usd(cps(WORST))}
      bigLabel={`Cost per sale from ${WORST.name.toLowerCase()}, the cheapest leads`}
      label={`Sample report, cost per lead and cost per sale by channel: ${CHANNELS.map((c) => `${c.name} ${usd(c.cpl)} and ${usd(cps(c))}`).join("; ")}. ${WORST.name} has the lowest cost per lead and the highest cost per sale.`}
    >
      <DashPanel title="Cost per lead vs. cost per sale">
        <div className={s.body}>
          <table className={s.table}>
            <thead>
              <tr>
                <th>Channel</th>
                <th>CPL</th>
                <th>CPS</th>
              </tr>
            </thead>
            <tbody>
              {CHANNELS.map((c, k) => (
                <tr key={c.name} className={cx(c === WORST && s.hiRow)} style={vars({ "--d": `${k * 90}ms` })}>
                  <td>{c.name}</td>
                  <td>{usd(c.cpl)}</td>
                  <td>
                    {c === WORST ? (
                      <CountUp to={Math.round(cps(c))} format="usd">
                        {usd(cps(c))}
                      </CountUp>
                    ) : (
                      usd(cps(c))
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className={s.callout}>Lowest CPL. Highest CPS.</p>
        </div>
      </DashPanel>
    </Feature>
  );
}

/* ---------- Pipeline: close rate falls as deals sit ---------- */

const AGES = [
  { name: "0–3 days", v: 52 },
  { name: "4–7 days", v: 46 },
  { name: "8–14 days", v: 31 },
  { name: "15+ days", v: 16 },
];
const STALE = AGES[AGES.length - 1];

function PipelineScene() {
  return (
    <Feature
      group="Pipeline · stuck deals"
      headline="Deals that sit 14+ days close at a third the rate."
      body="We flag the deals going cold, so your team knows who to call today."
      big={`${AGES[0].v}% → ${STALE.v}%`}
      bigLabel="Close rate, fresh deals vs. 15+ days in stage"
      label={`Sample chart, close rate by days in stage: ${AGES.map((a) => `${a.name} ${a.v}%`).join(", ")}.`}
    >
      <DashPanel title="Close rate by days in stage">
        <HBars rows={AGES} hi={STALE.name} fmt="pct" />
      </DashPanel>
    </Feature>
  );
}

/* ---------- Operations: the bottleneck step ---------- */

const STEPS = [
  { name: "Scheduled", v: 1.2 },
  { name: "In progress", v: 3.4 },
  { name: "Waiting on approval", v: 6.8 },
  { name: "Quality check", v: 0.9 },
];
const BOTTLENECK = STEPS.reduce((a, x) => (x.v > a.v ? x : a));

function OpsScene() {
  return (
    <Feature
      group="Operations · bottlenecks"
      headline="Find the step that slows everything else down."
      body="We show where work waits, so you fix the bottleneck instead of adding headcount."
      big={`${BOTTLENECK.v} days`}
      bigLabel={`Median time ${BOTTLENECK.name.toLowerCase()}, the slowest step`}
      label={`Sample chart, median days per step: ${STEPS.map((x) => `${x.name} ${x.v}`).join(", ")}.`}
    >
      <DashPanel title="Median days per step">
        <HBars rows={STEPS} hi={BOTTLENECK.name} fmt="dec" />
      </DashPanel>
    </Feature>
  );
}

/* ---------- Finance: forecast from the real pipeline ---------- */

/** Revenue in $K. The first four months are actual, the last two forecast. */
const MONTHS = [
  { m: "Jul", v: 412 },
  { m: "Aug", v: 438 },
  { m: "Sep", v: 401 },
  { m: "Oct", v: 467 },
  { m: "Nov", v: 489, forecast: true },
  { m: "Dec", v: 455, forecast: true },
];
const NEXT = MONTHS.find((x) => x.forecast)!; // the one labelled column
const MAX_K = 500;

function ForecastScene() {
  return (
    <Feature
      group="Finance · forecasting"
      headline="Know next quarter before it happens."
      body="We forecast from your real pipeline, so the number you plan with is the one you hit."
      big="7%"
      bigLabel="Forecast error, down from 24%"
      label={`Sample revenue chart in thousands: ${MONTHS.map((x) => `${x.m} ${x.v}${x.forecast ? " forecast" : ""}`).join(", ")}.`}
    >
      <DashPanel title="Revenue, actual and forecast">
        <div className={s.body}>
          <div className={s.legend} aria-hidden>
            <span>
              <i style={{ background: "var(--mute)" }} />
              Actual
            </span>
            <span>
              <i className={s.hatch} />
              Forecast
            </span>
          </div>
          <div className={s.cols}>
            {MONTHS.map((x, k) => (
              <div key={x.m} className={s.col} title={`${x.m} · $${x.v}K ${x.forecast ? "forecast" : "actual"}`}>
                {x === NEXT && <span className={s.colV}>{`$${x.v}K`}</span>}
                <span className={cx(s.colBar, x.forecast && s.hatch)} style={vars({ "--h": `${(x.v / MAX_K) * 86}%`, "--d": `${k * 80}ms` })} />
              </div>
            ))}
            <div className={s.today} aria-hidden>
              <span>Today</span>
            </div>
          </div>
          <div className={s.months} aria-hidden>
            {MONTHS.map((x) => (
              <span key={x.m}>{x.m}</span>
            ))}
          </div>
        </div>
      </DashPanel>
    </Feature>
  );
}

/* ---------- Calls: why deals are really lost ---------- */

/** Loss reasons AI-tagged from recorded lost-deal calls. */
const REASONS = [
  { name: "Slow response", v: 14 },
  { name: "Price", v: 12 },
  { name: "Went with a competitor", v: 17 },
  { name: "Not ready", v: 9 },
];
const SURPRISE = "Slow response";

function CallsScene() {
  return (
    <Feature
      group="Calls · lost deals"
      headline="Slow replies lose more deals than price."
      body="We tag every lost-deal call with the reason the customer actually gave."
      big="1 in 3"
      bigLabel="Losses with the wrong reason in the CRM"
      label={`Sample call analysis, lost deals by reason: ${REASONS.map((r) => `${r.name} ${r.v}`).join(", ")}. Slow response is the surprise.`}
    >
      <DashPanel title="Lost deals by reason, from the calls">
        <HBars rows={REASONS} hi={SURPRISE} fmt="int" />
      </DashPanel>
    </Feature>
  );
}

const TABS: UseCaseTab[] = [
  { label: "Sales", scene: <SalesScene /> },
  { label: "Pipeline", scene: <PipelineScene /> },
  { label: "Operations", scene: <OpsScene /> },
  { label: "Finance", scene: <ForecastScene /> },
  { label: "Calls", scene: <CallsScene /> },
];

export function UseCases() {
  return (
    <Section id="use-cases">
      <SectionHead eyebrow={USE_CASES_HEAD.eyebrow} title={USE_CASES_HEAD.title} />
      <UseCaseTabs tabs={TABS} />
    </Section>
  );
}
