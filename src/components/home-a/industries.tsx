import Link from "next/link";
import { Section, SectionHead } from "@/components/shared/section";
import { INDUSTRIES, INDUSTRIES_HUB, industryPath } from "@/content/industries";
import { INDUSTRIES_A_HEAD } from "./content";

/** "Who we work with": one card per industry page, with the hub card copy. */
export function IndustriesA() {
  return (
    <Section tight id="industries" className="pt-0 sm:pt-0">
      <SectionHead eyebrow={INDUSTRIES_A_HEAD.eyebrow} title={INDUSTRIES_A_HEAD.title} />
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {INDUSTRIES.map((industry) => (
          <Link
            key={industry.slug}
            href={industryPath(industry.slug)}
            className="grid content-start gap-2.5 rounded-xl border border-tint-strong bg-background p-6 transition-colors hover:border-brand"
          >
            <h3 className="text-xl font-bold">{industry.name}</h3>
            <p className="text-[0.97rem] text-muted-foreground">{industry.card.body}</p>
            <p className="font-semibold text-primary">
              {INDUSTRIES_HUB.cardLink}
              <span className="sr-only">: {industry.serviceName}</span> &rarr;
            </p>
          </Link>
        ))}
      </div>
      <Link
        href={INDUSTRIES_A_HEAD.allLink.href}
        className="mt-8 inline-block font-semibold text-primary hover:text-primary/80"
      >
        {INDUSTRIES_A_HEAD.allLink.label} &rarr;
      </Link>
    </Section>
  );
}
