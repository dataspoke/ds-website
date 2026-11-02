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
  pain,
  headline,
  body,
  big,
  bigLabel,
  label,
  children,
}: {
  /** The owner's pain, in their words. */
  pain: string;
  /** The end state we deliver. */
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
        <p className="max-w-md text-[0.95rem] italic leading-snug text-muted-foreground">&ldquo;{pain}&rdquo;</p>
        <h3 className="mt-4 max-w-[18ch] font-display text-[1.7rem] font-bold leading-[1.1] tracking-tight text-ink sm:text-[2.1rem]">{headline}</h3>
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

type Fmt = "pct" | "spct" | "dec" | "int";
const FMT: Record<Fmt, (v: number) => string> = {
  pct: (v) => `${v}%`,
  spct: (v) => `${v < 0 ? "−" : ""}${Math.abs(v)}%`,
  dec: (v) => v.toFixed(1),
  int: (v) => String(v),
};

/**
 * Horizontal bars. `hi` names the one highlighted row; its value counts up.
 * With a negative value the track gets a zero line and that bar runs left of it.
 */
function HBars({ rows, hi, fmt }: { rows: { name: string; v: number }[]; hi: string; fmt: Fmt }) {
  const max = Math.max(...rows.map((r) => r.v));
  const min = Math.min(0, ...rows.map((r) => r.v));
  const span = max - min;
  const zero = (-min / span) * 100; // % from the left where 0 sits
  const signed = min < 0;
  return (
    <div className={s.body}>
      {rows.map((r, k) => {
        const on = r.name === hi;
        return (
          <div key={r.name} className={cx(s.hb, on && s.hi)}>
            <span className={s.l}>{r.name}</span>
            <span className={s.t} style={signed ? vars({ "--z": `${zero}%` }) : undefined}>
              <b
                style={vars({
                  "--w": `${(Math.abs(r.v) / span) * 100}%`,
                  "--x": `${r.v < 0 ? zero + (r.v / span) * 100 : zero}%`,
                  "--d": `${k * 90}ms`,
                })}
              />
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
      pain="I spend $20K a month on marketing and don't know what's working."
      headline="Every dollar tied to a sale. Cut the spend that doesn't close."
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

/* ---------- Pipeline: speed to lead ---------- */

const RESPONSE = [
  { name: "Under 5 min", v: 24 },
  { name: "5–60 min", v: 13 },
  { name: "Over 1 hour", v: 8 },
];
const FAST = RESPONSE[0];
const SLOW = RESPONSE[RESPONSE.length - 1];

function PipelineScene() {
  return (
    <Feature
      pain="Leads go cold. Nobody follows up."
      headline="Every lead called in 5 minutes. Nothing slips."
      body="We time every lead to first contact and alert your team before it goes cold."
      big={`${Math.round(FAST.v / SLOW.v)}×`}
      bigLabel="Close rate when leads are called within 5 minutes"
      label={`Sample chart, close rate by response time: ${RESPONSE.map((r) => `${r.name} ${r.v}%`).join(", ")}.`}
    >
      <DashPanel title="Close rate by response time">
        <HBars rows={RESPONSE} hi={FAST.name} fmt="pct" />
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
      pain="We're busy but always behind, and everything runs through me."
      headline="Work moves without you approving every step."
      body="We show where work waits on you, then set rules so routine approvals run themselves."
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

/* ---------- Finance: margin by project while it runs ---------- */

/** Margin by project this month, in percent. One project is losing money. */
const PROJECTS = [
  { name: "#1042", v: 34 },
  { name: "#1047", v: 29 },
  { name: "#1051", v: 22 },
  { name: "#1058", v: -4 },
];
const LOSER = PROJECTS.reduce((a, p) => (p.v < a.v ? p : a));

function MarginScene() {
  return (
    <Feature
      pain="I can't see what each project makes after costs. I don't know how we're doing until the books close."
      headline="See profit on every project while it's still running."
      body="We match costs to each project as they land, so a losing job shows up while you can still fix it."
      big={FMT.spct(LOSER.v)}
      bigLabel={`Project ${LOSER.name}, caught mid-project, not at month end`}
      label={`Sample chart, margin by project this month: ${PROJECTS.map((p) => `${p.name} ${FMT.spct(p.v)}`).join(", ")}. Project ${LOSER.name} is losing money.`}
    >
      <DashPanel title="Margin by project · this month">
        <HBars rows={PROJECTS} hi={LOSER.name} fmt="spct" />
      </DashPanel>
    </Feature>
  );
}

/* ---------- Finance (previous version): forecast from the real pipeline ---------- */

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

/** Not shown right now; kept so the forecast tab can come back. */
export function ForecastScene() {
  return (
    <Feature
      pain="I don't know how next quarter will go until it's over."
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
      pain="We lose deals and I don't know why."
      headline="Know why you lose, and fix it before the next call."
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
  { label: "Finance", scene: <MarginScene /> },
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
