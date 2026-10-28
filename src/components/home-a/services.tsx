import Link from "next/link";
import { BarChart3, Database, LayoutGrid, Plug, Sparkles, TrendingUp, type LucideIcon } from "lucide-react";
import { Section, SectionHead } from "@/components/shared/section";
import { SERVICE_LINES } from "@/content/services";
import type { ServiceLineSlug } from "@/types";
import { cn } from "@/lib/utils";
import { SERVICES_A_HEAD } from "./content";

const ICONS: Record<ServiceLineSlug, LucideIcon> = {
  capture: Plug,
  organize: Database,
  "metrics-dashboards": BarChart3,
  "custom-software": LayoutGrid,
  "ai-implementation": Sparkles,
  "analytics-data-science": TrendingUp,
};

/** Short, owner-facing line per service for the icon cards. */
const BLURBS: Record<ServiceLineSlug, string> = {
  capture: "Leads and invoices land where they belong.",
  organize: "One trustworthy set of records.",
  "metrics-dashboards": "Know your numbers every Monday.",
  "custom-software": "Built around how you work.",
  "ai-implementation": "AI on your data, a person approving.",
  "analytics-data-science": "Where money goes, what's next.",
};

export function ServicesA() {
  return (
    <Section tint id="services">
      <SectionHead eyebrow={SERVICES_A_HEAD.eyebrow} title={SERVICES_A_HEAD.title} />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICE_LINES.map((line) => {
          const Icon = ICONS[line.slug];
          const hub = line.kind === "hub";
          return (
            <Link
              key={line.slug}
              href={`/services/${line.slug}`}
              className={cn(
                "group grid content-start gap-3 rounded-2xl bg-white p-6 ring-1 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand/10",
                hub ? "ring-2 ring-brand/50" : "ring-tint-strong"
              )}
            >
              <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-tint to-tint-strong text-primary">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <span className="grid gap-1">
                {hub && (
                  <span className="text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-primary">Foundation</span>
                )}
                <h3 className="text-lg font-bold leading-snug">{line.title}</h3>
                <p className="text-[0.95rem] text-muted-foreground">{BLURBS[line.slug]}</p>
              </span>
            </Link>
          );
        })}
      </div>
      <Link href={SERVICES_A_HEAD.allLink.href} className="mt-8 inline-block font-semibold text-primary hover:text-primary/80">
        {SERVICES_A_HEAD.allLink.label} &rarr;
      </Link>
    </Section>
  );
}
