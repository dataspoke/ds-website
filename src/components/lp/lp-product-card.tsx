interface LpProductCardProps {
  title: string;
  description: string;
  result: string;
}

/** Product summary card for a landing page. Not a link: lp pages have one CTA. */
export function LpProductCard({ title, description, result }: LpProductCardProps) {
  return (
    <div className="grid content-start gap-2.5 rounded-xl border border-tint-strong bg-background p-6">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-[0.97rem] text-muted-foreground">{description}</p>
      <p className="mt-1 border-t border-border pt-2.5 text-sm text-muted-foreground">
        <span className="font-semibold text-foreground/80">Typical result:</span> {result}
      </p>
    </div>
  );
}
