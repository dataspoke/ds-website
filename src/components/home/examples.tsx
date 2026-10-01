import { Section, SectionHead } from "@/components/shared/section";
import { EXAMPLES } from "@/lib/constants";

export function Examples() {
  return (
    <Section id="examples" className="border-t border-border">
      <SectionHead
        eyebrow="What this looks like"
        title="The same problem, in every kind of business."
        lede="Law firms, contractors, gyms, manufacturers, consultancies and retailers. The tools change; the pattern doesn't."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {EXAMPLES.map((ex) => (
          <article key={ex.industry} className="grid content-start gap-3.5 rounded-xl border border-border p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-primary">
              {ex.industry}
            </p>
            <dl className="grid gap-2.5">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.06em] text-muted-foreground">
                  Before
                </dt>
                <dd className="mt-0.5 text-[0.95rem] text-muted-foreground">{ex.before}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.06em] text-muted-foreground">
                  After
                </dt>
                <dd className="mt-0.5 text-[0.95rem] text-muted-foreground">{ex.after}</dd>
              </div>
            </dl>
            <p className="font-display text-[1.05rem] font-bold">{ex.result}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
