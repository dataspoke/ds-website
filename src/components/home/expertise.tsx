import { Section, SectionHead } from "@/components/shared/section";
import { EXPERTISE } from "@/lib/constants";

export function ExpertiseSection() {
  return (
    <Section id="expertise">
      <SectionHead
        eyebrow="What's underneath"
        title="Connected data is the foundation. Better decisions are the point."
        lede="Sometimes the answer is a dashboard, not a chat. Sometimes it's a model. Sometimes it's a tool nobody sells. Every product above draws on three things I've done for a living."
      />
      <div className="mt-12 grid gap-7 md:grid-cols-3 md:gap-10">
        {EXPERTISE.map((e) => (
          <div key={e.title} className="grid content-start gap-2.5">
            <span className="h-3.5 w-3.5 rounded-full bg-brand" aria-hidden="true" />
            <h3 className="text-[1.15rem] font-bold">{e.title}</h3>
            <p className="text-muted-foreground">{e.description}</p>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold">For example:</span> {e.example}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
