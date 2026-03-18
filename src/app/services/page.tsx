import type { Metadata } from "next";
import { SectionHeading } from "@/components/shared/section-heading";
import { ServiceCard } from "@/components/services/service-card";
import { CtaBanner } from "@/components/home/cta-banner";
import { SERVICES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI integration, connected data & analytics, CRM implementation, custom development, and data security services for small businesses.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Services"
            subtitle="We bring the expertise of a full technology team directly to your business. AI, data, security, and development."
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
