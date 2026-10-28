import { Fragment, type ReactNode } from "react";
import { Lightbulb, TrendingDown, TriangleAlert } from "lucide-react";
import { Bars, IllustrativeBadge, Stat, Window } from "./mock-ui";

/*
 * Four illustrative scenes. All numbers are sample data inside the mockup and
 * are not results or claims. Derived figures (CPL, CPS, CPA, funnel drop-off,
 * margin $ and %) are computed from the sample inputs so the arithmetic always matches.
 */

const money = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;
const pct = (n: number) => `${Math.round(n * 100)}%`;

/* Shared compact table styling. Scrolls horizontally inside its card on narrow screens. */
function Table({ head, children }: { head: string[]; children: ReactNode }) {
  return (
    <div className="min-w-0 overflow-x-auto">
      <table className="w-full min-w-[420px] border-collapse text-[11px] tabular-nums">
        <thead>
          <tr className="text-left text-[10px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">
            {head.map((h, i) => (
              <th key={h} className={i === 0 ? "py-1.5 pr-2" : "px-2 py-1.5 text-right"}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

function Row({ cells, total }: { cells: string[]; total?: boolean }) {
  return (
    <tr className={total ? "border-t border-border font-semibold" : "border-t border-border/60"}>
      {cells.map((c, i) => (
        <td key={i} className={i === 0 ? "py-1.5 pr-2 text-left" : "px-2 py-1.5 text-right"}>
          {c}
        </td>
      ))}
    </tr>
  );
}

/* ---------------- Marketing ---------------- */

const SOURCES = [
  { name: "Google Ads", spend: 4200, leads: 42, sales: 14 },
  { name: "Meta", spend: 1800, leads: 24, sales: 5 },
  { name: "Referral", spend: 600, leads: 15, sales: 9 },
  { name: "Email", spend: 400, leads: 16, sales: 8 },
];
const MKT_SPEND = SOURCES.reduce((a, s) => a + s.spend, 0); // 7,000
const MKT_LEADS = SOURCES.reduce((a, s) => a + s.leads, 0); // 97
const MKT_SALES = SOURCES.reduce((a, s) => a + s.sales, 0); // 36
const MAX_LEADS = Math.max(...SOURCES.map((s) => s.leads));

export function MarketingScene() {
  return (
    <div className="relative">
      <Window title="Leads by source · October">
        <div className="grid min-w-0 gap-3 p-3 sm:p-4">
          <div className="grid grid-cols-3 gap-2">
            <Stat label="Spend" value={money(MKT_SPEND)} />
            <Stat label="Leads" value={String(MKT_LEADS)} />
            <Stat label="Sales" value={String(MKT_SALES)} />
          </div>
          <div className="min-w-0 rounded-lg border border-border p-3">
            <Table head={["Source", "Spend", "Leads", "$/lead", "Sales", "$/sale"]}>
              {SOURCES.map((s) => (
                <tr key={s.name} className="border-t border-border/60">
                  <td className="py-1.5 pr-2">
                    <span className="block font-medium">{s.name}</span>
                    <span className="mt-1 block h-1.5 w-full max-w-[96px] overflow-hidden rounded-sm bg-tint">
                      <span className="block h-full rounded-sm bg-brand" style={{ width: `${(s.leads / MAX_LEADS) * 100}%` }} />
                    </span>
                  </td>
                  <td className="px-2 py-1.5 text-right">{money(s.spend)}</td>
                  <td className="px-2 py-1.5 text-right">{s.leads}</td>
                  <td className="px-2 py-1.5 text-right">{money(s.spend / s.leads)}</td>
                  <td className="px-2 py-1.5 text-right">{s.sales}</td>
                  <td className="px-2 py-1.5 text-right">{money(s.spend / s.sales)}</td>
                </tr>
              ))}
            </Table>
          </div>
        </div>
      </Window>
      <IllustrativeBadge sample className="absolute left-3 top-[-12px]" />
    </div>
  );
}

/* ---------------- Operations: sales funnel ---------------- */

const FUNNEL = [
  { label: "Inquiries", count: 400 },
  { label: "Quotes sent", count: 180 },
  { label: "Jobs won", count: 60 },
  { label: "Repeat customers", count: 22 },
];
const FUNNEL_TOP = FUNNEL[0].count;
/** Drop-off % between stage i and i+1, computed exactly from the counts (55, 67, 63). */
const dropPct = (i: number) => Math.round((1 - FUNNEL[i + 1].count / FUNNEL[i].count) * 100);
const lost = (i: number) => FUNNEL[i].count - FUNNEL[i + 1].count;

/* One stall per gap. Each warning is derived from the counts above so it always matches. */
const STALLS: { warn: string; fix: string }[] = [
  { warn: `${lost(0)} never quoted`, fix: "Instant quote" },
  { warn: "Quotes sit 9 days, no follow-up", fix: "Auto follow-up" },
  { warn: `${lost(2)} never rebook`, fix: "Repeat reminder" },
];

function Stall({ i }: { i: number }) {
  const { warn, fix } = STALLS[i];
  return (
    <div className="grid content-center justify-items-center gap-1 py-1 text-center sm:py-0">
      <span className="inline-flex items-center gap-1 text-[11px] font-bold tabular-nums text-rose-700">
        <TrendingDown className="size-3.5 shrink-0" aria-hidden="true" />
        {`${dropPct(i)}% drop`}
      </span>
      <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-1.5 py-0.5 text-[10px] font-semibold text-amber-800">
        <TriangleAlert className="size-3 shrink-0" aria-hidden="true" />
        {warn}
      </span>
      <span className="inline-flex items-center gap-1 rounded-full border border-tint-strong bg-tint px-1.5 py-0.5 text-[10px] font-semibold text-primary">
        <Lightbulb className="size-3 shrink-0" aria-hidden="true" />
        {fix}
      </span>
    </div>
  );
}

export function FunnelScene() {
  return (
    <div className="relative">
      <Window title="Sales funnel">
        <div className="grid min-w-0 gap-3 p-3 sm:p-4">
          {/* Stacked on phones; stages and stall markers alternate across one row from sm up. */}
          <ol className="grid gap-2 sm:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] sm:items-stretch sm:gap-x-2">
            {FUNNEL.map((s, i) => (
              <Fragment key={s.label}>
                <li className="grid content-start gap-1.5 rounded-lg border border-border p-3">
                  <span className="text-[11px] font-semibold">{s.label}</span>
                  <span className="font-display text-xl font-extrabold tabular-nums tracking-tight">{s.count}</span>
                  <span className="block h-1.5 w-full overflow-hidden rounded-sm bg-tint">
                    <span className="block h-full rounded-sm bg-brand" style={{ width: `${(s.count / FUNNEL_TOP) * 100}%` }} />
                  </span>
                </li>
                {i < FUNNEL.length - 1 && (
                  <li className="sm:min-w-[120px]">
                    <Stall i={i} />
                  </li>
                )}
              </Fragment>
            ))}
          </ol>
        </div>
      </Window>
      <IllustrativeBadge sample className="absolute left-3 top-[-12px]" />
    </div>
  );
}

/* ---------------- Finance ---------------- */

/* One example business (a plumbing and heating shop). One job type loses money. */
const JOB_TYPES = [
  { name: "Installs", revenue: 26400, cost: 17160 },
  { name: "Repairs", revenue: 14800, cost: 8880 },
  { name: "Maintenance", revenue: 9600, cost: 4320 },
  { name: "After-hours calls", revenue: 6200, cost: 8040 },
];
const FIN_REV = JOB_TYPES.reduce((a, s) => a + s.revenue, 0); // 57,000
const FIN_COST = JOB_TYPES.reduce((a, s) => a + s.cost, 0); // 38,400
const LEAK = JOB_TYPES.find((s) => s.cost > s.revenue)!; // After-hours calls, -1,840

const signed = (n: number) => (n < 0 ? `-${money(-n)}` : money(n));
const signedPct = (n: number) => (n < 0 ? `-${pct(-n)}` : pct(n));

export function FinanceScene() {
  return (
    <div className="relative">
      <Window title="Margin by job type">
        <div className="grid min-w-0 gap-3 p-3 sm:p-4">
          <div className="min-w-0 rounded-lg border border-border p-3">
            <Table head={["Job type", "Revenue", "Cost", "Margin", "%"]}>
              {JOB_TYPES.map((s) => {
                const m = s.revenue - s.cost;
                const loss = m < 0;
                return (
                  <tr key={s.name} className={loss ? "border-t border-border/60 bg-rose-50 font-semibold text-rose-700" : "border-t border-border/60"}>
                    <td className="py-1.5 pr-2">{s.name}</td>
                    <td className="px-2 py-1.5 text-right">{money(s.revenue)}</td>
                    <td className="px-2 py-1.5 text-right">{money(s.cost)}</td>
                    <td className="px-2 py-1.5 text-right">{signed(m)}</td>
                    <td className="px-2 py-1.5 text-right">{signedPct(m / s.revenue)}</td>
                  </tr>
                );
              })}
              <Row
                total
                cells={["Total", money(FIN_REV), money(FIN_COST), money(FIN_REV - FIN_COST), pct((FIN_REV - FIN_COST) / FIN_REV)]}
              />
            </Table>
          </div>
          <div className="flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-[11px] text-rose-900">
            <TriangleAlert className="mt-0.5 size-3.5 shrink-0 text-rose-700" aria-hidden="true" />
            <span>
              <span className="font-bold">Here&apos;s the leak:</span> {LEAK.name.toLowerCase()} lost {money(LEAK.cost - LEAK.revenue)}.
            </span>
          </div>
        </div>
      </Window>
      <IllustrativeBadge sample className="absolute left-3 top-[-12px]" />
    </div>
  );
}

/* ---------------- Customer service ---------------- */

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const TICKETS_BY_DAY = [27, 24, 22, 21, 19, 10, 5];
const TICKETS = TICKETS_BY_DAY.reduce((a, b) => a + b, 0); // 128
const RESOLVED = 116;
const MAX_DAY = Math.max(...TICKETS_BY_DAY);

export function ServiceScene() {
  return (
    <div className="relative">
      <Window title="Support inbox">
        <div className="grid gap-3 p-3 sm:p-4">
          <div className="grid grid-cols-3 gap-2">
            <Stat label="Median response" value="42 min" />
            <Stat label="Tickets" value={String(TICKETS)} />
            <Stat label="Resolved" value={pct(RESOLVED / TICKETS)} />
          </div>
          <div className="grid gap-2 rounded-lg border border-border p-3">
            <Bars values={TICKETS_BY_DAY.map((v) => (v / MAX_DAY) * 100)} />
            <div className="grid grid-cols-7 text-center text-[10px] tabular-nums text-muted-foreground">
              {DAYS.map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>
          </div>
        </div>
      </Window>
      <IllustrativeBadge sample className="absolute left-3 top-[-12px]" />
    </div>
  );
}
