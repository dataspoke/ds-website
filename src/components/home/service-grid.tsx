import Link from "next/link";
import { Section, SectionHead } from "@/components/shared/section";
import { SERVICES_HEAD } from "@/content/home";
import { SERVICE_LINES } from "@/content/services";
import type { ServiceLine } from "@/types";
import { cn } from "@/lib/utils";

function LineCard({ line }: { line: ServiceLine }) {
  const hub = line.kind === "hub";
  return (
    <Link
      href={`/services/${line.slug}`}
      className={cn(
        "group grid content-start gap-2.5 rounded-xl border bg-background p-6 transition-colors hover:border-brand",
        hub ? "border-2 border-brand/60" : "border-tint-strong"
      )}
    >
      <h3 className="text-xl font-bold">{line.title}</h3>
      <p className="text-[0.97rem] text-muted-foreground">{line.oneLiner}</p>
      <span className="mt-1 text-sm font-semibold text-primary group-hover:text-primary/80">
        {line.title} &rarr;
      </span>
    </Link>
  );
}

/** The six service lines as a hub (2 lines) and spokes (4 lines). */
export function ServiceGrid() {
  const hubs = SERVICE_LINES.filter((l) => l.kind === "hub");
  const spokes = SERVICE_LINES.filter((l) => l.kind === "spoke");
  return (
    <Section tint id="services">
      <SectionHead
        eyebrow={SERVICES_HEAD.eyebrow}
        title={SERVICES_HEAD.title}
        lede={SERVICES_HEAD.lede}
      />
      <div className="mt-12 grid gap-10">
        <div className="grid gap-4">
          <p className="text-sm font-semibold uppercase tracking-[0.06em] text-primary">
            {SERVICES_HEAD.hubLabel}
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {hubs.map((l) => (
              <LineCard key={l.slug} line={l} />
            ))}
          </div>
        </div>
        <div className="grid gap-4">
          <p className="text-sm font-semibold uppercase tracking-[0.06em] text-primary">
            {SERVICES_HEAD.spokeLabel}
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {spokes.map((l) => (
              <LineCard key={l.slug} line={l} />
            ))}
          </div>
        </div>
      </div>
      <Link
        href={SERVICES_HEAD.allLink.href}
        className="mt-9 inline-block font-semibold text-primary hover:text-primary/80"
      >
        {SERVICES_HEAD.allLink.label} &rarr;
      </Link>
    </Section>
  );
}
