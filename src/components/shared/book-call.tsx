"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackBookingPageOpen } from "@/components/shared/estimate-cta";
import { BOOKING_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface BookCallProps {
  children?: React.ReactNode;
  /** Where this button sits, sent as the GA4 cta_location parameter. */
  location: string;
  size?: "default" | "lg";
  className?: string;
}

/**
 * Primary call to action. Opens the Google Calendar booking page in a new tab
 * and sends the GA4 booking_page_open event.
 */
export function BookCall({ children = "Book a call", location, size = "lg", className }: BookCallProps) {
  return (
    <Button asChild size={size} className={cn("group h-11 text-base font-semibold", className)}>
      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackBookingPageOpen(location)}
      >
        {children}
        <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
      </a>
    </Button>
  );
}
