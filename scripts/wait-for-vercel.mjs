#!/usr/bin/env node
/**
 * Block until the Vercel production deployment for this commit succeeds.
 * IndexNow has to run after the key file is on the public site, which is
 * only true once Vercel marks the Production deployment successful.
 */

const repo = process.env.GITHUB_REPOSITORY;
const sha = process.env.GITHUB_SHA;
const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
const TIMEOUT_MS = 10 * 60 * 1000;
const INTERVAL_MS = 10_000;

if (!repo || !sha) {
  console.error("GITHUB_REPOSITORY and GITHUB_SHA are required.");
  process.exit(1);
}
if (!token) {
  console.error("GH_TOKEN is required to read GitHub deployment status.");
  process.exit(1);
}

async function github(path) {
  const response = await fetch(`https://api.github.com${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "dataspoke-indexnow",
    },
    signal: AbortSignal.timeout(20_000),
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`GitHub API ${response.status} for ${path}: ${body}`);
  }
  return response.json();
}

async function productionState() {
  const deployments = await github(
    `/repos/${repo}/deployments?sha=${sha}&environment=Production&per_page=20`,
  );
  const matches = deployments.filter(
    (deployment) =>
      deployment.sha === sha &&
      deployment.environment === "Production" &&
      deployment.task === "deploy",
  );
  if (matches.length === 0) return { state: "missing" };

  const deployment = matches[0];
  const statuses = await github(
    `/repos/${repo}/deployments/${deployment.id}/statuses?per_page=10`,
  );
  const state = statuses[0]?.state ?? "pending";
  return { state, id: deployment.id, description: statuses[0]?.description ?? "" };
}

const deadline = Date.now() + TIMEOUT_MS;

while (Date.now() < deadline) {
  const current = await productionState();
  if (current.state === "success") {
    console.log(
      `Vercel production deployment ${current.id} succeeded${current.description ? `: ${current.description}` : ""}.`,
    );
    process.exit(0);
  }
  if (current.state === "failure" || current.state === "error") {
    console.error(
      `Vercel production deployment ${current.id} ${current.state}${current.description ? `: ${current.description}` : ""}.`,
    );
    process.exit(1);
  }
  console.log(
    current.state === "missing"
      ? `No Production deployment yet for ${sha}. Waiting.`
      : `Production deployment ${current.id} is ${current.state}. Waiting.`,
  );
  await new Promise((done) => setTimeout(done, INTERVAL_MS));
}

console.error("Timed out waiting for the Vercel production deployment.");
process.exit(1);
