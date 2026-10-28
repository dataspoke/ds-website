import Link from "next/link";
import { Section, SectionHead } from "@/components/shared/section";

const STEPS = [
  { title: "Free 30-minute estimate", text: "Written plan and price range in two days." },
  { title: "Optional assessment", text: "Two weeks, fixed price." },
  { title: "Build, hand over, support", text: "Fixed scope, fixed price." },
];

export function StepsB() {
  return (
    <Section id="how" tint tight>
      <SectionHead eyebrow="How it works" title="Three steps, no surprises." />
      <ol className="mt-10 grid gap-4 md:grid-cols-3">
        {STEPS.map((s, i) => (
          <li key={s.title} className="relative grid content-start gap-2 rounded-xl border border-border bg-background p-5">
            <span className="font-display text-sm font-extrabold text-primary">{`0${i + 1}`}</span>
            <h3 className="text-lg font-bold leading-snug">{s.title}</h3>
            <p className="text-[0.95rem] text-muted-foreground">{s.text}</p>
          </li>
        ))}
      </ol>
      <Link href="/approach" className="mt-8 inline-block font-semibold text-primary hover:text-primary/80">
        How an engagement works &rarr;
      </Link>
    </Section>
  );
}
