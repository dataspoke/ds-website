import Link from "next/link";
import { Section, SectionHead } from "@/components/shared/section";
import { CASE_STUDIES } from "@/content/case-studies";
import { LINE_PAGE } from "@/content/services";
import type { ServiceLineSlug } from "@/types";

/** Case studies tagged with this line. Renders nothing when there are none. */
export function RelatedCaseStudies({ line }: { line: ServiceLineSlug }) {
  const studies = CASE_STUDIES.filter((c) => c.lines.includes(line));
  if (studies.length === 0) return null;
  return (
    <Section className="pt-0 sm:pt-0">
      <SectionHead eyebrow={LINE_PAGE.caseStudiesEyebrow} title={LINE_PAGE.caseStudiesTitle} />
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {studies.map((c) => (
          <Link
            key={c.slug}
            href={`/work/${c.slug}`}
            className="grid content-start gap-2.5 rounded-xl border border-tint-strong bg-background p-6 transition-colors hover:border-brand"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-primary">
              {c.industry} · {c.size}
            </p>
            <h3 className="text-xl font-bold">{c.title}</h3>
            <p className="text-[0.97rem] text-muted-foreground">{c.summary.result}</p>
            <p className="mt-1 font-semibold text-primary">{LINE_PAGE.caseStudyLink} &rarr;</p>
          </Link>
        ))}
      </div>
    </Section>
  );
}
