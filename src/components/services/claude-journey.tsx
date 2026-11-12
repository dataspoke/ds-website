import Image from "next/image";
import { ClipboardList, Flag, Sparkles, UserCheck } from "lucide-react";
import { SpokeBullet } from "@/components/shared/spoke-bullet";
import { cn } from "@/lib/utils";
import { ClaudeMdCartoon, ConnectorsCartoon, LearningLoopCartoon, SkillsLibraryCartoon } from "@/components/services/claude-cartoons";
import { CLAUDE_VISUALS as V, type JourneyStep, type Shot } from "@/content/claude-services";

/**
 * The five steps as a numbered path. A row joined by a line on wide screens,
 * a vertical list on phones. Each node jumps to its step in the timeline.
 */
export function JourneyPath({ steps, label, className }: { steps: JourneyStep[]; label: string; className?: string }) {
  return (
    <nav aria-label={label} className={className}>
      <p className="eyebrow">{label}</p>
      <ol className="relative mt-5 grid gap-3 lg:grid-cols-5 lg:gap-4">
        <span
          className="absolute bottom-5 left-[1.125rem] top-5 w-0.5 bg-gradient-to-b from-brand to-tint-strong lg:bottom-auto lg:left-[10%] lg:right-[10%] lg:top-[1.125rem] lg:h-0.5 lg:w-auto lg:bg-gradient-to-r"
          aria-hidden="true"
        />
        {steps.map((step, i) => (
          <li key={step.short}>
            <a
              href={`#step-${i + 1}`}
              className="group relative flex items-center gap-4 lg:flex-col lg:gap-3 lg:text-center"
            >
              <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary font-display text-sm font-extrabold text-primary-foreground ring-4 ring-background transition-transform group-hover:scale-110">
                {i + 1}
              </span>
              <span className="font-display text-base font-bold leading-snug group-hover:text-primary lg:text-[0.95rem]">
                {step.short}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * One real screenshot per step, in a fixed 4:3 window so every step card is the
 * same shape. The image is pinned top-left; the crop already holds the part
 * that matters. It links to the full image for a closer look.
 */
function Screenshot({ shot }: { shot: Shot }) {
  return (
    <figure className="grid content-start gap-2">
      <a
        href={shot.src}
        target="_blank"
        rel="noopener"
        className="block overflow-hidden rounded-lg border border-ink/80 bg-[#1f1f1e] shadow-[0_8px_24px_-14px_rgba(15,30,51,0.5)] transition-transform hover:-translate-y-0.5"
      >
        <Image
          src={shot.src}
          width={shot.width}
          height={shot.height}
          alt={shot.alt}
          // Served as-is: the PNGs are already cropped and light, and this keeps them
          // off the image optimizer so they load the same on every host.
          unoptimized
          className="aspect-[4/3] h-auto w-full object-cover object-left-top"
        />
      </a>
      <figcaption className="text-sm text-muted-foreground">{shot.caption}</figcaption>
    </figure>
  );
}

const CARTOONS: Record<number, typeof ClaudeMdCartoon> = { 1: ConnectorsCartoon, 3: SkillsLibraryCartoon, 4: LearningLoopCartoon, 5: ClaudeMdCartoon };

/** A cartoon in the same 4:3 frame as the screenshots, with a sentence caption. */
function Cartoon({ step }: { step: number }) {
  const Picture = CARTOONS[step];
  const text = V.cartoons[step];
  if (!Picture || !text) return null;
  return (
    <figure className="grid content-start gap-2">
      <div className="overflow-hidden rounded-lg border border-tint-strong shadow-[0_8px_24px_-14px_rgba(15,30,51,0.35)]">
        <Picture label={text.alt} />
      </div>
      <figcaption className="text-sm text-muted-foreground">{text.caption}</figcaption>
    </figure>
  );
}

/**
 * The full journey as a numbered timeline. A rail runs down the left on every
 * screen size; on wide screens each step card puts its text beside its screenshot.
 */
export function JourneyTimeline({ steps }: { steps: JourneyStep[] }) {
  return (
    <ol className="relative mt-12 grid gap-6">
      <span
        className="absolute bottom-8 left-5 top-8 w-0.5 bg-gradient-to-b from-brand via-brand/60 to-tint-strong sm:left-6"
        aria-hidden="true"
      />
      {steps.map((step, i) => {
        const shot = V.shots[i + 1];
        return (
          <li
            key={step.title}
            id={`step-${i + 1}`}
            className="relative grid scroll-mt-24 grid-cols-[2.5rem_1fr] gap-4 sm:grid-cols-[3rem_1fr] sm:gap-6"
          >
            <span
              className="relative z-10 grid h-10 w-10 place-items-center rounded-full bg-primary font-display text-base font-extrabold text-primary-foreground ring-8 ring-tint sm:h-12 sm:w-12 sm:text-lg"
              aria-hidden="true"
            >
              {i + 1}
            </span>
            <article className="grid min-w-0 items-start gap-6 rounded-xl border border-tint-strong bg-background p-5 shadow-[0_1px_2px_rgba(15,30,51,0.04)] sm:p-7 lg:grid-cols-[1fr_460px] lg:gap-10">
              <div className="grid min-w-0 content-start gap-2.5">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-primary">
                  Step {i + 1} · {step.short}
                </p>
                <h3 className="text-2xl font-bold leading-tight">{step.title}</h3>
                <p className="text-muted-foreground">{step.lede}</p>
                <ul className="mt-2 grid gap-2">
                  {step.bullets.map((b) => (
                    <SpokeBullet key={b} as="li" size="list" className="text-[0.95rem] text-foreground/85">
                      {b}
                    </SpokeBullet>
                  ))}
                </ul>
              </div>
              {shot ? <Screenshot shot={shot} /> : <Cartoon step={i + 1} />}
            </article>
          </li>
        );
      })}
    </ol>
  );
}

const FLOW_ICONS = [Sparkles, Flag, UserCheck, ClipboardList];

/** The guardrails as one run: draft, flag, approve, log. Row on wide screens, column on phones. */
export function ApprovalFlow() {
  return (
    <div className="rounded-2xl border border-tint-strong bg-tint p-6 sm:p-8">
      <p className="eyebrow">{V.flowLabel}</p>
      <ol className="mt-6 grid gap-3 md:grid-cols-4 md:gap-0">
        {V.flow.map((f, i) => {
          const Icon = FLOW_ICONS[i];
          const last = i === V.flow.length - 1;
          return (
            <li key={f.title} className="relative flex items-start gap-4 md:flex-col md:items-center md:px-3 md:text-center">
              {!last && (
                <span
                  className="absolute left-6 top-12 h-[calc(100%-1.5rem)] w-0.5 bg-tint-strong md:left-[calc(50%+2rem)] md:top-6 md:h-0.5 md:w-[calc(100%-4rem)]"
                  aria-hidden="true"
                />
              )}
              <span
                className={cn(
                  "relative grid h-12 w-12 shrink-0 place-items-center rounded-full",
                  i === 2 ? "bg-primary text-primary-foreground" : "bg-background text-primary ring-2 ring-tint-strong"
                )}
                aria-hidden="true"
              >
                <Icon className="h-5 w-5" />
              </span>
              <span className="grid gap-1 pb-3 md:pb-0">
                <span className="font-display text-lg font-bold leading-snug">{f.title}</span>
                <span className="text-sm text-muted-foreground">{f.note}</span>
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
