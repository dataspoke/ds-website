# Industry pages: hub, law firms, home services

Run against a production build: `npm run build && npm run start -- -p 3120`.
Run the page scenarios at 375px and 1280px wide.

## a. Page basics

For each of `/industries`, `/industries/law-firms` and `/industries/home-services`:

1. Open the page.
2. Expect the document to be no wider than the viewport (no horizontal scroll).
3. Expect exactly one H1 and a visible breadcrumb: "Home > Industries", plus the industry name on an industry page.
4. On the two industry pages, expect a "Last updated" date.
5. On the two industry pages, expect the FAQ questions to be visible and all closed. Open the first question and expect its answer to show.
6. Save a screenshot of the page at each width.

## b. Structured data

1. Parse every `script[type="application/ld+json"]` on each page.
2. Expect `/industries` to have BreadcrumbList and ItemList.
3. Expect each industry page to have BreadcrumbList, Service (with `audience` of type BusinessAudience) and FAQPage.
4. Expect the FAQPage question names to equal the visible FAQ questions, in the same order.

## c. Links in

1. At 1280px, open `/` and click Industries in the header. Expect to land on `/industries`.
2. At 375px, open `/`, open the menu, click Industries. Expect to land on `/industries`.
3. On `/`, click the Law firms and Home services cards under "Who we work with". Expect `/industries/law-firms` and `/industries/home-services`.
4. On `/`, expect the footer to list Industries, Law firms and Home services, each linking to its page, and each page to answer 200.
5. On each of `/services/capture`, `/services/organize`, `/services/metrics-dashboards`, `/services/custom-software`, `/services/ai-implementation` and `/services/analytics-data-science`, expect a sentence "We build this for ..." that links to the matching industry page(s), and each link to answer 200.

## d. Copy rules

On the rendered text of the three pages, expect:

1. No "small" (any case).
2. No phone number.
3. No US state names (at least Connecticut and New York).
4. No "$".
5. No "receptionist" or "answering".
6. No link with `/work` in its href.

## e. Machine-readable files

1. Expect `/sitemap.xml` to list `/industries`, `/industries/law-firms` and `/industries/home-services`.
2. Expect `/llms.txt` to contain an "## Industries" section.
3. Expect `/industries/nope` to return 404.
