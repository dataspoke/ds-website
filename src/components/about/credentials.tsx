import { Linkedin, ExternalLink, Award, GraduationCap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SOCIAL_LINKS } from "@/lib/constants";

const credentials = [
  {
    icon: Shield,
    label: "U.S. Army Veteran",
  },
  {
    icon: GraduationCap,
    label: "M.S. Operations Research",
  },
  {
    icon: Award,
    label: "10+ Years Consulting",
  },
];

export function Credentials() {
  return (
    <section className="py-20 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {credentials.map((cred) => (
            <div
              key={cred.label}
              className="flex items-center gap-3 px-6 py-3 rounded-xl bg-secondary"
            >
              <cred.icon className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">{cred.label}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild variant="outline" size="lg">
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="mr-2 h-4 w-4" />
              LinkedIn Profile
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a
              href={SOCIAL_LINKS.upwork}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Upwork (Expert Vetted)
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
