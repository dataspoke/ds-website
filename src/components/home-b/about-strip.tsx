import Link from "next/link";
import { LogoMark } from "@/components/shared/logo";
import { Section } from "@/components/shared/section";

export function AboutStripB() {
  return (
    <Section id="about" tight>
      <div className="grid items-center gap-6 rounded-2xl border border-border p-6 sm:grid-cols-[auto_1fr_auto] sm:p-8">
        <LogoMark className="size-14 text-brand" />
        <div className="grid gap-1.5">
          <h2 className="text-2xl font-bold leading-tight">Built by Nick Paul, founder of DataSpoke.</h2>
          <p className="text-muted-foreground">
            You work directly with the person who scopes and builds it, and you own all of it.
          </p>
        </div>
        <Link href="/about" className="font-semibold text-primary hover:text-primary/80">
          About Nick &rarr;
        </Link>
      </div>
    </Section>
  );
}
