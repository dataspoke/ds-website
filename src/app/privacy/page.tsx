import type { Metadata } from "next";
import { Section } from "@/components/shared/section";
import { GOOGLE_PRIVACY_URL, PRIVACY } from "@/content/privacy";
import { generateMetadata as pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: PRIVACY.metaTitle,
  description: PRIVACY.metaDescription,
  path: PRIVACY.path,
});

function PrivacyText({ text }: { text: string }) {
  const label = "Google's privacy policy";
  if (!text.includes(label)) return text;
  const [before, after] = text.split(label);
  return (
    <>
      {before}
      <a
        href={GOOGLE_PRIVACY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-primary hover:text-primary/80"
      >
        {label}
      </a>
      {after}
    </>
  );
}

export default function PrivacyPage() {
  return (
    <Section>
      <div className="grid max-w-2xl gap-4">
        <p className="eyebrow">{PRIVACY.eyebrow}</p>
        <h1 className="text-4xl font-extrabold leading-[1.1] sm:text-5xl">{PRIVACY.title}</h1>
        <p className="lede">{PRIVACY.lede}</p>
      </div>
      <div className="mt-12 grid max-w-2xl gap-10">
        {PRIVACY.sections.map((section) => (
          <section key={section.title} className="grid gap-3">
            <h2 className="text-2xl font-bold">{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-muted-foreground">
                <PrivacyText text={paragraph} />
              </p>
            ))}
          </section>
        ))}
      </div>
    </Section>
  );
}
