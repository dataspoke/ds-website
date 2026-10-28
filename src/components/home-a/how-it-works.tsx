import Link from "next/link";
import { Section, SectionHead } from "@/components/shared/section";
import { Glyph } from "./illustrations";
import { HOW_A } from "./content";

const GLYPHS = ["phone", "doc", "check"] as const;

export function HowItWorksA() {
  return (
    <Section id="how">
      <SectionHead eyebrow={HOW_A.eyebrow} title={HOW_A.title} />
      <ol className="mt-10 grid gap-6 md:grid-cols-3">
        {HOW_A.steps.map((step, i) => (
          <li key={step.title} className="relative grid content-start gap-3 rounded-2xl bg-gradient-to-b from-tint to-white p-6">
            <div className="flex items-center gap-3">
              <svg viewBox="0 0 48 48" className="size-12 shrink-0" aria-hidden="true">
                <circle cx="24" cy="24" r="24" fill="#fff" />
                <Glyph name={GLYPHS[i]} x={24} y={24} size={24} />
              </svg>
              <span className="font-display text-3xl font-extrabold text-brand/60">{i + 1}</span>
            </div>
            <h3 className="text-lg font-bold leading-snug">{step.title}</h3>
            <p className="text-muted-foreground">{step.text}</p>
          </li>
        ))}
      </ol>
      <Link href={HOW_A.moreLink.href} className="mt-8 inline-block font-semibold text-primary hover:text-primary/80">
        {HOW_A.moreLink.label} &rarr;
      </Link>
    </Section>
  );
}
