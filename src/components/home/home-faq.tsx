import { FaqList } from "@/components/shared/faq-list";
import { Section, SectionHead } from "@/components/shared/section";
import { HOME_FAQS, HOME_FAQS_HEAD } from "@/content/home";

/** Direct answers for buyers and for AI assistants. Same text as the FAQPage JSON-LD on the home page. */
export function HomeFaq() {
  return (
    <Section id="faq" className="pt-0 sm:pt-0">
      <SectionHead eyebrow={HOME_FAQS_HEAD.eyebrow} title={HOME_FAQS_HEAD.title} />
      <FaqList faqs={HOME_FAQS} />
    </Section>
  );
}
