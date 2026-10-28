import { EstimateCta } from "@/components/shared/estimate-cta";
import { CONTACT_EMAIL } from "@/lib/constants";
import { CTA_A } from "./content";

export function CtaA() {
  return (
    <section id="contact-cta" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#5f9ee8] to-[#1f63b5] px-6 py-12 text-white sm:px-12 sm:py-16">
          <svg aria-hidden="true" viewBox="0 0 100 100" className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 opacity-15">
            <g stroke="#fff" strokeWidth="3" fill="#fff">
              {[[50, 10], [85, 30], [85, 70], [50, 90], [15, 70], [15, 30]].map(([x, y]) => (
                <g key={`${x}-${y}`}>
                  <line x1="50" y1="50" x2={x} y2={y} />
                  <circle cx={x} cy={y} r="6" />
                </g>
              ))}
              <circle cx="50" cy="50" r="12" />
            </g>
          </svg>
          <div className="relative grid max-w-xl gap-4">
            <h2 className="text-3xl font-bold leading-[1.15] sm:text-4xl">{CTA_A.title}</h2>
            <p className="text-lg text-white/85">{CTA_A.text}</p>
            <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-3">
              <EstimateCta location="home-banner" className="bg-white text-primary hover:bg-white/90">
                {CTA_A.button}
              </EstimateCta>
              <span className="text-white/85">
                or email <span className="font-semibold text-white select-all">{CONTACT_EMAIL}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
