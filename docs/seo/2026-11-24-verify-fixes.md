# Nov 24 live SEO check: verify and fix

## TLDR

- The live check flagged four issues. All four were real in the code on `origin/main` (c0bd4eb), so nothing was ruled out as a not-issue.
- I opened one PR per issue. None is merged or deployed.
  1. Titles over 48 characters: [#41](https://github.com/dataspoke/ds-website/pull/41). It shortens 14 titles. These are the 3 new service pages, the 10 older pages the check listed, and `/work`.
  2. "small" and first-person copy: [#42](https://github.com/dataspoke/ds-website/pull/42). It fixes the company brain heading and the personal AI assistant page ("small" removed, "I" changed to "we").
  3. Missing JSON-LD: [#43](https://github.com/dataspoke/ds-website/pull/43). It adds Service and BreadcrumbList to the Claude, personal AI assistant, software factory and company brain pages.
  4. "Six" services and contact form options: [#44](https://github.com/dataspoke/ds-website/pull/44). One service list now drives the count ("ten") and the contact form, which gains the four newer services.
- I found three extras and folded them into the matching PRs:
  - The `/work` title was over 48 characters. It goes in #41, though `/work` redirects today.
  - llms.txt said "Six services". It goes in #44.
  - The wheel's accessible title said "six". It goes in #44 and now says "six core".
- The site-wide grep for "small" found no other user-visible hits.
- Every branch passes `npx eslint` and `npm run build`. An independent opus review found no blockers, and I applied its should-fix items.
- Overlap: open PR #40 (company brain visual) edits the company brain page and its content file. At first, #43 conflicted with #40 on one import line. I moved that import, and now all four PRs test-merge cleanly with #40 (`git merge-tree`). The four PRs also merge cleanly with each other. PRs #34, #35 and #40 were not touched.

## How I verified

- I ran `npm run build` on `origin/main` (c0bd4eb).
- A script then read every prerendered HTML file under `.next/server/app`. For each page it pulled the `<title>` and `og:title` (measured with Python `len()`), the visible text and meta description (checked for `\bsmall\b`), and the `application/ld+json` `@type`s.
- I used the source files for the count copy and contact options: `src/content/services.ts`, `src/components/home-a/content.ts`, `src/lib/constants.ts` and `src/app/llms.txt/route.ts`.
- Dynamic routes (`/lp/free-estimate`, `/work`) were checked from their source metadata.

## Issue 1: titles. Confirmed. PR #41

| Page | Before (len) | After (len) |
|---|---|---|
| /services/personal-ai-agent | Personal AI assistant setup for business leaders \| DataSpoke (60) | Personal AI assistant for leaders \| DataSpoke (45) |
| /services/software-factory | AI Internal Tools & Software Factory Setup \| DataSpoke (54) | AI Internal Tools & Software Factory \| DataSpoke (48) |
| /services/company-brain | Company Brain Setup for Your Team and AI \| DataSpoke (52) | Company Brain Setup for Teams and AI \| DataSpoke (48) |
| /services/claude | Claude Cowork, Claude Code, Skills and MCP setup \| DataSpoke (60) | Claude Code, Cowork and MCP setup \| DataSpoke (45) |
| /services/capture | Connect your software so nothing gets retyped \| DataSpoke (57) | Connect your software, stop retyping \| DataSpoke (48) |
| /services/custom-software | Custom software built around how you work \| DataSpoke (53) | Custom software for how you work \| DataSpoke (44) |
| /services/metrics-dashboards | Dashboards that show your numbers every Monday \| DataSpoke (58) | Dashboards that show your numbers \| DataSpoke (45) |
| /services/ai-implementation | AI on your data so your team gets more done \| DataSpoke (55) | Put AI to work on your business data \| DataSpoke (48) |
| /services/analytics-data-science | See where the money goes and what's coming next \| DataSpoke (59) | Where the money goes and what's next \| DataSpoke (48) |
| /free-estimate, /lp/free-estimate | Free AI strategy call, then a written estimate \| DataSpoke (58) | Free AI strategy call and estimate \| DataSpoke (46) |
| /approach | How working with DataSpoke goes, step by step \| DataSpoke (57) | How we work, step by step \| DataSpoke (37) |
| /insights | Insights: running a business on its own data \| DataSpoke (56) | Insights: running a business on data \| DataSpoke (48) |
| /insights/mission-command-ai-agents | Give your AI agents task and purpose. \| DataSpoke (49) | Give your AI agents task and purpose \| DataSpoke (48) |
| /work (extra; redirects to /about today) | Case studies: what we built and what changed \| DataSpoke (56) | Case studies: what we built \| DataSpoke (39) |

- `og:title` and `twitter:title` come from the same `generateMetadata` source, so they changed with each title.
- After the fix, the build audit finds no prerendered page with a title over 48 characters.
- Not changed: four unpublished case-study titles under `/work/[slug]` run 49–68 characters. They are filtered out of the site and `/work` redirects. Give them a `metaTitle` before any of them is published.

## Issue 2: copy rules. Confirmed. PR #42

- Company brain H2 "Small first, then wider." is now "Start narrow, then go wider."
- Personal AI assistant: "so small corrections turn into lasting habits" is now "so each correction turns into a lasting habit".
- Every first-person line on that page is now in the "we" voice: hero, workflows, steps, comparison column, proof section and how-to-start list. The founder story names Nick in the third person.
- The meta description had no first person, so it is unchanged.
- The About and Claude pages are not touched.
- Site-wide grep: no other user-visible "small". The remaining hits are code comments.

## Issue 3: JSON-LD. Confirmed. PR #43

- On main, the four pages had no `application/ld+json`. The six service line pages each had Service and FAQPage.
- Each of the four pages now has a Service (`#service` @id, provider, areaServed US) and a BreadcrumbList (Home → Services → page).
- No FAQPage was added, because these pages have no on-page FAQ. The `/services/claude` change is JSON-LD only.

## Issue 4: services count and contact form. Confirmed. PR #44

- On main:
  - The /services hero said "Six ways…" and "See the six".
  - The home page said "Compare all six".
  - The wheel's title said "The six DataSpoke services…".
  - llms.txt said "Six services".
  - `SERVICE_OPTIONS` listed only assessment, the six lines and other.
- The fix adds `src/content/service-catalog.ts`, which holds the six lines plus the four setup services. The hero ("Ten ways…", "See all ten"), the home link ("Compare all ten"), llms.txt, the /services setup cards and the contact form options all come from it.
- The contact form now has options for Claude, personal AI assistant, software factory and company brain. Each one is preselectable with `/contact?service=<slug>`.
- The page keeps its foundation, build-on-it and setup-card grouping.
- Real-path check: I ran `next start` with `RESEND_API_KEY` empty and posted `service: "company-brain"` to `/api/contact`. It returned `{"success":true}`, and the server logged the label "A company brain our team and AI can use".
- Not driven in a browser: opening the dropdown by hand.
- Left as is: old "six" copy in `src/content/home.ts` (`SERVICES_HEAD`). It feeds only the unused `components/home/service-grid.tsx`, so nothing renders it.
