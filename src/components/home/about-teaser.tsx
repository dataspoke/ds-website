import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function AboutTeaser() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Photo placeholder */}
          <div className="flex-shrink-0">
            <div className="h-36 w-36 rounded-full bg-secondary flex items-center justify-center border-2 border-primary/20">
              <span className="text-3xl font-bold text-primary">N</span>
            </div>
          </div>

          <div className="max-w-xl">
            <h2 className="text-3xl font-bold tracking-tight">
              Who&apos;s Behind DataSpoke
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              DataSpoke is led by Nick &mdash; an Army veteran and operations
              research expert with 10+ years in tech consulting. He helps small
              businesses integrate AI, connect their data, and build systems
              that actually drive results. Based in Connecticut, serving clients
              nationwide.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex items-center text-primary font-medium hover:underline"
            >
              More about Nick
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
