import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { generateMetadata as pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/shared/section";
import { SpokeBullet } from "@/components/shared/spoke-bullet";
import { BookCall } from "@/components/shared/book-call";
import { LineTags } from "@/components/work/line-tags";
import { SummaryBox } from "@/components/work/summary-box";
import { WORK_COPY, getCaseStudy } from "@/components/work/copy";
import { CASE_STUDIES } from "@/content/case-studies";

const copy = WORK_COPY.detail;

// Only the slugs in CASE_STUDIES exist. Anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return pageMetadata({
    title: study.title,
    description: `${study.summary.problem} ${study.summary.result}`,
    path: `/work/${study.slug}`,
  });
}

/** Section bodies may hold several paragraphs separated by a blank line. */
function paragraphs(body: string) {
  return body.split(/\n\s*\n/).filter((p) => p.trim());
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const firstLine = study.lines[0];
  const contactHref = firstLine ? `/contact?service=${firstLine}` : "/contact";

  return (
    <>
      <Section tight>
        <div className="grid max-w-3xl gap-6">
          <Link
            href="/work"
            className="justify-self-start py-1 text-sm font-semibold text-primary hover:text-primary/80"
          >
            &larr; {copy.backLabel}
          </Link>
          <h1 className="text-3xl font-bold leading-[1.15] sm:text-4xl">{study.title}</h1>
          <SummaryBox study={study} />
        </div>
      </Section>

      <Section tight className="pt-0 sm:pt-0">
        <div className="grid max-w-3xl gap-12">
          <div className="grid gap-4">
            <h2 className="text-2xl font-bold">{copy.sourcesHeading}</h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {study.sources.map((s) => (
                <SpokeBullet key={s} as="li" size="list" className="text-muted-foreground">
                  {s}
                </SpokeBullet>
              ))}
            </ul>
          </div>

          {study.sections.map((section) => (
            <div key={section.heading} className="grid gap-3">
              <h2 className="text-2xl font-bold">{section.heading}</h2>
              {paragraphs(section.body).map((p) => (
                <p key={p} className="text-muted-foreground">
                  {p}
                </p>
              ))}
            </div>
          ))}

          <div className="grid gap-3">
            <h2 className="text-2xl font-bold">{copy.linesHeading}</h2>
            <LineTags lines={study.lines} linkTo="service" />
          </div>
        </div>
      </Section>

      <Section tint>
        <div className="grid max-w-2xl gap-4">
          <h2 className="text-3xl font-bold leading-[1.15] sm:text-4xl">{copy.ctaHeading}</h2>
          <p className="lede">{copy.ctaLede}</p>
          <div className="mt-1 flex flex-wrap items-center gap-x-6 gap-y-3">
            <BookCall>{copy.ctaBook}</BookCall>
            <Link
              href={contactHref}
              className="py-2 font-semibold text-primary hover:text-primary/80"
            >
              {copy.ctaContact} &rarr;
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
