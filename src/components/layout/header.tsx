"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { BookCall } from "@/components/shared/book-call";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href.split("#")[0];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link href="/" aria-label="DataSpoke home" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_ITEMS.map((item) => (
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

        <div className="flex items-center gap-2">
          <BookCall size="default" className="h-10 px-4 text-[0.95rem]" />
          <button
            className="rounded-md p-2 md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="flex flex-col gap-4 border-t border-border bg-background px-4 py-5 md:hidden">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "text-base font-medium",
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
