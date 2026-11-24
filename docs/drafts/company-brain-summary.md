# Company brain page - draft summary (2026-11-19)

## TLDR
- I drafted a visual Insights post at `/insights/company-brain`: "Your company brain is a data problem."
- It's a blog post, not a service page. The site already sells a "Company Brain" product on a service-line page, so a second service page would compete with it. A post also fits the brief's "share, don't sell".
- It's a draft. It has noindex, a "Draft - not published" badge, and no links from the nav, the /insights index, the sitemap or llms.txt. You can see it only on the PR's Vercel preview.
- The copy uses only your setup and your own words, with no client names. It has no numbers on purpose (see open questions).

## Service page or blog post: blog, and why
1. The site already sells "Company Brain" as a product: `src/content/services.ts:162` and `src/content/lp.ts:61`. A service page called "Company brain" would duplicate it and could confuse.
2. The angle that wins on X is "how it actually works and where it breaks." That is expertise, not an offer, and it reads better as a post.
3. This branch predates PR #33 on `main` (which added the `mission-command-ai-agents` post and the React Insights registry in `src/content/insights.ts`). While this draft lives at static `src/app/insights/company-brain/page.tsx`, it stays outside the registry and out of the index automatically.

## What's on the page (visual, low word count)
1. A hero with a 4-bullet "short version" card.
2. A comparison table: "Wiring tools in" vs "What I run". On phones it becomes stacked cards.
3. A layers diagram: source systems -> connected, clean data -> shared definitions -> playbooks -> people and agents.
4. Four cards on what I run: a definitions doc, a context file per project, a skills library, and a work log in the CRM.
5. The upkeep loop: do the work -> close the session -> log the lesson -> weekly retro. Under it sit three drift checks.
6. Four permissions cards.
7. Five failure-mode cards.
8. A 4-step "where to start" list.

## Research findings

### Internet (verified by fetch)
- **Definition.** A company brain is a persistent, shared context layer for people and agents. Slite traces the term through "second brain," enterprise search, context graphs and YC's Summer 2026 request for startups: https://slite.com/learn/company-brain and https://slite.com/learn/context-layer
- **Who is talking about it.**
  - Garry Tan's talk "Every company should have a Brain": https://www.ai.engineer/talks/eBUyTS7SzV4-every-company-should-have-brain
  - Foundation Capital on context graphs: https://foundationcapital.com/context-graphs-one-month-in/
  - Atlan's governance-first view: https://atlan.com/know/what-is-the-enterprise-context-layer.md
  - Writer's "Enterprise Brain": https://www.cmswire.com/customer-experience/writer-launches-enterprise-brain-to-unify-ai-agent-context/
  - Zoom's Unified Context Layer: https://letsdatascience.com/news/zoom-launches-unified-context-layer-for-ai-agents-at-zoomtop-f3bea42f
  - Allen Pike, a practitioner: https://allenpike.com/2026/the-brains-of-the-operation
- **Schools of thought.**
  - **Connect everything and index it.** Merge: https://www.merge.dev/blog/universal-context-layer
  - **Curated markdown in git.** AGENTS.md or CLAUDE.md plus skills: Allen Pike, and https://dormway.app/the-brain-git-based-documentation-as-development-accelerator
  - **A data or semantic layer.** https://delphina.ai/recently-published/what-is-a-company-brain
  - **Governance first, with lineage and approvals.** Atlan and Foundation Capital.
- **Failure modes.**
  - Stale facts sitting next to reversed decisions, and no per-agent permissions: https://www.spinach.ai/blog/company-brain-still-cant-do
  - Memory that agents can write to, which can be poisoned, and no owner or review date: https://neuraltrust.ai/blog/how-to-build-a-company-brain
  - "Better retrieval doesn't fix rot": https://falconer.com/guides/how-to-build-company-brain/
  - Conflicting definitions: Atlan.
- **X claim checks.**
  - Merge's Universal Context Layer is real (blog above). The Nov date and the X post itself are unverified, because x.com returned 402.
  - The Towards Data Science piece exists: https://towardsdatascience.com/how-to-build-a-context-layer-and-a-company-brain/. Its date and byline are unverified.
  - "How to Build a Company Brain That Doesn't Rot" was not found under that title.

### X (pulled 2026-11-19; paraphrased only, no quotes on the page)
- **Several teams arrived at the same setup on their own:** markdown SOPs in GitHub plus MCP connectors. Examples: https://x.com/fivosaresti/status/2098049059344773440 and https://x.com/dan__rosenthal/status/2117346148214014217
- **The hard part is freshness, governance and permissions, not connectors.** Examples: https://x.com/Cch_Chichieh/status/2122048195878654200 and https://x.com/Title9Jen/status/2096303899527578069
- **"It's a data integration play."** https://x.com/samuelstroschei/status/2102065491636584793. This is the angle the page takes.
- **Repetition means the context is missing:** https://x.com/aryanXmahajan/status/2114378985115468033
- **Vendor posts are loud, and practitioner posts get the bookmarks:** https://x.com/merge_api/status/2117649727835525382

## What from your setup the page uses
These were verified by a read-only scan.

| Page claim | Source |
|---|---|
| Hero lede ("Connecting tools is the easy part; keeping it true is the real work.") | X freshness/governance trend: https://x.com/Cch_Chichieh/status/2122048195878654200, https://x.com/Title9Jen/status/2096303899527578069; Falconer ("Better retrieval doesn't fix rot") |
| Short version, line 1 ("Explaining the same thing to AI every day? The context is missing.") | X trend (paraphrased): https://x.com/aryanXmahajan/status/2114378985115468033; your Nov 10 call ("so you don't have to tell it over and over") |
| Short version, line 2 ("Write definitions and playbooks first. Connect tools after.") | Your Nov 10 call ("context.md", "maybe like three skills"); `worai/docs/adr/0004-single-wor-glossary-in-worai.md` |
| Short version, line 3 ("Log the work, or the next session starts from zero.") | `dataspoke/crm/mcp/crm_mcp/server.py`; `start-session` and `log-work` skills |
| Short version, line 4 ("Treat freshness and permissions like data quality. That's where I see these setups break.") | Falconer (rot), Spinach (per-agent permissions), NeuralTrust (no owner), X freshness/permissions trend above |
| A definitions doc for a client platform that sits next to the schema and that agents read when changing code | `wor/worai/CONTEXT.md:5-6`; `wor/worai/docs/adr/0004-single-wor-glossary-in-worai.md:28-29` ("sits next to the schema and changes in the same commit"), `:37-41` ("agents changing code need the terms in the repo", read at commit time) |
| "The same word is defined in a few places, and they disagree." (failure mode) | `wor/worai/docs/adr/0004-single-wor-glossary-in-worai.md:8` ("defined in four groups of files that disagreed", since consolidated); Atlan on conflicting definitions |
| "Built largely from meeting transcripts" and the quote "What I told the team: The tighter we get this..." | Your words on a client call, Nov 13 (from the pasted context). **No file says this.** |
| A context file per project | 34 CLAUDE.md and 5 AGENTS.md files under `~/work`; `claude-config/docs/routers/README.md:4` |
| A skills library in bundles, improved by use | `claude-config/bundles/*/skills` (49 of your own skills in 6 bundles, plus 12 third-party); your Nov 10 call ("you'll make a skill and it's going to suck") |
| A work log in the CRM, one task per session, with file locations | `dataspoke/crm/mcp/crm_mcp/server.py` (CRM MCP tools); the start-session and log-work skills |
| Close the session and ask whether the setup could have prevented it | `claude-config/bundles/ops/skills/close-session/SKILL.md:243-253, 290` |
| The weekly retro turns lessons into changes | `claude-config/docs/retros/2026-W45.md` |
| Glossary and context files update in the same commit as schema changes | `wor/worai/docs/adr/0004-single-wor-glossary-in-worai.md:28-29`; `claude-config/CLAUDE.md:96` |
| A CI job flags MCP doc drift | `wor/worai/.github/workflows/mcp-docs-check.yml:1-9` (advisory on GitHub, so the page says "flags", not "fails") |
| One claim-check skill shared by two agent systems, with a drift warning | `claude-config/bundles/ops/skills/verify-before-presenting/SKILL.md:18`; `_catalog/build.py:197` |
| Production databases are read-only | `claude-config/CLAUDE.md:15` |
| Identity per folder | `claude-config/auth/README.md:3`; `auth/map.json` |
| A ratchet on private data ("fails CI and waits for my review") | `wor/worai/.github/workflows/contact-access-check.yml:2-5` (fails CI on un-allowlisted reads; advisory on GitHub, enforced by merge skills); `scripts/checks/README.md:37-38` (Nick reviews added allowlist lines) |
| A person at the gates | `claude-config/CLAUDE.md:23` ("Run to a gate") |
| Where to start: one context file, three skills, log what someone will need | Your Nov 10 call ("context.md", "maybe like three skills"); Orchestrator chat, Nov 9 ("I don't want everything") |
| "Wiring tools in" column (connect-everything, one pile, access as wide as the connector, set up once) | Merge: https://www.merge.dev/blog/universal-context-layer; Spinach: https://www.spinach.ai/blog/company-brain-still-cant-do; NeuralTrust; X: https://x.com/Cch_Chichieh/status/2122048195878654200. Every row hedged with "Often". |
| Failure modes "Rot", "Leaky access", "No owner" | Falconer (rot), Spinach (per-agent permissions), NeuralTrust (no owner or review date); links in Research |
| "Logging everything" failure mode | Your Orchestrator chat, Nov 9 ("we also need to decide what gets logged") |
| Layer notes (CRM, meetings, app database, MCP tools, skills, key terms) | The brief's layer list; examples drawn only from the rows above (CRM, meetings, app database, MCP tools, skills) |

**Not found in any file:** the "Your Business Can't See Itself: The Layers of Company Data" article. The layers diagram uses the list from the brief, and the page doesn't cite the article.

## How it's kept a draft, and what to do at publish
**Now:**
- `noIndex: true` in the page metadata, which renders `noindex, nofollow`.
- A visible "Draft - not published" badge.
- No links to it from the nav, the /insights index, `sitemap.ts` or `llms.txt`.

**At publish:**
1. Merge `main` (which already includes the React Insights registry in `src/content/insights.ts` from PR #33).
2. Remove `noIndex: true` and the badge from `src/app/insights/company-brain/page.tsx`, and `draftBadge` from `src/content/company-brain.ts`.
3. Register the post in `INSIGHT_ENTRIES` (`src/content/insights.ts`) with `status: "published"` (or keep it `"draft"` while staging) and move the component under the registry pattern so `/insights`, `sitemap.xml`, `llms.txt`, and `ArticleJsonLd` stay in sync automatically.

## Open questions for Nick
1. Is blog the right route? Or do you want this folded into the existing Company Brain product page as a "how it works" section?
2. Do you want a number or two? Options from your files: 49 skills of your own in 6 bundles; 34 project context files. I left them out because they go stale.
3. Two lines come only from your Nov 13 call, not a file: "built largely from meeting transcripts" and the quote "The tighter we get this, the better the MCP tools will be." Are they accurate, and OK to show with the lead-in "What I told the team"?
4. Should the post link to the Company Brain product page, or stay pitch-free?
5. Did the "Layers of Company Data" article exist somewhere? If so, the post could link to it.

## Preview
- **PR preview** (see the PR body for the exact URL): `https://ds-website-git-t3-company-brain-page-nicks-projects-38acee34.vercel.app/insights/company-brain`
- **Screenshots:** `docs/previews/company-brain/desktop-1440.jpg` and `docs/previews/company-brain/phone-390.jpg`
