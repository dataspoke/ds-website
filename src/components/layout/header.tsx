"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { BookCall } from "@/components/shared/book-call";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types";

export function Header({ navItems }: { navItems: NavItem[] }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    const path = pathname?.split("#")[0] ?? "";
    if (href === "/insights") return path === "/insights" || path.startsWith("/insights/");
    return path === href;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-3 px-4 sm:gap-6 sm:px-6">
        <Link href="/" aria-label="DataSpoke home" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-[0.97rem] font-medium transition-colors hover:text-primary",
                isActive(item.href) ? "text-primary" : "text-ink"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <BookCall size="default" className="h-11 px-3 text-[0.95rem] sm:px-4" />
          <button
            className="rounded-md p-2 sm:p-2.5 lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="flex flex-col border-t border-border bg-background px-4 py-2 lg:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "block py-3 text-base font-medium",
                isActive(item.href) ? "text-primary" : "text-ink"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
