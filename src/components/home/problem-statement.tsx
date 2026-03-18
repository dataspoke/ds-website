import { Clock, Unplug, HelpCircle } from "lucide-react";

const painPoints = [
  {
    icon: Clock,
    title: "Your team is doing work AI could handle",
    description:
      "Manual data entry, report building, document processing — it's costing you hours and money every week. The right AI integration changes that overnight.",
  },
  {
    icon: Unplug,
    title: "Your data is everywhere",
    description:
      "CRMs, spreadsheets, ad platforms — nothing talks to each other and you can't see the full picture. Connected data means better answers, faster.",
  },
  {
    icon: HelpCircle,
    title: "You know AI matters, but where do you start?",
    description:
      "ChatGPT, copilots, automation tools — there's a lot of noise. You need someone who can cut through it and build what actually works for your business.",
  },
];

export function ProblemStatement() {
  return (
    <section className="py-20 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Sound Familiar?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Most businesses are sitting on untapped potential &mdash; in their data,
            their workflows, and the AI tools they haven&apos;t deployed yet.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {painPoints.map((point) => (
            <div key={point.title} className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <point.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{point.title}</h3>
              <p className="mt-2 text-muted-foreground">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
