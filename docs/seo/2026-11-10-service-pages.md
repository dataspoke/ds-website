# Service page SEO rewrite and tracking page spec (2026-11-10)

## TLDR

1. **Rename the six service pages after what buyers type into Google.** Examples are "CRM Integration and Automation Services" and "Business Dashboards and KPI Reporting". QuickBooks stays in the integration page's meta description and body copy, not its title. Each current benefit line stays on the page as the subhead under the H1.
2. **Rename two slugs.** Change `/services/capture` to `/services/crm-integration` and `/services/organize` to `/services/data-warehouse`, each with a permanent redirect. Keep the other four slugs.
3. **Add one new page, `/services/lead-source-tracking`.** It answers "which ads, calls and referrals actually turn into paying customers, and who are those customers?" The full copy, 5 FAQs and the JSON-LD are below and ready to paste.
4. **Link the pages as one cluster.** Each topic gets one owner page, and the other pages link to that owner from body copy. A "By industry" block on the service template links to the two planned industry pages. Those pages link down to the four or five services that fit their trade.
5. **Fix two side issues before launch.** The homepage JSON-LD still lists Connecticut and New York. The Lead Flow copy promises "a phone line that can take intake questions", which reads like an AI answering service.

This is copy and spec only. No site code or content file has been changed.

---

## How the pages are built today (confirmed in code)

- The copy is in `src/content/services.ts` (`SERVICE_LINES`). FAQs and engagement steps are in `src/content/service-pages.ts`.
- `src/app/services/[line]/page.tsx` renders `line.title` as the **eyebrow** and `line.oneLiner` as the **H1**.
- `src/lib/metadata.ts` builds `<title>` as `` `${metaTitle} | DataSpoke` ``. This means **`metaTitle` must be 48 characters or fewer** to keep the full title at 60 or fewer. The values below are already within that limit.
- `ServiceJsonLd` in `src/components/shared/json-ld.tsx` uses `line.title` as `name`. `areaServed` is the United States.

**Implementation note for later:** the H1 cannot change unless a new field is added, for example `h1` on `ServiceLine`. The page would render `line.h1` in the `<h1>` and move `line.oneLiner` into a `<p className="lede">` subhead. `line.title` can stay as the eyebrow.

---

## 1. Before and after: the six service pages

Character counts include " | DataSpoke" for titles. Meta descriptions are counted as written.

### 1.1 Data Capture & Integration (`/services/capture` → `/services/crm-integration`)

| | Before | After |
|---|---|---|
| `<title>` | Connect your software so nothing gets retyped \| DataSpoke | **CRM Integration and Automation Services \| DataSpoke** (51) |
| `metaTitle` value | Connect your software so nothing gets retyped | **CRM Integration and Automation Services** |
| H1 | Stop retyping. Every lead, call and invoice lands where it belongs on its own. | **CRM Integration and Automation Services** |
| Subhead | (none) | Stop retyping. Every lead, call and invoice lands where it belongs on its own. |
| Meta description | We connect the CRM, accounting, phone and marketing tools you already use, so leads, calls and invoices flow on their own. Free AI strategy call. | **We connect your CRM, QuickBooks, phone system and marketing tools so leads, calls and invoices flow on their own. Book your free AI strategy call.** |

**Why QuickBooks is not in the title or H1:** naming one accounting product makes the page look narrow to buyers on Xero, or on industry software such as ServiceTitan, Jobber or Clio. The title stays general. QuickBooks still appears in the meta description, in the opening body sentence and in the existing "Which systems can you connect?" FAQ, so the page can still rank for "quickbooks crm integration".

**Opening body sentence (add as the first line of the `problem` copy):** We connect your CRM to the accounting, scheduling, phone and marketing tools you already run, whether your books are in QuickBooks or Xero and your jobs live in a field service app or Clio.

Target search phrases:
1. crm integration services
2. quickbooks crm integration
3. connect crm to quickbooks
4. zapier alternative for business
5. automatic lead capture into crm

### 1.2 Data Organization & Warehousing (`/services/organize` → `/services/data-warehouse`)

| | Before | After |
|---|---|---|
| `<title>` | Organize your data into one trustworthy record \| DataSpoke | **Data Cleanup and Data Warehouse Services \| DataSpoke** (52) |
| H1 | One trustworthy set of records, so everyone works from the same facts. | **Data Cleanup and Data Warehousing for Your Business** |
| Subhead | (none) | One trustworthy set of records, so everyone works from the same facts. |
| Meta description | We turn your calls, emails, documents and spreadsheets into one trustworthy set of records you own, ready for reports and AI. Free AI strategy call. | **We clean up and combine your CRM, calls, documents and spreadsheets into one data warehouse you own, ready for reports and AI. Free AI strategy call.** |

Target search phrases:
1. data warehouse for business
2. single source of truth for business data
3. data cleanup services
4. crm vs spreadsheet
5. get business data ready for ai

### 1.3 Metrics & Dashboards (`/services/metrics-dashboards`, slug kept)

| | Before | After |
|---|---|---|
| `<title>` | Dashboards that show your numbers every Monday \| DataSpoke | **Business Dashboards and KPI Reporting \| DataSpoke** (49) |
| H1 | Know your numbers every Monday without anyone building a report. | **Business Dashboards and KPI Reporting** |
| Subhead | (none) | Know your numbers every Monday without anyone building a report. |
| Meta description | Dashboards and weekly scorecards that update themselves from the systems you already run. Know your numbers every Monday. Free AI strategy call. | **Business dashboards and weekly KPI scorecards that update themselves from your CRM and QuickBooks. The same answer every Monday. Free AI strategy call.** |

Target search phrases:
1. business dashboard
2. kpi dashboard for business
3. weekly kpi scorecard
4. quickbooks dashboard
5. automated monthly reports

### 1.4 Custom Software (`/services/custom-software`, slug kept)

| | Before | After |
|---|---|---|
| `<title>` | Custom software built around how you work \| DataSpoke | **Custom Software, Client Portals and Apps \| DataSpoke** (52) |
| H1 | Software built around how your business works, so your team stops working around the software. | **Custom Business Software, Client Portals and Mobile Apps** |
| Subhead | (none) | Software built around how your business works, so your team stops working around the software. |
| Meta description | Internal tools, client portals and mobile apps on the systems you already pay for. One screen for your team, and you own the code. Free AI strategy call. | **Custom business software, client portals and iPhone and Android apps, built on the systems you already pay for. You own the code. Free AI strategy call.** |

Target search phrases:
1. custom business software development
2. client portal development
3. internal tools development
4. custom app on top of quickbooks
5. custom crm vs off the shelf

### 1.5 AI Implementation (`/services/ai-implementation`, slug kept)

| | Before | After |
|---|---|---|
| `<title>` | AI on your data so your team gets more done \| DataSpoke | **AI Implementation and Consulting Services \| DataSpoke** (53) |
| H1 | Put AI to work on your own business, with your team trained to use it and a person approving what it writes. | **AI Implementation and Automation for Your Business** |
| Subhead | (none) | Put AI to work on your own business, with your team trained to use it and a person approving what it writes. |
| Meta description | We set up AI on your business data, train your team to use it and automate busywork. A person approves every draft. Free AI strategy call. | **AI implementation: an assistant on your own data, team training and automated busywork. A person approves every draft. Free AI strategy call.** |

Target search phrases:
1. ai implementation for business
2. ai consultant
3. chatgpt for business data
4. ai automation for business
5. ai training for employees

### 1.6 Analytics & Data Science (`/services/analytics-data-science`, slug kept)

| | Before | After |
|---|---|---|
| `<title>` | See where the money goes and what's coming next \| DataSpoke | **Business Analytics and Forecasting Services \| DataSpoke** (55) |
| H1 | See where the money is going and what's coming next, so you decide faster and with proof. | **Business Analytics, Forecasting and Profitability Analysis** |
| Subhead | (none) | See where the money is going and what's coming next, so you decide faster and with proof. |
| Meta description | We use your business's own history to show which customers, services and channels pay, who is about to leave and when to staff up. Free AI strategy call. | **Business analytics and forecasting from your own history: profit by customer and service, customers about to leave, demand and cash. Free AI strategy call.** |

Target search phrases:
1. business analytics services
2. profitability by customer analysis
3. customer churn prediction
4. demand forecasting for business
5. cash flow forecasting from quickbooks

**Avoiding overlap with the new page:** analytics keeps margin, churn and forecasting. "Which marketing channel produces customers" moves to the new tracking page. Analytics and dashboards keep one sentence on channels and link to the tracking page for the rest.

---

## 2. Slugs and redirects

### Recommendation

| Current | New | Why |
|---|---|---|
| `/services/capture` | `/services/crm-integration` | "Capture" is internal language. "crm integration" is the head term buyers search. The title and H1 use the same general phrase, so the slug matches them. |
| `/services/organize` | `/services/data-warehouse` | "Organize" says nothing to Google. "data warehouse" is the plain term, and the page already defines it. |
| The other four | unchanged | Each one already contains its search term: `metrics-dashboards`, `custom-software`, `ai-implementation`, `analytics-data-science`. |

### Permanent redirect list

Add these to `next.config.ts` under `async redirects()`. Next.js `permanent: true` sends a 308, which Google treats the same as a 301. Use `statusCode: 301` instead if a literal 301 is required.

| Source | Destination | Type |
|---|---|---|
| `/services/capture` | `/services/crm-integration` | permanent |
| `/services/organize` | `/services/data-warehouse` | permanent |

Hash anchors such as `/services/capture#lead-flow` keep working, because the browser carries the hash through the redirect.

### Places that must change in the same release (so nothing links through a redirect)

1. `src/content/services.ts`: the `slug` values in `SERVICE_LINES`, the keys in `SERVICE_DIAGRAM_LABELS` and `LINE_LADDERS`, and every `LEGACY_SERVICE_ANCHORS` target that points at `/services/capture`.
2. The `ServiceLineSlug` type in `src/types/index.ts`.
3. The `SERVICE_PAGE_EXTRAS` keys in `src/content/service-pages.ts`.
4. The `lines: ["capture"]` and `lines: ["organize"]` references in `src/content/case-studies.ts`.
5. `src/components/home-a/services.tsx` and `src/components/home-a/pipeline-list.tsx`.
6. `src/lib/constants.ts` lines 45–46, which hold the contact form values `capture` and `organize`. The page builds `/contact?service=${line.slug}`, so either change these values or map the old values to the new ones.
7. `src/app/sitemap.ts`. Service slugs come from `SERVICE_LINES`, so they appear on the next build. Top-level pages are listed by hand there: add the tracking page's path to the list.
8. `src/app/llms.txt`, if it lists service URLs.

---

## 3. New page spec: Lead Source and Call Tracking

### Page settings

| Field | Value |
|---|---|
| Slug | `/services/lead-source-tracking` |
| `<title>` | **Lead Source Tracking and Marketing Attribution \| DataSpoke** (58) |
| `metaTitle` value | Lead Source Tracking and Marketing Attribution |
| Eyebrow (`title`) | Lead Source & Call Tracking |
| H1 | **Lead Source Tracking, Call Tracking and Marketing Attribution** |
| Subhead | Know which ads, calls and referrals turn into paying customers, and who those customers are. |
| Meta description | **Lead source and call tracking that follows each lead from ad to paid invoice, so you see which channels produce customers. Free AI strategy call.** |
| Kind | spoke |

Target search phrases:
1. lead source tracking
2. call tracking for business
3. marketing attribution for business
4. which marketing channel brings customers
5. customer profile analysis

### Opening paragraph (answer first)

Lead source tracking records where each customer came from and follows them from the first click or call to the paid invoice. We connect your ads, website forms, phone calls and referrals to your CRM and to QuickBooks. Every lead carries its source, and every customer carries the revenue they brought in. That lets you see which channels produce paying customers rather than clicks, and what your best customers have in common. You stop paying for channels that only look busy. You also stop judging the agency by the agency's own report.

### The problem this solves

Google Ads says it drove 40 conversions. Your sales team can find 12. Half your calls come in on the main line, so nobody knows which ad or which postcard made the phone ring. "How did you hear about us?" gets answered "Google" whether the lead came from a search ad, a map listing or a review. When the leads are tracked in a spreadsheet beside the CRM, the source is the first field to go missing. You end up setting next month's budget by gut feel.

### Sounds like you if

- Your ad platforms report conversions your sales team can't find.
- You can't say which channel produced last quarter's best customers.
- Phone calls are a large share of your leads, and none of them carry a source.
- Your agency reports clicks and leads, not revenue.
- You'd like to know who your best customers are, so you can find more like them.

### What you get

- A source on every lead, whether it arrives as a form, a call, a text, a chat or a referral.
- Calls tracked to the ad, keyword, page or mailer that produced them.
- Each lead followed through to the booked job and the paid invoice in QuickBooks.
- A weekly report by channel: leads, booked jobs, paying customers and revenue.
- A profile of your best customers: what they bought, where they are, how they found you and what they have in common.

### How it works

1. **Free AI strategy call.** Tell us which channels you pay for and which question you can't answer today. We tell you honestly whether tracking is the right first project. A written estimate with a recommended plan follows within two business days. There is no obligation.
2. **Map every way a lead arrives.** We list each ad account, form, phone line, chat tool, referral partner and lead vendor. We also list where each one lands today: the CRM, an inbox or a spreadsheet.
3. **Tag the source at the door.** We set up tracking numbers for calls, UTM tags and hidden form fields for web leads, and a required source field for referrals and walk-ins. AI can read a call transcript and suggest the source and the reason for the call. A person on your team confirms it.
4. **Connect the source to the money.** We match each lead to the booked job in the CRM and to the paid invoice in QuickBooks. The source then sits beside the revenue it produced.
5. **Report it every week.** A channel scorecard updates itself every Monday. A customer profile report shows who your best customers are and which channels bring more of them.

### Checklist: what we set up

- [ ] Tracking numbers for each ad campaign, listing and mailer, forwarding to the line you already use
- [ ] Call recording and transcripts tied to the lead record, where your call system allows it
- [ ] UTM tags on every ad and email link
- [ ] Hidden source fields on every website form
- [ ] A required "source" field in the CRM for referrals, walk-ins and repeat customers
- [ ] Lead vendor and chat leads routed into the CRM with their source attached
- [ ] Offline conversions sent back to Google Ads and Meta, so their bidding learns from paying customers rather than form fills
- [ ] Leads matched to QuickBooks invoices, so each channel shows revenue
- [ ] A weekly channel scorecard and a customer profile report
- [ ] A written list of every tag, number and rule, owned by you

### Illustrative weekly channel report

*Illustrative sample data, not from any real client.*

| Channel | Leads | Booked | Paying customers | Share of revenue |
|---|---|---|---|---|
| Google search ads | 62 | 21 | 14 | 31% |
| Google Business Profile calls | 38 | 19 | 15 | 27% |
| Referrals | 11 | 9 | 8 | 22% |
| Meta ads | 54 | 8 | 4 | 7% |
| Lead vendor | 47 | 6 | 3 | 5% |
| Direct mail | 9 | 4 | 3 | 8% |

In this sample, Meta ads and the lead vendor produce many leads but few customers. Referrals produce few leads but close at a high rate. Ad platform reports alone would rank these channels in nearly the opposite order.

### Comparison table: four ways to know where customers come from

| | Asking "How did you hear about us?" | Ad platform reports | A call tracking tool on its own | DataSpoke: source to paid invoice |
|---|---|---|---|---|
| Covers phone calls | Only if someone asks and writes it down | No | Yes | Yes |
| Covers forms, chat, referrals and vendors | Partly | Only its own ads | No | Yes |
| Reaches booked jobs and revenue | No | No, it stops at the click or form | No, it stops at the call | Yes, through the CRM and QuickBooks |
| Who reports the result | Your team, from memory | The platform that wants your budget | The tool vendor | Your own systems, with a record you can check |
| Shows who your best customers are | No | Audience estimates only | No | Yes, from your own customer records |
| Who owns the data | You, scattered | The platform | The vendor | You |

### FAQs (exactly 5)

**1. What is lead source tracking?**
Lead source tracking records where each lead came from, such as a Google ad, a map listing, a referral or a mailer. It keeps that source attached as the lead becomes a customer. Done properly, it follows the lead past the first call or form to the booked job and the paid invoice. That is how you see which channels produce paying customers, rather than which ones produce clicks.

**2. How do you track which phone calls come from which ads?**
Each campaign, listing or mailer gets its own tracking number. The number forwards to the phone line you already use, so callers notice nothing. Website visitors can see a number that matches the ad they clicked. Each call is logged in your CRM with its source, and where your call system allows it, with a recording and a transcript. AI can suggest the reason for the call from the transcript, and a person on your team confirms it.

**3. Can you connect a lead to the revenue it produced in QuickBooks?**
Yes. We have done QuickBooks integration work before. We match each lead in the CRM to the customer and the paid invoices in QuickBooks. The weekly report then shows revenue by channel, not only lead counts. If your CRM and QuickBooks don't share a customer record yet, we connect them first. That work is [CRM integration](/services/crm-integration).

**4. What goes into a customer profile, and is it private?**
A customer profile comes from your own records: what each customer bought, how often, how they found you, and their ZIP code or industry. Where it helps, we add public data at the ZIP code or company level, such as household income ranges by area or business size. We don't buy personal data about individuals, and the profiles stay in systems you own. The result is a plain description of who your best customers are, used to choose where to spend next.

**5. Do we have to switch our CRM or phone system?**
No. We build on the CRM, phone system, ad accounts and accounting software you already pay for. We add tracking numbers, tags and connections around them. If a tool can't pass a lead's source along, we tell you on the free AI strategy call, before any work starts.

### Call to action

**Find out which channels actually pay.**
Tell us where your leads come from today and which question you can't answer. We'll tell you honestly what it would take to track it.

Button: **[Book your free AI strategy call](/free-estimate)**

### JSON-LD

Use the site's existing `provider` (`@id` `https://www.dataspoke.io/#organization`) and `areaServed` (United States). No phone, no address and no ratings.

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.dataspoke.io/services/lead-source-tracking#service",
  "name": "Lead Source Tracking, Call Tracking and Marketing Attribution",
  "serviceType": "Lead source tracking and marketing attribution",
  "description": "Lead source tracking records where each customer came from and follows them from the first click or call to the paid invoice. We connect ads, website forms, phone calls and referrals to your CRM and QuickBooks, so you see which channels produce paying customers and what your best customers have in common.",
  "url": "https://www.dataspoke.io/services/lead-source-tracking",
  "provider": {
    "@type": "Organization",
    "@id": "https://www.dataspoke.io/#organization",
    "name": "DataSpoke",
    "url": "https://www.dataspoke.io"
  },
  "areaServed": { "@type": "Country", "name": "United States" }
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://www.dataspoke.io/services/lead-source-tracking#faq",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is lead source tracking?",
      "acceptedAnswer": { "@type": "Answer", "text": "Lead source tracking records where each lead came from, such as a Google ad, a map listing, a referral or a mailer. It keeps that source attached as the lead becomes a customer. Done properly, it follows the lead past the first call or form to the booked job and the paid invoice. That is how you see which channels produce paying customers, rather than which ones produce clicks." }
    },
    {
      "@type": "Question",
      "name": "How do you track which phone calls come from which ads?",
      "acceptedAnswer": { "@type": "Answer", "text": "Each campaign, listing or mailer gets its own tracking number. The number forwards to the phone line you already use, so callers notice nothing. Website visitors can see a number that matches the ad they clicked. Each call is logged in your CRM with its source, and where your call system allows it, with a recording and a transcript. AI can suggest the reason for the call from the transcript, and a person on your team confirms it." }
    },
    {
      "@type": "Question",
      "name": "Can you connect a lead to the revenue it produced in QuickBooks?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. We have done QuickBooks integration work before. We match each lead in the CRM to the customer and the paid invoices in QuickBooks. The weekly report then shows revenue by channel, not only lead counts. If your CRM and QuickBooks don't share a customer record yet, we connect them first. That work is CRM integration." }
    },
    {
      "@type": "Question",
      "name": "What goes into a customer profile, and is it private?",
      "acceptedAnswer": { "@type": "Answer", "text": "A customer profile comes from your own records: what each customer bought, how often, how they found you, and their ZIP code or industry. Where it helps, we add public data at the ZIP code or company level, such as household income ranges by area or business size. We don't buy personal data about individuals, and the profiles stay in systems you own. The result is a plain description of who your best customers are, used to choose where to spend next." }
    },
    {
      "@type": "Question",
      "name": "Do we have to switch our CRM or phone system?",
      "acceptedAnswer": { "@type": "Answer", "text": "No. We build on the CRM, phone system, ad accounts and accounting software you already pay for. We add tracking numbers, tags and connections around them. If a tool can't pass a lead's source along, we tell you on the free AI strategy call, before any work starts." }
    }
  ]
}
```

**Build note:** the page fits the existing `[line]` template if it is added to `SERVICE_LINES` as a seventh spoke. Its FAQs go in `SERVICE_PAGE_EXTRAS`. The checklist, the comparison table and the illustrative report need new sections, or a dedicated route. `generateStaticParams` already reads from `SERVICE_LINES`, so the page and its Service and FAQPage JSON-LD would be generated automatically.

---

## 4. Internal linking

### Principles

1. Use the new H1 keyword phrase as anchor text, such as "CRM integration" or "lead source tracking". Don't use "learn more". `serviceLinkText()` currently builds "Title: oneLiner". Change it to use the new keyword name.
2. Link from inside body copy where the topic comes up, not only from the "Other services" list at the foot of the page.
3. Each search topic has one owner page. The other pages mention it in one sentence and link to the owner.

### Topic owners

| Topic | Owner page |
|---|---|
| Connecting CRM, QuickBooks, phone and lead intake | `/services/crm-integration` |
| One clean record and the data warehouse; CRM vs spreadsheet | `/services/data-warehouse` |
| Weekly KPI scorecard and automatic reports | `/services/metrics-dashboards` |
| Which channel produces customers; call tracking; customer profiles | `/services/lead-source-tracking` |
| Profit by customer and service; churn; forecasting | `/services/analytics-data-science` |
| Assistants, training and automation, with a person approving drafts | `/services/ai-implementation` |
| Portals, internal tools and apps | `/services/custom-software` |
| AI for one trade | the two planned industry pages |

### Link map (from → to, with anchor text and placement)

| From | To | Anchor text | Where on the page |
|---|---|---|---|
| crm-integration | lead-source-tracking | lead source tracking | Lead Flow product: "every lead arrives with its source" |
| crm-integration | data-warehouse | data warehouse | Engagement close: the next step after connecting |
| crm-integration | ai-for-home-service-businesses | AI for home service businesses | "By industry" block |
| crm-integration | ai-consultant-for-law-firms | AI consultant for law firms | "By industry" block (Clio and Lawmatics are already named in the FAQs) |
| data-warehouse | crm-integration | CRM integration and automation | Problem section: "once the information is captured" |
| data-warehouse | ai-implementation | AI implementation | Trust ladder caption: "reports and AI lean on the top rungs" |
| data-warehouse | ai-consultant-for-law-firms | AI consultant for law firms | "By industry" block (decided vs discussed matters most for law firms) |
| metrics-dashboards | lead-source-tracking | lead source tracking | Live Numbers: "what each marketing channel costs you per paying customer" |
| metrics-dashboards | data-warehouse | data warehouse | Existing engagement close sentence |
| metrics-dashboards | analytics-data-science | business analytics and forecasting | Existing FAQ on dashboards vs analytics |
| analytics-data-science | lead-source-tracking | marketing attribution | Find the Margin: "which marketing channels pay" |
| analytics-data-science | metrics-dashboards | KPI dashboard | Existing FAQ "How is this different from a dashboard?" |
| ai-implementation | data-warehouse | data warehouse | FAQ "What if our data isn't ready for AI?" |
| ai-implementation | ai-for-home-service-businesses | AI for home service businesses | "By industry" block |
| ai-implementation | ai-consultant-for-law-firms | AI consultant for law firms | "By industry" block |
| custom-software | crm-integration | CRM integration and automation | FAQ "What do you build on top of?" |
| custom-software | ai-implementation | AI implementation | Internal tools product: where drafting fits in the screen |
| lead-source-tracking | crm-integration | CRM integration and automation | FAQ 3 and How it works, step 4 |
| lead-source-tracking | metrics-dashboards | weekly KPI scorecard | How it works, step 5 |
| lead-source-tracking | analytics-data-science | profitability by customer | "What you get": the customer profile item |
| lead-source-tracking | ai-for-home-service-businesses | AI for home service businesses | "By industry" block (calls and ads drive home service leads) |
| lead-source-tracking | ai-consultant-for-law-firms | AI consultant for law firms | "By industry" block (intake source by practice area) |
| ai-for-home-service-businesses | lead-source-tracking, crm-integration, metrics-dashboards, ai-implementation, custom-software (crew mobile app) | the service H1 phrase | Body copy where each fits, plus a "Services behind this" list |
| ai-consultant-for-law-firms | ai-implementation, data-warehouse, crm-integration, lead-source-tracking | the service H1 phrase | Body copy where each fits, plus a "Services behind this" list |
| ai-for-home-service-businesses | ai-consultant-for-law-firms | — | No link. The audiences don't overlap. |

### Site-wide

1. Add `/services/lead-source-tracking` to the `/services` overview spoke grid, `SERVICE_DIAGRAM_LABELS`, the home-a services list, the contact form options in `src/lib/constants.ts` and the sitemap.
2. Add a "By industry" block to the `[line]` template under "Other services", and to `/services`. Once the two industry pages ship, it lists them.
3. Every page keeps the CTA **"Book your free AI strategy call"** linking to `/free-estimate`.

---

## 5. Side findings (outside this brief, flagged only)

1. `src/components/shared/json-ld.tsx` lines 49–53: `organizationAreaServed` lists Connecticut and New York before the United States. This conflicts with the nationwide rule. Recommend United States only.
2. `src/content/services.ts`, `LEAD_FLOW.youGet`: "A phone line that can take intake questions and route the call when nobody can pick up." This reads as an AI answering service. Recommend cutting the line, or replacing it with "Missed calls logged in the CRM with a text-back, so no caller is lost."

## Rules check

1. "small" appears nowhere in the proposed copy.
2. There is no AI receptionist or answering service, no phone number, no prices, no Upwork, no client names, no review quotes and no "without hiring".
3. The only sample data is the channel report, and it is labelled illustrative.
4. The copy is nationwide, with no local focus.
5. Every CTA is "Book your free AI strategy call", linking to `/free-estimate`.
6. AI drafts and AI call tagging are always confirmed by a person.
7. The spreadsheet pain appears once in each relevant place, never as a headline.
