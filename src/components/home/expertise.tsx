import { Section, SectionHead } from "@/components/shared/section";
import { SpokeBullet } from "@/components/shared/spoke-bullet";
import { EXPERTISE } from "@/lib/constants";

export function ExpertiseSection() {
  return (
    <Section id="expertise">
      <SectionHead
        eyebrow="What's underneath"
        title="Connected data is the foundation. Better decisions are the point."
        lede="Sometimes the answer is a dashboard, not a chat. Sometimes it's a model. Sometimes it's a tool nobody sells. Every product I build draws on three things I've done for a living."
      />
      <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3 md:gap-10">
        {EXPERTISE.map((e) => (
          <SpokeBullet key={e.title} size="heading">
            <h3 className="text-[1.15rem] font-bold leading-snug">{e.title}</h3>
            <p className="text-muted-foreground">{e.description}</p>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold">For example:</span> {e.example}
            </p>
          </SpokeBullet>
        ))}
      </div>
    </Section>
  );
}
