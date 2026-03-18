import Link from "next/link";
import { Shield, Users, BarChart3, Sparkles, Code, Briefcase } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/shared/section-heading";
import { SERVICES } from "@/lib/constants";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield,
  Users,
  BarChart3,
  Sparkles,
  Code,
  Briefcase,
};

export function ServicesOverview() {
  const featured = SERVICES.slice(0, 3);

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="How We Help"
          subtitle="We bring the expertise of a full technology team directly to your business. AI, data, and development."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <Link key={service.slug} href={`/services#${service.slug}`}>
                <Card className="h-full transition-colors hover:border-primary/50 cursor-pointer">
                  <CardContent className="pt-6">
                    {Icon && (
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                    )}
                    <h3 className="mt-4 text-lg font-semibold">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                      {service.description}
                    </p>
                    <span className="mt-3 inline-block text-sm font-medium text-primary">
                      Learn more &rarr;
                    </span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
