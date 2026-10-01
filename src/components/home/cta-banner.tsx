import { BookCall } from "@/components/shared/book-call";
import { Section } from "@/components/shared/section";
import { CONTACT_EMAIL } from "@/lib/constants";

export function CtaBanner() {
  return (
    <Section tint id="contact-cta">
      <div className="grid max-w-2xl gap-4">
        <h2 className="text-3xl font-bold leading-[1.15] sm:text-4xl">
          Not sure where to start? Tell me what&apos;s frustrating you.
        </h2>
        <p className="lede">
          I&apos;ll tell you honestly whether I can fix it. If the answer is no, I&apos;ll point
          you to who can.
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-x-6 gap-y-3">
          <BookCall>Book a 30-minute call</BookCall>
          <span className="text-muted-foreground">
            or email <span className="font-semibold text-foreground select-all">{CONTACT_EMAIL}</span>
          </span>
        </div>
      </div>
    </Section>
  );
}
