import {
  ASSESSMENT,
  BOOKING_URL,
  CONTACT_EMAIL,
  CREDENTIALS,
  LOCATION,
  RETAINER_NOTE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  STAGES,
  STEPS,
  TOOLS,
} from "@/lib/constants";

// Plain-text summary for AI assistants and answer engines (https://llmstxt.org).
// Built from the same constants as the pages, so it stays in sync with the site copy.
export const dynamic = "force-static";

function body() {
  const lines: string[] = [
    `# ${SITE_NAME}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    `${SITE_NAME} is run by Nick Paul from ${LOCATION}: ${CREDENTIALS.slice(0, 3).join("; ")}. One senior consultant, no hand-offs. Clients are owner-run small businesses (roughly 5 to 50 people) across the United States whose CRM, accounting, phone and marketing tools don't talk to each other.`,
    "",
    `Systems commonly connected: ${TOOLS.join(", ")}.`,
    "",
    "## Products",
    "",
  ];

  for (const stage of STAGES) {
    lines.push(`### ${stage.number} ${stage.title}: ${stage.summary}`, "");
    for (const p of stage.products) {
      lines.push(`- [${p.title}](${SITE_URL}/services#${p.slug}): ${p.description} Typical result: ${p.result}`);
    }
    lines.push("");
  }

  lines.push(
    RETAINER_NOTE,
    "",
    "## The AI Assessment",
    "",
    `Price: ${ASSESSMENT.price}, ${ASSESSMENT.terms}.`,
    "",
    ASSESSMENT.lede,
    "",
    ...ASSESSMENT.includes.map((i) => `- ${i}`),
    "",
    ASSESSMENT.credit,
    "",
    "## How it works",
    "",
    ...STEPS.map((s) => `- ${s.title}: ${s.description}`),
    "",
    "## Pages",
    "",
    `- [Home](${SITE_URL}): what ${SITE_NAME} does and who it's for`,
    `- [Products](${SITE_URL}/services): every product, who it fits and what you get`,
    `- [About](${SITE_URL}/about): Nick Paul's background and how he works`,
    `- [Contact](${SITE_URL}/contact): book a free 30-minute call or send a note`,
    "",
    "## Contact",
    "",
    `- Email: ${CONTACT_EMAIL}`,
    `- Book a free 30-minute call: ${BOOKING_URL}`,
    ""
  );

  return lines.join("\n");
}

export function GET() {
  return new Response(body(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
