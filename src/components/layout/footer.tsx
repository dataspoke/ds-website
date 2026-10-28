import Link from "next/link";
import { Logo } from "@/components/shared/logo";
import {
  CONTACT_EMAIL,
  SERVICE_AREA,
  SITE_NAME,
  SOCIAL_LINKS,
  TRADEMARK_NOTE,
} from "@/lib/constants";
import type { NavItem } from "@/types";

export function Footer({ navItems }: { navItems: NavItem[] }) {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div className="grid max-w-sm gap-3">
            <Logo />
            <p className="text-sm text-muted-foreground">
              Data, dashboards, custom software and AI that help established businesses know their
              numbers and help their teams do more. {SERVICE_AREA}
            </p>
            <p className="text-sm font-semibold text-ink select-all">{CONTACT_EMAIL}</p>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-0 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-block py-2.5 text-muted-foreground hover:text-primary">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={SOCIAL_LINKS.linkedinCompany}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block py-2.5 text-muted-foreground hover:text-primary"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
        <div className="grid gap-2 border-t border-border pt-6 text-sm text-muted-foreground">
          <p>{TRADEMARK_NOTE}</p>
          <p>
            &copy; {new Date().getFullYear()} {SITE_NAME}
          </p>
        </div>
      </div>
    </footer>
  );
}
