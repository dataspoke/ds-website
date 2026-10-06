import { SectionHead } from "@/components/shared/section";
import type { Ladder } from "@/content/services";

/**
 * A top-down ladder: the top rung is the strongest. Each rung is a little narrower
 * on wide screens so it reads as a ladder or pyramid; on phones it is a plain stack.
 */
export function LadderGraphic({ ladder }: { ladder: Ladder }) {
  const n = ladder.rungs.length;
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr] lg:gap-14">
      <SectionHead
        eyebrow={ladder.eyebrow}
        title={ladder.title}
        lede={ladder.lede}
        className="content-start"
      />
      <div className="grid gap-3">
        <ol className="grid gap-2.5">
          {ladder.rungs.map((rung, i) => (
            <li
              key={rung.label}
              className="grid gap-1 rounded-xl border border-tint-strong bg-background p-4 sm:grid-cols-[10.5rem_1fr] sm:items-baseline sm:gap-4"
              style={{ borderLeftWidth: 6, borderLeftColor: `color-mix(in srgb, var(--brand) ${100 - (i * 70) / Math.max(n - 1, 1)}%, var(--tint-strong))` }}
            >
              <p className="flex items-baseline gap-2.5 font-display text-lg font-extrabold">
                <span className="text-sm font-semibold tabular-nums text-primary">{i + 1}</span>
                {rung.label}
              </p>
              <p className="text-[0.95rem] text-muted-foreground">{rung.description}</p>
            </li>
          ))}
        </ol>
        <p className="text-sm font-semibold text-foreground/80">{ladder.caption}</p>
      </div>
    </div>
  );
}
