"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

/**
 * The root layout has no access to the current pathname, so it can't
 * decide on its own to skip the site header and footer. /lp/* pages use
 * their own minimal layout (src/app/lp/layout.tsx) instead, so this small
 * client wrapper reads the pathname and suppresses the site chrome there.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLandingPage = pathname?.startsWith("/lp");

  if (isLandingPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
