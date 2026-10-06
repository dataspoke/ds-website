import Link from "next/link";
import { Section, SectionHead } from "@/components/shared/section";
import { STEPS } from "@/content/approach";
import { HOW_HEAD } from "@/content/home";

export function HowItWorks() {
  return (
    <Section id="how" className="pt-0 sm:pt-0">
      <SectionHead eyebrow={HOW_HEAD.eyebrow} title={HOW_HEAD.title} />
      <ol className="mt-12 grid gap-8 md:grid-cols-3">
        {STEPS.map((step, i) => (
          <li key={step.title} className="relative grid content-start gap-3 pt-7">
            <span
              className="absolute left-0 top-1.5 h-4 w-4 rounded-full bg-brand"
              aria-hidden="true"
            />
            {i < STEPS.length - 1 && (
              <span
                className="absolute left-4 top-[13px] hidden h-0.5 w-[calc(100%+2rem)] bg-tint-strong md:block"
                aria-hidden="true"
              />
            )}
            <p className="text-sm font-semibold uppercase tracking-[0.06em] text-primary">
              {step.label}
            </p>
            <h3 className="text-xl font-bold">{step.title}</h3>
            <p className="text-muted-foreground">{step.description}</p>
          </li>
        ))}
      </ol>
      <Link
        href={HOW_HEAD.moreLink.href}
        className="mt-9 inline-block font-semibold text-primary hover:text-primary/80"
      >
        {HOW_HEAD.moreLink.label} &rarr;
      </Link>
    </Section>
  );
}
