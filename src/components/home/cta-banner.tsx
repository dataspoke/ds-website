import type { ReactNode } from "react";
import { EstimateCta } from "@/components/shared/estimate-cta";
import { Section } from "@/components/shared/section";
import { CONTACT_EMAIL } from "@/lib/constants";

export function CtaBanner({ note }: { note?: ReactNode }) {
  return (
    <Section tint id="contact-cta">
      <div className="grid max-w-2xl gap-4">
        <h2 className="text-3xl font-bold leading-[1.15] sm:text-4xl">
          Not sure where to start? Tell us what&apos;s slowing you down.
        </h2>
        <p className="lede">
          A free AI strategy call: 30 minutes, then a written estimate with a recommended plan and
          a price range within two business days. No obligation. We&apos;ll tell you honestly
          whether we can fix it. If the answer is no, we&apos;ll point you to who can.
        </p>
        {note}
        <div className="mt-1 flex flex-wrap items-center gap-x-6 gap-y-3">
          <EstimateCta location="home-banner">Book your free AI strategy call</EstimateCta>
          <span className="text-muted-foreground">
            or email <span className="font-semibold text-foreground select-all">{CONTACT_EMAIL}</span>
          </span>
        </div>
      </div>
    </Section>
  );
}
