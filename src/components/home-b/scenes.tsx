import type { ReactNode } from "react";
import {
  Clock,
  CreditCard,
  FileText,
  Lightbulb,
  MessageSquare,
  Repeat,
  Search,
  TriangleAlert,
  Wrench,
} from "lucide-react";
import { Bars, Chip, IllustrativeBadge, Stat, Window } from "./mock-ui";

/*
 * Four illustrative scenes. All numbers are sample data inside the mockup and
 * are not results or claims. Derived figures (CPL, CPS, CPA, margin %) are
 * computed from the sample inputs so the arithmetic always matches.
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
      <Window title="Marketing · Leads by source · October">
        <div className="grid min-w-0 gap-3 p-3 sm:p-4">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <Stat label="Spend" value={money(MKT_SPEND)} />
            <Stat label="Leads" value={String(MKT_LEADS)} delta={`${money(MKT_SPEND / MKT_LEADS)} per lead`} />
            <Stat label="Sales" value={String(MKT_SALES)} delta={`${money(MKT_SPEND / MKT_SALES)} per sale`} />
            <Stat label="Lead → sale" value={pct(MKT_SALES / MKT_LEADS)} />
          </div>
          <div className="min-w-0 rounded-lg border border-border p-3">
            <Table head={["Source", "Spend", "Leads", "Cost / lead", "Sales", "Cost / sale"]}>
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
              <Row
                total
                cells={[
                  "Total",
                  money(MKT_SPEND),
                  String(MKT_LEADS),
                  money(MKT_SPEND / MKT_LEADS),
                  String(MKT_SALES),
                  money(MKT_SPEND / MKT_SALES),
                ]}
              />
            </Table>
          </div>
        </div>
      </Window>
      <IllustrativeBadge sample className="absolute left-3 top-[-12px]" />
    </div>
  );
}

/* ---------------- Customer journey ---------------- */

type Marker = { kind: "friction" | "opportunity"; text: string };

const STAGES: { icon: typeof Search; label: string; markers: Marker[] }[] = [
  { icon: Search, label: "Discover", markers: [] },
  { icon: MessageSquare, label: "Inquire", markers: [{ kind: "friction", text: "40% drop-off" }, { kind: "opportunity", text: "Auto follow-up" }] },
  { icon: FileText, label: "Quote", markers: [{ kind: "friction", text: "Takes 3 days" }, { kind: "opportunity", text: "Instant quote" }] },
  { icon: CreditCard, label: "Buy", markers: [] },
  { icon: Wrench, label: "Service", markers: [{ kind: "opportunity", text: "Review request" }] },
  { icon: Repeat, label: "Repeat", markers: [{ kind: "friction", text: "18% return" }] },
];

function MarkerPill({ kind, text }: Marker) {
  const friction = kind === "friction";
  return (
    <span
      className={
        friction
          ? "inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-amber-200 bg-amber-50 px-1.5 py-0.5 text-[10px] font-semibold text-amber-800"
          : "inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-tint-strong bg-tint px-1.5 py-0.5 text-[10px] font-semibold text-primary"
      }
    >
      {friction ? <TriangleAlert className="size-3 shrink-0" aria-hidden="true" /> : <Lightbulb className="size-3 shrink-0" aria-hidden="true" />}
      {text}
    </span>
  );
}

export function JourneyScene() {
  return (
    <div className="relative">
      <Window title="Customer journey · Where people stall">
        <div className="grid min-w-0 gap-3 p-3 sm:p-4">
          <div className="min-w-0 overflow-x-auto">
            <ol className="grid min-w-[640px] grid-cols-6 gap-2">
              {STAGES.map(({ icon: Icon, label, markers }, i) => (
                <li key={label} className="relative grid content-start gap-2">
                  {i < STAGES.length - 1 && (
                    <span className="absolute left-1/2 top-4 h-px w-full bg-tint-strong" aria-hidden="true" />
                  )}
                  <div className="relative grid justify-items-center gap-1.5 text-center">
                    <span className="flex size-8 items-center justify-center rounded-full border border-tint-strong bg-background text-primary">
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    <span className="text-[11px] font-semibold">{label}</span>
                  </div>
                  <div className="grid justify-items-center gap-1">
                    {markers.map((m) => (
                      <MarkerPill key={m.text} {...m} />
                    ))}
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="flex flex-wrap items-center gap-3 rounded-lg bg-muted px-3 py-2 text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <TriangleAlert className="size-3 text-amber-700" aria-hidden="true" /> Friction
            </span>
            <span className="inline-flex items-center gap-1">
              <Lightbulb className="size-3 text-primary" aria-hidden="true" /> Opportunity
            </span>
            <Chip>Sample</Chip>
          </div>
        </div>
      </Window>
      <IllustrativeBadge sample className="absolute left-3 top-[-12px]" />
    </div>
  );
}

/* ---------------- Finance ---------------- */

const SERVICES = [
  { name: "Installs", revenue: 26400, cost: 17160 },
  { name: "Repairs", revenue: 14800, cost: 8880 },
  { name: "Maintenance plans", revenue: 9600, cost: 4320 },
];
const FIN_REV = SERVICES.reduce((a, s) => a + s.revenue, 0); // 50,800
const FIN_COST = SERVICES.reduce((a, s) => a + s.cost, 0); // 30,360

export function FinanceScene() {
  return (
    <div className="relative">
      <Window title="Finance · Acquisition cost and margin · October">
        <div className="grid min-w-0 gap-3 p-3 sm:grid-cols-[1fr_1.4fr] sm:p-4">
          <div className="grid content-start gap-2 rounded-lg border border-border p-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">
              Cost per acquisition
            </span>
            <div className="grid grid-cols-2 gap-2">
              <Stat label="Marketing spend" value={money(MKT_SPEND)} />
              <Stat label="New customers" value={String(MKT_SALES)} />
            </div>
            <Stat label="Spend ÷ customers" value={money(MKT_SPEND / MKT_SALES)} delta="per new customer" />
          </div>
          <div className="grid min-w-0 content-start gap-2 rounded-lg border border-border p-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">
              Margin by service
            </span>
            <Table head={["Service", "Revenue", "Cost", "Margin", "Margin %"]}>
              {SERVICES.map((s) => (
                <Row
                  key={s.name}
                  cells={[s.name, money(s.revenue), money(s.cost), money(s.revenue - s.cost), pct((s.revenue - s.cost) / s.revenue)]}
                />
              ))}
              <Row total cells={["Total", money(FIN_REV), money(FIN_COST), money(FIN_REV - FIN_COST), pct((FIN_REV - FIN_COST) / FIN_REV)]} />
            </Table>
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
      <Window title="Customer service · This week">
        <div className="grid gap-3 p-3 sm:p-4">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <Stat label="Median response" value="42 min" />
            <Stat label="Avg response" value="1h 10m" />
            <Stat label="Tickets" value={String(TICKETS)} delta="this week" />
            <Stat label="Resolution rate" value={pct(RESOLVED / TICKETS)} delta={`${RESOLVED} of ${TICKETS} resolved`} />
          </div>
          <div className="grid gap-2 rounded-lg border border-border p-3">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-3.5 text-brand" aria-hidden="true" /> Tickets by day
              </span>
              <Chip>Sample</Chip>
            </div>
            <Bars values={TICKETS_BY_DAY.map((v) => (v / MAX_DAY) * 100)} />
            <div className="grid grid-cols-7 text-center text-[10px] tabular-nums text-muted-foreground">
              {DAYS.map((d, i) => (
                <span key={d}>
                  <span className="block font-medium text-foreground">{TICKETS_BY_DAY[i]}</span>
                  {d}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Window>
      <IllustrativeBadge sample className="absolute left-3 top-[-12px]" />
    </div>
  );
}
