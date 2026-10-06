import Link from "next/link";
import type { CaseStudy } from "@/types";
import { WORK_COPY, caseStudyMeta } from "./copy";
import { LineTags } from "./line-tags";

/**
 * One card on /work. The title link stretches over the whole card; the line
 * tags sit above it (z-10) so they stay separately clickable.
 */
export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <article className="relative grid content-start gap-3.5 rounded-xl border border-border p-6 transition-colors hover:border-primary/40 sm:p-7">
      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-primary">
        {caseStudyMeta(study)}
      </p>
      <h2 className="text-xl font-bold leading-snug">
        <Link
          href={`/work/${study.slug}`}
          className="after:absolute after:inset-0 after:rounded-xl hover:text-primary"
        >
          {study.title}
        </Link>
      </h2>
      <p className="text-[0.95rem] text-muted-foreground">{study.summary.result}</p>
      <LineTags lines={study.lines} linkTo="filter" className="mt-1" />
      <p className="text-sm font-semibold text-primary" aria-hidden="true">
        {WORK_COPY.index.readMore} &rarr;
      </p>
    </article>
  );
}
