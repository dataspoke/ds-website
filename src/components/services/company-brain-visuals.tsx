import { ArrowDown, Bot, Brain, Check, Database, ShieldCheck, User, UserPlus, Users, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { BRAIN_PAGE as P } from "@/content/company-brain-service";

const PEOPLE_ICONS = [Users, User, UserPlus, Bot];

/** The four people and assistants, as a row of small tiles. Same row in both panels. */
function PeopleRow({ muted }: { muted?: boolean }) {
  return (
    <ul className="grid grid-cols-4 gap-2">
      {P.picture.people.map((name, i) => {
        const Icon = PEOPLE_ICONS[i] ?? User;
        return (
          <li key={name} className="grid justify-items-center gap-1 text-center">
            <span
              className={cn(
                "grid h-9 w-9 place-items-center rounded-full",
                muted ? "bg-white text-muted-foreground ring-1 ring-tint-strong" : "bg-primary text-primary-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
            </span>
            <span className="text-[0.72rem] font-semibold leading-tight sm:text-xs">{name}</span>
          </li>
        );
      })}
    </ul>
  );
}

/** Short pill with an icon: pains before, outcomes after. */
function Pill({ text, good }: { text: string; good?: boolean }) {
  const Icon = good ? Check : X;
  return (
    <li
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
        good ? "bg-primary text-primary-foreground" : "bg-white text-muted-foreground ring-1 ring-tint-strong"
      )}
    >
      <Icon className={cn("h-3.5 w-3.5 shrink-0", good ? "text-[#9cc4f0]" : "text-amber-600")} />
      {text}
    </li>
  );
}

/**
 * Hero visual: before and after. The same four people sit on top of each panel.
 * Before, each one draws a line down to its own scrappy source. After, all four
 * lines land on one shared picture. One column at every width, so phones need
 * no special layout.
 */
export function SharedPicture() {
  const c = P.picture;
  return (
    <div
      role="img"
      aria-label={c.label}
      className="grid gap-2 rounded-2xl border border-tint-strong bg-background p-3 shadow-[0_8px_24px_-14px_rgba(15,30,51,0.35)] sm:p-4"
    >
      {/* Before: four people, four separate sources. */}
      <div aria-hidden="true" className="rounded-xl border border-dashed border-tint-strong bg-tint/50 p-3 sm:p-4">
        <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.08em] text-muted-foreground">
          <X className="h-3.5 w-3.5 text-amber-600" />
          {c.beforeTitle}
        </p>
        <div className="mt-3">
          <PeopleRow muted />
          <ul className="grid grid-cols-4 gap-2">
            {c.beforeSources.map((src, i) => (
              <li key={src} className="grid justify-items-center">
                <span className="h-4 w-0 border-l-2 border-dashed border-muted-foreground/40" />
                <span
                  className={cn(
                    "grid min-h-[2.6rem] w-full place-items-center rounded-md border border-dashed border-muted-foreground/40 bg-white px-1 py-1.5 text-center text-[0.68rem] leading-tight text-muted-foreground sm:text-[0.72rem]",
                    i % 2 === 0 ? "-rotate-2" : "rotate-2"
                  )}
                >
                  {src}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {c.beforePains.map((p) => (
            <Pill key={p} text={p} />
          ))}
        </ul>
      </div>

      <ArrowDown aria-hidden="true" className="mx-auto h-5 w-5 text-brand" />

      {/* After: the same four people, one shared picture. */}
      <div aria-hidden="true" className="rounded-xl bg-tint p-3 ring-2 ring-primary sm:p-4">
        <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.08em] text-primary">
          <Check className="h-3.5 w-3.5 text-brand" />
          {c.afterTitle}
        </p>
        <div className="mt-3">
          <PeopleRow />
          <div className="grid grid-cols-4 gap-2">
            {c.people.map((name) => (
              <span key={name} className="mx-auto h-4 w-0.5 bg-brand" />
            ))}
          </div>
          <div className="rounded-lg bg-white p-3 ring-1 ring-primary/30">
            <p className="flex items-center justify-center gap-2 font-display text-base font-bold text-ink sm:text-lg">
              <Brain className="h-5 w-5 text-brand" />
              {c.hubTitle}
            </p>
            <ul className="mt-2 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
              {c.hubItems.map((item) => (
                <li key={item} className="rounded-md bg-tint px-2 py-1.5 text-center text-xs font-semibold text-ink ring-1 ring-tint-strong">
                  {item}
                </li>
              ))}
            </ul>
            <ul className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs font-semibold text-primary">
              {c.hubBadges.map((b, i) => (
                <li key={b} className="inline-flex items-center gap-1">
                  {i === 0 ? <Check className="h-3.5 w-3.5 text-brand" /> : <ShieldCheck className="h-3.5 w-3.5 text-brand" />}
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-1.5 flex items-center justify-center gap-2 rounded-lg bg-ink px-3 py-2 text-xs font-semibold text-white">
            <Database className="h-3.5 w-3.5 shrink-0 text-[#9cc4f0]" />
            {c.foundation}
          </p>
        </div>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {c.outcomes.map((o) => (
            <Pill key={o} text={o} good />
          ))}
        </ul>
      </div>
    </div>
  );
}
