import type { ReactNode } from "react";
import { Section, SectionHead } from "@/components/shared/section";
import { Glyph } from "./illustrations";
import { USE_CASES_HEAD } from "./content";

const FONT = "var(--font-inter), system-ui, sans-serif";
const INK = "var(--ink)";
const MUTED = "#64748b";
const BRAND = "var(--brand)";
const TINT = "#eef5fc";
const TINT_STRONG = "#d6e6f8";

function Label({ x, y, children, size = 12, weight = 500, fill = MUTED, anchor = "start" as const }: {
  x: number; y: number; children: ReactNode; size?: number; weight?: number; fill?: string; anchor?: "start" | "middle" | "end";
}) {
  return (
    <text x={x} y={y} fontSize={size} fontWeight={weight} fill={fill} fontFamily={FONT} textAnchor={anchor}>
      {children}
    </text>
  );
}

function Panel({ x, y, w, h, fill = "#fff" }: { x: number; y: number; w: number; h: number; fill?: string }) {
  return <rect x={x} y={y} width={w} height={h} rx={12} fill={fill} stroke={TINT_STRONG} strokeWidth={1.5} />;
}

function AiTag({ x, y, text }: { x: number; y: number; text: string }) {
  const w = text.length * 6.4 + 36;
  return (
    <g>
      <rect x={x} y={y} width={w} height={24} rx={12} fill={BRAND} />
      <Glyph name="sparkle" x={x + 15} y={y + 12} size={14} stroke="#fff" />
      <Label x={x + 27} y={y + 16} size={11.5} weight={600} fill="#fff">{text}</Label>
    </g>
  );
}

/** Marketing: a lead-source dashboard with an AI-drafted follow-up waiting for approval. */
function MarketingScene() {
  const rows = [
    { name: "Google Ads", v: 0.82, n: "41" },
    { name: "Referrals", v: 0.58, n: "29" },
    { name: "Website", v: 0.44, n: "22" },
    { name: "Social", v: 0.22, n: "11" },
  ];
  return (
    <svg viewBox="0 0 360 240" role="img" aria-label="Sample marketing dashboard: leads by source, with an AI-drafted follow-up awaiting approval" className="block h-auto w-full">
      <Panel x={8} y={8} w={344} h={224} fill={TINT} />
      <Panel x={20} y={20} w={200} h={200} />
      <Label x={32} y={42} size={12} weight={700} fill={INK}>Leads by source</Label>
      <Label x={32} y={58} size={10.5}>Sample data · this week</Label>
      {rows.map((r, i) => {
        const y = 78 + i * 34;
        return (
          <g key={r.name}>
            <Label x={32} y={y + 11} size={11} fill={INK}>{r.name}</Label>
            <rect x={100} y={y} width={100} height={14} rx={4} fill={TINT} />
            <rect x={100} y={y} width={100 * r.v} height={14} rx={4} fill={BRAND} />
            <Label x={100 + 100 * r.v + 6} y={y + 11} size={10.5} weight={600} fill={INK}>{r.n}</Label>
          </g>
        );
      })}
      <Panel x={232} y={20} w={108} h={200} />
      <Label x={244} y={42} size={12} weight={700} fill={INK}>New lead</Label>
      <rect x={244} y={52} width={84} height={8} rx={4} fill={TINT_STRONG} />
      <rect x={244} y={66} width={60} height={8} rx={4} fill={TINT_STRONG} />
      <line x1={244} y1={88} x2={328} y2={88} stroke={TINT_STRONG} />
      <Label x={244} y={108} size={10.5}>Follow-up email</Label>
      <rect x={244} y={116} width={84} height={6} rx={3} fill={TINT_STRONG} />
      <rect x={244} y={128} width={76} height={6} rx={3} fill={TINT_STRONG} />
      <rect x={244} y={140} width={66} height={6} rx={3} fill={TINT_STRONG} />
      <AiTag x={244} y={160} text="AI draft" />
      <rect x={244} y={192} width={84} height={20} rx={10} fill={TINT} stroke={BRAND} strokeWidth={1.5} />
      <Label x={286} y={206} size={10.5} weight={600} fill="var(--primary)" anchor="middle">Approve</Label>
    </svg>
  );
}

/** Operations: a job flows through four steps on its own, with AI checking the schedule. */
function OperationsScene() {
  const steps = [
    { label: "New job", glyph: "doc" as const },
    { label: "Scheduled", glyph: "calendar" as const },
    { label: "Crew notified", glyph: "truck" as const },
    { label: "Invoice sent", glyph: "dollar" as const },
  ];
  return (
    <svg viewBox="0 0 360 240" role="img" aria-label="Sample operations workflow: a new job is scheduled, the crew is notified and the invoice is sent, with AI checking for schedule conflicts" className="block h-auto w-full">
      <Panel x={8} y={8} w={344} h={224} fill={TINT} />
      {steps.map((s, i) => {
        const x = 50 + i * 86;
        const y = 104;
        return (
          <g key={s.label}>
            {i > 0 && (
              <path d={`M${x - 62} ${y} H${x - 32}`} stroke={BRAND} strokeWidth={2.5} strokeLinecap="round" markerEnd="url(#ops-arrow)" />
            )}
            <circle cx={x} cy={y} r={26} fill="#fff" stroke={TINT_STRONG} strokeWidth={1.5} />
            <Glyph name={s.glyph} x={x} y={y} size={24} />
            <Label x={x} y={y - 40} size={11} weight={600} fill={INK} anchor="middle">{s.label}</Label>
          </g>
        );
      })}
      <defs>
        <marker id="ops-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M1 1l5 3-5 3" fill="none" stroke={BRAND} strokeWidth={1.6} strokeLinecap="round" />
        </marker>
      </defs>
      <path d="M136 130 V170 H180" fill="none" stroke={BRAND} strokeWidth={2} strokeDasharray="4 5" strokeLinecap="round" />
      <path d="M222 170 H270 V130" fill="none" stroke={BRAND} strokeWidth={2} strokeDasharray="4 5" strokeLinecap="round" />
      <rect x={110} y={182} width={140} height={40} rx={12} fill="#fff" stroke={TINT_STRONG} strokeWidth={1.5} />
      <AiTag x={120} y={190} text="Conflict check" />
      <Glyph name="check" x={232} y={202} size={18} />
      <Label x={340} y={38} size={10.5} anchor="end">No retyping</Label>
      <Label x={20} y={38} size={10.5}>Sample workflow</Label>
    </svg>
  );
}

/** Finance: three KPI tiles and a margin trend, all placeholder figures. */
function FinanceScene() {
  const tiles = [
    { label: "Cash in", value: "$84k", note: "sample" },
    { label: "Open invoices", value: "$23k", note: "sample" },
    { label: "Jobs over budget", value: "3", note: "sample" },
  ];
  const trend = [48, 54, 50, 60, 58, 66, 64, 72];
  const pts = trend.map((v, i) => `${40 + i * 40},${206 - (v - 40) * 2.2}`).join(" ");
  return (
    <svg viewBox="0 0 360 240" role="img" aria-label="Sample finance dashboard: cash in, open invoices, jobs over budget and a margin trend, all placeholder figures" className="block h-auto w-full">
      <Panel x={8} y={8} w={344} h={224} fill={TINT} />
      {tiles.map((t, i) => {
        const x = 20 + i * 110;
        return (
          <g key={t.label}>
            <Panel x={x} y={20} w={100} h={72} />
            <Label x={x + 12} y={40} size={10.5}>{t.label}</Label>
            <Label x={x + 12} y={66} size={20} weight={700} fill={INK}>{t.value}</Label>
            <Label x={x + 12} y={82} size={9.5}>{t.note}</Label>
          </g>
        );
      })}
      <Panel x={20} y={104} w={320} h={116} />
      <Label x={32} y={124} size={12} weight={700} fill={INK}>Margin by month</Label>
      <Label x={328} y={124} size={10.5} anchor="end">Sample data</Label>
      {[0, 1, 2].map((i) => (
        <line key={i} x1={40} x2={320} y1={140 + i * 30} y2={140 + i * 30} stroke={TINT_STRONG} strokeDasharray="2 4" />
      ))}
      <polyline points={pts} fill="none" stroke={BRAND} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={320} cy={206 - (72 - 40) * 2.2} r={5} fill={BRAND} stroke="#fff" strokeWidth={2} />
    </svg>
  );
}

/** Customer service: before, a stack of unanswered messages; after, AI drafts and a person approves. */
function ServiceScene() {
  return (
    <svg viewBox="0 0 360 240" role="img" aria-label="Sample customer service before and after: unanswered messages before; AI-drafted replies approved by a person after" className="block h-auto w-full">
      <Panel x={8} y={8} w={344} h={224} fill={TINT} />
      <Label x={20} y={32} size={10.5} weight={700} fill={MUTED}>BEFORE</Label>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={20} y={42 + i * 54} width={150} height={44} rx={12} fill="#fff" stroke={TINT_STRONG} strokeWidth={1.5} />
          <Glyph name="chat" x={38} y={64 + i * 54} size={18} stroke={MUTED} />
          <rect x={54} y={56 + i * 54} width={100} height={6} rx={3} fill={TINT_STRONG} />
          <rect x={54} y={68 + i * 54} width={70} height={6} rx={3} fill={TINT_STRONG} />
          <circle cx={158} cy={54 + i * 54} r={5} fill="#f59e0b" />
        </g>
      ))}
      <Label x={95} y={222} size={10.5} anchor="middle">Waiting since Friday</Label>
      <path d="M180 120 h18" stroke={BRAND} strokeWidth={2.5} strokeLinecap="round" markerEnd="url(#cs-arrow)" />
      <defs>
        <marker id="cs-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M1 1l5 3-5 3" fill="none" stroke={BRAND} strokeWidth={1.6} strokeLinecap="round" />
        </marker>
      </defs>
      <Label x={206} y={32} size={10.5} weight={700} fill="var(--primary)">AFTER</Label>
      <rect x={206} y={42} width={134} height={44} rx={12} fill="#fff" stroke={TINT_STRONG} strokeWidth={1.5} />
      <Glyph name="chat" x={224} y={64} size={18} stroke={MUTED} />
      <rect x={240} y={56} width={88} height={6} rx={3} fill={TINT_STRONG} />
      <rect x={240} y={68} width={60} height={6} rx={3} fill={TINT_STRONG} />
      <path d="M273 86 v10" stroke={BRAND} strokeWidth={2} strokeLinecap="round" />
      <rect x={206} y={98} width={134} height={56} rx={12} fill="#fff" stroke={BRAND} strokeWidth={1.5} />
      <AiTag x={216} y={106} text="Reply drafted" />
      <rect x={216} y={136} width={110} height={6} rx={3} fill={TINT_STRONG} />
      <path d="M273 154 v10" stroke={BRAND} strokeWidth={2} strokeLinecap="round" />
      <rect x={206} y={166} width={134} height={44} rx={12} fill={BRAND} />
      <Glyph name="check" x={226} y={188} size={18} stroke="#fff" />
      <Label x={242} y={185} size={11} weight={700} fill="#fff">Approved by Sam</Label>
      <Label x={242} y={200} size={10} fill="#fff">Sent in minutes</Label>
    </svg>
  );
}

const SCENES = [
  { title: "AI in marketing", text: "Every lead lands in one place and the follow-up is drafted for you.", scene: <MarketingScene /> },
  { title: "AI in operations", text: "A job moves from booked to invoiced with nobody retyping it.", scene: <OperationsScene /> },
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
            className="grid content-start gap-4 rounded-3xl border border-tint-strong bg-gradient-to-b from-white to-tint/60 p-4 sm:p-6"
          >
            <div className="grid gap-2">
              <span className="justify-self-end rounded-full bg-white px-2.5 py-0.5 text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground ring-1 ring-tint-strong">
                Illustrative example
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
