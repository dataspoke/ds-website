import { SpokeBullet } from "@/components/shared/spoke-bullet";
import { cn } from "@/lib/utils";
import type { JourneyStep } from "@/content/claude-services";

/**
 * Compact numbered path for the hero: five nodes joined by a line.
 * Vertical everywhere, so the labels never have to squeeze on a phone.
 */
export function JourneyPath({ steps, label, className }: { steps: JourneyStep[]; label: string; className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-tint-strong bg-tint p-6 sm:p-8", className)}>
      <p className="eyebrow">{label}</p>
      <ol className="relative mt-5 grid gap-4">
        <span
          className="absolute bottom-5 left-[1.125rem] top-5 w-0.5 bg-gradient-to-b from-brand to-tint-strong"
          aria-hidden="true"
        />
        {steps.map((step, i) => (
          <li key={step.short}>
            <a
              href={`#step-${i + 1}`}
              className="group relative flex items-center gap-4 rounded-lg py-0.5 pr-2"
            >
              <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary font-display text-sm font-extrabold text-primary-foreground ring-4 ring-tint">
                {i + 1}
              </span>
              <span className="font-display text-lg font-bold leading-snug group-hover:text-primary">
                {step.short}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}

/**
 * The full journey as a numbered timeline. A rail runs down the left on every
 * screen size; on wide screens each step splits into a heading column and a
 * bullet column.
 */
export function JourneyTimeline({ steps }: { steps: JourneyStep[] }) {
  return (
    <ol className="relative mt-12 grid gap-6">
      <span
        className="absolute bottom-8 left-5 top-8 w-0.5 bg-gradient-to-b from-brand via-brand/60 to-tint-strong sm:left-6"
        aria-hidden="true"
      />
      {steps.map((step, i) => (
        <li key={step.title} id={`step-${i + 1}`} className="relative grid scroll-mt-24 grid-cols-[2.5rem_1fr] gap-4 sm:grid-cols-[3rem_1fr] sm:gap-6">
          <span
            className="relative z-10 grid h-10 w-10 place-items-center rounded-full bg-primary font-display text-base font-extrabold text-primary-foreground ring-8 ring-background sm:h-12 sm:w-12 sm:text-lg"
            aria-hidden="true"
          >
            {i + 1}
          </span>
          <article className="grid gap-5 rounded-xl border border-tint-strong bg-background p-5 shadow-[0_1px_2px_rgba(15,30,51,0.04)] sm:p-7 lg:grid-cols-[1fr_1.15fr] lg:gap-10">
            <div className="grid content-start gap-2.5">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-primary">
                Step {i + 1} · {step.short}
              </p>
              <h3 className="text-2xl font-bold leading-tight">{step.title}</h3>
              <p className="text-muted-foreground">{step.lede}</p>
            </div>
            <ul className="grid content-start gap-2.5 border-t border-border pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              {step.bullets.map((b) => (
                <SpokeBullet key={b} as="li" size="list" className="text-[0.97rem] text-foreground/85">
                  {b}
                </SpokeBullet>
              ))}
            </ul>
          </article>
        </li>
      ))}
    </ol>
  );
}
