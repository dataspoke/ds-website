import {
  ArrowDown,
  ArrowRight,
  Bot,
  Briefcase,
  Check,
  CircleCheck,
  GitFork,
  KeyRound,
  Lock,
  Mail,
  Megaphone,
  MessagesSquare,
  RotateCcw,
  ShieldCheck,
  Waypoints,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AGENT_POST as P } from "@/content/personal-ai-agent";

const TEAM_ICONS = [Waypoints, Mail, MessagesSquare, Megaphone, Briefcase];
const STOP_ICONS = [Lock, GitFork, KeyRound, CircleCheck];

/** One card per agent, each with its single job. */
export function TeamGrid() {
  return (
    <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {P.team.members.map((m, i) => {
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

/** Two lanes: what runs alone, and what waits at the gate for a yes. */
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

/** The four allowed stops as numbered tiles. */
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
 * Common setup vs this setup. A real table on wide screens; on phones each row
 * becomes a stacked card so nothing scrolls sideways.
 */
export function CompareTable() {
  const c = P.compare;
  return (
    <div className="mt-10">
      <table className="hidden w-full border-separate border-spacing-0 overflow-hidden rounded-xl border border-tint-strong md:table">
        <thead>
          <tr className="text-left">
            <th scope="col" className="w-[16%] bg-tint px-5 py-3 text-sm font-semibold uppercase tracking-[0.06em] text-muted-foreground">
              {c.colTopic}
            </th>
            <th scope="col" className="w-[34%] bg-tint px-5 py-3 text-sm font-semibold uppercase tracking-[0.06em] text-muted-foreground">
              {c.colCommon}
            </th>
            <th scope="col" className="bg-ink px-5 py-3 text-sm font-semibold uppercase tracking-[0.06em] text-[#9cc4f0]">
              {c.colMine}
            </th>
          </tr>
        </thead>
        <tbody>
          {c.rows.map((r) => (
            <tr key={r.topic}>
              <th scope="row" className="border-t border-tint-strong px-5 py-4 text-left align-top font-display font-bold">
                {r.topic}
              </th>
              <td className="border-t border-tint-strong px-5 py-4 align-top text-muted-foreground">{r.common}</td>
              <td className="border-t border-tint-strong bg-tint/60 px-5 py-4 align-top font-medium">{r.mine}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul className="grid gap-3 md:hidden">
        {c.rows.map((r) => (
          <li key={r.topic} className="overflow-hidden rounded-xl border border-tint-strong">
            <p className="bg-tint px-4 py-2 font-display font-bold">{r.topic}</p>
            <div className="grid gap-2 px-4 py-3">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold">{c.colCommon}: </span>
                {r.common}
              </p>
              <p className="text-[0.97rem] font-medium">
                <span className="font-semibold text-primary">{c.colMine}: </span>
                {r.mine}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** The learning loop: five steps in a row (a column on phones), closing back to the start. */
export function LearningLoop() {
  const l = P.loop;
  return (
    <div className="mt-10 rounded-2xl border border-tint-strong bg-background p-6 sm:p-8">
      <ol className="grid gap-2 lg:grid-cols-[repeat(5,minmax(0,1fr))] lg:gap-0">
        {l.steps.map((s, i) => {
          const last = i === l.steps.length - 1;
          return (
            <li key={s.title} className="grid gap-2 lg:grid-cols-[1fr_auto] lg:items-center">
              <div
                className={cn(
                  "grid gap-1 rounded-xl p-4",
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

/** Stat tiles from one weekly retro, with the honest miss below. */
export function RetroStats() {
  const r = P.retro;
  return (
    <div className="mt-10 grid gap-4">
      <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {r.stats.map((s) => (
          <div key={s.label} className="grid content-start gap-1 rounded-xl border border-tint-strong bg-background p-5">
            <dt className="order-2 text-sm text-muted-foreground">{s.label}</dt>
            <dd className="order-1 font-display text-3xl font-extrabold tabular-nums text-ink sm:text-4xl">{s.value}</dd>
          </div>
        ))}
      </dl>
      <p className="rounded-xl bg-ink px-5 py-4 text-white/90 sm:px-6">{r.callout}</p>
    </div>
  );
}
