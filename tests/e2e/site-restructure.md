# Site restructure: hub and spokes

Run against a production build: `npm run build && npm run start -- -p 3120`.
Run every scenario at 375px and 1280px wide. On every page, the document must be no wider than the viewport (no horizontal scroll).

## a. Home to a booked call

1. Open `/`.
2. Click the Custom Software card in the services grid.
3. Expect to land on `/services/custom-software`.
4. Click the first case study in "Where I've done this before".
5. Expect to land on `/work/<slug>` for that case study.
6. Expect the case study's "Book a 30-minute call" link to point to the Google Calendar booking URL (`BOOKING_URL` in `src/lib/constants.ts`). The header "Free estimate" button points to `/free-estimate`.

## b. Filter the work page

1. Open `/work`. Expect all case studies.
2. Click the "Custom Software" filter.
3. Expect the URL to be `/work?line=custom-software`.
4. Expect only case studies tagged Custom Software, and fewer cards than before.
5. Fetch `/work?line=custom-software` with curl. Expect the filtered cards in the HTML, with no `hidden id="S:` Suspense wrapper (the page must work without JavaScript).

## c. Landing pages

For each of `/lp/ai`, `/lp/custom-software` and `/lp/dashboards`:

1. Open the page.
2. Expect no site navigation: no links to Services, Work, Approach or About, and no menu button. A logo linking home is fine.
3. Expect at least one "Book a call" style link to the booking URL.
4. Expect `<meta name="robots" content="noindex, nofollow">`.
5. Expect a page title of the form "<Page> | DataSpoke", with "DataSpoke" only once.

## d. Contact form preselect

1. Open `/contact?service=custom-software`.
2. Expect the service dropdown to show "Build our own app or internal tool".

## e. Old service anchors

1. Open `/services#company-brain`.
2. Expect to end up on `/services/ai-implementation`.
3. Open `/services#assessment`.
4. Expect to stay on `/services#assessment`.

## f. Content checks

1. Open `/approach` and `/about`. Expect each to render with an H1.
2. On `/`, `/services`, `/work`, `/approach` and `/about`, expect no "AI Assessment" except as part of "Data & AI Assessment", and no "small business".
3. Expect the home page title to be "DataSpoke | Your business, running on its own data."
4. Expect `public/sitemap.xml` to list `/free-estimate`, `/services/*`, `/work`, `/work/*` and `/approach`, and no `/lp/*` page.
