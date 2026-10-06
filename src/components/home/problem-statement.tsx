import { Section, SectionHead } from "@/components/shared/section";
import { SpokeBullet } from "@/components/shared/spoke-bullet";
import { PROBLEMS, PROBLEMS_CLOSE, PROBLEMS_HEAD } from "@/content/home";

export function ProblemStatement() {
  return (
    <Section id="familiar">
      <SectionHead
        eyebrow={PROBLEMS_HEAD.eyebrow}
        title={PROBLEMS_HEAD.title}
        lede={PROBLEMS_HEAD.lede}
      />
      <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3 md:gap-10">
        {PROBLEMS.map((p) => (
          <SpokeBullet key={p.title} size="heading">
            <h3 className="text-[1.15rem] font-bold leading-snug">{p.title}</h3>
            <p className="text-muted-foreground">{p.description}</p>
          </SpokeBullet>
        ))}
      </div>
      <p className="mt-9 max-w-3xl text-muted-foreground">{PROBLEMS_CLOSE}</p>
    </Section>
  );
}
