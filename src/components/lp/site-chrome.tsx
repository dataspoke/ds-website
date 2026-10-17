"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import type { NavItem } from "@/types";

/**
 * The root layout has no access to the current pathname, so it can't
 * decide on its own to skip the site header and footer. /lp/* pages use
 * their own minimal layouts under src/app/lp/ instead, so this small
 * client wrapper reads the pathname and suppresses the site chrome there.
 */
export function SiteChrome({
  children,
  navItems,
}: {
  children: React.ReactNode;
  navItems: NavItem[];
}) {
  const pathname = usePathname();
  const isLandingPage = pathname?.startsWith("/lp");

  if (isLandingPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Header navItems={navItems} />
      <main>{children}</main>
      <Footer navItems={navItems} />
    </>
  );
}
