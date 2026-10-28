import { ChevronDown } from "lucide-react";
import { LinkedText } from "@/components/shared/faq-list";
import { Section, SectionHead } from "@/components/shared/section";
import { FAQS_A, FAQ_A_HEAD } from "./content";

/** Collapsible Q&As. The text is identical to the FAQPage JSON-LD on the page. */
export function FaqA() {
  return (
    <Section id="faq" className="pt-0 sm:pt-0">
      <SectionHead eyebrow={FAQ_A_HEAD.eyebrow} title={FAQ_A_HEAD.title} />
      <div className="mt-8 grid max-w-3xl gap-3">
        {FAQS_A.map((faq, i) => (
          <details
            key={faq.question}
            open={i === 0}
            className="group rounded-2xl border border-tint-strong bg-white open:shadow-sm"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-lg font-bold [&::-webkit-details-marker]:hidden">
              {faq.question}
              <ChevronDown className="size-5 shrink-0 text-brand transition-transform group-open:rotate-180" aria-hidden="true" />
            </summary>
            <p className="px-5 pb-5 text-muted-foreground">
              <LinkedText text={faq.answer} links={faq.link ? [faq.link] : faq.links} />
            </p>
          </details>
        ))}
      </div>
    </Section>
  );
}
