import { Section, SectionHead } from "@/components/shared/section";
import { PROBLEMS, PROBLEMS_CLOSE } from "@/lib/constants";

export function ProblemStatement() {
  return (
    <Section id="familiar">
      <SectionHead eyebrow="Sound familiar?" title="Your business knows more than you can see." />
      <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3 md:gap-10">
        {PROBLEMS.map((p) => (
          <div key={p.title} className="grid content-start gap-2.5">
            <span className="h-3.5 w-3.5 rounded-full bg-brand" aria-hidden="true" />
            <h3 className="text-[1.15rem] font-bold leading-snug">{p.title}</h3>
            <p className="text-muted-foreground">{p.description}</p>
          </div>
        ))}
      </div>
      <p className="mt-9 max-w-3xl text-muted-foreground">{PROBLEMS_CLOSE}</p>
    </Section>
  );
}
