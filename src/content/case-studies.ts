import type { CaseStudy } from "@/types";

// PLACEHOLDER DATA. Every entry below is a stand-in so the /work pages can be
// built against real shapes. Real copy replaces it only after Nick reviews the
// drafts for confidentiality. Rules: industry and headcount band only. No
// location, no client names, no proprietary method.

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "public-records-prospecting",
    title: "[Placeholder] From public data to a ranked prospect list",
    industry: "Home services",
    size: "20–50 staff",
    lines: ["capture", "metrics-dashboards", "analytics-data-science"],
    summary: {
      problem:
        "[Placeholder] Leads came from several agencies by email. Nobody could say what a paying job cost by channel.",
      built:
        "[Placeholder] A ranked prospect list built from public data, plus one lead flow from every agency into the CRM.",
      result:
        "[Placeholder] One trusted number for cost per paying job, and a list of who to call next.",
    },
    sources: ["CRM", "Ad platforms", "Lead vendors", "Public data"],
    sections: [
      { heading: "The problem", body: "[Placeholder] Copy to come after review." },
      { heading: "What I built", body: "[Placeholder] Copy to come after review." },
      { heading: "The result", body: "[Placeholder] Copy to come after review." },
    ],
    featured: true,
  },
  {
    slug: "client-file-that-fills-itself",
    title: "[Placeholder] The client file that fills itself",
    industry: "Professional services",
    size: "10–20 staff",
    lines: ["capture", "organize", "metrics-dashboards", "ai-implementation"],
    summary: {
      problem:
        "[Placeholder] Meeting prep meant digging through old calls and notes. Reports were built by hand.",
      built:
        "[Placeholder] Phone system, CRM and call transcripts feeding meeting prep, self-sending reports and call activity dashboards.",
      result:
        "[Placeholder] Meeting prep is one question. Reports arrive without being asked for.",
    },
    sources: ["Phone system", "CRM", "Call transcripts"],
    sections: [
      { heading: "The problem", body: "[Placeholder] Copy to come after review." },
      { heading: "What I built", body: "[Placeholder] Copy to come after review." },
      { heading: "The result", body: "[Placeholder] Copy to come after review." },
    ],
    featured: true,
  },
  {
    slug: "own-app-own-data",
    title: "[Placeholder] Their own app, their own data",
    industry: "Membership business",
    size: "20–50 staff",
    lines: ["custom-software", "analytics-data-science", "ai-implementation"],
    summary: {
      problem:
        "[Placeholder] A customer app that was slow, out of date and run by a vendor nobody could reach.",
      built:
        "[Placeholder] Rebuilt iOS and Android apps on the existing booking system, plus churn and at-risk member analytics.",
      result:
        "[Placeholder] Members book in seconds. The owner holds the keys to the data.",
    },
    sources: ["Booking system", "Payments", "Mobile apps"],
    sections: [
      { heading: "The problem", body: "[Placeholder] Copy to come after review." },
      { heading: "What I built", body: "[Placeholder] Copy to come after review." },
      { heading: "The result", body: "[Placeholder] Copy to come after review." },
    ],
    featured: true,
  },
  {
    slug: "dataspoke-runs-on-it",
    title: "[Placeholder] DataSpoke runs on it",
    industry: "Consulting",
    size: "1–5 staff",
    lines: ["capture", "organize", "ai-implementation", "custom-software"],
    summary: {
      problem:
        "[Placeholder] Meetings, email and time tracking ate hours that should have gone to clients.",
      built:
        "[Placeholder] Meetings recorded, email triaged, CRM tasks created from calls and time logged automatically.",
      result:
        "[Placeholder] I doubled my revenue in the last year by running my own business on these tools.",
    },
    sources: ["Meeting recordings", "Email", "CRM", "Calendar"],
    sections: [
      { heading: "The problem", body: "[Placeholder] Copy to come after review." },
      { heading: "What I built", body: "[Placeholder] Copy to come after review." },
      { heading: "The result", body: "[Placeholder] Copy to come after review." },
    ],
    featured: false,
  },
];
