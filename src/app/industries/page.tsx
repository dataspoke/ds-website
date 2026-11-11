import type { Metadata } from "next";
import Link from "next/link";
import { generateMetadata } from "@/lib/metadata";
import { BreadcrumbJsonLd, ItemListJsonLd } from "@/components/shared/json-ld";
import { Section } from "@/components/shared/section";
import { EstimateCta } from "@/components/shared/estimate-cta";
import { Breadcrumbs } from "@/components/industries/breadcrumbs";
import { INDUSTRIES, INDUSTRIES_HUB, industryPath } from "@/content/industries";

export const metadata: Metadata = generateMetadata({
  title: INDUSTRIES_HUB.metaTitle,
  description: INDUSTRIES_HUB.metaDescription,
  path: INDUSTRIES_HUB.path,
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: INDUSTRIES_HUB.name, path: INDUSTRIES_HUB.path },
];

export default function IndustriesPage() {
  return (
    <>
      <BreadcrumbJsonLd items={crumbs} />
      <ItemListJsonLd
        path={INDUSTRIES_HUB.path}
        name={INDUSTRIES_HUB.h1}
        items={INDUSTRIES.map((i) => ({ name: i.serviceName, path: industryPath(i.slug) }))}
      />

      <Section tight>
        <Breadcrumbs items={crumbs} />
        <div className="mt-4 grid max-w-3xl gap-3.5">
          <h1 className="text-3xl font-bold leading-[1.15] sm:text-4xl">{INDUSTRIES_HUB.h1}</h1>
          <p className="lede">{INDUSTRIES_HUB.definition}</p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {INDUSTRIES.map((industry) => (
            <Link
              key={industry.slug}
              href={industryPath(industry.slug)}
              className="grid content-start gap-2.5 rounded-xl border border-tint-strong bg-background p-6 transition-colors hover:border-brand"
            >
              <h2 className="text-xl font-bold">{industry.name}</h2>
              <p className="text-[0.97rem] text-muted-foreground">{industry.card.body}</p>
              <p className="font-semibold text-primary">
                {INDUSTRIES_HUB.cardLink}
                <span className="sr-only">: {industry.serviceName}</span> &rarr;
              </p>
            </Link>
          ))}
        </div>
        <div className="mt-12 grid max-w-2xl gap-3">
          <h2 className="text-2xl font-bold">{INDUSTRIES_HUB.notListed.title}</h2>
          <p className="text-muted-foreground">{INDUSTRIES_HUB.notListed.text}</p>
        </div>
      </Section>

      <Section tint id="contact-cta">
        <div className="grid max-w-2xl gap-4">
          <h2 className="text-3xl font-bold leading-[1.15] sm:text-4xl">{INDUSTRIES_HUB.cta.title}</h2>
          <p className="lede">{INDUSTRIES_HUB.cta.text}</p>
          <div className="mt-1">
            <EstimateCta location="industries-hub">{INDUSTRIES_HUB.cta.button}</EstimateCta>
          </div>
        </div>
      </Section>
    </>
  );
}
