# Competitor teardown: who beats DataSpoke in the target searches (2026-11-10)

Scope: the home page plus the best-ranking page of 5 consultancies that outranked DataSpoke in the target searches. Pages were fetched with curl on 2026-11-10. Schema counts come from each page's JSON-LD. Word counts are approximate and include navigation. Companion to `2026-11-10-site-audit.md`. Read-only.

## What to build (the short answer)

1. **An `/industries` hub and two pages: `/industries/law-firms` and `/industries/home-services`.** Each needs a definition sentence at the top, 4 to 6 named problems, what gets built, sourced industry figures, anonymized proof, an industry FAQ, and BreadcrumbList, Service and FAQPage schema. Link them from the nav, the footer, the home page and `/services`. This is what every winner has and DataSpoke lacks.
2. **Later, once the industry pages are live: one page per integration pair you have actually built**, such as Clio + QuickBooks or Lawmatics + RingCentral. Mpire ranks for "Clio reporting" this way.
3. **Do not copy the winners' lead offer.** Their law firm and home services pages sell after-hours call answering and missed-call text-back. That is off-limits for DataSpoke. Compete on what they skip: connected records, a weekly scorecard, and ad spend traced to paid jobs or signed cases.

## The 5 competitors

### 1. Elite AI Advantage (eliteaiadvantage.com): site down

- **Status:** every URL returns 404 `"Application not found"` from its host, Railway. The robots.txt and sitemap.xml also return 404. Search engines still rank the cached `/ai-consulting` page for both "AI consultant for law firms" and the HVAC/plumbing query.
- **From search snippets only (not verified on the page):** one AI consulting page with industry "tracks". The law firm track promises to protect privilege and keep partners out of sanction headlines. The field-services track covers HVAC, plumbing, electrical, roofing, pest control and landscaping firms that measure margin per job. It also has a `/how-to/` question library, such as how general contractors predict schedule slippage.
- **Lesson:** one page with a clear, named audience list ranked for two verticals. Its rankings will fade while the site is down, which opens room for DataSpoke.

### 2. Justin Harris AI Consulting (justinharris.ai): ranks for "AI consultant for home service businesses"

| | Home page | `/industries/home-services/` (the ranking page) |
|---|---|---|
| Title | "Las Vegas AI Consultant for Small Business - Justin Harris" | "Las Vegas AI for Home Services: Stop Losing Paid Leads" |
| H1 | "AI Consultant in Las Vegas" | "AI for Home Services Las Vegas \| AI Consulting" |
| Words | ~1,950 | ~1,370 |
| Schema | ProfessionalService + LocalBusiness, OfferCatalog (7 Services), Person (with credential), WebSite, SiteNavigationElement, FAQPage (15 questions) | Same set, plus BreadcrumbList and FAQPage (4 questions) |

- **Who they serve:** an `/industries/` hub with 17 pages at `/industries/<slug>/`: accounting, automotive, construction, dental, financial advisors, fitness, home services, hospitality, insurance, law firms, medical, professional services, property management, real estate, staffing and veterinary. Every industry page links to all the others, and the home page links to the main six.
- **Page structure:**
  1. A hook ("$80 per lead. Straight to voicemail.").
  2. One entity sentence: "[Name] installs AI for home services companies in [city], including [4 named services] for HVAC, plumbing, and roofing."
  3. "Last updated [date]".
  4. Client logos.
  5. A problem story (the AC breaks on a Saturday in July).
  6. A local-climate paragraph.
  7. Four statistics, each with its source and year.
  8. "What I build for you" (5 product cards).
  9. A list of services for the industry.
  10. Reviews ("5.0 across 17 Google reviews").
  11. The FAQ.
  12. A 30-minute consultation CTA.
- **What AI answers would quote:** the entity sentence, written almost word for word for an answer box. The 4 sourced statistics. FAQ questions phrased the way people search ("What is AI quote follow-up for HVAC and plumbing companies?"). The law firm page adds a "What Is AI for Law Firms?" definition heading.
- **Weak points:** everything is Las Vegas–local. The lead offer is call answering and missed-call text-back. It publishes prices.

### 3. PaperStreet (paperstreet.com): ranks for "AI consultant for law firms" and "law firm CRM integration consultant"

| | Home page | `/ai-automation-custom-software-consulting-for-law-firms/` |
|---|---|---|
| Title | "Law Firm Web Design & Attorney Website Design \| Lawyer Marketing: PaperStreet" (77 characters) | "AI, Automation & Custom Software Consulting for Law Firms - PaperStreet" (71 characters) |
| H1 | "Law Firm Web Design & Attorney Internet Marketing" | "AI, Automation & Custom Software Consultation for Law Firms" |
| Words | ~2,040 | ~1,690 |
| Schema | WebPage, BreadcrumbList, WebSite, Organization, ProfessionalService (Yoast default) | Same; no FAQPage, no Service |

- **Who they serve:** the whole site is about law firms. Every URL carries "law firm" or "lawyer". It has about 50 `/areas-served/<state>-law-firm-marketing/` pages, "best \<practice area\> lawyer websites" pages, and a "21 law firm CRM & case management systems" review guide. That guide ranks for the CRM query.
- **Page structure:**
  1. Problem: "Most law firms don't have a software problem, but a workflow problem."
  2. A bulleted list of 7 symptoms.
  3. "We help law firms build smarter systems".
  4. "Potential solutions": 6 named solutions, including intake-to-CRM connectors, lead routing and custom dashboards.
  5. Start with an AI & Automation Assessment.
  6. "Our 7 Guarantees".
  7. CTA: "Book an AI Consultation".
- **What AI answers would quote:** the symptom list and the named solution list, which are clean nouns. Topical authority comes from 20 years of law-firm-only content.
- **Weak points:** no FAQ and no Service schema. AI consulting is a side line for a marketing agency. Integration work is billed hourly.

### 4. Mpire Solutions (mpiresolutions.com): ranks for "data consultant for law firms Clio reporting"

| | Home page | `/lp/clio-integration/clio-trello-integration/` |
|---|---|---|
| Title | "Custom Software Development Company \| Mpire Solutions" | "Clio Trello Integration – Mpire Solutions" |
| H1 | "Custom Software Development for Startups, Mid-Market & B2B Enterprises" | "Clio Trello Integration for AmLaw 200 Firms" |
| Words | ~810 | ~1,330 (heavy mega-menu) |
| Schema | WebSite, Organization, OfferCatalog (4 Services), AggregateRating, ContactPoint | Same site-wide block; no FAQPage, even though the page has a visible FAQ |

- **Who they serve:** not by industry. They target integration pairs instead: `/lp/clio-integration/clio-<tool>-integration/` for Trello, QuickBooks, Gmail, Dropbox, Google Drive and Clio Grow, plus dozens of HubSpot-\<tool\> and n8n pages. Five of their Clio pages filled the top results for the Clio query.
- **Page structure:**
  1. A statistic in the hero ("12 billable hours per week" lost).
  2. Count badges (500+ projects, 100+ companies, 15+ years).
  3. Review-star badges.
  4. Three pain cards (billing gaps, workflow breakdown, data risk).
  5. Services.
  6. Success stories.
  7. The FAQ ("What does Clio integration mean?").
  8. CTA.
- **What AI answers would quote:** "What does Clio integration mean?" answered in a definition sentence. Statistics such as "77% of lawyers rely on email for project management". All of them are unsourced.
- **Weak points:** templated, near-duplicate pages that look like a software shop's, not a law firm specialist's. No FAQ schema.

### 5. OneWave AI (onewave-ai.com): ranks for the HVAC/plumbing AI automation query

| | Home page | `/ai-consulting-small-business` |
|---|---|---|
| Title | "AI Consulting, Implementation & Team Training" | "AI Consulting for Small Business \| OneWave AI" |
| H1 | "AI that works across your business." | "AI Consulting for Small Business. No Enterprise Budget Required." |
| Words | ~3,120 | ~1,990 |
| Schema | Organization, Person ×2, ProfessionalService, OfferCatalog (3 Services), WebSite, FAQPage (6 questions) | Same, plus BreadcrumbList and FAQPage (6 questions) |

- **Who they serve:** one `/industries` page with 5 broad cards (SaaS & tech, professional services, healthcare, financial services, manufacturing & ops). None are separate URLs. The HVAC ranking comes from blog posts, such as an AI phone agents guide with an HVAC story and an "AI for construction" post, not from an industry page.
- **Page structure:**
  1. A hero with 3 figures (nationwide, 30 days to ROI, 10–200 employees).
  2. A philosophy section (train people first).
  3. "Why … need AI now", with one sourced statistic.
  4. "What AI consulting actually looks like", as a week-by-week plan.
  5. Results with G2 quotes.
  6. Tech stack.
  7. The FAQ.
  8. CTA: "Book a Free Strategy Call".
- **What AI answers would quote:** the week-by-week process, FAQ answers about cost, size and ROI, and partner badges (Anthropic and OpenAI partner).
- **Weak points:** no real industry pages. The HVAC ranking leans on its blog.

## What they do that DataSpoke doesn't, ranked by likely impact

1. **One URL per industry, linked site-wide** (Justin Harris: 17 pages; PaperStreet: a single-industry site). DataSpoke has none, so it cannot match "for law firms" or "for home services" searches.
2. **A definition sentence at the top of each page.** For example: "[Firm] does [named services] for [industry], including [3–4 concrete things]." AI answers lift this sentence. DataSpoke's pages open with benefit copy instead.
3. **Industry figures with a source and year** (Justin Harris: 4 sourced statistics; Mpire and OneWave: hero figures). DataSpoke has almost no figures.
4. **Proof blocks:** review counts and stars, count badges, partner badges and logos. DataSpoke can't name clients. It can show anonymized outcomes by industry, and review counts once a Google Business Profile or Clutch profile has reviews.
5. **FAQs phrased the way people search inside the industry** ("What is AI intake automation for law firms?"). DataSpoke's FAQs are by service, not by industry.
6. **Pages for each integration pair** (Mpire). These win long-tail system searches such as "Clio reporting" and "Clio QuickBooks integration".
7. **BreadcrumbList and OfferCatalog schema** (Justin Harris, OneWave). DataSpoke has neither.
8. **"Last updated" dates on the page** (Justin Harris). This is a freshness signal for AI answers.
9. **Not worth copying:**
   - **Local and state pages** (PaperStreet, Justin Harris): DataSpoke is nationwide, and 50 state pages would be thin.
   - **Published prices** (Justin Harris): against the copy rules.
   - **The call-answering offer:** against the copy rules.

## Recommendations for the two pages

Shared rules:
- Nationwide.
- No phone number, no prices and no client names.
- Never use the word "small".
- No receptionist or answering-service offer.
- Name only systems DataSpoke has actually connected.
- Write all copy fresh; nothing is lifted from competitors.

### `/industries/law-firms`

- **Title (36 chars):** `AI and Data Consulting for Law Firms` → "AI and Data Consulting for Law Firms | DataSpoke"
- **Meta description (about 150 characters):** "We connect Clio, Lawmatics, your phones and accounting, then build intake dashboards and AI your lawyers approve. Nationwide. Free AI strategy call."
- **H1:** "AI and data consulting for law firms: every lead, call and matter in one place you own."
- **Outline:**
  1. **Definition paragraph:** "DataSpoke is a data and AI consulting firm for law firms across the United States. We connect practice management, intake CRM, phones and accounting, build dashboards for intake and revenue by case type, and set up AI that drafts from your own files, with a lawyer approving every word." Add "Last updated [date]" under it.
  2. **"Where firms lose cases and hours":** 5 problems, each in one line:
     - A lead sits in an inbox overnight.
     - Intake data is retyped into the case system.
     - Nobody can say which ad source signs cases.
     - Partners argue over whose report is right.
     - Decisions made on calls are lost.
  3. **"What we build":** 4 cards that map to existing services:
     - Intake-to-matter connection (Capture).
     - One record per client and matter (Organize).
     - A weekly intake and revenue scorecard (Metrics & Dashboards).
     - AI on your own files, lawyer-approved (AI Implementation).

     Link each card to its service page.
  4. **"Systems we connect for firms":** lead with Clio and Lawmatics; Nick has built on both for law firms (confirmed 2026-11-10). Then list RingCentral, Zoom, Fathom, QuickBooks, Google Workspace, Google Ads and Meta Ads, which are on the current systems list.
  5. **"By the numbers":** 2 to 3 industry figures from a primary source, such as Clio's Legal Trends Report, with source and year. Add 1 to 2 of DataSpoke's own anonymized outcomes ("a law firm: leads reach the CRM in under a minute").
  6. **"How it works":** free AI strategy call → written estimate within two business days → fixed-scope build → hand-over. Link to `/approach`.
  7. **FAQ** (6 questions, with FAQPage schema).
  8. **CTA:** "Book your free AI strategy call".
- **FAQ topics:**
  1. What does an AI and data consultant do for a law firm?
  2. Can you connect Clio (or Lawmatics) to our intake forms, phones and accounting?
  3. How do we see which marketing source signs cases?
  4. How do you keep client data confidential when we use AI? (Data stays in accounts the firm owns; a lawyer approves every draft.)
  5. Do we have to replace our case management software? (No.)
  6. How do we start? (The free AI strategy call; no price is quoted.)
- **Schema:**
  - BreadcrumbList: Home › Industries › Law firms.
  - Service: `serviceType` "AI and data consulting", `audience` BusinessAudience "Law firms", `areaServed` United States, `provider` the Organization by `@id`.
  - FAQPage, matching the visible FAQ.
  - Optionally, `hasOfferCatalog` listing the 4 services by name, with no prices.

### `/industries/home-services`

- **Title (40 chars):** `AI and Data Consulting for Home Services` → "AI and Data Consulting for Home Services | DataSpoke"
- **Meta description (about 150 characters):** "Trace every ad dollar to a booked, paid job. We connect your CRM, ads, phones and accounting and build the weekly scorecard. Nationwide. Free AI strategy call."
- **H1:** "AI and data consulting for home service companies: trace every ad dollar to a paid job."
- **Outline:**
  1. **Definition paragraph:** "DataSpoke is a data and AI consulting firm for home service companies across the United States, including roofing, HVAC, plumbing and other trades. We connect your CRM, ad accounts, phones and accounting so every lead is counted, build a weekly scorecard your managers run on, and put AI to work on office busywork." Add "Last updated [date]".
  2. **"Where the money leaks":** 5 problems, each in one line:
     - A lead from an ad, the web form or a lead vendor sits until Monday.
     - Office staff retype leads into the CRM.
     - Ad reports count conversions sales can't find.
     - Close rate by source and by rep is a guess.
     - Month-end means exporting four reports.
  3. **"What we build":** 4 cards:
     - One front door for every lead (Capture).
     - Ad dollar to paid job tracking (Analytics & Data Science).
     - A weekly scorecard from the goal down to activity (Metrics & Dashboards).
     - Internal tools and a customer portal on systems you already pay for (Custom Software).
  4. **"Systems we connect":** list only what DataSpoke has actually connected for home service clients. Lead with Salesforce, which Nick has built on for home service companies (confirmed 2026-11-10). Then list the ad, phone and accounting systems from the current list (Google Ads, Meta Ads, RingCentral, QuickBooks) only where they were part of home services work. Do not list ServiceTitan, Housecall Pro or Jobber; DataSpoke has not built against them.
  5. **"By the numbers":** 2 to 3 industry figures from a primary source, with source and year. Add the anonymized roofing outcomes from the case studies: "a roofing contractor: web and agency leads reach the CRM in under a minute; nobody retypes them."
  6. **"How it works":** the same block as the law firm page, linked to `/approach`.
  7. **FAQ** (6 questions).
  8. **CTA:** "Book your free AI strategy call".
- **FAQ topics:**
  1. What does an AI and data consultant do for a home service company?
  2. How do we tell which ads produce booked and paid jobs?
  3. Can you work with the field-service software and CRM we already use?
  4. What belongs on a weekly scorecard for a trades business?
  5. Do our office staff need to be technical? (No.)
  6. How do we start? (The free AI strategy call.)
- **Schema:** the same as the law firm page, with `audience` "Home service businesses".
- **Later:** add a `/industries/home-services/roofing` sub-page backed by the three roofing case studies, once `/work` is approved again.

### Hub and linking

- **`/industries`:** a short hub with title "Industries we serve" and one card per industry. Gyms with several locations can be the third card; two case studies back it. Use ItemList and BreadcrumbList schema.
- **Links in:**
  - Add "Industries" to the nav in `src/lib/constants.ts` `NAV_ITEMS`.
  - Add both pages to the footer column proposed in the site audit.
  - Add a home page section: "Who we work with".
  - Add a sentence on each service page that links the relevant industry.
  - Add an `## Industries` section to `llms.txt`.
  - Add the pages to the sitemap; the sitemap thread's `sitemap.ts` must include `/industries/*`.
- **Size:** about 1,300 to 1,800 words per industry page, in line with the winning pages (1,330 to 1,990) and the current service pages (about 1,750).

## Sources

- Fetched with curl on 2026-11-10: justinharris.ai (home, `/industries/home-services/`, `/industries/law-firms/`); paperstreet.com (home, `/ai-automation-custom-software-consulting-for-law-firms/`); mpiresolutions.com (home, `/lp/clio-integration/clio-trello-integration/`); onewave-ai.com (home, `/ai-consulting-small-business`, `/industries`).
- eliteaiadvantage.com: 404 "Application not found" on every URL. Its description above comes from search-result snippets only.
- Ranking pages were identified with domain-restricted web searches for each target query.
