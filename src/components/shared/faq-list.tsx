import Link from "next/link";
import type { FaqItem, TextLink } from "@/types";

function linksFor(faq: Pick<FaqItem, "link" | "links">): TextLink[] {
  return [...(faq.links ?? []), ...(faq.link ? [faq.link] : [])];
}

/**
 * Renders `text` with phrases wrapped in links. The visible text stays identical
 * to `text`, which is what FAQPage JSON-LD uses as the answer.
 */
export function LinkedText({ text, links }: { text: string; links?: TextLink[] }) {
  if (!links?.length) return text;

  const remaining = [...links];
  const nodes: React.ReactNode[] = [];
  let rest = text;
  let key = 0;

  while (remaining.length > 0 && rest.length > 0) {
    let bestIndex = -1;
    let bestLinkIndex = -1;
    for (let linkIndex = 0; linkIndex < remaining.length; linkIndex += 1) {
      const link = remaining[linkIndex];
      const index = rest.indexOf(link.label);
      if (index === -1) continue;
      const longerTie =
        index === bestIndex && link.label.length > remaining[bestLinkIndex].label.length;
      if (bestIndex === -1 || index < bestIndex || longerTie) {
        bestIndex = index;
        bestLinkIndex = linkIndex;
      }
    }
    if (bestIndex === -1) break;
    const link = remaining.splice(bestLinkIndex, 1)[0];
    if (bestIndex > 0) nodes.push(rest.slice(0, bestIndex));
    nodes.push(
      <Link key={key} href={link.href} className="font-semibold text-primary hover:text-primary/80">
        {link.label}
      </Link>
    );
    key += 1;
    rest = rest.slice(bestIndex + link.label.length);
  }

  if (rest) nodes.push(rest);
  return <>{nodes}</>;
}

/** The FAQ list used on /free-estimate and on each service page. */
export function FaqList({ faqs }: { faqs: FaqItem[] }) {
  return (
    <dl className="mt-10 grid max-w-3xl gap-8">
      {faqs.map((faq) => (
        <div key={faq.question} className="grid gap-2">
          <dt className="text-xl font-bold">{faq.question}</dt>
          <dd className="text-muted-foreground">
            <LinkedText text={faq.answer} links={linksFor(faq)} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
