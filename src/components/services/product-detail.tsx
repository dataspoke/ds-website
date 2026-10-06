import Link from "next/link";
import { SpokeBullet } from "@/components/shared/spoke-bullet";
import { LINE_PAGE } from "@/content/services";
import type { Product, ServiceLineSlug } from "@/types";

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-2 grid gap-2">
      {items.map((s) => (
        <SpokeBullet key={s} as="li" size="list" className="text-[0.95rem] text-muted-foreground">
          {s}
        </SpokeBullet>
      ))}
    </ul>
  );
}

export function ListLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-primary">{children}</p>
  );
}

/** One product within a service line. The `id` keeps old /services#<slug> anchors meaningful. */
export function ProductDetail({ product, line }: { product: Product; line: ServiceLineSlug }) {
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
          href={`/contact?service=${line}`}
          className="mt-1 justify-self-start py-2 font-semibold text-primary hover:text-primary/80"
        >
          {LINE_PAGE.ctaButton} &rarr;
        </Link>
      </div>
      <div className="grid content-start gap-6">
        <div>
          <ListLabel>{LINE_PAGE.soundsLikeHeading}</ListLabel>
          <BulletList items={product.soundsLike} />
        </div>
        <div>
          <ListLabel>{LINE_PAGE.youGetHeading}</ListLabel>
          <BulletList items={product.youGet} />
        </div>
      </div>
    </article>
  );
}
