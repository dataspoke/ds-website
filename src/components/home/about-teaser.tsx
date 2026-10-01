import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/shared/section";
import { CREDENTIALS, SOCIAL_LINKS } from "@/lib/constants";

export function ProfilePhoto({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/nick-paul-family.jpg"
      alt="Nick Paul and family on a mountain summit overlooking the water"
      width={1220}
      height={1520}
      sizes="260px"
      className={`aspect-[4/5] w-full max-w-[240px] rounded-2xl object-cover ${className}`}
    />
  );
}

export function AboutTeaser() {
  return (
    <Section id="about">
      <div className="grid items-center gap-10 md:grid-cols-[240px_1fr] md:gap-12">
        <ProfilePhoto />
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
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/about" className="font-semibold text-primary hover:text-primary/80">
              More about me &rarr;
            </Link>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary hover:text-primary/80"
            >
              LinkedIn &rarr;
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
