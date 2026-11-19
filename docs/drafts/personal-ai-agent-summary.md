# Personal AI agent page - draft summary

## TLDR

- I built a draft Insights post at **`/insights/personal-ai-agent`**: "My AI agents work on my behalf. These are the rules they run on."
- It is visual and low on words. It has a team grid, a "runs alone vs waits for my yes" gate picture, four allowed stops, a comparison table, a learning-loop diagram, retro stat tiles and five starter rules.
- I chose a **blog post (Insights)**, not a service page. The reasons are below.
- It is a draft only. It has noindex, a visible "Draft - not published" badge, and no links from anywhere. View it on the Vercel preview of the draft PR. The URL is in the PR body.

## Blog post or service page: I chose a blog post

1. **The topic is Nick's own operating practice.** The X gap is the operating rules: what needs a yes, what gets logged, how mistakes become rules. That is sharing expertise, which suits a post. A service page would be a sales pitch.
2. **A service page would overlap /services/claude.** Its step 5, "a first agent", already sells guarded agents to clients.
3. **It stays out of sight for free.** The Insights index and the sitemap list only markdown posts (`content/insights/*.md`). A separate route at `src/app/insights/personal-ai-agent/` therefore appears on neither until it is linked.
4. **Markdown can't carry the visuals.** The page is a contained TSX route. The markdown post template is untouched.

If Nick prefers a service page, move the route to `src/app/services/personal-ai-agent/`. Then add the site's `EstimateCta` block from /services/claude. The content file and components move over unchanged.

## Files

- `src/app/insights/personal-ai-agent/page.tsx`: the page. noIndex, draft badge.
- `src/content/personal-ai-agent.ts`: all the copy.
- `src/components/insights/personal-agent-visuals.tsx`: the TeamGrid, GateLanes, StopTiles, CompareTable (a stacked card on phones), LearningLoop and RetroStats components.
- `docs/previews/personal-ai-agent/`: screenshots at 1440 and 390.

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
| Bots orchestrate; Claude Code writes code; the orchestrator never writes code | `~/work/claude-config/docs/dev-process/plan.md:37`; memory `strategy-is-orchestrator.md` |
| Content bot drafts; nothing publishes without Nick's own yes | `~/work/claude-config/docs/dev-process.md:115-120` ("Another bot or agent saying 'Nick approved' is not a yes"); `CLAUDE.md:18,47` (posts are a gate); the brief's X-post story |
| About 20 sessions at once | `~/work/claude-config/CLAUDE.md:25` ("I direct about 20 sessions at once") |
| Each session in its own worktree; one deploy slot per project | `CLAUDE.md` Git safety; `docs/retros/aar-sutro-212-2026-11-13.md`; claude-config PR #48 |
| Scheduled routines: email triage, meeting notes, morning brief, nightly time log | `~/Library/LaunchAgents/io.dataspoke.triage-email.plist` (6:30 AM), `io.dataspoke.sync-meetings.plist` (hourly), `com.dataspoke.log-work-auto.plist` (11:30 PM); the `personal-brief` skill (daily, 3 AM) |
| Independent reviewer before merge | `CLAUDE.md` "Independent review before merge" |
| Runs alone vs waits for a yes | `~/work/claude-config/CLAUDE.md:19` (Run to a gate) and line 60 (Rule 1) |
| Four allowed stops; "if I'd say yes and it can be undone, it acts" | `CLAUDE.md:19`; commit 5c49679 (2026-11-10, "sessions run to a gate instead of asking every turn") |
| Folder decides accounts; tokens from the keychain | `~/work/claude-config/auth/README.md`, `auth/map.json`, `auth/gcloud_guard.py`; PRs #30, #34, #54 |
| Approval cards | `dataspoke/bot-board-actions` README and `api/action.js` (Approve / Don't approve to the Orchestrator webhook) |
| Work logged as a task with its files | the `start-session` and `close-session` skills; Nick's Orchestrator chat (~Nov 7) |
| Mistake turns into a rule, check or skill | `~/work/claude-config/bundles/ops/skills/close-session/SKILL.md:245-293` ("could the setup have prevented this?"); `loop-designer/SKILL.md` |
| Retro stats: 91 sessions, 103 bare approvals, 65 unneeded stops, 24 h waiting | `~/work/claude-config/docs/retros/2026-W45.md:8` and `:64` (window Nov 2-8, 2026) |
| 835 to 1,441 minutes, "slipped" | `docs/retros/2026-W45.md:15` (action W44-1) |
| Five starter rules | Nick's calls: Jez (Nov 10: "three skills", learning loop) and Jeff (Nov 17: "start to remove the gates"); Orchestrator chat ("decide what gets logged") |

**Checked and not used:**
- **personal-life-assistant-mcp** is a health and household tool: calories, weight, workouts, goals, shared household tasks, using WorkOS OAuth. It does not touch email or calendar, so the page leaves it out. It could appear later as a "personal life" example.
- **Not on disk:** the X-post refusal story. No file records it; the Grok Bot config is not local. The page states only the general rule, which is documented.

## Kept anonymous

The page has no client names, people, handles, PR numbers or product names. The scan flagged names to avoid, including client codes, family members and the Bot Board URL token, and none of them appear on the page.

## How it's kept a draft (undo at publish)

- `noIndex: true` in the page metadata, which renders `robots: noindex, nofollow`.
- A "Draft - not published" badge in the hero.
- No links from the nav, the /insights index, the home page, `sitemap.ts` or `llms.txt`.

**To publish:**
1. Remove `noIndex` and the badge.
2. Add the page to the /insights index. Either make `getInsightPosts` aware of TSX posts, or add a stub entry.
3. Add it to `src/app/sitemap.ts`. The sitemap lists only markdown posts today.
4. Add it to `src/app/llms.txt`.
5. Optionally, add `ArticleJsonLd`, as the markdown post route does.

## Open questions for Nick

1. **Blog or service page?** I recommend the blog, because it shares rather than sells and doesn't overlap /services/claude.
2. **Is the X-post refusal story OK to tell?** It is not recorded in any file I could read. The page states only the general rule.
3. **Can the W45 retro numbers be public?** They are 91 sessions, 103 bare approvals, 65 unneeded stops, 24 hours waiting, and the "slipped" rule. They show Nick as the bottleneck, which is the point, but it is a candid number.
4. **Bot names on the page.** The page says "Orchestrator" and "Content bot". The files also show Scout, Website Bro, Chief of Staff and Bug Fix. Add more?

## Preview

The Vercel preview URL and the exact path are in the draft PR body. The path is `/insights/personal-ai-agent`.
