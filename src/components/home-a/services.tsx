import Link from "next/link";
import { Section, SectionHead } from "@/components/shared/section";
import { SERVICE_LINES, SERVICE_PIPELINE } from "@/content/services";
import type { ServiceLineSlug } from "@/types";
import { cn } from "@/lib/utils";
import { SERVICES_A_HEAD } from "./content";
import { PipelineList } from "./pipeline-list";

const TITLES = Object.fromEntries(SERVICE_LINES.map((l) => [l.slug, l.title])) as Record<ServiceLineSlug, string>;

/**
 * Ordered pipeline: numbered nodes joined by connectors, left to right from lg
 * up and top to bottom below it. A server component, so the services content
 * stays out of the client bundle; only PipelineList's animation runs there.
 */
export function ServicesA() {
  return (
    <Section tint tight id="services">
      <SectionHead eyebrow={SERVICES_A_HEAD.eyebrow} title={SERVICES_A_HEAD.title} lede={SERVICES_A_HEAD.lede} />

      <div aria-hidden="true" className="mt-10 hidden grid-cols-6 gap-4 lg:grid">
        <Group label="Foundation" className="col-span-2" />
        <Group label="Build on it" className="col-span-4" />
      </div>

      <PipelineList steps={SERVICE_PIPELINE.map((step) => ({ ...step, title: TITLES[step.slug] }))} />

      <Link href={SERVICES_A_HEAD.allLink.href} className="mt-8 inline-block font-semibold text-primary hover:text-primary/80">
        {SERVICES_A_HEAD.allLink.label} &rarr;
      </Link>
    </Section>
  );
}

function Group({ label, className }: { label: string; className?: string }) {
  return (
    <div className={cn("grid gap-2 text-center", className)}>
      <span className="text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-primary">{label}</span>
      <span className="h-2 rounded-t-md border-x-2 border-t-2 border-brand/40" />
    </div>
  );
}
