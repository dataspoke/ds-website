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
  decision,
  label,
  children,
}: {
  /** The owner's pain, in their words. */
  pain: string;
  /** The end state we deliver. */
  headline: string;
  body: string;
  /** The decision the owner is trying to make, and what the chart says to do. */
  decision: { q: string; a: string };
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
        <div className="mt-5 max-w-md rounded-r-lg border-l-[3px] border-primary bg-tint px-4 py-3">
          <div className="text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-primary">The decision</div>
          <p className="mt-1 text-[0.95rem] leading-snug text-ink">
            <strong className="font-semibold">{decision.q}</strong>{" "}
            <span className="whitespace-nowrap">→</span> {decision.a}
          </p>
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
function HBars({
  rows,
  hi,
  fmt,
  refAt,
}: {
  rows: { name: string; v: number }[];
  hi: string;
  fmt: Fmt;
  /** Optional dashed vertical reference line at this value, with its label. */
  refAt?: { v: number; label: string };
}) {
  const max = Math.max(...rows.map((r) => r.v), refAt?.v ?? 0);
  const min = Math.min(0, ...rows.map((r) => r.v));
  const span = max - min;
  const zero = (-min / span) * 100; // % from the left where 0 sits
  const signed = min < 0;
  return (
    <div className={s.body}>
      <div className={cx(s.bars, refAt && s.withRef)}>
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
      {refAt && (
        <div className={s.refV} style={vars({ "--r": String(refAt.v / span) })} aria-hidden>
          <span>{refAt.label}</span>
        </div>
      )}
      </div>
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
];
const cps = (c: (typeof CHANNELS)[number]) => (c.leads * c.cpl) / c.sales;
const WORST = CHANNELS.reduce((a, c) => (cps(c) > cps(a) ? c : a)); // lowest CPL, highest CPS

function SalesScene() {
  return (
    <Feature
      pain="I spend $20K a month on marketing and don't know what's working."
      headline="Every dollar tied to a sale. Cut the spend that doesn't close."
      body="We tie each lead to the sale it became, so you judge channels by cost per sale."
      decision={{ q: "Where should next month's ad budget go?", a: "Shift Meta spend to Google LSA." }}
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
                    <span className="block text-xs leading-tight font-normal text-muted-foreground">{c.campaign}</span>
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

/* ---------- Personas: who actually buys ---------- */

/** Close rate by customer type, last 12 months. */
const PERSONAS = [
  { name: "Referred by a customer", v: 42 },
  { name: "Established business", v: 31 },
  { name: "First-time buyer", v: 14 },
  { name: "Price shopper", v: 6 },
];
const BEST = PERSONAS.reduce((a, x) => (x.v > a.v ? x : a));

function PersonasScene() {
  return (
    <Feature
      pain="My team spends all day chasing leads that never buy."
      headline="Know your best customer. Stop chasing bad leads."
      body="We profile who actually buys, then score every new lead so your team calls the best ones first."
      decision={{ q: "Which leads do we chase, and which do we drop?", a: "Call referrals first. Send price shoppers an email." }}
      label={`Sample chart, close rate by customer type: ${PERSONAS.map((x) => `${x.name} ${x.v}%`).join(", ")}. The best: ${BEST.name.toLowerCase()}, at ${BEST.v}%.`}
    >
      <DashPanel title="Close rate by customer type">
        <HBars rows={PERSONAS} hi={BEST.name} fmt="pct" />
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
      body="We time every lead to first contact and alert your team before it cools."
      decision={{ q: "Do we need someone answering leads after hours?", a: "Yes. Slow replies close at a third the rate." }}
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
      decision={{ q: "Where do we fix intake first?", a: "Follow-up after the appointment is set." }}
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
      body="We show where work waits on you, then automate the routine approvals."
      decision={{ q: "Which step do we fix first?", a: "Let managers approve jobs under $5K." }}
      label={`Sample chart, median days per step: ${STEPS.map((x) => `${x.name} ${x.v}`).join(", ")}.`}
    >
      <DashPanel title="Median days per step">
        <HBars rows={STEPS} hi={BOTTLENECK.name} fmt="dec" />
      </DashPanel>
    </Feature>
  );
}

/* ---------- Finance: weighted pipeline by stage ---------- */

/**
 * Open pipeline by stage: deal count, pipeline value in $K and the win rate
 * over the last 12 months. Average sale = pipeline ÷ deals, and expected =
 * pipeline × win rate (the same as deals × average × win rate).
 */
const STAGES = [
  { name: "Discovery call", deals: 40, pipeline: 1240, rate: 10 },
  { name: "Needs assessment", deals: 24, pipeline: 860, rate: 25 },
  { name: "Proposal sent", deals: 15, pipeline: 540, rate: 50 },
  { name: "Contract out", deals: 8, pipeline: 310, rate: 85 },
];
const avgSale = (x: (typeof STAGES)[number]) => x.pipeline / x.deals;
const expected = (x: (typeof STAGES)[number]) => Math.round((x.pipeline * x.rate) / 100);
const DEALS = STAGES.reduce((a, x) => a + x.deals, 0); // 87
const IN_PIPELINE = STAGES.reduce((a, x) => a + x.pipeline, 0); // 2,950
const EXPECTED = STAGES.reduce((a, x) => a + expected(x), 0); // 873
const EXAMPLE = STAGES[2]; // Proposal sent
/** $K to "$860K" or "$1.24M". */
const money = (k: number) => (k >= 1000 ? `$${(k / 1000).toFixed(2).replace(/\.?0+$/, "")}M` : `$${k}K`);
/** Average sale in $K with one decimal, e.g. "$35.8K". */
const avgK = (k: number) => `$${k.toFixed(1)}K`;

function PipelineValueScene() {
  return (
    <Feature
      pain="Our deals take 90 days to close. I can't tell what's actually coming in."
      headline="Know what your pipeline is really worth."
      body="We multiply each stage's deals by your average sale and real win rate."
      decision={{ q: "Can we afford to add a person this quarter?", a: `Yes. ${money(EXPECTED)} is expected in the next 90 days.` }}
      label={`Sample table, pipeline by stage for the next 90 days: ${STAGES.map((x) => `${x.name} ${x.deals} deals, average sale ${avgK(avgSale(x))}, win rate ${x.rate}%, expected ${money(expected(x))}`).join("; ")}. ${DEALS} deals, ${money(IN_PIPELINE)} in pipeline, ${money(EXPECTED)} expected.`}
    >
      <DashPanel title="Pipeline by stage · next 90 days">
        <div className={s.body}>
          <table className={s.table}>
            <thead>
              <tr>
                <th>Stage</th>
                <th>Deals</th>
                <th className={s.hideSm}>Avg sale</th>
                <th>Win rate</th>
                <th>Expected</th>
              </tr>
            </thead>
            <tbody>
              {STAGES.map((x, k) => (
                <tr key={x.name} style={vars({ "--d": `${k * 90}ms` })}>
                  <td>{x.name}</td>
                  <td>{x.deals}</td>
                  <td className={s.hideSm}>{avgK(avgSale(x))}</td>
                  <td>{`${x.rate}%`}</td>
                  <td className={s.num}>{money(expected(x))}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={s.prTotal}>
            <span>{`${DEALS} deals · ${money(IN_PIPELINE)} in pipeline`}</span>
            <span>
              {"Expected "}
              <strong>
                <CountUp to={EXPECTED} format="usdK">
                  {money(EXPECTED)}
                </CountUp>
              </strong>
            </span>
          </div>
          <p className={s.example}>
            {`e.g. ${EXAMPLE.name}: ${EXAMPLE.deals} deals × ${avgK(avgSale(EXAMPLE))} × ${EXAMPLE.rate}% = ${money(expected(EXAMPLE))}`}
          </p>
          <p className={s.foot}>Win rates from your last 12 months of deals.</p>
        </div>
      </DashPanel>
    </Feature>
  );
}

/* ---------- Finance (previous version): closed vs projected revenue against costs ---------- */

/**
 * $K by month. Oct–Dec are actuals (all closed). Jan–Mar stack signed work
 * (closed) under weighted pipeline (projected). Costs step up in Jan when a
 * new crew starts.
 */
const REVENUE = [
  { m: "Oct", closed: 412, projected: 0, cost: 352 },
  { m: "Nov", closed: 438, projected: 0, cost: 360 },
  { m: "Dec", closed: 467, projected: 0, cost: 371 },
  { m: "Jan", closed: 318, projected: 176, cost: 398, ahead: true },
  { m: "Feb", closed: 205, projected: 314, cost: 405, ahead: true },
  { m: "Mar", closed: 122, projected: 428, cost: 412, ahead: true },
];
const REV_MAX = 560;
const pctOf = (v: number, max: number) => `${(v / max) * 86}%`;
const PAST = REVENUE.filter((x) => !x.ahead).length; // today line sits after these
const CLEARS = REVENUE.find((x) => x.ahead && x.m === "Feb")!;
/** Cost line points in a 0–100 box: x from first to last column centre, y from the top. */
const COST_POINTS = REVENUE.map((x, i) => `${(i / (REVENUE.length - 1)) * 100},${100 - (x.cost / REV_MAX) * 86}`).join(" ");

/** Not shown right now; kept so the closed-vs-projected view can come back. */
export function RevenueCostScene() {
  return (
    <Feature
      pain="I don't know what next quarter looks like, or if we'll cover our costs."
      headline="See next quarter's revenue and costs before they happen."
      body="We forecast from signed work, your weighted pipeline and your costs."
      decision={{ q: "Can we add a crew in January?", a: "Yes. Projected revenue covers it by February." }}
      label={`Sample chart in thousands. Actual revenue Oct ${REVENUE[0].closed}, Nov ${REVENUE[1].closed}, Dec ${REVENUE[2].closed}. ${REVENUE.filter((x) => x.ahead).map((x) => `${x.m} closed ${x.closed} plus projected ${x.projected}, total ${x.closed + x.projected}`).join("; ")}. Costs ${REVENUE.map((x) => `${x.m} ${x.cost}`).join(", ")}. By ${CLEARS.m}, revenue clears the new costs.`}
    >
      <DashPanel title="Revenue: closed vs. projected, $K">
        <div className={s.body}>
          <div className={s.chartHead}>
            <div className={s.legend} aria-hidden>
              <span>
                <i style={{ background: "var(--hi)" }} />
                Closed
              </span>
              <span>
                <i className={s.hatchLight} />
                Projected
              </span>
              <span>
                <i className={s.lineKey} />
                Costs
              </span>
            </div>
            <span className={s.hiNote}>{`${CLEARS.m}: revenue clears new costs`}</span>
          </div>
          <div className={s.cols}>
            {REVENUE.map((x, k) => (
              <div
                key={x.m}
                className={s.col}
                title={`${x.m} · ${x.ahead ? `closed $${x.closed}K, projected $${x.projected}K` : `actual $${x.closed}K`}, costs $${x.cost}K`}
              >
                {x.projected > 0 && (
                  <span className={cx(s.colBar, s.hatchLight)} style={vars({ "--h": pctOf(x.projected, REV_MAX), "--d": `${k * 80 + 200}ms` })} />
                )}
                <span
                  className={cx(s.colBar, x.ahead && s.hiBar, x.projected > 0 && s.flat)}
                  style={vars({ "--h": pctOf(x.closed, REV_MAX), "--d": `${k * 80}ms` })}
                />
              </div>
            ))}
            <svg className={s.costLine} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
              <polyline points={COST_POINTS} vectorEffect="non-scaling-stroke" />
            </svg>
            <div className={s.today} style={vars({ "--n": String(PAST) })} aria-hidden>
              <span>Today</span>
            </div>
          </div>
          <div className={s.months} aria-hidden>
            {REVENUE.map((x) => (
              <span key={x.m}>{x.m}</span>
            ))}
          </div>
        </div>
      </DashPanel>
    </Feature>
  );
}

/* ---------- Hiring: which role is at capacity ---------- */

/** Booked work as a share of each role's capacity, next 90 days. */
const ROLES = [
  { name: "Field crew", v: 86 },
  { name: "Project managers", v: 94 },
  { name: "Estimators", v: 112 },
  { name: "Office", v: 71 },
];
const OVER = ROLES.reduce((a, r) => (r.v > a.v ? r : a));

function HiringScene() {
  return (
    <Feature
      pain="I can't tell if we need to hire, or if we can afford to."
      headline="Know when to hire before your team is buried."
      body="We compare booked work against each role's capacity, so you hire ahead of demand."
      decision={{ q: "Who do we hire next, and when?", a: "An estimator, before March." }}
      label={`Sample chart, booked work as a share of capacity over the next 90 days: ${ROLES.map((r) => `${r.name} ${r.v}%`).join(", ")}. ${OVER.name} are over capacity.`}
    >
      <DashPanel title="Booked vs. capacity, next 90 days">
        <HBars rows={ROLES} hi={OVER.name} fmt="pct" refAt={{ v: 100, label: "100% capacity" }} />
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
      decision={{ q: "Which project needs attention now?", a: `${LOSER.name}, before it closes at a loss.` }}
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
      decision={{ q: "What will next quarter bring in?", a: "Plan on the forecast, not last quarter." }}
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
      body="We tag every lost-deal call with the reason the customer gave."
      decision={{ q: "What do we fix to win more deals?", a: "Response time, before cutting price." }}
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
  { label: "Personas", scene: <PersonasScene /> },
  { label: "Speed to lead", scene: <PipelineScene /> },
  { label: "Intake", scene: <IntakeScene /> },
  { label: "Operations", scene: <OpsScene /> },
  { label: "Finance", scene: <PipelineValueScene /> },
  { label: "Hiring", scene: <HiringScene /> },
  { label: "Calls", scene: <CallsScene /> },
];

export function UseCases() {
  return (
    <Section tight id="use-cases">
      <SectionHead eyebrow={USE_CASES_HEAD.eyebrow} title={USE_CASES_HEAD.title} />
      <UseCaseTabs tabs={TABS} />
    </Section>
  );
}
