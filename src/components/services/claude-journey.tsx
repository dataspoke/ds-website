import { Check, ClipboardList, FileText, Flag, Folder, Sparkles, UserCheck } from "lucide-react";
import { SpokeBullet } from "@/components/shared/spoke-bullet";
import { cn } from "@/lib/utils";
import { CLAUDE_VISUALS as V, type JourneyStep } from "@/content/claude-services";

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

/** Frame for a step picture: a mock window. The timeline adds the "Illustrative" tag under it. */
function Frame({ title, className, children }: { title: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("overflow-hidden rounded-lg border border-tint-strong bg-background", className)}>
      <div className="flex items-center justify-between gap-3 border-b border-tint-strong bg-tint px-3 py-2">
        <span className="flex shrink-0 items-center gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-tint-strong" />
          <span className="h-2 w-2 rounded-full bg-tint-strong" />
          <span className="h-2 w-2 rounded-full bg-tint-strong" />
        </span>
        <span className="truncate text-xs font-semibold text-foreground/70">{title}</span>
      </div>
      <div className="p-3 text-sm">{children}</div>
    </div>
  );
}

function ConnectorsPicture() {
  return (
    <Frame title="MCP connectors">
      <ul className="grid gap-2">
        {V.connectors.map((c) => (
          <li key={c.name} className="flex items-center justify-between gap-3 rounded-md border border-border px-3 py-2">
            <span className="grid">
              <span className="font-semibold">{c.name}</span>
              <span className="text-xs text-muted-foreground">{c.access}</span>
            </span>
            <span className="flex shrink-0 items-center gap-1.5 text-xs font-semibold text-primary">
              <span className="h-2 w-2 rounded-full bg-brand" aria-hidden="true" />
              {V.connected}
            </span>
          </li>
        ))}
      </ul>
    </Frame>
  );
}

function SetupPicture() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Frame title={V.cowork.label}>
        <p className="flex items-center gap-2 font-semibold">
          <Folder className="h-4 w-4 text-primary" aria-hidden="true" />
          {V.cowork.name}
        </p>
        <ul className="mt-2 grid gap-1.5">
          {V.cowork.files.map((f) => (
            <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
              <FileText className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {f}
            </li>
          ))}
        </ul>
      </Frame>
      <Frame title={V.code.label} className="border-ink">
        <pre className="-m-3 overflow-x-auto bg-ink p-3 font-mono text-xs leading-relaxed text-white/85">
          {V.code.lines.map((l, i) => (
            <span key={l} className={cn("block", i === 0 && "font-semibold text-[#9cc4f0]")}>
              {l}
            </span>
          ))}
        </pre>
      </Frame>
    </div>
  );
}

function SkillPicture() {
  return (
    <Frame title={V.skill.label}>
      <p className="flex items-center gap-2 font-mono text-[0.8rem] font-semibold text-primary">
        <Sparkles className="h-4 w-4" aria-hidden="true" />
        {V.skill.name}
      </p>
      <ol className="mt-2 grid gap-1.5">
        {V.skill.steps.map((s, i) => (
          <li key={s} className="grid grid-cols-[1.25rem_1fr] items-baseline text-xs text-foreground/80">
            <span className="font-semibold tabular-nums text-primary">{i + 1}</span>
            {s}
          </li>
        ))}
      </ol>
    </Frame>
  );
}

function TrainingPicture() {
  return (
    <Frame title={V.training.label}>
      <ul className="grid gap-1.5">
        {V.training.items.map((item) => (
          <li key={item.text} className="flex items-center gap-2.5">
            <span
              className={cn(
                "grid h-5 w-5 shrink-0 place-items-center rounded-full border",
                item.done ? "border-primary bg-primary text-primary-foreground" : "border-tint-strong bg-background"
              )}
              aria-hidden="true"
            >
              {item.done && <Check className="h-3 w-3" strokeWidth={3} />}
            </span>
            <span className={cn("text-xs", item.done ? "font-semibold text-foreground/85" : "text-muted-foreground")}>
              {item.text}
            </span>
          </li>
        ))}
      </ul>
    </Frame>
  );
}

function RolloutPicture() {
  return (
    <Frame title="Rollout">
      <ol className="grid grid-cols-3 gap-1.5">
        {V.rollout.map((stage, i) => (
          <li key={stage.label} className="grid content-start gap-1.5">
            <span
              className="h-2 rounded-full"
              style={{ background: `color-mix(in srgb, var(--brand) ${100 - i * 30}%, var(--tint-strong))` }}
              aria-hidden="true"
            />
            <span className="text-xs font-semibold">{stage.label}</span>
            <span className="text-[0.7rem] leading-snug text-muted-foreground">{stage.note}</span>
          </li>
        ))}
      </ol>
    </Frame>
  );
}

const PICTURES = [ConnectorsPicture, SetupPicture, SkillPicture, TrainingPicture, RolloutPicture];

/**
 * The full journey as a numbered timeline. A rail runs down the left on every
 * screen size; on wide screens each step splits into a heading column (with a
 * picture of the step) and a bullet column.
 */
export function JourneyTimeline({ steps }: { steps: JourneyStep[] }) {
  return (
    <ol className="relative mt-12 grid gap-6">
      <span
        className="absolute bottom-8 left-5 top-8 w-0.5 bg-gradient-to-b from-brand via-brand/60 to-tint-strong sm:left-6"
        aria-hidden="true"
      />
      {steps.map((step, i) => {
        const Picture = PICTURES[i];
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
            <article className="grid min-w-0 gap-5 rounded-xl border border-tint-strong bg-background p-5 shadow-[0_1px_2px_rgba(15,30,51,0.04)] sm:p-7 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
              <div className="grid min-w-0 content-start gap-2.5">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-primary">
                  Step {i + 1} · {step.short}
                </p>
                <h3 className="text-2xl font-bold leading-tight">{step.title}</h3>
                <p className="text-muted-foreground">{step.lede}</p>
                {Picture && (
                  <figure className="mt-2 grid gap-1.5" aria-hidden="true">
                    <Picture />
                    <figcaption className="text-right text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                      {V.illustrative}
                    </figcaption>
                  </figure>
                )}
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
