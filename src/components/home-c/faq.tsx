import { LinkedText } from "@/components/shared/faq-list";
import type { FaqItem } from "@/types";

/**
 * Three short answers for the home page. Visible text and the FAQPage JSON-LD
 * both read from this list, so they always match.
 */
export const HOME_C_FAQS: FaqItem[] = [
  {
    question: "Who is DataSpoke for?",
    answer:
      "Established businesses whose CRM, accounting and phone systems should work together.",
  },
  {
    question: "How do I get started?",
    answer:
      "Book a free 30-minute estimate. A written plan and price range follows within two days.",
    link: { label: "free 30-minute estimate", href: "/free-estimate" },
  },
  {
    question: "Do we have to replace the software we already use?",
    answer: "No. We build on the software you already pay for.",
  },
];

export function FaqC() {
  return (
    <section id="faq" className="bg-background py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="eyebrow">Plain answers</p>
          <h2 className="mt-3 text-3xl font-bold leading-[1.1] sm:text-4xl">Before you call.</h2>
        </div>
        <div className="md:col-span-8">
          {HOME_C_FAQS.map((faq, i) => (
            <details
              key={faq.question}
              open={i === 0}
              className="group border-t border-border last:border-b"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left font-display text-xl font-bold tracking-tight marker:hidden [&::-webkit-details-marker]:hidden">
                {faq.question}
                <span
                  aria-hidden="true"
                  className="relative h-6 w-6 shrink-0 before:absolute before:top-1/2 before:left-0 before:h-0.5 before:w-6 before:-translate-y-1/2 before:bg-brand after:absolute after:top-0 after:left-1/2 after:h-6 after:w-0.5 after:-translate-x-1/2 after:bg-brand after:transition-transform group-open:after:scale-y-0"
                />
              </summary>
              <p className="pb-6 text-muted-foreground">
                <LinkedText text={faq.answer} links={faq.link ? [faq.link] : faq.links} />
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
