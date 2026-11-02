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
  label,
  children,
}: {
  /** The owner's pain, in their words. */
  pain: string;
  /** The end state we deliver. */
  headline: string;
  body: string;
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
  { name: "Google Ads", campaign: "Branded search", leads: 214, sales: 49, cpl: 38 },
  { name: "Google Ads", campaign: "Non-branded · service + city", leads: 388, sales: 41, cpl: 92 },
  { name: "Google LSA", campaign: "Local Services Ads", leads: 263, sales: 38, cpl: 61 },
  { name: "Meta", campaign: "Lead form · spring promo", leads: 301, sales: 9, cpl: 29 },
  { name: "Google Business Profile", campaign: "Organic calls & forms", leads: 176, sales: 31, cpl: 0 },
];
const cps = (c: (typeof CHANNELS)[number]) => (c.leads * c.cpl) / c.sales;
const WORST = CHANNELS.reduce((a, c) => (cps(c) > cps(a) ? c : a)); // lowest CPL, highest CPS

function SalesScene() {
  return (
    <Feature
      pain="I spend $20K a month on marketing and don't know what's working."
      headline="Every dollar tied to a sale. Cut the spend that doesn't close."
      body="We follow each lead from ad to closed deal, so you judge channels by cost per sale."
      label={`Sample report, cost per lead and cost per sale by channel: ${CHANNELS.map((c) => `${c.name} ${c.campaign} ${c.cpl ? `${usd(c.cpl)} and ${usd(cps(c))}` : "organic, no ad cost"}`).join("; ")}. ${WORST.name} has the lowest cost per lead and the highest cost per sale.`}
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
                <tr key={`${c.name}-${c.campaign}`} className={cx(c === WORST && s.hiRow)} style={vars({ "--d": `${k * 90}ms` })}>
                  <td>
                    {c.name}
                    <span className="block text-xs font-normal text-muted-foreground">{c.campaign}</span>
                  </td>
                  <td>{c.cpl ? usd(c.cpl) : "—"}</td>
                  <td>
                    {c === WORST ? (
                      <CountUp to={Math.round(cps(c))} format="usd">
                        {usd(cps(c))}
                      </CountUp>
                    ) : c.cpl ? (
                      usd(cps(c))
                    ) : (
                      "—"
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

function PipelineScene() {
  return (
    <Feature
      pain="Leads go cold. Nobody follows up."
      headline="Every lead called in 5 minutes. Nothing slips."
      body="We time every lead to first contact and alert your team before it goes cold."
      label={`Sample chart, close rate by response time: ${RESPONSE.map((r) => `${r.name} ${r.v}%`).join(", ")}.`}
    >
      <DashPanel title="Close rate by response time">
        <HBars rows={RESPONSE} hi={FAST.name} fmt="pct" />
      </DashPanel>
    </Feature>
  );
}

/* ---------- Intake: where leads stall ---------- */

const STUCK = [
  { name: "New lead", v: 12 },
  { name: "Contacted", v: 9 },
  { name: "Appointment set", v: 23 },
  { name: "Proposal sent", v: 14 },
];
const STALL = STUCK.reduce((a, x) => (x.v > a.v ? x : a));

function IntakeScene() {
  return (
    <Feature
      pain="Leads come in, and then I don't know what happens to them."
      headline="See exactly where leads stall, and who to call today."
      body="We track every lead through intake and flag the ones sitting too long."
      label={`Sample chart, leads stuck 7 or more days by stage: ${STUCK.map((x) => `${x.name} ${x.v}`).join(", ")}. Most are stuck at ${STALL.name.toLowerCase()}.`}
    >
      <DashPanel title="Leads stuck 7+ days, by stage">
        <HBars rows={STUCK} hi={STALL.name} fmt="int" />
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
      label={`Sample chart, median days per step: ${STEPS.map((x) => `${x.name} ${x.v}`).join(", ")}.`}
    >
      <DashPanel title="Median days per step">
        <HBars rows={STEPS} hi={BOTTLENECK.name} fmt="dec" />
      </DashPanel>
    </Feature>
  );
}

/* ---------- Finance: revenue and cost forecast ---------- */

/** $K by month. Jul–Oct actual, Nov–Dec forecast. Dec is where margin narrows. */
const PLAN = [
  { m: "Jul", rev: 412, cost: 341 },
  { m: "Aug", rev: 438, cost: 352 },
  { m: "Sep", rev: 401, cost: 349 },
  { m: "Oct", rev: 467, cost: 371 },
  { m: "Nov", rev: 489, cost: 384, forecast: true },
  { m: "Dec", rev: 455, cost: 392, forecast: true },
];
const margin = (x: (typeof PLAN)[number]) => Math.round(((x.rev - x.cost) / x.rev) * 100);
const TIGHT = PLAN[PLAN.length - 1]; // Dec
const PLAN_MAX = 500;
const pctOf = (v: number, max: number) => `${(v / max) * 86}%`;

function RevenueCostScene() {
  return (
    <Feature
      pain="I don't know what next quarter looks like, or if we'll cover our costs."
      headline="See next quarter's revenue and costs before they happen."
      body="We forecast from your real pipeline and spending, so you plan with numbers you'll actually hit."
      label={`Sample chart in thousands, revenue and costs by month: ${PLAN.map((x) => `${x.m} revenue ${x.rev}, costs ${x.cost}${x.forecast ? " (forecast)" : ""}`).join("; ")}. ${TIGHT.m} margin narrows to ${margin(TIGHT)}%.`}
    >
      <DashPanel title="Revenue and costs, $K">
        <div className={s.body}>
          <div className={s.chartHead}>
            <div className={s.legend} aria-hidden>
              <span>
                <i style={{ background: "var(--mute)" }} />
                Revenue
              </span>
              <span>
                <i className={s.hatchMute} />
                Forecast
              </span>
              <span>
                <i className={s.lineKey} />
                Costs
              </span>
            </div>
            <span className={s.hiNote}>{`${TIGHT.m} margin ${margin(TIGHT)}%`}</span>
          </div>
          <div className={s.cols}>
            {PLAN.map((x, k) => (
              <div key={x.m} className={s.col} title={`${x.m} · revenue $${x.rev}K, costs $${x.cost}K${x.forecast ? " (forecast)" : ""}`}>
                <span
                  className={cx(s.colBar, x === TIGHT ? s.hatch : x.forecast && s.hatchMute)}
                  style={vars({ "--h": pctOf(x.rev, PLAN_MAX), "--d": `${k * 80}ms` })}
                />
                <span className={s.cost} style={vars({ "--c": pctOf(x.cost, PLAN_MAX) })} />
              </div>
            ))}
            <div className={s.today} aria-hidden>
              <span>Today</span>
            </div>
          </div>
          <div className={s.months} aria-hidden>
            {PLAN.map((x) => (
              <span key={x.m}>{x.m}</span>
            ))}
          </div>
        </div>
      </DashPanel>
    </Feature>
  );
}

/* ---------- Hiring: booked hours vs team capacity ---------- */

const BOOKED = [
  { m: "Jan", v: 1240 },
  { m: "Feb", v: 1310 },
  { m: "Mar", v: 1420 },
  { m: "Apr", v: 1560 },
  { m: "May", v: 1690 },
  { m: "Jun", v: 1780 },
];
const CAPACITY = 1520;
const HOURS_MAX = 1800;
const FIRST_OVER = BOOKED.find((x) => x.v > CAPACITY)!;
const hrs = (n: number) => n.toLocaleString("en-US");

function HiringScene() {
  return (
    <Feature
      pain="I can't tell if we need to hire, or if we can afford to."
      headline="Know when to hire before your team is buried."
      body="We compare booked work against team capacity, so you hire ahead of demand instead of after."
      label={`Sample chart, booked hours by month: ${BOOKED.map((x) => `${x.m} ${hrs(x.v)}`).join(", ")}. Team capacity is ${hrs(CAPACITY)} hours; booked work passes it in ${FIRST_OVER.m}.`}
    >
      <DashPanel title="Booked hours vs. team capacity">
        <div className={s.body}>
          <div className={s.legend} aria-hidden>
            <span>
              <i className={s.dashKey} />
              {`Team capacity ${hrs(CAPACITY)} hrs`}
            </span>
          </div>
          <div className={s.cols}>
            {BOOKED.map((x, k) => (
              <div key={x.m} className={s.col} title={`${x.m} · ${hrs(x.v)} hrs booked`}>
                {x === FIRST_OVER && (
                  <span className={s.flag} style={vars({ "--h": pctOf(x.v, HOURS_MAX) })}>
                    {`${x.m}: over capacity`}
                  </span>
                )}
                <span className={cx(s.colBar, x.v > CAPACITY && s.hiBar)} style={vars({ "--h": pctOf(x.v, HOURS_MAX), "--d": `${k * 80}ms` })} />
              </div>
            ))}
            <div className={s.refLine} style={vars({ "--y": pctOf(CAPACITY, HOURS_MAX) })} aria-hidden />
          </div>
          <div className={s.months} aria-hidden>
            {BOOKED.map((x) => (
              <span key={x.m}>{x.m}</span>
            ))}
          </div>
        </div>
      </DashPanel>
    </Feature>
  );
}

/* ---------- Finance (previous version): margin by project while it runs ---------- */

/** Margin by project this month, in percent. One project is losing money. */
const PROJECTS = [
  { name: "#1042", v: 34 },
  { name: "#1047", v: 29 },
  { name: "#1051", v: 22 },
  { name: "#1058", v: -4 },
];
const LOSER = PROJECTS.reduce((a, p) => (p.v < a.v ? p : a));

/** Not shown right now; kept so the margin view can come back. */
export function MarginScene() {
  return (
    <Feature
      pain="I can't see what each project makes after costs. I don't know how we're doing until the books close."
      headline="See profit on every project while it's still running."
      body="We match costs to each project as they land, so a losing job shows up while you can still fix it."
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
      label={`Sample call analysis, lost deals by reason: ${REASONS.map((r) => `${r.name} ${r.v}`).join(", ")}. Slow response is the surprise.`}
    >
      <DashPanel title="Lost deals by reason, from the calls">
        <HBars rows={REASONS} hi={SURPRISE} fmt="int" />
      </DashPanel>
    </Feature>
  );
}

const TABS: UseCaseTab[] = [
  { label: "Marketing", scene: <SalesScene /> },
  { label: "Speed to lead", scene: <PipelineScene /> },
  { label: "Intake", scene: <IntakeScene /> },
  { label: "Operations", scene: <OpsScene /> },
  { label: "Finance", scene: <RevenueCostScene /> },
  { label: "Hiring", scene: <HiringScene /> },
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
