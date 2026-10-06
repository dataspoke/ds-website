"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LEGACY_SERVICE_ANCHORS } from "@/content/services";

/**
 * Hash fragments never reach the server, so next.config redirects can't catch
 * old links like /services#company-brain. This sends them to the new line page.
 */
export function LegacyAnchorRedirect() {
  const router = useRouter();

  useEffect(() => {
    const target = LEGACY_SERVICE_ANCHORS[window.location.hash.slice(1)];
    if (target) router.replace(target);
  }, [router]);

  return null;
}
