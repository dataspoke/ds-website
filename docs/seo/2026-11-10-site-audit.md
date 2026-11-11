# DataSpoke site audit: technical SEO and AI search (2026-11-10)

Scope: 21 live URLs on https://www.dataspoke.io, checked with curl on 2026-11-10, plus the repo at `5fe75f0` (origin/main). One page per template got a deep check. Read-only; no site code changed.

Known and in progress elsewhere, so not reported again: service page titles, H1s and slugs; the /work takedown; Connecticut/NY copy; "small team"; phone and address in JSON-LD; LEAD_FLOW answering-line copy (see `2026-11-10-service-pages.md` and `2026-11-10-wip-review.md`).

## Summary

1. The live `sitemap.xml` and `robots.txt` are the stale files committed in `public/`, not the build output, so the sitemap still lists two `/work` URLs that 307 to `/about`, and no future page will ever reach it.
2. The site never says "home services" or "law firms" on the home page or the services pages, so it cannot rank or be cited for the two verticals it sells to. This is the largest gap.
3. In all 8 target searches, DataSpoke did not appear. Small agencies, directories and listicles win them, and the vertical queries (HVAC/plumbing AI, ServiceTitan dashboards, Clio reporting) have weak competition.
4. Search engines still hold the old copy (Connecticut, a $999 Assessment). A brand search for "DataSpoke" resolves to a different firm, DataSpoc, on Clutch.
5. The technical base is sound: HTTPS and www redirects are permanent, a random URL returns a real 404, content is in the server HTML, canonicals are correct, landing pages are noindex, and every AI crawler is allowed.

## Problems, by impact

Priority: 1 = blocks Google or AI from finding or indexing money pages; 2 = limits ranking or citation; 3 = minor.

| Priority | Effort (h) | Area | Problem | Exact fix | Example URL |
|---|---|---|---|---|---|
| 1 | 2 | Sitemap / robots | Live `sitemap.xml` is byte-identical to the committed `public/sitemap.xml` (last changed Nov 3). The `next-sitemap` postbuild output is not what Vercel serves. Result: the sitemap lists `/work` and `/work/back-office-on-autopilot`, which 307 to `/about`, and new pages (such as the industry pages below) will never be added. `scripts/indexnow.mjs:20` also reads this stale file, so IndexNow submits redirecting URLs. | Replace `next-sitemap` with Next's built-in `src/app/sitemap.ts` and `src/app/robots.ts`. Port the exclude list and `lastmodFor()` from `next-sitemap.config.js:103-150`. Delete `public/sitemap.xml` and `public/robots.txt` from git, and drop the `postbuild` script in `package.json`. Point `scripts/indexnow.mjs:20` at the live `/sitemap.xml`. After deploy, check that the live sitemap has 13 URLs and no `/work`. | https://www.dataspoke.io/sitemap.xml |
| 1 | 8 | Content / AI search | No page targets the two verticals. "law firm", "home service", "HVAC", "plumbing" and "contractor" appear 0 times on `/`, `/services` and `/services/capture`. They appear only in passing on `/about`. Google and AI answers cannot match DataSpoke to "AI consultant for law firms" or "AI consultant for home service businesses". | Add two indexable pages: `/industries/law-firms` and `/industries/home-services`, with a new route `src/app/industries/[slug]/page.tsx` and content in `src/content/industries.ts`. Each page needs a definition-first opening paragraph, the systems actually connected for that industry, the 3 problems solved, an FAQ of 6 questions with `FaqPageJsonLd`, and `ServiceJsonLd` with an `audience`. Link both from the home page, `/services`, the footer and `llms.txt`. Draft copy is below the table. | https://www.dataspoke.io/ |
| 1 | 0.5 | Indexing | Search engines still show the old copy: a search restricted to dataspoke.io returns "based in Durham, Connecticut" and "a fixed $999" Assessment. Both were removed from the site. | After the sitemap fix ships, run `npm run indexnow`. In Search Console, run URL Inspection and click "Request indexing" for `/`, `/about`, `/services`, `/free-estimate` and the six service pages. | https://www.dataspoke.io/about |
| 2 | 2 | Entity / brand | A search for "DataSpoke" AI consulting returns `clutch.co/profile/dataspoc`, a different firm. dataspoke.io does not appear for its own name. The `sameAs` list (`src/components/shared/json-ld.tsx:56`) names Clutch and GoodFirms profiles that could not be confirmed (both return 403 to scripts). | Open the Clutch and GoodFirms profiles in a browser and confirm they exist, are complete and link to www.dataspoke.io. Remove any that do not exist from `sameAs`. Create a Google Business Profile as a service-area business with the address hidden, and add its URL to `sameAs`. Use the same one-sentence description on every profile. | https://clutch.co/profile/dataspoke |
| 2 | 1 | Structured data | `ServiceJsonLd` (`src/components/shared/json-ld.tsx:130`) outputs only name, description, URL, provider and areaServed. It has no `serviceType` and no `audience`, so AI answers cannot tie a service to an industry. | Add `serviceType` (for example "CRM integration", "KPI dashboard consulting", "AI implementation consulting") and `audience: {"@type": "BusinessAudience", "audienceType": "Home service businesses; law firms"}` to `ServiceJsonLd`. Keep `offers` out, since prices are not published. | https://www.dataspoke.io/services/metrics-dashboards |
| 2 | 1 | AI quotability | Service pages open with outcome copy ("Know your numbers every Monday…") but no plain definition sentence of what DataSpoke does, for whom and where. AI answers lift the first clear "X is a Y that does Z" sentence on the page. `llms.txt` has no industries section. | Open each service page and each new industry page with one sentence that follows this pattern: "DataSpoke is a data and AI consulting firm that [service] for home service businesses and law firms across the United States." Add an `## Industries` section to `src/app/llms.txt/route.ts` that links the two new pages. | https://www.dataspoke.io/services/capture |
| 2 | 1 | AI quotability | No facts that can be quoted. The pages hold no numbers, apart from "5 years" on `/about`. AI answers prefer pages that state concrete figures. | Add 3 to 5 verifiable, non-price facts to the home page and the industry pages. Examples: number of systems connected, typical hours of retyping removed per week, and lead-to-CRM time ("within minutes"). Use only figures you can stand behind, and name no clients. | https://www.dataspoke.io/ |
| 2 | 0.5 | On-page (home) | The home page H1 "Grow your business with data you already have." has no service or audience terms. The title is fine. | Keep the H1. Add a line directly under it in `src/components/home-a/hero.tsx` that names the service and the audience: "AI and data consulting for home service businesses and law firms, nationwide." | https://www.dataspoke.io/ |
| 3 | 0.5 | Internal links | The footer (`src/components/layout/footer.tsx:27`) repeats only the 4 main nav links. `/privacy` is in the sitemap but is linked only from the noindex `/lp/free-estimate`, so it is effectively orphaned. Service pages get no footer links. | Add a Services column (the six service pages, and later the two industry pages) and a Privacy link to `footer.tsx`. | https://www.dataspoke.io/privacy |
| 3 | 1 | Structured data | No `BreadcrumbList` anywhere. Service pages are two levels deep (Home › Services › page). | Add a `BreadcrumbJsonLd` export to `src/components/shared/json-ld.tsx` and render it in `src/app/services/[line]/page.tsx:47`, next to `ServiceJsonLd`. Do the same on the industry pages. | https://www.dataspoke.io/services/ai-implementation |
| 3 | 0.5 | Structured data | `/contact` has no JSON-LD. | Add a `ContactPage` block that references the Organization by `@id` (`https://www.dataspoke.io/#organization`) in `src/app/contact/page.tsx`. Use email only, no phone. | https://www.dataspoke.io/contact |
| 3 | 0.25 | Redirects | `http://dataspoke.io` takes 2 hops: 308 to `https://dataspoke.io`, then 308 to `https://www.dataspoke.io/`. All the other host variants take one hop. | Low impact, because both hops are permanent. Optional: submit the domain to the HSTS preload list. HSTS is already sent with a 2-year max-age; it needs `includeSubDomains; preload` added. Browsers then skip the http hop. | http://dataspoke.io |
| 3 | 0.25 | Meta | `/insights` sends `noindex, nofollow`. `nofollow` is not needed on an empty hub. | Change the robots setting in `src/app/insights/page.tsx` to `{ index: false, follow: true }`. | https://www.dataspoke.io/insights |
| 3 | 0.25 | Robots | `robots.txt` names GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot and PerplexityBot. Googlebot, Bingbot and Google-Extended are allowed only through `User-agent: *`. That works, but the file is unclear. `Host:` is a non-standard directive that Google ignores. | Name `Google-Extended` explicitly with `Allow: /` in the new `src/app/robots.ts`, and drop `Host:`. | https://www.dataspoke.io/robots.txt |
| 3 | 0.1 | Title | The `/about` title repeats the brand: "About Nick Paul, DataSpoke founder \| DataSpoke". `metadata.ts` appends " \| DataSpoke". | In `src/app/about/page.tsx:14`, set the title to "About Nick Paul, founder". | https://www.dataspoke.io/about |
| 3 | 0 | Alt text | No issue. The only image (the portrait on `/about`) has alt text. | None. | https://www.dataspoke.io/about |

### Checked and fine

- **Redirects:** `https://dataspoke.io` returns a single 308 to `https://www.dataspoke.io/`. `http://www` returns a single 308. A trailing slash returns a 308 to the URL without it.
- **404:** `/zzz-random-404` returns 404 directly, with no redirect first.
- **Meta descriptions:** all 9 indexable pages have unique titles and meta descriptions, from 116 to 153 characters.
- **Canonicals:** all self-referencing, on the `www` host.
- **H1s:** every page has exactly one H1.
- **Server HTML:** headings, FAQs, nav and service links are all in the server HTML, so nothing depends on JavaScript.
- **Landing pages:** the `/lp/*` pages are `noindex, nofollow`, are out of the sitemap and have self canonicals. That is correct for ad landing pages.
- **llms.txt:** present and accurate. It has the six services, no prices, no Connecticut and no `/work`. It needs an industries section; see the table.
- **JSON-LD:** it parses on every page. Organization is on the home page, Person on `/about`, Service and FAQPage on each service page, and Service, Offer and FAQPage on `/free-estimate`.

### Draft copy for the industry pages

This copy follows the copy rules: nationwide, no phone number, no prices, no client names and no answering-service claims. List only systems you have actually connected.

> **Law firms.** DataSpoke is a data and AI consulting firm for law firms across the United States. We connect your practice management, intake CRM, phone system and accounting so every call and lead lands on the right matter. We then build dashboards that show intake, conversion and revenue by case type, and set up AI that drafts from your own files with a lawyer approving every word. You own every account and every line of code.

> **Home service businesses.** DataSpoke is a data and AI consulting firm for home service companies across the United States. We connect your field-service software, CRM, phone system, ad accounts and accounting so you can trace every ad dollar to a booked and paid job. We then build a weekly scorecard your managers run the business from, and put AI to work on the busywork your office staff retype today.

## AI search findings

Method: 8 target searches plus a brand search, run through the web search tool (US results) on 2026-11-10. The tool summarizes results, so positions are order of appearance, not exact ranks.

| Query | Who is named | DataSpoke there? |
|---|---|---|
| AI consultant for home service businesses | 13labs.au, justinharris.ai, chatgpt.ca, idesignny.com (iPilot), mediaforce.ca, negodiuk-ai.pages.dev; also webfx.com, getjobber.com, housecallpro.com | No |
| AI consultant for law firms | lilachbullock.com, paperstreet.com, pghnetworks.com, phosailabs.com (a "best AI consulting firms for law firms" listicle), aisuperior.com, eliteaiadvantage.com, abajournal.com | No |
| AI automation consulting for HVAC plumbing contractors | eliteaiadvantage.com, enterprisedna.co, tryrobby.com, negodiuk-ai.pages.dev, onewave-ai.com, masterofcode.com, simprogroup.com | No |
| law firm CRM integration consultant | paperstreet.com, ascendix.com, ventionteams.com, eidebailly.com, natlawreview.com, lexisnexis.com, plus Fiverr and Upwork | No |
| CRM integration services for small business | sevenbrains, salesforce.com, oski.site (listicle), smackcoders.com, capsulecrm.com, kixie.com, businessnewsdaily.com | No |
| business dashboards KPI reporting consultant | fiverr.com, upwork.com, umbrex.com, klipfolio.com, autymate.com, centricdxb.com, datameaning.com | No |
| ServiceTitan dashboard reporting consultant | fiverr.com, plecto.com ("top ServiceTitan coaches and consultants" listicle), agencyanalytics.com, servicetitan.com, superpath.com, databox.com | No |
| data consultant for law firms Clio reporting | clio.com (Certified Consultants directory and blog), mpiresolutions.com, the LawNext directory, bestpracticify.co | No |
| Brand: "DataSpoke" AI consulting | clutch.co/profile/dataspoc (a different firm), then generic AI agencies | No. dataspoke.io appears only when the search is restricted to that domain, and that copy is stale. |

What this shows:

1. **Vertical pages win.** The pages that rank are "AI consulting for home services" and "AI consultant for law firms" landing pages, many of them thin or auto-generated. A real DataSpoke page for each vertical can compete. Generic "CRM integration" and "KPI dashboard consultant" searches go to Fiverr, Upwork and large vendors; skip those terms without a vertical angle.
2. **Directories and listicles feed AI answers.** Clio's Certified Consultants directory, the Plecto ServiceTitan roundup, phosailabs.com and Clutch recur. Recommendation: apply to the Clio Certified Consultant program, complete the Clutch profile, and pitch the listicle owners for inclusion. These are off-site actions with no code.
3. **Make the site quotable.** Open each page with a plain "DataSpoke is…" definition that names the industry and "United States". Keep the FAQ answers short and self-contained, since FAQPage is already in place. Add 3 to 5 concrete non-price figures. Keep entity data consistent: the same name, description, founder and `sameAs` on the site, LinkedIn, Clutch and the Google Business Profile.

## Search Console

Not checked, no access.

Run this query in Search Console:

1. Open Performance › Search results for the `dataspoke.io` property.
2. Set the date range to "Last 28 days".
3. Turn on Average position, open the Queries tab, then add the Pages tab.
4. Export the results.
5. Filter the export to rows with position from 5 to 15, then sort by impressions, highest first.

Or call the API: `searchanalytics.query` on `sc-domain:dataspoke.io` with `startDate` 2026-10-13, `endDate` 2026-11-09, `dimensions` `["query","page"]` and `rowLimit` 1000. Keep the rows where `5 <= position <= 15`, and sort by impressions, highest first. Also run URL Inspection on `/work` to confirm Google has dropped it.
