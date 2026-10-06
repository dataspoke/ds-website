import type { Metadata } from "next";
import { BookCall } from "@/components/shared/book-call";
import { Section, SectionHead } from "@/components/shared/section";
import { SpokeBullet } from "@/components/shared/spoke-bullet";
import { LpCtaBanner } from "@/components/lp/lp-cta-banner";
import { LP_CUSTOM_SOFTWARE } from "@/content/lp";

export const metadata: Metadata = {
  title: "Custom Software",
  description:
    "An app.yourcompany.com built around how your business actually works. Internal tools, client portals and mobile apps on the systems you already pay for.",
  robots: { index: false, follow: false },
};

export default function LpCustomSoftwarePage() {
  return (
    <>
      <Section tight>
        <div className="grid max-w-3xl gap-5">
          <p className="eyebrow">{LP_CUSTOM_SOFTWARE.eyebrow}</p>
          <h1 className="text-[2.1rem] font-extrabold leading-[1.1] tracking-[-0.02em] sm:text-5xl">
            {LP_CUSTOM_SOFTWARE.headline}
          </h1>
          <p className="lede max-w-xl">{LP_CUSTOM_SOFTWARE.lede}</p>
          <BookCall className="justify-self-start">{LP_CUSTOM_SOFTWARE.ctaLabel}</BookCall>
        </div>
      </Section>

      <Section tint>
        <div className="grid gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-primary">
              {LP_CUSTOM_SOFTWARE.soundsLikeEyebrow}
            </p>
            <ul className="mt-4 grid gap-3">
              {LP_CUSTOM_SOFTWARE.soundsLike.map((s) => (
                <SpokeBullet key={s} as="li" size="list" className="text-muted-foreground">
                  {s}
                </SpokeBullet>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-primary">
              {LP_CUSTOM_SOFTWARE.youGetEyebrow}
            </p>
            <ul className="mt-4 grid gap-3">
              {LP_CUSTOM_SOFTWARE.youGet.map((s) => (
                <SpokeBullet key={s} as="li" size="list" className="text-muted-foreground">
                  {s}
                </SpokeBullet>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow={LP_CUSTOM_SOFTWARE.examplesEyebrow} title="Built on what you already run." />
        <div className="mt-12 grid gap-7 md:grid-cols-3 md:gap-8">
          {LP_CUSTOM_SOFTWARE.examples.map((e) => (
            <SpokeBullet key={e.title} size="heading">
              <h3 className="text-[1.15rem] font-bold leading-snug">{e.title}</h3>
              <p className="text-muted-foreground">{e.description}</p>
            </SpokeBullet>
          ))}
        </div>
      </Section>

      <LpCtaBanner title="You own the code and the accounts." ctaLabel={LP_CUSTOM_SOFTWARE.ctaLabel} />
    </>
  );
}
