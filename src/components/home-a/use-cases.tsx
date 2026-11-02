import type { CSSProperties, ReactNode } from "react";
import { Section, SectionHead } from "@/components/shared/section";
import { USE_CASES_HEAD } from "./content";
import { UseCaseTabs, type UseCaseTab } from "./use-case-tabs";
import { CountUp, DashPanel } from "./dash";
import s from "./dash.module.css";

// All figures below are invented sample data for illustration. Derived values
// (cost per sale, the highlighted row, bar widths) are computed from the inputs
// so the arithmetic always matches. Chart treatments are ported from homepage
// prototype 6. Newspaper rule: each chart highlights one thing in --brand on
// dark, and the big number on the light side uses --primary.

const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;
/** CSS custom properties for bar width/height and stagger delay. */
const vars = (v: Record<string, string>) => v as CSSProperties;
const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

/* ---------- Layout: copy on the left, dark panel on the right ---------- */

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

/** Horizontal bars in the dark panel. `hi` names the one highlighted row. */
function HBars({
  rows,
  hi,
  fmt,
  tag,
  className,
}: {
  rows: { name: string; v: number | null }[];
  hi: string;
  fmt: (v: number) => string;
  tag?: string;
  className?: string;
}) {
  const max = Math.max(...rows.map((r) => r.v ?? 0));
  return (
    <div className={className}>
      {rows.map((r, k) => (
        <div key={r.name} className={cx(s.hb, r.name === hi && s.hi)}>
          <span className={s.l}>
            {r.name}
            {r.name === hi && tag && <span className={s.surprise}>{tag}</span>}
          </span>
          <span className={s.t}>{r.v !== null && <b style={vars({ "--w": `${(r.v / max) * 100}%`, "--d": `${k * 90}ms` })} />}</span>
          <span className={s.v}>{r.v === null ? <span className={s.dash}>—</span> : fmt(r.v)}</span>
        </div>
      ))}
    </div>
  );
}

/* ---------- Sales: spend to revenue, plus speed to lead ---------- */

/** By channel, last 90 days. Spend = leads × CPL; CPS is computed from spend and sales. */
const CHANNELS = [
  { name: "Google Search", leads: 612, qualified: 388, sales: 71, cpl: 52 },
  { name: "Lead marketplace", leads: 540, qualified: 211, sales: 18, cpl: 31 },
  { name: "Paid social", leads: 377, qualified: 164, sales: 22, cpl: 44 },
  { name: "Referral partners", leads: 148, qualified: 121, sales: 46, cpl: 0 },
];
const cps = (c: (typeof CHANNELS)[number]) => (c.cpl === 0 ? null : (c.leads * c.cpl) / c.sales);
const WORST = CHANNELS.filter((c) => c.cpl > 0).reduce((a, c) => (cps(c)! > cps(a)! ? c : a)); // lowest CPL, highest CPS
const SPEED = [
  { name: "Under 5 min", v: 24 },
  { name: "5–60 min", v: 13 },
  { name: "Over 1 hour", v: 8 },
];

function SalesScene() {
  return (
    <Feature
      group="Sales · spend to revenue"
      headline="Your cheapest leads can be your most expensive sales."
      body="We follow every lead from the ad to the closed deal, so you judge each channel by cost per sale, not cost per lead."
      big={usd(cps(WORST)!)}
      bigLabel={`Cost per sale from ${WORST.name.toLowerCase()}, the cheapest leads`}
      label={`Sample report by channel, last 90 days. ${WORST.name} has the lowest cost per lead and the highest cost per sale, ${usd(cps(WORST)!)}. Median speed to lead 2 minutes 41 seconds; leads reached in under 5 minutes close at 24%.`}
    >
      <DashPanel section="Marketing" title="By channel · last 90 days">
        <div className={s.tscroll}>
          <table className={s.table}>
            <thead>
              <tr>
                {["Channel", "Leads", "Qualified", "Sales", "CPL", "CPS"].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CHANNELS.map((c, k) => {
                const v = cps(c);
                return (
                  <tr key={c.name} className={cx(c === WORST && s.hiRow)} style={vars({ "--d": `${k * 70}ms` })}>
                    <td>{c.name}</td>
                    <td>{c.leads}</td>
                    <td>{c.qualified}</td>
                    <td>{c.sales}</td>
                    <td>{usd(c.cpl)}</td>
                    <td className={s.cps}>
                      {v === null ? <span className={s.dash}>—</span> : usd(v)}
                      {c === WORST && <span className={s.warn} aria-hidden>⚠</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className={s.callout}>
          <span className={s.tag}>{WORST.name}</span>
          <span>
            <b>Lowest CPL.</b> Highest CPS.
          </span>
        </div>
        <div className={s.speed}>
          <div>
            <div className={s.lbl}>Median speed to lead</div>
            <div className={s.speedVal}>
              <CountUp to={161} format="dur">
                2m 41s
              </CountUp>
            </div>
          </div>
          <HBars rows={SPEED} hi={SPEED[0].name} fmt={(v) => `${v}%`} className={s.mini} />
        </div>
      </DashPanel>
    </Feature>
  );
}

/* ---------- Pipeline: close rate by days in stage ---------- */

const DAY_COLS = ["0–3", "4–7", "8–14", "15+"];
const STAGES: [string, number[]][] = [
  ["New lead", [31, 22, 14, 7]],
  ["Qualified", [44, 37, 25, 13]],
  ["Proposal sent", [52, 46, 31, 16]],
];
const STUCK_COL = DAY_COLS.length - 1;
const PROPOSAL = STAGES[2][1];

function PipelineScene() {
  return (
    <Feature
      group="Pipeline · stuck deals"
      headline="Deals that sit 14+ days close at a third the rate."
      body="We measure days in each stage and flag the deals going cold, so your team knows who to call today."
      big={`${PROPOSAL[0]}% → ${PROPOSAL[STUCK_COL]}%`}
      bigLabel="Close rate on proposals, fresh vs. 15+ days old"
      label={`Sample heatmap of close rate by days in stage. ${STAGES.map(([n, v]) => `${n}: ${v.join("%, ")}%`).join(". ")}. 37 deals are past 14 days.`}
    >
      <DashPanel section="Pipeline" title="Close rate by days in stage">
        <div className={s.body}>
          <div className={s.hm}>
            <div className={s.hd} style={{ textAlign: "left" }}>
              Stage
            </div>
            {DAY_COLS.map((c, j) => (
              <div key={c} className={cx(s.hd, j === STUCK_COL && s.hi)}>
                {c}
              </div>
            ))}
            {STAGES.map(([name, vals], i) => [
              <div key={name} className={s.rl}>
                {name}
              </div>,
              ...vals.map((v, j) => (
                <div
                  key={`${name}-${j}`}
                  title={`${name} · ${DAY_COLS[j]} days · ${v}%`}
                  className={cx(s.c, j === STUCK_COL && s.hi)}
                  style={vars({
                    "--d": `${i * 60 + j * 70}ms`,
                    ...(j === STUCK_COL ? {} : { background: `rgba(255,255,255,${(0.03 + (v / 52) * 0.11).toFixed(3)})` }),
                  })}
                >
                  {v}%
                </div>
              )),
            ])}
          </div>
          <div className={s.hmFoot}>
            <span className={s.note}>Days in stage</span>
            <span className={s.badge}>37 deals past 14 days</span>
          </div>
        </div>
      </DashPanel>
    </Feature>
  );
}

/* ---------- Operations: the bottleneck step ---------- */

const STEPS: { name: string; v: number | null }[] = [
  { name: "Scheduled", v: 1.2 },
  { name: "In progress", v: 3.4 },
  { name: "Waiting on approval", v: 6.8 },
  { name: "Quality check", v: 0.9 },
  { name: "Delivered", v: null },
];
const BOTTLENECK = STEPS.reduce((a, x) => ((x.v ?? 0) > (a.v ?? 0) ? x : a));
const ON_TIME = 78;
const TARGET = 92;

function OpsScene() {
  return (
    <Feature
      group="Operations · bottlenecks"
      headline="Find the step that slows everything else down."
      body="We track work from order to delivery and show where it waits, so you fix the bottleneck instead of adding headcount."
      big={`${BOTTLENECK.v} days`}
      bigLabel={`Median time ${BOTTLENECK.name.toLowerCase()}, the slowest step`}
      label={`Sample operations chart, median days in each step: ${STEPS.filter((x) => x.v !== null).map((x) => `${x.name} ${x.v}`).join(", ")}. On-time delivery ${ON_TIME}%, target ${TARGET}%.`}
    >
      <DashPanel section="Operations" title="Median days in each step">
        <div className={s.body}>
          <HBars rows={STEPS} hi={BOTTLENECK.name} fmt={(v) => v.toFixed(1)} />
          <div className={s.stat}>
            <span>On-time delivery</span>
            <span>
              <b>
                <CountUp to={ON_TIME} format="pct">{`${ON_TIME}%`}</CountUp>
              </b>{" "}
              <span className={s.tgt}>{`→ target ${TARGET}%`}</span>
            </span>
          </div>
          <div className={s.track}>
            <b style={vars({ "--w": `${ON_TIME}%` })} />
            <i style={{ left: `${TARGET}%` }} />
          </div>
        </div>
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
const MAX_K = 500;

function ForecastScene() {
  return (
    <Feature
      group="Finance · forecasting"
      headline="Know next quarter before it happens."
      body="We forecast from your real pipeline, so the number you plan with is the number you hit."
      big="7%"
      bigLabel="Forecast error, down from 24%"
      label={`Sample revenue chart in thousands: ${MONTHS.map((x) => `${x.m} ${x.v}${x.forecast ? " forecast" : ""}`).join(", ")}. Forecast error fell from 24% to 7%.`}
    >
      <DashPanel section="Finance" title="Revenue, $K">
        <div className={s.body}>
          <div className={s.fcHead}>
            <div>
              <div className={s.lbl}>Forecast error</div>
              <div className={s.err}>
                <s>24%</s> → 7%
              </div>
            </div>
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
          </div>
          <div className={s.cols}>
            {MONTHS.map((x, k) => (
              <div key={x.m} className={cx(s.col, x.forecast && s.fc)} title={`${x.m} · $${x.v}K ${x.forecast ? "forecast" : "actual"}`}>
                <span className={s.colV}>{x.v}</span>
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
    <Feature
      group="Calls · lost deals"
      headline="Slow replies lose more deals than price."
      body="We tag every lost-deal call with the reason the customer gave, so you fix what actually costs you deals."
      big="1 in 3"
      bigLabel="Losses with the wrong reason in the CRM"
      label={`Sample call analysis: loss reasons tagged by AI from ${CALLS} lost-deal calls. ${REASONS.map((r) => `${r.name} ${r.v}`).join(", ")}. Slow response is the surprise.`}
    >
      <DashPanel section="Calls" title={`Why we lost · ${CALLS} calls, AI-tagged`}>
        <div className={s.body}>
          <HBars rows={REASONS} hi={SURPRISE} fmt={String} tag="Surprise" />
          <blockquote className={s.quote}>&ldquo;We called three companies. You got back to us on Thursday, and by then we&rsquo;d signed.&rdquo;</blockquote>
        </div>
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
