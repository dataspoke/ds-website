import Link from "next/link";
import { ArrowRight, Shield, Users, BarChart3, Sparkles, Code, Briefcase } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Service } from "@/types";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield,
  Users,
  BarChart3,
  Sparkles,
  Code,
  Briefcase,
};

export function ServiceCard({ service }: { service: Service }) {
  const Icon = iconMap[service.icon];

  return (
    <Card id={service.slug} className="h-full">
      <CardContent className="pt-6 flex flex-col h-full">
        {Icon && (
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        )}
        <h3 className="mt-4 text-xl font-semibold">{service.title}</h3>
        <p className="mt-2 text-muted-foreground">{service.description}</p>

        <p className="mt-4 text-sm font-medium text-primary">
          Who it&apos;s for:
        </p>
        <p className="text-sm text-muted-foreground">{service.whoItsFor}</p>

        {service.features && (
          <ul className="mt-4 space-y-1">
            {service.features.map((feature) => (
              <li
                key={feature}
                className="text-sm text-muted-foreground flex items-start gap-2"
              >
                <span className="text-primary mt-1">&#8226;</span>
                {feature}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-6">
          <Button asChild className="w-full">
            <Link href={`/contact?service=${service.slug}`}>
              Book a Call
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
