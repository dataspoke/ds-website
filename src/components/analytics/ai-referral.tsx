"use client";

import { useEffect } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import { GA_MEASUREMENT_ID } from "@/lib/constants";
import { detectAiSource } from "@/lib/ai-referral";

const POLL_MS = 250;
const MAX_ATTEMPTS = 40;

function gaConfigQueued(): boolean {
  const dataLayer = window.dataLayer;
  if (!dataLayer) return false;
  return dataLayer.some((command) => {
    if (command == null || typeof command !== "object") return false;
    const entry = command as ArrayLike<unknown>;
    return entry[0] === "config" && entry[1] === GA_MEASUREMENT_ID;
  });
}

// Strict mode runs the effect twice. One landing should produce one event.
let reported = false;

/**
 * Sends GA4 `ai_referral` when the landing referrer or utm_source is an AI
 * assistant, and sets the `ai_source` user property. Renders nothing.
 * The root layout loads the GA4 tag this waits on.
 */
export function AiReferralTracker() {
  useEffect(() => {
    const aiSource = detectAiSource(document.referrer, window.location.search);
    if (!aiSource || reported) return;

    let attempts = 0;
    const timer = window.setInterval(() => {
      attempts += 1;
      if (!gaConfigQueued()) {
        if (attempts >= MAX_ATTEMPTS) window.clearInterval(timer);
        return;
      }
      if (reported) {
        window.clearInterval(timer);
        return;
      }
      reported = true;
      window.clearInterval(timer);
      sendGAEvent("set", "user_properties", { ai_source: aiSource });
      sendGAEvent("event", "ai_referral", { ai_source: aiSource });
    }, POLL_MS);

    return () => window.clearInterval(timer);
  }, []);

  return null;
}
