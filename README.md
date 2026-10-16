This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## IndexNow

Pushes to `main` tell IndexNow about every URL in the sitemap after the Vercel production deployment is live.

- The key lives in `public/cf34c27442fe71c5cd508855f4d4f0db.txt` (the file contents are the key). Next.js serves it at `/cf34c27442fe71c5cd508855f4d4f0db.txt`.
- `scripts/indexnow.mjs` reads every `<loc>` in the sitemap and POSTs them to `https://api.indexnow.org/indexnow` with host `dataspoke.io`.
- `dataspoke.io` currently returns 308 to `www.dataspoke.io`. IndexNow verifies the key only on an HTTP 200 and does not follow that redirect, so the script submits host `www.dataspoke.io` when the apex does not serve the key. Sitemap URLs are already on `www.dataspoke.io`.
- `.github/workflows/indexnow.yml` runs on push to `main`. It waits until the GitHub Deployment for that commit in the `Production` environment succeeds, then runs the script. The key file has to be public before IndexNow will accept the list, so this is not a `postbuild` step.

Preview the payload without submitting:

```bash
npm run indexnow -- --dry-run
```

Submit a local sitemap by hand (this does POST once the key is reachable):

```bash
npm run indexnow -- --sitemap public/sitemap.xml
```

## AI referrals in GA4

The root layout loads GA4 measurement ID `G-JWYN8NRDFS`. On a full page load, if `document.referrer` or `utm_source` matches an AI assistant, the page sends event `ai_referral` with parameter `ai_source` and sets the user property `ai_source`. Nothing is rendered.

Matched sources: `chatgpt.com`, `chat.openai.com`, `perplexity.ai`, `claude.ai`, `gemini.google.com`, `copilot.microsoft.com`, `bing.com/chat`, `you.com`, `phind.com`, `poe.com`. A referrer matches the hostname (including a subdomain). `bing.com` counts only when the path is `/chat`. Browsers usually send only the origin on a cross-site referrer, so a Bing Chat visit is counted when `utm_source` is `bing.com/chat` or the referrer still includes that path. Ordinary Bing search is not counted. `utm_source` may be the host itself, or a short name: `chatgpt`, `openai`, `perplexity`, `claude`, `gemini`, `copilot`, `phind`, `poe`.

The event name shows up under Reports → Realtime and Reports → Engagement → Events. To break it down by assistant, register two custom dimensions in Admin → Data display → Custom definitions. GA4 only fills a custom dimension for hits that arrive after you create it, and the dimension can take up to 48 hours to show in reports.

| Dimension name | Scope | Parameter |
| --- | --- | --- |
| AI source | Event | `ai_source` |
| AI source (user) | User | `ai_source` |

Then open Explore → Free form, add dimension **AI source** and metric **Event count**, and filter Event name to exactly `ai_referral`. Use **AI source (user)** when the breakdown should follow the visitor rather than one hit.
