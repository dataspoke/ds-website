import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { generateMetadata as pageMetadata } from "@/lib/metadata";
import { Section, SectionHead } from "@/components/shared/section";
import { BookCall } from "@/components/shared/book-call";
import { Button } from "@/components/ui/button";
import { BulletList, ListLabel, ProductDetail } from "@/components/services/product-detail";
import { LadderGraphic } from "@/components/services/ladder";
import { RelatedCaseStudies } from "@/components/services/related-case-studies";
import { LINE_LADDERS, LINE_PAGE, SERVICE_LINES, getServiceLine } from "@/content/services";

// Only the six lines exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICE_LINES.map((l) => ({ line: l.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[line]">): Promise<Metadata> {
  const { line: slug } = await params;
  const line = getServiceLine(slug);
  if (!line) return {};
  return pageMetadata({
    title: line.title,
    description: `${line.oneLiner} ${line.problem}`.slice(0, 300),
    path: `/services/${line.slug}`,
  });
}

export default async function ServiceLinePage({ params }: PageProps<"/services/[line]">) {
  const { line: slug } = await params;
  const line = getServiceLine(slug);
  if (!line) notFound();

  const ladder = LINE_LADDERS[line.slug];
  const others = SERVICE_LINES.filter((l) => l.slug !== line.slug);

  return (
    <>
      <Section tight>
        <Link href="/services" className="inline-block py-2 text-sm font-semibold text-primary hover:text-primary/80">
          &larr; {LINE_PAGE.backLabel}
        </Link>
        <SectionHead as="h1" eyebrow={line.title} title={line.oneLiner} className="mt-4" />
        <div className="mt-10 grid gap-10 md:grid-cols-[1.1fr_1fr] md:gap-14">
          <div className="grid content-start gap-3">
            <h2 className="text-xl font-bold">{LINE_PAGE.problemHeading}</h2>
            <p className="text-muted-foreground">{line.problem}</p>
          </div>
          <div className="grid content-start gap-6">
            <div>
              <ListLabel>{LINE_PAGE.soundsLikeHeading}</ListLabel>
              <BulletList items={line.soundsLike} />
            </div>
            <div>
              <ListLabel>{LINE_PAGE.youGetHeading}</ListLabel>
              <BulletList items={line.youGet} />
            </div>
          </div>
        </div>
      </Section>

      {ladder && (
        <Section tint>
          <LadderGraphic ladder={ladder} />
        </Section>
      )}

      <Section className={ladder ? undefined : "pt-0 sm:pt-0"}>
        <SectionHead eyebrow={LINE_PAGE.productsEyebrow} title={LINE_PAGE.productsTitle} />
        <div className="mt-8">
          {line.products.map((p) => (
            <ProductDetail key={p.slug} product={p} line={line.slug} />
          ))}
        </div>
      </Section>

      <RelatedCaseStudies line={line.slug} />

      <Section tint id="contact-cta">
        <div className="grid max-w-2xl gap-4">
          <h2 className="text-3xl font-bold leading-[1.15] sm:text-4xl">
            {LINE_PAGE.ctaTitle(line.title)}
          </h2>
          <p className="lede">{LINE_PAGE.ctaLede}</p>
          <div className="mt-1 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="h-11 text-base font-semibold">
              <Link href={`/contact?service=${line.slug}`}>{LINE_PAGE.ctaButton}</Link>
            </Button>
            <BookCall size="lg" className="bg-background text-primary ring-1 ring-primary hover:bg-tint">
              {LINE_PAGE.bookCall}
            </BookCall>
          </div>
        </div>
        <nav aria-label={LINE_PAGE.otherLinesHeading} className="mt-12">
          <ListLabel>{LINE_PAGE.otherLinesHeading}</ListLabel>
          <ul className="mt-2 flex flex-wrap gap-x-6">
            {others.map((l) => (
              <li key={l.slug}>
                <Link href={`/services/${l.slug}`} className="inline-block py-2.5 font-semibold text-primary hover:text-primary/80">
                  {l.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Section>
    </>
  );
}
