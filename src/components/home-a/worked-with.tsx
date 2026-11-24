import Link from "next/link";
import { Section } from "@/components/shared/section";
import { LinkedText } from "@/components/shared/faq-list";
import { industryPath } from "@/content/industries";
import { WORKED_WITH_A } from "./content";

/** Phrases in the line that have their own industry page, linked in place. Government has none. */
const INDUSTRY_LINKS = [
  { label: "law firms", href: industryPath("law-firms") },
  { label: "home service companies", href: industryPath("home-services") },
  { label: "gyms", href: industryPath("gyms-and-fitness") },
  { label: "health and wellness brands", href: industryPath("health-and-wellness") },
  { label: "manufacturers", href: industryPath("manufacturing") },
];

/** One line naming the industries we've worked in, linking each industry page and the /industries hub. */
export function WorkedWithA() {
  return (
    <Section tight id="industries" className="pt-0 sm:pt-0">
      <p className="max-w-3xl text-muted-foreground">
        <LinkedText text={WORKED_WITH_A.text} links={INDUSTRY_LINKS} />{" "}
        <Link href={WORKED_WITH_A.link.href} className="font-semibold text-primary hover:text-primary/80">
          {WORKED_WITH_A.link.label} &rarr;
        </Link>
      </p>
    </Section>
  );
}
