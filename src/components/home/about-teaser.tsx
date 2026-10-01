import Link from "next/link";
import { Section } from "@/components/shared/section";
import { CREDENTIALS } from "@/lib/constants";

export function PhotoPlaceholder({ className = "" }: { className?: string }) {
  return (
    <div
      className={`grid aspect-[4/5] w-full max-w-[240px] place-items-center rounded-2xl border border-dashed border-brand bg-tint p-4 text-center text-sm font-semibold text-primary ${className}`}
      aria-hidden="true"
    >
      Real headshot goes here
    </div>
  );
}

export function AboutTeaser() {
  return (
    <Section id="about">
      <div className="grid items-center gap-10 md:grid-cols-[240px_1fr] md:gap-12">
        <PhotoPlaceholder />
        <div className="grid max-w-2xl gap-4">
          <p className="eyebrow">About</p>
          <h2 className="text-3xl font-bold leading-[1.15] sm:text-4xl">
            I&apos;m Nick Paul. I help small businesses get their software working together.
          </h2>
          <p className="text-muted-foreground">
            The name is the whole idea. Your business is the hub. Every tool you use is a spoke.
            My job is making the spokes carry data to the hub, so you can see the business
            clearly and so AI has something real to work with.
          </p>
          <p className="text-muted-foreground">
            You talk to the person doing the work. Plain English, no jargon. You own all of it,
            documented, so you&apos;re never locked in.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
            {CREDENTIALS.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
          <Link href="/about" className="font-semibold text-primary hover:text-primary/80">
            More about me &rarr;
          </Link>
        </div>
      </div>
    </Section>
  );
}
