import type { Metadata } from "next";
import Link from "next/link";
import { generateMetadata } from "@/lib/metadata";
import { Section, SectionHead } from "@/components/shared/section";
import { StageTitle } from "@/components/home/stages";
import { Assessment } from "@/components/home/assessment";
import { CtaBanner } from "@/components/home/cta-banner";
import { RETAINER_NOTE, STAGES } from "@/lib/constants";
import type { Product } from "@/types";

export const metadata: Metadata = generateMetadata({
  title: "Products",
  description:
    "Connect your company, make it AI-ready, then run it on what you know. Connected data, live numbers, lead flow, a private company brain, AI training, automation, early warnings and margin analysis for small businesses.",
  path: "/services",
});

function ProductDetail({ product }: { product: Product }) {
  return (
    <article
      id={product.slug}
      className="grid gap-6 border-t border-border py-10 md:grid-cols-[1fr_1fr] md:gap-12"
    >
      <div className="grid content-start gap-3">
        <h3 className="text-2xl font-bold">{product.title}</h3>
        <p className="text-muted-foreground">{product.description}</p>
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground/80">Typical result:</span> {product.result}
        </p>
        <Link
          href={`/contact?service=${product.slug}`}
          className="mt-1 justify-self-start py-2 font-semibold text-primary hover:text-primary/80"
        >
          Ask about this &rarr;
        </Link>
      </div>
      <div className="grid content-start gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-primary">
            Sounds like you if
          </p>
          <ul className="mt-2 grid gap-2">
            {product.soundsLike.map((s) => (
              <li key={s} className="flex items-start gap-3 text-[0.95rem] text-muted-foreground">
                <span className="mt-[9px] h-2 w-2 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-primary">
            What you get
          </p>
          <ul className="mt-2 grid gap-2">
            {product.youGet.map((s) => (
              <li key={s} className="flex items-start gap-3 text-[0.95rem] text-muted-foreground">
                <span className="mt-[9px] h-2 w-2 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export default function ServicesPage() {
  return (
    <>
      <Section tight>
        <SectionHead
          eyebrow="Products"
          title={"Connect your company. Make it AI\u2011ready. Then run it on what you know."}
          lede="You don't need to know what to ask for. Find the problem that sounds like yours."
        />
        <nav aria-label="Jump to a stage" className="mt-8 flex flex-wrap gap-x-6 gap-y-0 text-sm font-semibold">
          {STAGES.map((s) => (
            <a key={s.slug} href={`#${s.slug}`} className="inline-block py-2.5 text-primary hover:text-primary/80">
              {s.number} {s.title}
            </a>
          ))}
          <a href="#assessment" className="inline-block py-2.5 text-primary hover:text-primary/80">
            The AI Assessment
          </a>
        </nav>
      </Section>

      {STAGES.map((stage) => (
        <Section key={stage.slug} id={stage.slug} className="pt-0 sm:pt-0">
          <StageTitle stage={stage} />
          {stage.products.map((p) => (
            <ProductDetail key={p.slug} product={p} />
          ))}
        </Section>
      ))}

      <Section tint tight>
        <p className="max-w-3xl text-muted-foreground">{RETAINER_NOTE}</p>
      </Section>

      <Assessment />
      <CtaBanner />
    </>
  );
}
