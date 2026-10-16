import { LinkedText } from "@/components/shared/faq-list";
import { Section, SectionHead } from "@/components/shared/section";
import type { ServiceEngagement } from "@/content/service-pages";

/** Same step treatment as the free-estimate and approach pages. */
export function EngagementSection({ engagement }: { engagement: ServiceEngagement }) {
  return (
    <Section tint id="how-it-works" className="pt-0 sm:pt-0">
      <SectionHead eyebrow={engagement.eyebrow} title={engagement.title} />
      <p className="lede mt-3.5 max-w-2xl">
        <LinkedText text={engagement.lede} links={engagement.ledeLinks} />
      </p>
      <ol className="mt-12 grid gap-8 sm:grid-cols-2">
        {engagement.steps.map((step) => (
          <li key={step.title} className="relative grid content-start gap-3 pt-7">
            <span className="absolute left-0 top-1.5 h-4 w-4 rounded-full bg-brand" aria-hidden="true" />
            <p className="text-sm font-semibold uppercase tracking-[0.06em] text-primary">{step.label}</p>
            <h3 className="text-xl font-bold">{step.title}</h3>
            <p className="text-muted-foreground">
              <LinkedText text={step.description} links={step.links} />
            </p>
          </li>
        ))}
      </ol>
      <p className="mt-10 max-w-2xl text-muted-foreground">
        <LinkedText text={engagement.close} links={engagement.closeLinks} />
      </p>
    </Section>
  );
}
