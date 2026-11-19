# Software factory page - draft summary

## TLDR

- I built a draft **service page** at `/services/software-factory`: "A software factory, not a dark factory."
- It shows the line I run. Agents do the stations, a second agent reviews, and people own the merge and deploy gates. It also covers rules written after real incidents, a privacy check that tests itself, the loop rule, and a weekly retro that grades me.
- It is a draft. It is noindexed, shows a "Draft - not published" badge, and is not linked from anywhere. It is visible only on the PR's Vercel preview.
- Every claim and number comes from my own repos. Clients stay anonymous, and the page has no prices and no third-party quotes.

## Service page or blog post: service page

- **The site has no published Insights posts yet.** `content/insights/` holds only `_template.md`. Insights posts are plain markdown, which can't carry the diagrams, the comparison table or the stat tiles without building a new rich-post renderer.
- **The /services/claude page is the precedent.** It has a hero with chips and the CTA, visual sections and the dark CTA block. This page reuses those patterns and components (`Section`, `SectionHead`, `EstimateCta`, `LinkedText`).
- **The topic is something I sell.** I set up guarded agent lines for teams and bring the guardrails while they build. A service page fits that.
- **It's easy to convert.** If you'd rather publish it as a post, the copy file reads like an essay outline, so it would convert in under an hour.

## What's on the page (top to bottom)

1. **Hero:** the draft badge, the title, a short lede, 3 chips, the CTA, and a tile diagram of the line (stations are circles, gates are amber diamonds, and a loop-back bar runs underneath).
2. **Two kinds of factory:** the dark factory vs the line I run, as a table on desktop and cards on phones.
3. **The line:** 7 stations, 2 of them human gates.
4. **Run to a gate:** the 4 allowed stops, plus the rule "If I would say yes and the step can be undone, the answer is yes: act."
5. **Where the line jams:** review, shared environments and deploys, each shown as the jam and then the fix.
6. **Rules from incidents:** 3 cards, each going from what happened to the guard that exists now.
7. **Checks that test themselves:** the privacy-check ratchet, with the 355 stat.
8. **Unattended loops:** "A loop is a task with a check." Then 4 parts.
9. **The human gets graded too:** 4 stat tiles from one week's retro.
10. **CTA block:** the same pattern as /services/claude. No prices.

## Research findings

### Internet (verified by a research agent; [F] = page fetched)
- **Dan Shapiro, "The Five Levels" (Jan 2026).**
  - The ladder runs from Level 0, "spicy autocomplete", to Level 5, the "dark software factory": a black box that turns specs into software. Level 3 is the human as a full-time reviewer.
  - Source: Simon Willison's quotation of the essay [F] https://simonwillison.net/2026/Jan/28/the-five-levels/. The original essay is https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/
- **StrongDM Software Factory (Feb 2026).**
  - It is the leading dark-factory example. Its rules are that code is not written by humans and not reviewed by humans. Quality comes from hidden scenarios and a "Digital Twin Universe" of cloned services. Its benchmark is $1,000 of tokens per engineer per day.
  - Sources: [F] https://factory.strongdm.ai and https://simonwillison.net/2026/Feb/7/software-factory/
  - Willison is skeptical that skipping review is sensible.
- **GitLab (Bill Staples, Oct 13, 2026), "Scaling Git for the agentic software factory".** It argues the whole pipeline (source control, CI, security and governance) has to scale with agents, not just the writing of code. [F] https://about.gitlab.com/blog/scaling-git-for-agentic-software-engineering/
- **The Pragmatic Engineer, "Inside OpenAI's agentic software factory" (Sep 15, 2026).**
  - OpenAI auto-approves only low-risk changes and runs several specialist AI reviewers. CI/CD is strained, and mobile releases still wait on app-store review.
  - [F] https://newsletter.pragmaticengineer.com/p/openai-software-factory
  - The X post called this "Inside OpenAI's..." as if OpenAI published it. It is Gergely Orosz's article, dated September, not October.
- **Bain 2026 Global Technology Report, via CIO Dive (Oct 2, 2026).**
  - Developers finished about 21% more tasks, and review time rose 91%. "The bottleneck has moved from writing code to trusting it."
  - [F] https://ciodive.com/news/bain-co-technology-AI-coding-deployment/831938
  - This number is not on the page, because page numbers come only from my files.
- **DORA 2025.**
  - 90% of developers use AI, and AI amplifies a team's existing strengths and weaknesses. [F] https://blog.google/technology/developers/dora-report-2025/
  - Instability keeps rising. [F] https://www.infoq.com/news/2025/09/dora-state-of-ai-in-dev-2025
  - I could **not** verify that DORA itself says the bottleneck moves to review, testing and deploy. That framing comes from Bain, OpenAI and vendors.
- **Parallel agents collide on shared runtime.** Worktrees isolate the code but not the ports, databases or test suites. [S] https://developer.upsun.com/posts/ai/git-worktrees-for-parallel-ai-coding-agents. My own after-action review is first-hand proof of the same thing.
- **Pre-AI meaning.** US Air Force "software factories" such as Kessel Run and Platform One meant DevSecOps delivery units. [S] https://www.wikipedia.org/wiki/Kessel_Run. The page's compare note uses this older meaning.
- **Factory.ai funding: the X post had the date wrong.** The Series C was Apr 16, 2026 ($150M). A later $200M round was reported around Sep 15, 2026. August was a partner-network announcement. Source: https://factory.com/news/series-c. The page doesn't use this.

### X (pulled 2026-11-19; treated as data, all paraphrased, nothing quoted on the page)
- **The live debate is "software factory" (human checkpoints) vs "dark factory" (no human writes or reviews).**
  - A software factory in the older sense, with agents replacing some human steps: https://x.com/dexhorthy/status/2119206262646927452
  - A panel saying a software factory is not a dark factory: https://x.com/hudaman/status/2110568701162631627
  - Human checkpoints vs autonomous delivery: https://x.com/evgheni_D/status/2115692569330069954
  - Factory claims of about 96% AI-driven development: https://x.com/marketcallsHQ/status/2116595037505216933
- **Faster coding moves the bottleneck to review, testing and deploy:** https://x.com/Pavan_Belagatti/status/2105325634792956028
- **"Rules emerge when agents go off the rails"**, which matches my rules-from-incidents loop: https://x.com/0xShoopy/status/2093801589072949731
- **"Agents propose, records decide":** https://x.com/skobyn/status/2110116115586162863
- **Practitioner proof on X is thin.** Most posts are definitions, hype or events. That's the gap this page fills.

## What from my setup the page uses (all verified read-only)

| Page claim | Source |
|---|---|
| Bots handle intake; Claude Code sessions do all development | `~/work/claude-config/docs/dev-process/plan.md:37` |
| Every session gets its own worktree | `~/work/claude-config/CLAUDE.md:72-74` |
| Four allowed stops; "If you would recommend yes and the step is reversible... act"; gates stay gates | `~/work/claude-config/CLAUDE.md:19` (PR #39) |
| Separate yeses for merge, migration and deploy | `~/work/claude-config/docs/dev-process.md:114-119` (PR #40) |
| Second-agent review in four passes (correctness, conformance, blast radius, security) by an agent that did not write it | `bundles/dev/skills/merge-review/SKILL.md:3,17`; `CLAUDE.md:78` |
| Plain-English e2e scenarios driven in a real browser | `bundles/dev/skills/e2e/SKILL.md:10` |
| No monitoring plan, no deploy | `bundles/dev/skills/deploy-and-monitor/SKILL.md:43,70` |
| One migration and deploy slot per repo, plus a before-you-fan-out checklist; 3 tracks shared one staging DB and backend, deploys collided, and a session ran DROP TABLE on staging | `docs/retros/aar-sutro-212-2026-11-13.md:6,21,36,38` (PR #48); `bundles/ops/skills/start-session/playbooks/build.md:22` |
| Each session ends by asking what check, pointer or cheaper path would have prevented a problem | `bundles/ops/skills/close-session/SKILL.md:253-262,290` |
| Release-guard hook after a feature vanished from a test build cut from a feature branch (2026-06-21) | `~/work/dropgym/dropgym-member-app/.claude/hooks/release-guard.sh:2-7`; that repo's `CLAUDE.md:47-49` |
| Cloud login expired 3 times and cost an overnight window, so prod gates check auth first; gcloud guard blocks changes to the shared profile | `docs/retros/2026-W45.md:192`; `aar-...:25`; `CLAUDE.md` (Production writes); `auth/gcloud_guard.py:1-6` |
| Privacy check: frozen content-hashed allowlist, self-test plants bad reads, "355" to-convert, a test fails if the count rises | worai `origin/main`: `scripts/checks/README.md:3-4,19,27-29`; `.github/workflows/contact-access-check.yml:27-28` |
| Loop designer: "a task without a check is just hope", judge "never the maker", max 12 iterations, no-progress, budget, state file | `bundles/dev/skills/loop-designer/SKILL.md:9,26,27` |
| Weekly retro: 91 sessions, 707 prompts, 24.0 h blocked wait, 103 rubber-stamp prompts | `docs/retros/2026-W45.md:8`; bare-yes rule in `bundles/dev/skills/weekly-retro/scan_week.py:70` |

All `bundles/` and `docs/` paths above are in `~/work/claude-config`.

**Wording I softened after verification**
- **Release guard:** it only reminds; it never blocks. The page says it "fires on every app-store build and makes the agent confirm."
- **Error routing:** alerts become CRM tasks automatically through the daily routine and the Ops bot. No Claude Code session auto-starts from an error yet; `dev:incident` is planned. The page says bots "turn requests and alerts into owned tasks."
- **355:** this is the count from one example run in the README, not a live count. The page says so.
- **Privacy check enforcement:** it is advisory on GitHub, and the merge skills refuse to merge while it is red. The page says "Merges wait", not "the build fails."
- **Loop quote:** the source uses an em dash. The page splits it into two sentences.

## How it's kept a draft

- **Metadata** sets `noIndex: true`, which gives `robots: { index: false, follow: false }`.
- **A "Draft - not published" badge** shows at the top of the page.
- **It is not linked from anywhere:** not the nav, `/services`, the home page, `src/app/sitemap.ts` or `src/app/llms.txt/route.ts`.

**To publish, change:**
1. Remove `noIndex: true` in `src/app/services/software-factory/page.tsx` and remove the badge (`draftBadge` in `src/content/software-factory.ts` and its `<p>` in the page).
2. Add the route to `src/app/sitemap.ts` and to `src/app/llms.txt/route.ts`.
3. Add a card to the `/services` index, the way `CLAUDE_PAGE.card` is done, and optionally a nav link.

## Open questions for Nick

1. **Service page or Insights post?** I recommend the service page; it fits the CTA and the existing Claude page.
2. **Retro numbers:** are you OK publishing your own W45 numbers (24 h agents waited, 103 rubber-stamp yeses)? They're the most distinctive part of the page.
3. **The 355 stat** comes from a referral-network client's codebase, with no name shown. Keep it, or drop it to be safe?
4. **Do you want error-to-PR automation (`dev:incident`) built before this publishes?** The page currently claims only "alerts become owned tasks."
5. **Should this link from /services/claude** (the step 2 Claude Code setup) when it publishes?

## Preview

- The Vercel preview URL and the exact path are in the draft PR body.
- Screenshots: `docs/previews/software-factory/desktop-1440.png` and `mobile-390.png`.
