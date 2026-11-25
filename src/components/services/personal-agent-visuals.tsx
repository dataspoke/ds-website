import {
  ArrowDown,
  ArrowRight,
  Bot,
  CalendarCheck,
  Check,
  CircleCheck,
  ClipboardCheck,
  GitFork,
  KeyRound,
  Landmark,
  Lock,
  Mail,
  Megaphone,
  MessagesSquare,
  Minus,
  Newspaper,
  RotateCcw,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AGENT_PAGE as P } from "@/content/personal-ai-agent";

const TEAM_ICONS = [Mail, MessagesSquare, CalendarCheck, Newspaper, Megaphone];
const STOP_ICONS = [Lock, GitFork, KeyRound, CircleCheck];
const PILLAR_ICONS = [TrendingUp, Megaphone, ClipboardCheck, Landmark];

/** One card per workflow, each with its single job. */
export function TeamGrid() {
  return (
    <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {P.handles.items.map((m, i) => {
        const Icon = TEAM_ICONS[i] ?? Bot;
        return (
          <li key={m.name} className="grid content-start gap-3 rounded-xl border border-tint-strong bg-background p-5">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground" aria-hidden="true">
              <Icon className="h-5 w-5" />
            </span>
            <h3 className="text-lg font-bold leading-snug">{m.name}</h3>
            <p className="text-sm text-muted-foreground">{m.job}</p>
          </li>
        );
      })}
    </ul>
  );
}

/** Two lanes: what runs alone, and what waits at the gate for approval. */
export function GateLanes() {
  const g = P.gates;
  return (
    <div className="mt-10 grid gap-4">
      <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-stretch">
        <div className="rounded-xl border border-tint-strong bg-background p-6">
          <p className="flex items-center gap-2 font-display text-lg font-bold">
            <Check className="h-5 w-5 text-brand" aria-hidden="true" />
            {g.aloneLabel}
          </p>
          <ul className="mt-4 grid gap-2.5">
            {g.alone.map((item) => (
              <li key={item} className="flex gap-2.5 text-[0.97rem]">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid place-items-center" aria-hidden="true">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-ink text-white shadow-lg">
            <ShieldCheck className="h-6 w-6" />
          </span>
        </div>
        <div className="rounded-xl border-2 border-ink bg-ink p-6 text-white">
          <p className="flex items-center gap-2 font-display text-lg font-bold text-white">
            <Lock className="h-5 w-5 text-[#9cc4f0]" aria-hidden="true" />
            {g.waitLabel}
          </p>
          <ul className="mt-4 grid gap-2.5">
            {g.wait.map((item) => (
              <li key={item} className="flex gap-2.5 text-[0.97rem] text-white/90">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#9cc4f0]" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="flex items-start gap-3 rounded-xl bg-tint px-5 py-4 font-display font-bold leading-snug ring-1 ring-tint-strong">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
        {g.rule}
      </p>
    </div>
  );
}

/** The four allowed interruptions as numbered tiles. */
export function StopTiles() {
  return (
    <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {P.stops.items.map((s, i) => {
        const Icon = STOP_ICONS[i];
        return (
          <li key={s.title} className="relative grid content-start gap-2 rounded-xl border border-tint-strong bg-background p-5">
            <span className="font-display text-sm font-extrabold tabular-nums text-primary">{i + 1}</span>
            <Icon className="h-6 w-6 text-brand" aria-hidden="true" />
            <h3 className="text-lg font-bold leading-snug">{s.title}</h3>
            <p className="text-sm text-muted-foreground">{s.note}</p>
          </li>
        );
      })}
    </ol>
  );
}

/**
 * Typical AI setup vs how we build it. Crisp white card table on desktop;
 * stacked white cards on mobile so nothing scrolls sideways.
 */
export function CompareTable() {
  const c = P.compare;
  return (
    <div className="mt-10">
      <div className="hidden overflow-hidden rounded-2xl border border-tint-strong bg-background shadow-[0_1px_3px_rgba(15,30,51,0.06)] md:block">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-tint-strong text-left">
              <th scope="col" className="w-[16%] bg-tint/55 px-6 py-4 text-xs font-bold uppercase tracking-[0.08em] text-muted-foreground">
                {c.colTopic}
              </th>
              <th scope="col" className="w-[38%] bg-tint/55 px-6 py-4 text-xs font-bold uppercase tracking-[0.08em] text-muted-foreground">
                {c.colCommon}
              </th>
              <th
                scope="col"
                className="border-l border-tint-strong bg-primary/[0.08] px-6 py-4 text-xs font-bold uppercase tracking-[0.08em] text-primary"
              >
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-brand" aria-hidden="true" />
                  {c.colMine}
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-tint-strong">
            {c.rows.map((r) => (
              <tr key={r.topic}>
                <th scope="row" className="px-6 py-5 text-left align-top font-display text-[0.98rem] font-bold text-ink">
                  {r.topic}
                </th>
                <td className="px-6 py-5 align-top text-[0.95rem] text-muted-foreground">
                  <div className="flex items-start gap-2.5">
                    <Minus className="mt-1 h-4 w-4 shrink-0 text-muted-foreground/60" aria-hidden="true" />
                    <span>{r.common}</span>
                  </div>
                </td>
                <td className="border-l border-tint-strong bg-primary/[0.025] px-6 py-5 align-top text-[0.95rem] font-medium text-foreground">
                  <div className="flex items-start gap-2.5">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                    <span>{r.mine}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="grid gap-3 md:hidden">
        {c.rows.map((r) => (
          <li key={r.topic} className="overflow-hidden rounded-xl border border-tint-strong bg-background">
            <p className="border-b border-tint-strong bg-tint/55 px-4 py-2.5 font-display font-bold text-ink">{r.topic}</p>
            <div className="grid gap-3 px-4 py-3.5">
              <p className="text-sm text-muted-foreground">
                <span className="block text-xs font-bold uppercase tracking-[0.06em] text-muted-foreground/80">{c.colCommon}</span>
                {r.common}
              </p>
              <p className="rounded-lg bg-primary/[0.05] px-3 py-2.5 text-[0.95rem] font-medium text-foreground">
                <span className="mb-0.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.06em] text-primary">
                  <Check className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
                  {c.colMine}
                </span>
                {r.mine}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** The learning loop: five equal-height steps in a row (a column on phones), closing back to the start. */
export function LearningLoop() {
  const l = P.loop;
  return (
    <div className="mt-10 rounded-2xl border border-tint-strong bg-background p-6 sm:p-8">
      <ol className="grid gap-2 lg:grid-cols-[repeat(5,minmax(0,1fr))] lg:gap-0">
        {l.steps.map((s, i) => {
          const last = i === l.steps.length - 1;
          return (
            <li key={s.title} className="grid gap-2 lg:grid-cols-[1fr_auto] lg:items-stretch">
              <div
                className={cn(
                  "grid h-full content-start gap-1 rounded-xl p-4",
                  i === 1 ? "bg-primary text-primary-foreground" : "bg-tint"
                )}
              >
                <span className={cn("font-display text-sm font-extrabold tabular-nums", i === 1 ? "text-primary-foreground/80" : "text-primary")}>
                  {i + 1}
                </span>
                <span className="font-display font-bold leading-snug">{s.title}</span>
                <span className={cn("text-sm", i === 1 ? "text-primary-foreground/90" : "text-muted-foreground")}>{s.note}</span>
              </div>
              {!last && (
                <span className="grid place-items-center text-brand" aria-hidden="true">
                  <ArrowDown className="h-5 w-5 lg:hidden" />
                  <ArrowRight className="mx-1 hidden h-5 w-5 lg:block" />
                </span>
              )}
            </li>
          );
        })}
      </ol>
      <p className="mt-5 flex items-center gap-2 text-sm font-semibold text-primary">
        <RotateCcw className="h-4 w-4 shrink-0" aria-hidden="true" />
        {l.loopNote}
      </p>
    </div>
  );
}

/** Four core business pillars: Sales, Marketing, Production, Finance. */
export function BusinessPillars() {
  const r = P.proof;
  return (
    <div className="mt-8 grid gap-5">
      <ul className="grid gap-4 md:grid-cols-2">
        {r.pillars.map((pillar, i) => {
          const Icon = PILLAR_ICONS[i] ?? Bot;
          return (
            <li key={pillar.name} className="flex flex-col overflow-hidden rounded-xl border border-tint-strong bg-background">
              <div className="flex items-center gap-3 border-b border-tint-strong bg-gradient-to-r from-tint to-background px-6 py-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground" aria-hidden="true">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-bold text-ink">{pillar.name}</h3>
              </div>
              <div className="flex flex-1 flex-col justify-between gap-4 px-6 py-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.07em] text-primary">{r.handlesLabel}</p>
                  <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted-foreground">{pillar.handles}</p>
                </div>
                <div className="rounded-lg bg-tint/65 px-4 py-3 ring-1 ring-tint-strong/70">
                  <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.07em] text-ink">
                    <Lock className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
                    {r.approvalLabel}
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground">{pillar.approval}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <p className="rounded-xl bg-ink px-5 py-4 text-white/90 sm:px-6">{r.callout}</p>
    </div>
  );
}

/** The setup, as five numbered steps: a row on wide screens, a column on phones. */
export function SetupSteps() {
  return (
    <ol className="relative mt-10 grid gap-4 lg:grid-cols-5">
      {P.steps.items.map((s, i) => (
        <li key={s.title} className="grid content-start gap-2 rounded-xl border border-tint-strong bg-background p-5">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-primary font-display text-sm font-extrabold text-primary-foreground">
            {i + 1}
          </span>
          <h3 className="text-lg font-bold leading-snug">{s.title}</h3>
          <p className="text-sm text-muted-foreground">{s.note}</p>
        </li>
      ))}
    </ol>
  );
}
