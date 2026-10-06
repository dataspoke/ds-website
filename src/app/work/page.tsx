import type { Metadata } from "next";
import { generateMetadata as pageMetadata } from "@/lib/metadata";
import { Section, SectionHead } from "@/components/shared/section";
import { CaseStudyCard } from "@/components/work/case-study-card";
import { LineFilter } from "@/components/work/line-filter";
import { WORK_COPY, getLine, isLineSlug } from "@/components/work/copy";
import { CASE_STUDIES } from "@/content/case-studies";

const copy = WORK_COPY.index;

export const metadata: Metadata = pageMetadata({
  title: copy.metaTitle,
  description: copy.metaDescription,
  path: "/work",
});

// Reading searchParams renders this page per request, so ?line= filters on the
// server and the filter works with plain links and no JS.
export default async function WorkPage({ searchParams }: PageProps<"/work">) {
  const { line } = await searchParams;
  const activeLine = isLineSlug(line) ? line : undefined;
  const filtered = activeLine
    ? CASE_STUDIES.filter((c) => c.lines.includes(activeLine))
    : CASE_STUDIES;
  const isEmpty = activeLine !== undefined && filtered.length === 0;
  const studies = isEmpty ? CASE_STUDIES : filtered;

  return (
    <Section tight>
      <SectionHead as="h1" eyebrow={copy.eyebrow} title={copy.proofLine} lede={copy.lede} />

      <div className="mt-10 grid gap-3">
        <LineFilter activeLine={activeLine} />
        {activeLine && (
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {isEmpty ? copy.empty : copy.showing(getLine(activeLine)?.title ?? activeLine)}
          </p>
        )}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {studies.map((study) => (
          <CaseStudyCard key={study.slug} study={study} />
        ))}
      </div>
    </Section>
  );
}
