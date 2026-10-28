import { ChevronDown } from "lucide-react";
import { LinkedText } from "@/components/shared/faq-list";
import { Section, SectionHead } from "@/components/shared/section";
import type { FaqItem } from "@/types";

/**
 * Short home FAQs. The same array feeds the visible list and the FAQPage
 * JSON-LD, so the structured data always matches what is shown.
 */
export const HOME_B_FAQS: FaqItem[] = [
  {
    question: "How do I get started?",
    answer:
      "Book a free 30-minute estimate. Within two business days you get a written plan and a price range, with no obligation.",
    link: { label: "free 30-minute estimate", href: "/free-estimate" },
  },
  {
    question: "Do we have to replace the software we already use?",
    answer:
      "No. We build on the systems you already pay for, such as Salesforce, HubSpot, QuickBooks and RingCentral. Nothing has to migrate.",
  },
];

export function FaqB() {
  return (
    <Section id="faq" tight>
      <SectionHead eyebrow="Plain answers" title="Before you call." />
      <div className="mt-8 grid max-w-3xl gap-3">
        {HOME_B_FAQS.map((faq) => (
          <details key={faq.question} className="group rounded-xl border border-border px-5 open:bg-muted/40">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-lg font-bold [&::-webkit-details-marker]:hidden">
              {faq.question}
              <ChevronDown className="size-5 shrink-0 text-primary transition-transform group-open:rotate-180" aria-hidden="true" />
            </summary>
            <p className="pb-5 text-muted-foreground">
              <LinkedText text={faq.answer} links={[...(faq.links ?? []), ...(faq.link ? [faq.link] : [])]} />
            </p>
          </details>
        ))}
      </div>
    </Section>
  );
}
