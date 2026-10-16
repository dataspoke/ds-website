import Link from "next/link";
import { Logo } from "@/components/shared/logo";
import { SITE_NAME } from "@/lib/constants";

/**
 * Layout for the service ad pages (/lp/ai, /lp/custom-software, /lp/dashboards):
 * no site nav, logo linking home, copyright only. /lp/free-estimate has its
 * own layout. The root layout still wraps this one, so
 * src/components/lp/site-chrome.tsx suppresses the main Header/Footer on /lp.
 */
export default function LpLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="w-full border-b border-border">
        <div className="mx-auto flex h-[72px] max-w-6xl items-center px-4 sm:px-6">
          <Link href="/" aria-label={`${SITE_NAME} home`}>
            <Logo />
          </Link>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-6xl px-4 text-sm text-muted-foreground sm:px-6">
          &copy; {new Date().getFullYear()} {SITE_NAME}
        </div>
      </footer>
    </div>
  );
}
