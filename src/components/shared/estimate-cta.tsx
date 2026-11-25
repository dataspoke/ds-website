"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { sendGAEvent } from "@next/third-parties/google";
import { Button } from "@/components/ui/button";
import { BOOKING_URL, FREE_ESTIMATE_PATH, LP_FREE_ESTIMATE_PATH } from "@/lib/constants";
import { withUtmParams } from "@/lib/utm";
import { cn } from "@/lib/utils";

const noSubscribe = () => () => {};

/**
 * The page URL's query string. Empty on the server and during hydration, so
 * the server-rendered href has no utm_* and the client adds them right after.
 */
function useLocationSearch() {
  return useSyncExternalStore(
    noSubscribe,
    () => window.location.search,
    () => ""
  );
}

/** /lp/free-estimate with any utm_* params from the current page URL. */
function lpEstimateHref(search: string) {
  if (!search) return LP_FREE_ESTIMATE_PATH;
  const url = new URL(
    withUtmParams(`https://dataspoke.invalid${LP_FREE_ESTIMATE_PATH}`, new URLSearchParams(search))
  );
  return url.pathname + url.search;
}

/**
 * GA4 event for an on-site click toward the free AI strategy call: a link to
 * /free-estimate (or /lp/free-estimate), or the scroll to the #book widget.
 * Clicks that open the Google Calendar page send booking_page_open instead,
 * so one click is never counted as both.
 */
export function trackEstimateCta(location: string) {
  sendGAEvent("event", "estimate_cta_click", { cta_location: location });
}

/** GA4 event for a click that opens the Google Calendar booking page in a new tab. */
export function trackBookingPageOpen(location: string) {
  sendGAEvent("event", "booking_page_open", { cta_location: location });
}

interface EstimateCtaProps {
  children: React.ReactNode;
  /** Where this button sits, sent as the GA4 cta_location parameter. */
  location: string;
  size?: "default" | "lg";
  className?: string;
  /** Open the Google Calendar page in a new tab. Sends booking_page_open, not estimate_cta_click. */
  external?: boolean;
  /**
   * External mode only. Defaults to BOOKING_URL. The ad landing page passes
   * the same URL with the visitor's utm_* params still attached.
   */
  href?: string;
  /**
   * Ad landing pages only. Go to /lp/free-estimate (no site nav) instead of
   * /free-estimate, carrying the page's utm_* params.
   */
  lp?: boolean;
  /** Drop the arrow below the sm breakpoint so a phone header still fits. */
  hideIconOnMobile?: boolean;
}

/**
 * Primary path into the free AI strategy call. On other pages this goes to
 * /free-estimate (or /lp/free-estimate with `lp`). On /free-estimate and /lp/free-estimate it scrolls to the
 * booking widget, so campaign parameters on the page URL stay put.
 * External mode opens the calendar in a new tab when the embed cannot.
 * Link and scroll clicks send estimate_cta_click; external clicks send
 * booking_page_open.
 */
export function EstimateCta({
  children,
  location,
  size = "lg",
  className,
  external = false,
  href,
  lp = false,
  hideIconOnMobile = false,
}: EstimateCtaProps) {
  const pathname = usePathname();
  const search = useLocationSearch();
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
        <a
          href={href ?? BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackBookingPageOpen(location)}
        >
          {children}
          {icon}
        </a>
      </Button>
    );
  }

  if (pathname === FREE_ESTIMATE_PATH || pathname === LP_FREE_ESTIMATE_PATH) {
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
      <Link href={lp ? lpEstimateHref(search) : FREE_ESTIMATE_PATH} onClick={onClick}>
        {children}
        {icon}
      </Link>
    </Button>
  );
}
