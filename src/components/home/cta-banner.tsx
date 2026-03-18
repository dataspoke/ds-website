import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaBanner() {
  return (
    <section className="py-20 bg-primary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
          Ready to talk?
        </h2>
        <p className="mt-4 text-lg text-primary-foreground/80">
          Let&apos;s talk about what AI and connected data can do for your business.
        </p>
        <Button
          asChild
          size="lg"
          variant="secondary"
          className="mt-8 text-base"
        >
          <Link href="/contact">
            Book a Free Call
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
