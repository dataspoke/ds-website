# Industry pages: home line, hub and five industry pages

Run against a production build: `npm run build && npm run start -- -p 3140`.
Run the page scenarios at 375px and 1280px wide.

Industry pages: `/industries/law-firms`, `/industries/home-services`, `/industries/gyms-and-fitness`, `/industries/health-and-wellness` and `/industries/manufacturing`.

## a. Home page

1. Open `/`.
2. Expect one plain line, just above the FAQ: "We've worked with law firms, home service companies, gyms, health and wellness brands, manufacturers and government teams, in both B2B and B2C." followed by a "See the industries" link.
3. Click "See the industries". Expect to land on `/industries`.
4. Expect no "Who we work with" section and no industry cards on the home page.

## b. Navigation

1. At 1280px, open `/`. Expect no Industries link in the header.
2. At 375px, open `/`, open the menu. Expect no Industries link in the menu.
3. On `/`, expect the footer to list Industries, Law firms, Home services, Gyms and fitness, Health and wellness and Manufacturing, each linking to its page, each page to answer 200, and `/industries` to appear exactly once in the footer.

## c. Hub

1. Open `/industries`.
2. Expect the H1 "Industries we've worked in".
3. Expect six cards in this order: Law firms, Home services, Gyms and fitness, Health and wellness, Manufacturing, Government.
4. Expect the first five cards to link to their industry pages, and the Government card to have no link.
5. Expect the "Not on the list?" section and the call to book a free AI strategy call.

## d. Page basics

For `/industries` and each industry page:

1. Open the page.
2. Expect the document to be no wider than the viewport (no horizontal scroll).
3. Expect exactly one H1 and a visible breadcrumb: "Home > Industries", plus the industry name on an industry page.
4. On each industry page, expect a "Last updated" date.
5. On each industry page, expect six FAQ questions, visible and all closed. Open the first question and expect its answer to show.
6. Save a screenshot of the page at each width.

## e. Structured data

1. Parse every `script[type="application/ld+json"]` on each page.
2. Expect `/industries` to have BreadcrumbList and ItemList, with the ItemList naming only the five industry pages.
3. Expect each industry page to have BreadcrumbList, Service (with `audience` of type BusinessAudience) and FAQPage.
4. Expect the FAQPage question names to equal the visible FAQ questions, in the same order.

## f. Service pages

On each of `/services/capture`, `/services/organize`, `/services/metrics-dashboards`, `/services/custom-software`, `/services/ai-implementation` and `/services/analytics-data-science`, expect a short sentence "We've built this for ..." that links to the matching industry page(s), and each link to answer 200.

## g. Copy rules

On the rendered text of `/industries` and the five industry pages, expect:

1. No "small" (any case).
2. No phone number.
3. No US state or city names (at least Connecticut and New York).
4. No "$".
5. No "receptionist", "answering", "after-hours" or "missed call".
6. No "deepest".
7. No "HIPAA", "FDA" or "compliance".
8. No "ServiceTitan", "Housecall" or "Jobber" outside the two statistic sources on the home services page.
9. No link with `/work` in its href.

## h. Machine-readable files

1. Expect `/sitemap.xml` to list `/industries` and all five industry pages.
2. Expect `/llms.txt` to contain an "## Industries we've worked in" section that lists the five industry pages and Government with no link.
3. Expect no "deepest" in `/`, `/industries` or `/llms.txt`.
4. Expect `/industries/nope` to return 404.
