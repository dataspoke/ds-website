import { ArrowDown, ArrowRight, Bot, RotateCcw, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FactoryStation } from "@/content/software-factory";

/** A gate marker: a diamond, the one shape on the page that means "a person says yes". */
function GateDiamond({ className }: { className?: string }) {
  return (
    <span
      className={cn("grid h-9 w-9 shrink-0 rotate-45 place-items-center rounded-md bg-amber-400 ring-4 ring-amber-100", className)}
      aria-hidden="true"
    >
      <UserCheck className="h-4 w-4 -rotate-45 text-ink" />
    </span>
  );
}

function StationDot({ className }: { className?: string }) {
  return (
    <span
      className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground ring-4 ring-tint", className)}
      aria-hidden="true"
    >
      <Bot className="h-4 w-4" />
    </span>
  );
}

/**
 * Hero diagram: the line as tiles. Agent stations are circles, human gates are
 * diamonds, and a bar underneath shows lessons looping back to the start.
 * Two columns on phones, four on wide screens.
 */
export function LineDiagram({ stations, label }: { stations: FactoryStation[]; label: string }) {
  return (
    <div role="img" aria-label={label} className="rounded-2xl border border-tint-strong bg-background p-4 shadow-[0_8px_24px_-14px_rgba(15,30,51,0.35)] sm:p-6">
      <ol className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3" aria-hidden="true">
        {stations.map((s, i) => (
          <li
            key={s.title}
            className={cn(
              "relative flex min-h-[5.5rem] flex-col items-start justify-between gap-2 rounded-xl p-3",
              s.gate ? "bg-amber-50 ring-2 ring-amber-300" : "bg-tint ring-1 ring-tint-strong"
            )}
          >
            <span className="flex w-full items-center justify-between">
              {s.gate ? <GateDiamond className="h-7 w-7 ring-2" /> : <StationDot className="h-7 w-7 ring-2" />}
              <span className="font-display text-xs font-extrabold tabular-nums text-muted-foreground">{i + 1}</span>
            </span>
            <span className="font-display text-sm font-bold leading-snug">{s.title}</span>
          </li>
        ))}
        <li className="flex items-center justify-center rounded-xl border-2 border-dashed border-tint-strong p-3 text-center text-sm font-semibold text-primary">
          Live, and watched
        </li>
      </ol>
      <div className="mt-3 flex items-center gap-2 rounded-lg bg-ink px-3 py-2 text-sm text-white" aria-hidden="true">
        <RotateCcw className="h-4 w-4 shrink-0 text-[#9cc4f0]" />
        <span>Every mistake loops back as a hook, a check, or a rule</span>
      </div>
    </div>
  );
}

/** Legend for stations vs gates. */
export function LineLegend({ station, gate }: { station: string; gate: string }) {
  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
      <li className="flex items-center gap-2">
        <StationDot className="h-7 w-7 ring-2" />
        {station}
      </li>
      <li className="flex items-center gap-2">
        <GateDiamond className="h-6 w-6 ring-2" />
        {gate}
      </li>
    </ul>
  );
}

/** The line in full: a vertical rail of stations, gates called out in amber. */
export function LineTimeline({ stations }: { stations: FactoryStation[] }) {
  return (
    <ol className="relative mt-8 grid max-w-3xl gap-3">
      <span className="absolute bottom-6 left-[1.1rem] top-6 w-0.5 bg-gradient-to-b from-brand via-amber-300 to-tint-strong" aria-hidden="true" />
      {stations.map((s, i) => (
        <li key={s.title} className="relative grid grid-cols-[2.25rem_1fr] items-start gap-4">
          {s.gate ? <GateDiamond className="mt-3 h-8 w-8" /> : <StationDot className="mt-3" />}
          <div
            className={cn(
              "rounded-xl border p-4 sm:p-5",
              s.gate ? "border-amber-300 bg-amber-50" : "border-tint-strong bg-background"
            )}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-primary">
              {i + 1} · {s.gate ? "Human gate" : "Agent station"}
            </p>
            <h3 className="mt-1 text-lg font-bold leading-snug">{s.title}</h3>
            <p className="mt-1 text-[0.95rem] text-muted-foreground">{s.note}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** "Before -> after" arrow that points down on phones and right on wide screens. */
export function FlowArrow({ className }: { className?: string }) {
  return (
    <span className={cn("grid place-items-center text-primary", className)} aria-hidden="true">
      <ArrowDown className="h-5 w-5 md:hidden" />
      <ArrowRight className="hidden h-5 w-5 md:block" />
    </span>
  );
}
