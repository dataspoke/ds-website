import Link from "next/link";
import { Section, SectionHead } from "@/components/shared/section";
import { RETAINER_NOTE, STAGES } from "@/lib/constants";
import type { Product, Stage } from "@/types";
import { cn } from "@/lib/utils";

export function StageTitle({ stage }: { stage: Stage }) {
  return (
    <div className="flex flex-wrap items-center gap-3 border-b-2 border-brand pb-3">
      <span className="font-display font-extrabold text-brand">{stage.number}</span>
      <h3 className="text-[1.05rem] font-bold uppercase tracking-[0.06em]">{stage.title}</h3>
      <p className="w-full text-[0.97rem] text-muted-foreground sm:ml-auto sm:w-auto">
        {stage.summary}
      </p>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/services#${product.slug}`}
      className="grid content-start gap-2.5 rounded-xl border border-tint-strong bg-background p-6 transition-colors hover:border-brand"
    >
      <h3 className="text-xl font-bold">{product.title}</h3>
      <p className="text-[0.97rem] text-muted-foreground">{product.description}</p>
      <p className="mt-1 border-t border-border pt-2.5 text-sm text-muted-foreground">
        <span className="font-semibold text-foreground/80">Typical result:</span> {product.result}
      </p>
    </Link>
  );
}

export function Stages({ showRetainer = true }: { showRetainer?: boolean }) {
  return (
    <Section tint id="products">
      <SectionHead
        eyebrow="What I build"
        title="Connect your company. Make it AI-ready. Then run it on what you know."
        lede="Three stages, in order. Most clients start at the top and work down."
      />
      <div className="mt-14 grid gap-10">
        {STAGES.map((stage) => (
          <div key={stage.slug} className="grid gap-4">
            <StageTitle stage={stage} />
            <div
              className={cn(
                "grid gap-4",
                stage.products.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"
              )}
            >
              {stage.products.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        ))}
      </div>
      {showRetainer && <p className="mt-9 max-w-3xl text-muted-foreground">{RETAINER_NOTE}</p>}
    </Section>
  );
}
