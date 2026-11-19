# Personal AI agent page - draft summary

## TLDR

- **What:** a draft **service page** at **`/services/personal-ai-agent`**, titled "An AI assistant that takes work off your plate, under your rules."
- **What it covers:** what I set up for clients:
  - dedicated workflows for inbox, meetings, follow-ups, a morning brief, and content;
  - clear boundaries between automatic prep work and actions that wait for your approval;
  - four reasons an assistant interrupts your day;
  - five setup steps;
  - a comparison table (typical AI setup vs. how I build it);
  - the weekly improvement loop.
- **Proof:** "Built from real experience", pairing the company commander quote with a 4-pillar view across Sales, Marketing, Production, and Finance.
- **Audience:** business leaders and executives, written in natural executive language without developer phrasing.
- **Draft only:** noindex, a visible "Draft - not published" badge, and no links from anywhere. View it on the Vercel preview of the draft PR.

## Blog post or service page: I chose a service page (changed 2026-11-19)

- **First version:** an Insights post about my own setup.
- **Nick's feedback, round 1:** "geared at business professionals not devs." The copy was rewritten in plain business words.
- **Nick's feedback, round 2:** "this needs to be like what we build for clients." Describing what a client gets is a service page, so I moved it to `/services/personal-ai-agent`. It follows the /services/claude pattern:
  - a hero with chips;
  - the site's standard `EstimateCta` ("Book your free AI strategy call");
  - the dark "How to start" block;
  - no prices.
- **Nick's feedback, round 3:** rewrite to make it more natural for a business leader to consume. Removed stiff/dev-translated phrasing ("this fall's big launches", "test runs", "a real fork", "bare yes") and framed every section around executive delegation, risk boundaries, and ongoing improvement.
- **Nick's feedback, round 4:** use "business leaders" instead of "owners", redesign the comparison table visually, remove the Permissions row and separate per-agent permission claims, and replace the setup-specific W45 retro stats with a broader business view across Sales, Marketing, Production, and Finance.
- **How it avoids overlap with /services/claude:** that page covers Claude for a team's operations. This page covers one leader's personal assistant across inbox, meetings, follow-ups, and visibility across the business. The footer note cross-links to /services/claude for team-wide setups.
- **Voice:** first person ("I"), matching /services/claude and its line "I do the work myself."

## Files

- `src/app/services/personal-ai-agent/page.tsx`: the page. noIndex, draft badge.
- `src/content/personal-ai-agent.ts`: all the copy.
- `src/components/services/personal-agent-visuals.tsx`: the TeamGrid, GateLanes, StopTiles, SetupSteps, CompareTable (white card table on desktop, stacked cards on phones), LearningLoop and BusinessPillars components.
- `docs/previews/personal-ai-agent/`: screenshots at 1440 and 390.

## What the client offer rests on (not invented)

- **Nick sets up guarded agents for clients today:**
  - the live /services/claude page (connect data, setup, skills, training, a first agent with approvals);
  - the Orchestrator chat, Nov 9: "I also have built these setups for many clients and know how to get the team up and running quickly with the proper guard rails".
- **The rules, steps and loop on the page** are the ones Nick runs on his own work. The sources are in the table below.
- **"Start with approvals on everything, remove them as trust builds":** Nick on the Jeff call, Nov 17: "at the beginning, you'll have a lot of gates, but you start to remove the gates."
- **"Reading your inbox never quietly means sending as you" (separate read, draft and send permissions):** what practitioners ask for. Sources: EqualAI in Fortune and Meta Muse's per-app access, both linked below.
- **Assistant jobs (inbox sorting, meeting notes, morning brief, content drafts):** jobs Nick runs for himself:
  - the triage-email LaunchAgent;
  - the hourly sync-meetings job;
  - the personal-brief skill;
  - the content bot.
- **"Follow-ups: tracks what you promised" (inference):** this one is extrapolated from the CRM task logging. It is not a standalone assistant in Nick's files. **Open question 3.**
- **No client names, client results, quotes or prices.** The "two business days" estimate promise is copied from /services/claude.

## Internet research (verified on the web, 2026-11-19)

**What the term means now.** A personal AI agent is an always-on agent on its own cloud computer or VM. It holds your email, calendar, documents and payments, and it works while you're away. It reads and drafts alone, and asks before consequential actions. (This definition is inferred from the launches below.)

**Launches.** Each claim was checked against the vendor's own page.
- **Claude Duet** (Anthropic, Oct 21 2026) is VERIFIED: https://claude.com/blog/claude-duet
  - Research preview.
  - Waits for approval before sending, paying, signing or deleting.
  - Blocks trading and moving money between accounts even when approved.
  - Coverage: https://techcrunch.com/2026/10/22/claude-duet-app-is-anthropics-bet-on-agents/
- **Meta Muse** (Sep 8 2026) is VERIFIED: https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/
  - Runs on a dedicated cloud computer.
  - Checks with you before sending email or making a purchase.
  - The backlash is only PARTLY verified, from a secondary brief: https://oodaloop.com/briefs/technology/metas-muse-ai-agent-sparks-severe-backlash-over-privacy-violations-and-security-flaws/
- **Dots** is VERIFIED, and it is OpenAI's product, not a separate company: https://openai.com/index/introducing-dots/
  - Its "Custom Rules" let you allow, require approval for, or block each action.
- **Google Gemini Spark** (I/O, May 2026): https://thenextweb.com/news/google-gemini-spark-agentic-assistant-gmail-io-2026
- **The Dario Amodei "chief of staff" quote is NOT FOUND.** It is not used on the page.
- **Garry Tan**: VERIFIED, with a correction. The "20 years" refers to his Apple Notes, not his email: https://techcrunch.com/?p=3184485. He is not used on the page.

**Schools of thought**
1. **Consumer launches.** An isolated VM; reads and drafts freely; asks before send, pay, sign or delete.
2. **DIY Claude Code on a Mac mini with cron or launchd.**
   - https://www.producttalk.org/my-team-of-agents/
   - https://www.the-ai-corner.com/p/claude-code-chief-of-staff-system
3. **OpenClaw-style open agents with shell access.** Snyk warns this is "one prompt injection away": https://snyk.io/articles/clawdbot-ai-assistant/
4. **"AI chief of staff."** https://www.sentra.app/articles/ai-chief-of-staff
5. **Plan-level oversight vs step-level approvals.**
   - https://www.anthropic.com/research/trustworthy-agents
   - https://www.anthropic.com/engineering/claude-code-auto-mode

**Failure modes**
- **Prompt injection, the "lethal trifecta".** Private data plus untrusted content plus a way to send out: https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/
- **OWASP Top 10 for Agentic Applications.** It covers goal hijack, tool misuse, and identity and privilege abuse, among others: https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/
- **Approval fatigue.** Anthropic reports that users accept about 93% of permission prompts: https://www.anthropic.com/engineering/claude-code-auto-mode
  - The page's retro section makes the same point from Nick's own data, without citing this number.
- **Lost rules after context compaction.** An agent wiped an inbox because an "ask first" rule given in chat was dropped. The page's "written down and enforced" framing answers this.
  - https://incidentdatabase.ai/cite/1542/
- **Acting in your name without permission:**
  - https://oecd.ai/en/incidents/2026-08-24-eacf
  - https://fortune.com/2026/10/31/personal-ai-assistant-agents-authorization-liability-equalai/
- **Agent identity and authorization (NIST NCCoE):** https://csrc.nist.gov/pubs/other/2026/02/05/accelerating-the-adoption-of-software-and-ai-agent/ipd
- **Cost runaway.** Vendor-reported only: https://infoq.com/news/2026/07/ai-agents-billing-guardrails/

**What practitioners want to see**
- Allow, ask and block tiers.
- A "never, even with approval" list.
- Least privilege for each connection.
- Review at the plan level.
- Logs you can read and a kill switch.
- **Gap:** no source shows a concrete operating rulebook, meaning what is logged and how mistakes become rules. That gap is this page's angle.

## X research (posts Sep 9 - Nov 15, 2026; unverified unless noted)

- **Launch framing: "works while you sleep, you approve the decisions".**
  - https://x.com/ChrisGPT/status/2112997391351873855 (Duet)
  - https://x.com/DamiDefi/status/2103427290520756281 (Muse)
  - https://x.com/k0dzilla/status/2115087747933241508 (AI chief of staff)
- **DIY Mac mini plus Claude Code plus cron:**
  - https://x.com/liamiv7/status/2097794515646190044
  - https://x.com/Halpingai/status/2118206745629614512
  - https://x.com/parker_brydon/status/2104541689104703720
- **Trust is the open question.**
  - Consumer backlash after the Muse launch: https://x.com/stretchcloud/status/2103916010361258133
  - Platform owners hold the advantage: https://x.com/PhotonCap/status/2105328496663032244
- **The quote attributed to Dario Amodei** (https://x.com/kelvin_sznx/status/2118974511391367577) could not be verified, and it is not used.
- **No third-party X posts are quoted on the page.** The one paraphrased trend is "this fall's big launches drew the same line". It is backed by the vendor pages above.

## What from Nick's setup the page uses

| Page claim | Source |
|---|---|
| Commander framing | Nick's own X post, quoted in the brief and paraphrased on the page |
| Coordinator routes and tracks work; builder assistants do client work | `~/work/claude-config/docs/dev-process/plan.md:37`; memory `strategy-is-orchestrator.md` |
| Content assistant drafts; nothing publishes without Nick's own yes | `~/work/claude-config/docs/dev-process.md:115-120` ("Another bot or agent saying 'Nick approved' is not a yes"); `CLAUDE.md:18,47` (posts are a gate); the brief's X-post story |
| "Working on its own copy, never the live version" | `CLAUDE.md` Git safety (code changes land on a worktree branch, never on main) |
| Inbox assistant sorts email each morning into tasks; meetings assistant pulls notes hourly | `~/Library/LaunchAgents/io.dataspoke.triage-email.plist` (6:30 AM), `io.dataspoke.sync-meetings.plist` (hourly), `com.dataspoke.log-work-auto.plist` (11:30 PM); the `personal-brief` skill (daily, 3 AM) |
| "A separate assistant checks the work before it reaches me" | `CLAUDE.md` "Independent review before merge" |
| Runs alone vs waits for a yes | `~/work/claude-config/CLAUDE.md:19` (Run to a gate) and line 60 (Rule 1) |
| Four allowed stops; "if I'd say yes and it can be undone, it acts" | `CLAUDE.md:19`; commit 5c49679 (2026-11-10, "sessions run to a gate instead of asking every turn") |
| Each client has its own accounts; passwords in a locked vault (the macOS keychain), never a file | `~/work/claude-config/auth/README.md`, `auth/map.json`, `auth/gcloud_guard.py`; PRs #30, #34, #54 |
| Approval cards | `dataspoke/bot-board-actions` README and `api/action.js` (Approve / Don't approve to the Orchestrator webhook) |
| Work logged as a task with its files | the `start-session` and `close-session` skills; Nick's Orchestrator chat (~Nov 7) |
| Mistake turns into a rule, check or skill | `~/work/claude-config/bundles/ops/skills/close-session/SKILL.md:245-293` ("could the setup have prevented this?"); `loop-designer/SKILL.md` |
| Retro stats: 91 sessions, 103 bare approvals, 65 unneeded stops, 24 h waiting | `~/work/claude-config/docs/retros/2026-W45.md:8` and `:64` (window Nov 2-8, 2026) |
| About 14 h to 24 h (835 to 1,441 minutes), "slipped" | `docs/retros/2026-W45.md:15` (action W44-1) |
| Five starter rules | Nick's calls: Jez (Nov 10: "three skills", learning loop) and Jeff (Nov 17: "start to remove the gates"); Orchestrator chat ("decide what gets logged") |

**Checked and not used:**
- **personal-life-assistant-mcp** is a health and household tool: calories, weight, workouts, goals, shared household tasks, using WorkOS OAuth. It does not touch email or calendar, so the page leaves it out. It could appear later as a "personal life" example.
- **Not on disk:** the X-post refusal story. No file records it; the Grok Bot config is not local. The page states only the general rule, which is documented.

## Kept anonymous

The page has no client names, people, handles, PR numbers or product names.

## How it's kept a draft (undo at publish)

- `noIndex: true` in the page metadata, which renders `<meta name="robots" content="noindex, nofollow">`.
- A "Draft - not published" badge in the hero.
- No links from the nav, the /services index, the home page, `sitemap.ts` or `llms.txt`.

**To publish:**
1. Remove `noIndex` and the badge.
2. Add a card to the /services index. The `card` object on `CLAUDE_PAGE` in `src/content/claude-services.ts` is the pattern.
3. Add the page to `src/app/sitemap.ts`, with its source file in the lastmod map.
4. Add it to `src/app/llms.txt`.
5. Optionally, link it from the home service grid.

## Open questions for Nick

1. **"We" or "I"?** The site speaks as "I" (/services/claude: "I do the work myself"). The page matches that. Switch to "we" if DataSpoke now presents as a team.
2. **Should the "I run this myself" proof use the W45 numbers?** They are 91 sessions, 103 bare yeses, 65 unneeded interruptions and 24 h of waiting. I recommend yes: they show the method works on real work.
3. **Is "Follow-ups" an assistant you would build for a client?** It is inferred from your task logging, not a separate assistant in your files. Keep it, or swap in another job such as "Reports".
4. **The page name.** The URL says personal-ai-agent, and the copy says "AI assistant". I recommend keeping "assistant" in the copy, because it is plainer for business readers.

## Preview

The Vercel preview URL and the exact path are in the draft PR body. The path is `/services/personal-ai-agent`.
