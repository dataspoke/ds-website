import { Section, SectionHead } from "@/components/shared/section";
import { KPI_HIERARCHY } from "@/content/approach";
import { cn } from "@/lib/utils";

function Scorecard() {
  const { columns, rows, onTrackLabel, offTrackLabel } = KPI_HIERARCHY.scorecard;
  return (
    <table className="w-full text-left text-sm">
      <thead>
        <tr className="border-b border-border text-xs uppercase tracking-[0.06em] text-muted-foreground">
          <th className="py-2 pr-3 font-semibold">{columns.metric}</th>
          <th className="py-2 pr-3 text-right font-semibold">{columns.target}</th>
          <th className="py-2 text-right font-semibold">{columns.actual}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.metric} className="border-b border-border last:border-0">
            <td className="py-2.5 pr-3">
              <span className="font-medium">{r.metric}</span>
              <span className="block text-xs text-muted-foreground">
                {columns.owner}: {r.owner}
              </span>
            </td>
            <td className="py-2.5 pr-3 text-right tabular-nums text-muted-foreground">{r.target}</td>
            <td className="py-2.5 text-right tabular-nums">
              <span className="inline-flex items-center justify-end gap-2 font-semibold">
                {r.actual}
                <span
                  className={cn(
                    "h-2.5 w-2.5 shrink-0 rounded-full",
                    r.onTrack ? "bg-emerald-500" : "bg-red-500"
                  )}
                  role="img"
                  aria-label={r.onTrack ? onTrackLabel : offTrackLabel}
                  title={r.onTrack ? onTrackLabel : offTrackLabel}
                />
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** Goal → lagging KPIs → leading indicators → weekly scorecard, with a worked example. */
export function KpiHierarchy() {
  const levels = KPI_HIERARCHY.levels;
  return (
    <Section id="metrics">
      <SectionHead
        eyebrow={KPI_HIERARCHY.eyebrow}
        title={KPI_HIERARCHY.title}
        lede={KPI_HIERARCHY.lede}
      />
      <p className="mt-10 text-sm font-semibold text-foreground/80">{KPI_HIERARCHY.exampleLabel}</p>
      <ol className="mt-5 grid gap-0">
        {levels.map((level, i) => (
          <li key={level.label} className="relative grid grid-cols-[2rem_1fr] gap-x-4 pb-8 last:pb-0">
            {i < levels.length - 1 && (
              <span
                className="absolute left-[15px] top-8 bottom-0 w-0.5 bg-brand/40"
                aria-hidden="true"
              />
            )}
            <span
              className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-brand font-display text-sm font-extrabold text-white"
              aria-hidden="true"
            >
              {i + 1}
            </span>
            <div className="grid min-w-0 gap-4 rounded-xl border border-tint-strong bg-background p-5 sm:p-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-8">
              <div className="grid content-start gap-1.5">
                <h3 className="text-xl font-bold">{level.label}</h3>
                <p className="font-semibold text-primary">{level.question}</p>
                <p className="text-[0.95rem] text-muted-foreground">{level.description}</p>
              </div>
              <div className="min-w-0">
                {i === levels.length - 1 ? (
                  <Scorecard />
                ) : level.example.length === 1 ? (
                  <p className="font-display text-lg font-bold leading-snug">{level.example[0]}</p>
                ) : (
                  <ul className="flex flex-wrap gap-2">
                    {level.example.map((ex) => (
                      <li
                        key={ex}
                        className="rounded-full border border-tint-strong bg-tint px-3 py-1 text-sm"
                      >
                        {ex}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-9 max-w-3xl text-muted-foreground">{KPI_HIERARCHY.close}</p>
    </Section>
  );
}
