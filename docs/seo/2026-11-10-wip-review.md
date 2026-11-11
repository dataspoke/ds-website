# Site work-in-progress review (2026-11-10)

## TLDR

1. **Take /work down.** Five of the six case studies are held back until clients approve them, so the page shows one entry. That entry is Nick's own business, not a client's. Five of the six service filters say "No case studies for this service yet." Every service page also links there as "See what we've built for other businesses". Steps are in section 2.
2. **Remove Connecticut and New York everywhere a visitor sees them.** They appear in the footer on every page, the link-share image, the homepage Google description, the About page, the Contact page and the free-estimate FAQ. About 12 places in all, fixed mainly by editing 3 constants.
3. **Remove "small" in two live places.** The privacy page and the free-estimate FAQ both say "We're a small team".
4. **Nothing else looks unfinished.** I found no lorem ipsum, TODOs, "coming soon" text, broken internal links or old prices (the $999 Assessment price is gone). Home-page sample data is labelled illustrative (the use-case tabs dropped their visible label on 2026-11-11, Nick's call; screen-reader labels still say "Sample chart"). `/insights` is empty, but it is already hidden from the nav and from Google.
5. **Behind the scenes:** the structured data still carries a phone number and a Durham, CT address. Some unused old home-page code still holds the Connecticut copy. Neither is visible, but both conflict with the rules.

**Method:** I read every route under `src/app`, the content files, the nav, the footer, the sitemap config and `llms.txt`. I grepped for placeholders, prices, place names and the banned words. I checked that every internal link and anchor resolves to a route or an `id` in the repo. The review covers the repo at this branch; I did not compare it against the live deployed site.

---

## 1. Findings, ranked by how bad they look to a visitor

| # | Page | File:line | What's wrong | Fix |
|---|---|---|---|---|
| 1 | /work | `src/app/work/page.tsx`, `src/content/case-studies.ts:8-14` | Only 1 of 6 case studies is public. The only entry is "The system I run my own business on", which is the founder's own business. The page title promises "What this looks like in a real business." | Take the page down. See section 2. |
| 2 | /work?line=… | `src/components/work/line-filter.tsx:19-31`, `src/components/work/copy.ts:17` | The page has six service filters. Five of them show "No case studies for this service yet. Here is everything else." | Removed with /work. |
| 3 | Every service page and /services | `src/content/services.ts:530`, rendered at `src/app/services/[line]/page.tsx:125` and `src/app/services/page.tsx:75` | The link "See what we've built for other businesses →" leads to a page with no client work. | Remove the link while /work is down. |
| 4 | Every page (footer) | `src/lib/constants.ts:31` (`SERVICE_AREA`), rendered at `src/components/layout/footer.tsx:21` | "Based in Durham, Connecticut. Serving CT, NY and clients across the US." This breaks the nationwide rule on every page. | Change `SERVICE_AREA` to "Serving clients across the United States." `llms.txt` (`route.ts:37`) uses the same constant, so it is fixed too. |
| 5 | Every link shared on LinkedIn, Slack or text | `src/app/opengraph-image.tsx:46` | The share card reads "Durham, CT · serving CT, NY and the US." | Change to "Serving businesses across the US." or drop the line. |
| 6 | Home (Google result) | `src/lib/constants.ts:8` (`SITE_DESCRIPTION`) | The home meta description says "business owners in CT, NY and across the US". It also feeds the Organization JSON-LD and `llms.txt`. | "Data and AI consulting for business owners across the US. We connect tools, automate busywork and show your numbers. Free AI strategy call." |
| 7 | /about | `src/app/about/page.tsx:14`, `:16`, `:71` | The title is "About Nick Paul, DataSpoke founder in Durham, CT". The meta and lede both lead with Durham, Connecticut, CT and NY. | Title: "About Nick Paul, DataSpoke founder". Lede: "DataSpoke works with businesses across the US." Keep the rest. |
| 8 | /contact | `src/app/contact/page.tsx:13`, `:78` | The meta says "with DataSpoke in Durham, CT". The page shows "· Durham, CT · Serving CT, NY and clients nationwide". | Drop "in Durham, CT" from the meta. Change the line to "LinkedIn · Serving clients nationwide". |
| 9 | /free-estimate and /lp/free-estimate | `src/content/free-estimate.ts:83` | The FAQ "Who is this for?" ends "We work with companies in Connecticut, New York and across the United States." This also goes into the FAQPage JSON-LD. | "We work with companies across the United States." |
| 10 | /free-estimate and /lp/free-estimate | `src/content/free-estimate.ts:94` | "We're a small team." This breaks the no-"small" rule. | Delete the sentence. The answer still reads correctly. |
| 11 | /privacy | `src/content/privacy.ts:12` | "DataSpoke is a small team." | "This page says what DataSpoke collects on this site and what we do with it." |
| 12 | /services/ai-implementation | `src/content/services.ts:521-522`, `src/components/services/related-case-studies.tsx` (rendered at `[line]/page.tsx:88`) | "Related work: Where we've done this before" shows the founder's own business as the only card. It also links into /work. | It is hidden automatically once /work is down (see section 2, step 5). |
| 13 | /services/capture | `src/content/services.ts:43` | Lead Flow promises "A phone line that can take intake questions and route the call when nobody can pick up." This reads as an AI answering service. | Cut the line, or use "Missed calls logged in the CRM with a text-back, so no caller is lost." |
| 14 | /approach and /services (Assessment block) | `src/content/approach.ts:15` | The sample scorecard is labelled "Example scorecard: home-services company". It doesn't say the scores are invented. | "Illustrative example: home-services company (sample scores)". |
| 15 | /about, /work/back-office-on-autopilot | `src/app/about/page.tsx` (whole page), `src/content/case-studies.ts:173-210` | These pages use "I" voice. The rest of the site uses "we". A first-person founder page is normal, so this is a judgement call, not an error. | Keep /about in "I". The case study goes away with /work. |
| 16 | /insights (direct URL only) | `src/app/insights/page.tsx:27` | It shows "No posts yet." It is already `noindex`, left out of the nav (`src/lib/nav.ts`) and left out of the sitemap. Only someone who types the URL sees it. | No action needed. Optionally `notFound()` while there are no posts. |

### Not visible to visitors, but conflicting with the rules

| # | File:line | What's wrong | Fix |
|---|---|---|---|
| 17 | `src/components/shared/json-ld.tsx:50-51`, `:79`, `:86-88` (homepage Organization JSON-LD) | `areaServed` lists Connecticut and New York. `contactPoint.telephone` is the phone number (`CONTACT_PHONE`, `src/lib/constants.ts:11`). `address` is Durham, CT. | Set `areaServed` to the United States only. Remove `telephone`. Keep `addressCountry: "US"` only, or drop `address`. |
| 18 | `src/lib/metadata.ts:89-90` | The keywords include "data consultant Connecticut" and "data consultant New York". | Remove them. |
| 19 | `src/content/home.ts:10`, `:113`, `:143-150`; `src/components/home/{hero,home-faq,featured-work,service-grid,tools-strip}.tsx` | This is the old home page. Nothing on the live site renders it (the live home is `home-a`), but it still holds Connecticut copy and a "Read all the case studies" link to /work. A later edit could revive it. | Delete the unused exports and components in a cleanup PR. `HERO.outcomes`, `CREDENTIALS`, `TOOLS` and `PROOF_LINE` are still used, so keep those. |

### Checked and clean

- I found no lorem ipsum, TODO, FIXME, "coming soon" or TBD in page copy.
- No dollar price is quoted anywhere. The $999 Assessment price was removed in `b85a9f6`, and every pricing answer points to the free AI strategy call. The "$1M in revenue" lines are audience qualifiers, not prices. The free-estimate JSON-LD `Offer price: "0"` correctly describes a free call.
- The home-page dashboards carry "Illustrative example · sample data" (`every-device.tsx:310`). The use-case tabs dropped it on 2026-11-11 (Nick: "It's obviously sample data").
- Every internal link resolves. That includes `/approach#assessment` (`src/components/home/assessment.tsx:9`) and the product anchors such as `#lead-flow` (`src/components/services/product-detail.tsx:28`).
- The LP pages under `/lp/*` are `noindex`, kept out of the sitemap and carry no nav. That is intended.
- There are no client names, no review quotes and no Upwork mentions. The About page's client examples are anonymous ("a law firm", "a home-services contractor").

---

## 2. Taking /work down cleanly

### Recommendation

Use a **temporary redirect (307)** from both URLs to **/about**. Gate everything else behind one flag. Keep the code and content so /work can come back when clients approve their case studies.

| URL | Action | Why |
|---|---|---|
| `/work` (and any `?line=`) | 307 → `/about` | A visitor who wants proof lands on /about. It carries the same evidence: three anonymous client examples, the "doubled my revenue" proof line and the background. |
| `/work/back-office-on-autopilot` | 307 → `/about` | /about already tells this story in short (`src/content/home.ts:22-25`, `ProofLine`). |

**Why not the alternatives:**
1. **`noindex` alone:** visitors still reach the thin page from bookmarks, LinkedIn posts and the old links. This fixes Google's view, not the visitor's.
2. **404:** links Nick has already shared would land on an error page, and any link value is lost.
3. **Permanent 301/308:** browsers cache permanent redirects hard. When /work comes back, repeat visitors could keep landing on /about. A 307 is honest that the page is coming back, and Google drops a 307 target from the index after a while anyway.

If /work will **not** come back within about three months, switch both to permanent (308) instead.

### Steps (one PR)

1. **Add a flag.** Add `export const WORK_PUBLISHED = false;` to `src/lib/constants.ts`.
2. **Add the redirects** in `next.config.ts`:
   ```ts
   async redirects() {
     return WORK_PUBLISHED ? [] : [
       { source: "/work", destination: "/about", permanent: false },
       { source: "/work/:slug*", destination: "/about", permanent: false },
     ];
   }
   ```
   `next.config.ts` can't import `@/` aliases, so import the flag with a relative path or repeat the value.
3. **Nav and footer.** Filter `{ label: "Work", href: "/work" }` (`src/lib/constants.ts:35`) out of `NAV_ITEMS` when the flag is off. The header and footer both render `navItems`, so this one change covers both.
4. **Service page links.** Hide the `LINE_PAGE.workLink` link at `src/app/services/[line]/page.tsx:125-129` and `src/app/services/page.tsx:75-79` when the flag is off.
5. **Related work block.** Return `null` from `RelatedCaseStudies` (`src/components/services/related-case-studies.tsx`) when the flag is off. This removes the founder-only card from /services/ai-implementation.
6. **Sitemap.** Done: `src/app/sitemap.ts` reads `WORK_PUBLISHED` and lists `/work` and `/work/*` only when it is true.
7. **llms.txt.** In `src/app/llms.txt/route.ts`, skip the "## Case studies" block (lines 86-88) and the `[Work]` page line (line 93) when the flag is off.
8. **Dead links.** Delete or ignore `WORK_HEAD.allLink` (`src/content/home.ts:113`). Only unused old home components render it (finding 19).
9. **Leave in place:** `src/app/work/*`, `src/components/work/*` and `src/content/case-studies.ts`. The redirect runs before the route, so these stay unreachable but ready.
10. **Verify after deploy.** Check these:
    - `curl -sI https://www.dataspoke.io/work` returns `307` with `location: /about`.
    - The same check passes for `/work/back-office-on-autopilot`.
    - The nav and footer show no Work link.
    - `/sitemap.xml` and `/llms.txt` contain no `/work`.
11. **Search Console (optional).** Use Removals → "Temporarily remove URL" for `/work` and `/work/back-office-on-autopilot` to drop them from results faster.

### Bringing it back

Remove client slugs from `AWAITING_CLIENT_OK` (`src/content/case-studies.ts:8`) as each client approves. Then set `WORK_PUBLISHED = true`. I recommend relaunching only when at least three client studies are public, covering at least three of the six services, so most filters are not empty.
