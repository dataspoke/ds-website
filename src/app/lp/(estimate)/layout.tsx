import Link from "next/link";
import { Logo } from "@/components/shared/logo";
import { PRIVACY_PATH, SITE_NAME } from "@/lib/constants";

/**
 * Chrome for /lp/free-estimate. The logo is not a link, and the footer is
 * copyright plus the privacy policy. Nothing else on this page points at
 * the rest of the site.
 */
export default function EstimateLpLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="w-full border-b border-border">
        <div className="mx-auto flex h-[72px] max-w-6xl items-center px-4 sm:px-6">
          <Logo />
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-6xl px-4 text-sm text-muted-foreground sm:px-6">
          <p>
            &copy; {new Date().getFullYear()} {SITE_NAME}
            <span className="px-2" aria-hidden="true">
              ·
            </span>
            <Link href={PRIVACY_PATH} className="hover:text-primary">
              Privacy
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
