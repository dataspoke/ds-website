"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { sendGAEvent } from "@next/third-parties/google";
import { Button } from "@/components/ui/button";
import { BOOKING_URL, FREE_ESTIMATE_PATH } from "@/lib/constants";
import { cn } from "@/lib/utils";

/** GA4 event for every click that starts the free-estimate booking path. */
export function trackEstimateCta(location: string) {
  sendGAEvent("event", "estimate_cta_click", { cta_location: location });
}

interface EstimateCtaProps {
  children: React.ReactNode;
  /** Where this button sits, sent as the GA4 cta_location parameter. */
  location: string;
  size?: "default" | "lg";
  className?: string;
  /** Open the Google Calendar page in a new tab. */
  external?: boolean;
  /** Drop the arrow below the sm breakpoint so a phone header still fits. */
  hideIconOnMobile?: boolean;
}

/**
 * Primary path into the free estimate. On other pages this goes to
 * /free-estimate. On that page it scrolls to the booking widget.
 * External mode opens the calendar in a new tab when the embed cannot.
 */
export function EstimateCta({
  children,
  location,
  size = "lg",
  className,
  external = false,
  hideIconOnMobile = false,
}: EstimateCtaProps) {
  const pathname = usePathname();
  const onClick = () => trackEstimateCta(location);
  const classes = cn("group h-11 text-base font-semibold", className);
  const icon = (
    <ArrowRight
      className={cn(
        "transition-transform group-hover:translate-x-0.5",
        hideIconOnMobile && "max-sm:hidden"
      )}
    />
  );

  if (external) {
    return (
      <Button asChild size={size} variant="outline" className={classes}>
        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" onClick={onClick}>
          {children}
          {icon}
        </a>
      </Button>
    );
  }

  if (pathname === FREE_ESTIMATE_PATH) {
    return (
      <Button asChild size={size} className={classes}>
        <a href="#book" onClick={onClick}>
          {children}
          {icon}
        </a>
      </Button>
    );
  }

  return (
    <Button asChild size={size} className={classes}>
      <Link href={FREE_ESTIMATE_PATH} onClick={onClick}>
        {children}
        {icon}
      </Link>
    </Button>
  );
}
