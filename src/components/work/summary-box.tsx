import type { CaseStudy } from "@/types";
import { WORK_COPY, caseStudyMeta } from "./copy";

/** The three-line summary at the top of a case study: problem, built, result. */
export function SummaryBox({ study }: { study: CaseStudy }) {
  const c = WORK_COPY.detail;
  const rows = [
    { label: c.problem, value: study.summary.problem },
    { label: c.built, value: study.summary.built },
    { label: c.result, value: study.summary.result },
  ];
  return (
    <section
      aria-label={c.summaryLabel}
      className="rounded-xl border border-primary/20 bg-tint p-5 sm:p-7"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-primary">
        {caseStudyMeta(study)}
      </p>
      <dl className="mt-4 grid gap-4">
        {rows.map((row) => (
          <div key={row.label} className="grid gap-1 sm:grid-cols-[6.5rem_1fr] sm:gap-4">
            <dt className="text-sm font-bold uppercase tracking-[0.06em] text-foreground/70 sm:pt-0.5">
              {row.label}
            </dt>
            <dd className={row.label === c.result ? "font-semibold text-foreground" : "text-foreground/85"}>
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
