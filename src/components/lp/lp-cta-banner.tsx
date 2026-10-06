import { BookCall } from "@/components/shared/book-call";
import { Section } from "@/components/shared/section";
import { ProofLine } from "@/components/lp/proof-line";

interface LpCtaBannerProps {
  title: string;
  ctaLabel: string;
}

/** Closing section for a landing page: proof line, then the one CTA. */
export function LpCtaBanner({ title, ctaLabel }: LpCtaBannerProps) {
  return (
    <Section tint>
      <div className="grid max-w-2xl gap-6">
        <h2 className="text-2xl font-bold leading-[1.15] sm:text-3xl">{title}</h2>
        <ProofLine />
        <BookCall className="justify-self-start">{ctaLabel}</BookCall>
      </div>
    </Section>
  );
}
