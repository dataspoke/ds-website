import { BookCall } from "@/components/shared/book-call";
import { Section, SectionHead } from "@/components/shared/section";
import { ASSESSMENT } from "@/lib/constants";

export function Assessment() {
  return (
    <Section id="assessment">
      <div className="grid items-start gap-9 lg:grid-cols-2 lg:gap-14">
        <div className="grid gap-5">
          <SectionHead eyebrow="Start here" title="The AI Assessment" lede={ASSESSMENT.lede} />
          <ul className="grid gap-3">
            {ASSESSMENT.includes.map((item) => (
              <li key={item} className="flex items-start gap-3 text-muted-foreground">
                <span className="mt-[9px] h-2.5 w-2.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-5 rounded-2xl border border-border p-6 sm:p-8">
          <div>
            <p className="text-sm text-muted-foreground">Example scorecard, home services company</p>
            <div className="mt-3 grid gap-2.5">
              {ASSESSMENT.sampleScores.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-[130px_1fr_40px] items-center gap-3 text-sm sm:grid-cols-[150px_1fr_40px]"
                >
                  <span>{row.label}</span>
                  <div className="h-2 overflow-hidden rounded-full bg-tint-strong">
                    <div
                      className="h-full rounded-full bg-brand"
                      style={{ width: `${row.score * 10}%` }}
                    />
                  </div>
                  <span className="text-right tabular-nums text-muted-foreground">
                    {row.score}/10
                  </span>
                </div>
              ))}
            </div>
          </div>
          <p className="font-display text-[2rem] font-extrabold tracking-tight">
            {ASSESSMENT.price}{" "}
            <span className="font-sans text-base font-medium tracking-normal text-muted-foreground">
              {ASSESSMENT.terms}
            </span>
          </p>
          <BookCall className="justify-self-start">Book an assessment call</BookCall>
          <p className="text-sm text-muted-foreground">{ASSESSMENT.credit}</p>
        </div>
      </div>
    </Section>
  );
}
