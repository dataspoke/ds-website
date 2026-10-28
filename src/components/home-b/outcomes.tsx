import { Clock, Gauge, MessageSquareText, Wallet } from "lucide-react";
import { Section, SectionHead } from "@/components/shared/section";

const TILES = [
  { icon: Gauge, title: "Know your numbers", text: "Every Monday, without building a report." },
  { icon: Clock, title: "Hours back every week", text: "The retyping and chasing stops." },
  { icon: Wallet, title: "See where the money goes", text: "By job, customer and month." },
  { icon: MessageSquareText, title: "Ask in plain English", text: "AI that answers from your own records." },
];

export function OutcomesB() {
  return (
    <Section id="outcomes" tight>
      <SectionHead eyebrow="What changes" title="Four things owners notice first." />
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {TILES.map(({ icon: Icon, title, text }) => (
          <li key={title} className="grid content-start gap-3 rounded-xl border border-border bg-background p-5">
            <span className="flex size-10 items-center justify-center rounded-lg bg-tint text-primary">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <h3 className="text-lg font-bold leading-snug">{title}</h3>
            <p className="text-[0.95rem] text-muted-foreground">{text}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
