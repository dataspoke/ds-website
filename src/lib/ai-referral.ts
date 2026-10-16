/**
 * AI assistants that count as a referral. `id` is the GA4 `ai_source` value.
 * Hosts match the hostname exactly or as a subdomain. bing.com counts only
 * on /chat, so ordinary Bing search is left out.
 */
const AI_ASSISTANTS: readonly {
  id: string;
  hosts: readonly string[];
  pathPrefix?: string;
}[] = [
  { id: "chatgpt.com", hosts: ["chatgpt.com"] },
  { id: "chat.openai.com", hosts: ["chat.openai.com"] },
  { id: "perplexity.ai", hosts: ["perplexity.ai"] },
  { id: "claude.ai", hosts: ["claude.ai"] },
  { id: "gemini.google.com", hosts: ["gemini.google.com"] },
  { id: "copilot.microsoft.com", hosts: ["copilot.microsoft.com"] },
  { id: "bing.com/chat", hosts: ["bing.com"], pathPrefix: "/chat" },
  { id: "you.com", hosts: ["you.com"] },
  { id: "phind.com", hosts: ["phind.com"] },
  { id: "poe.com", hosts: ["poe.com"] },
];

/** Short utm_source values that are not themselves a hostname. */
const UTM_ALIASES: Record<string, string> = {
  chatgpt: "chatgpt.com",
  openai: "chat.openai.com",
  perplexity: "perplexity.ai",
  claude: "claude.ai",
  gemini: "gemini.google.com",
  copilot: "copilot.microsoft.com",
  phind: "phind.com",
  poe: "poe.com",
};

function hostMatches(hostname: string, host: string): boolean {
  return hostname === host || hostname.endsWith(`.${host}`);
}

function matchUrl(raw: string): string | null {
  if (!raw) return null;

  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return null;
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") return null;

  const hostname = url.hostname.toLowerCase().replace(/\.$/, "");
  for (const assistant of AI_ASSISTANTS) {
    if (!assistant.hosts.some((host) => hostMatches(hostname, host))) continue;
    if (assistant.pathPrefix) {
      const prefix = assistant.pathPrefix;
      if (url.pathname !== prefix && !url.pathname.startsWith(`${prefix}/`)) continue;
    }
    return assistant.id;
  }
  return null;
}

function matchUtmSource(value: string | null): string | null {
  if (!value) return null;
  const raw = value.trim().toLowerCase();
  if (!raw) return null;
  const alias = UTM_ALIASES[raw];
  if (alias) return alias;
  if (raw.startsWith("http://") || raw.startsWith("https://")) return matchUrl(raw);
  if (raw.includes(".")) return matchUrl(`https://${raw}`);
  return null;
}

/**
 * Referrer wins when both match, because it is the page the visitor actually
 * came from. utm_source covers links that hide the referrer.
 */
export function detectAiSource(referrer: string, search: string): string | null {
  return matchUrl(referrer) ?? matchUtmSource(new URLSearchParams(search).get("utm_source"));
}
