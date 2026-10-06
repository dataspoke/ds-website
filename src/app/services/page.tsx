import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";
import { Section, SectionHead } from "@/components/shared/section";
import { Assessment } from "@/components/home/assessment";
import { CtaBanner } from "@/components/home/cta-banner";
import { LegacyAnchorRedirect } from "@/components/services/legacy-anchor-redirect";
import { LineCard } from "@/components/services/line-card";
import { ServicesMap } from "@/components/services/services-map";
import { ASSESSMENT, RETAINER_NOTE } from "@/content/approach";
import { HUB_LINES, SERVICES_PAGE, SPOKE_LINES } from "@/content/services";

export const metadata: Metadata = generateMetadata({
  title: "Services",
  description:
    "Data in the middle, everything else running on it. Capture and organize your company's data, then put it to work with dashboards, custom software, AI and analytics. For established businesses past $1M in revenue.",
  path: "/services",
});

const jumpLinks = [
  { href: "#hub", label: SERVICES_PAGE.hubEyebrow },
  { href: "#spokes", label: SERVICES_PAGE.spokeEyebrow },
  { href: "#assessment", label: `The ${ASSESSMENT.name}` },
];

export default function ServicesPage() {
  return (
    <>
      <LegacyAnchorRedirect />
      <Section tight>
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.15fr]">
          <div className="grid gap-6">
            <SectionHead
              as="h1"
              eyebrow={SERVICES_PAGE.eyebrow}
              title={SERVICES_PAGE.title}
              lede={SERVICES_PAGE.lede}
            />
            <nav aria-label="Jump to a section" className="flex flex-wrap gap-x-6 text-sm font-semibold">
              {jumpLinks.map((l) => (
                <a key={l.href} href={l.href} className="inline-block py-2.5 text-primary hover:text-primary/80">
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
          <ServicesMap className="mx-auto w-full max-w-xl" />
        </div>
      </Section>

      <Section tint id="hub">
        <SectionHead
          eyebrow={SERVICES_PAGE.hubEyebrow}
          title={SERVICES_PAGE.hubTitle}
          lede={SERVICES_PAGE.hubLede}
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {HUB_LINES.map((l) => (
            <LineCard key={l.slug} line={l} />
          ))}
        </div>
      </Section>

      <Section id="spokes">
        <SectionHead
          eyebrow={SERVICES_PAGE.spokeEyebrow}
          title={SERVICES_PAGE.spokeTitle}
          lede={SERVICES_PAGE.spokeLede}
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {SPOKE_LINES.map((l) => (
            <LineCard key={l.slug} line={l} />
          ))}
        </div>
      </Section>

      <Section tint tight>
        <p className="max-w-3xl text-muted-foreground">{RETAINER_NOTE}</p>
      </Section>

      <Assessment />
      <CtaBanner />
    </>
  );
}
