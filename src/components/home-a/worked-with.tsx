import Link from "next/link";
import { Section } from "@/components/shared/section";
import { WORKED_WITH_A } from "./content";

/** One line naming the industries we've worked in, linking to the /industries hub. */
export function WorkedWithA() {
  return (
    <Section tight id="industries" className="pt-0 sm:pt-0">
      <p className="max-w-3xl text-muted-foreground">
        {WORKED_WITH_A.text}{" "}
        <Link href={WORKED_WITH_A.link.href} className="font-semibold text-primary hover:text-primary/80">
          {WORKED_WITH_A.link.label} &rarr;
        </Link>
      </p>
    </Section>
  );
}
