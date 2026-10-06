import Link from "next/link";
import { Section, SectionHead } from "@/components/shared/section";
import { WORK_HEAD } from "@/content/home";
import { CASE_STUDIES } from "@/content/case-studies";

/** Three featured case studies, each linking to /work/<slug>. */
export function FeaturedWork() {
  const featured = CASE_STUDIES.filter((c) => c.featured).slice(0, 3);
  return (
    <Section id="work">
      <SectionHead eyebrow={WORK_HEAD.eyebrow} title={WORK_HEAD.title} lede={WORK_HEAD.lede} />
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((c) => (
          <Link
            key={c.slug}
            href={`/work/${c.slug}`}
            className="group grid content-start gap-3.5 rounded-xl border border-border p-7 transition-colors hover:border-brand"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-primary">
              {c.industry} · {c.size}
            </p>
            <h3 className="text-xl font-bold leading-snug">{c.title}</h3>
            <p className="text-[0.95rem] text-muted-foreground">{c.summary.result}</p>
            <span className="mt-1 text-sm font-semibold text-primary group-hover:text-primary/80">
              {WORK_HEAD.readLabel} &rarr;
            </span>
          </Link>
        ))}
      </div>
      <Link
        href={WORK_HEAD.allLink.href}
        className="mt-9 inline-block font-semibold text-primary hover:text-primary/80"
      >
        {WORK_HEAD.allLink.label} &rarr;
      </Link>
    </Section>
  );
}
