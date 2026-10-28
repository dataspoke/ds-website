import Link from "next/link";
import { BarChart3, Cable, Code2, Database, Search, Sparkles, type LucideIcon } from "lucide-react";
import { Section, SectionHead } from "@/components/shared/section";
import { SERVICE_LINES } from "@/content/services";
import type { ServiceLineSlug } from "@/types";

const ICONS: Record<ServiceLineSlug, LucideIcon> = {
  capture: Cable,
  organize: Database,
  "metrics-dashboards": BarChart3,
  "custom-software": Code2,
  "ai-implementation": Sparkles,
  "analytics-data-science": Search,
};

export function ServicesB() {
  return (
    <Section id="services">
      <SectionHead eyebrow="What we do" title="Six services, one foundation." />
      <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICE_LINES.map((l) => {
          const Icon = ICONS[l.slug];
          const hub = l.kind === "hub";
          return (
            <li key={l.slug}>
              <Link
                href={`/services/${l.slug}`}
                className="group flex h-full items-center gap-4 rounded-xl border border-border p-4 transition-colors hover:border-brand"
              >
                <span
                  className={
                    hub
                      ? "flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary text-white"
                      : "flex size-11 shrink-0 items-center justify-center rounded-lg bg-tint text-primary"
                  }
                >
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="font-display font-bold leading-snug">{l.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      <Link href="/services" className="mt-8 inline-block font-semibold text-primary hover:text-primary/80">
        All six services &rarr;
      </Link>
    </Section>
  );
}
