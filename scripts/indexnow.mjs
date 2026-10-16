#!/usr/bin/env node
/**
 * Submit every sitemap URL to IndexNow.
 *
 * The payload host is dataspoke.io. That apex host 308-redirects to
 * www.dataspoke.io, and IndexNow only accepts a key file that answers
 * HTTP 200 (it does not follow the redirect). The script therefore
 * submits whichever of those two hosts actually serves public/<key>.txt.
 */

import { readFileSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
const REQUESTED_HOST = "dataspoke.io";
const SITE_HOSTS = new Set(["dataspoke.io", "www.dataspoke.io"]);
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC_DIR = resolve(ROOT, "public");
const LOCAL_SITEMAP = resolve(PUBLIC_DIR, "sitemap.xml");
const KEY_FILENAME = /^[a-zA-Z0-9-]{8,128}\.txt$/;
const URL_LIMIT = 10_000;

function findKey() {
  const keys = readdirSync(PUBLIC_DIR)
    .filter((name) => KEY_FILENAME.test(name))
    .map((name) => {
      const key = name.slice(0, -".txt".length);
      const body = readFileSync(resolve(PUBLIC_DIR, name), "utf8").replace(/^\uFEFF/, "").trim();
      return body === key ? key : null;
    })
    .filter(Boolean);

  if (keys.length !== 1) {
    throw new Error(
      keys.length === 0
        ? "No IndexNow key file in public/. Add public/<key>.txt whose contents are the key."
        : `Expected one IndexNow key file in public/, found ${keys.length}.`,
    );
  }
  return keys[0];
}

function decodeXml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'");
}

function extractLocs(xml) {
  const locs = [];
  const pattern = /<loc>\s*([^<]+?)\s*<\/loc>/gi;
  for (const match of xml.matchAll(pattern)) {
    locs.push(decodeXml(match[1].trim()));
  }
  return locs;
}

function normalizeUrl(loc, host) {
  let url;
  try {
    url = new URL(loc.trim());
  } catch {
    return null;
  }
  const hostname = url.hostname.toLowerCase();
  if (!SITE_HOSTS.has(hostname)) return null;
  if (hostname === host && url.protocol === "https:") return loc.trim();
  const path = url.pathname === "/" ? "" : url.pathname;
  return `https://${host}${path}${url.search}`;
}

function urlsForHost(locs, host) {
  const seen = new Set();
  const urls = [];
  for (const loc of locs) {
    const url = normalizeUrl(loc, host);
    if (!url || seen.has(url)) continue;
    seen.add(url);
    urls.push(url);
  }
  return urls;
}

function resolveSource(source) {
  if (/^https?:\/\//i.test(source)) return source;
  return resolve(source);
}

async function loadXml(source) {
  if (/^https?:\/\//i.test(source)) {
    const response = await fetch(source, {
      redirect: "follow",
      signal: AbortSignal.timeout(15_000),
    });
    if (!response.ok) throw new Error(`${source} returned HTTP ${response.status}`);
    const xml = await response.text();
    if (!/<(urlset|sitemapindex)\b/i.test(xml)) {
      throw new Error(`${source} is not a sitemap`);
    }
    return xml;
  }
  return readFileSync(source, "utf8");
}

async function collectLocs(source, seen = new Set()) {
  const resolved = resolveSource(source);
  if (seen.has(resolved)) return [];
  seen.add(resolved);
  const xml = await loadXml(resolved);
  const locs = extractLocs(xml);
  if (!/<sitemapindex\b/i.test(xml)) return locs;

  const nested = [];
  for (const loc of locs) {
    nested.push(...(await collectLocs(loc, seen)));
  }
  return nested;
}

async function readKeyFile(url, key) {
  const response = await fetch(url, {
    redirect: "manual",
    signal: AbortSignal.timeout(15_000),
  });
  if (response.status !== 200) return { ok: false, status: response.status };
  const body = (await response.text()).replace(/^\uFEFF/, "").trim();
  return { ok: body === key, status: response.status };
}

async function resolveHost(key) {
  const deadline = Date.now() + 60_000;
  let lastError = "IndexNow key file was not served";

  while (true) {
    for (const host of [REQUESTED_HOST, `www.${REQUESTED_HOST}`]) {
      const keyLocation = `https://${host}/${key}.txt`;
      try {
        const result = await readKeyFile(keyLocation, key);
        if (result.ok) {
          if (host !== REQUESTED_HOST) {
            console.log(
              `${REQUESTED_HOST} does not serve the key with HTTP 200. Submitting host ${host}.`,
            );
          }
          return { host, keyLocation };
        }
        lastError = `${keyLocation} returned HTTP ${result.status}`;
      } catch (error) {
        lastError = error instanceof Error ? error.message : String(error);
      }
    }
    if (Date.now() >= deadline) break;
    await new Promise((done) => setTimeout(done, 5_000));
  }

  throw new Error(
    `${lastError}. IndexNow fetches https://<host>/<key>.txt and requires HTTP 200.`,
  );
}

async function loadLocs(host, sitemapPath) {
  if (sitemapPath) return collectLocs(sitemapPath);
  const live = `https://${host}/sitemap.xml`;
  try {
    return await collectLocs(live);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.log(`Could not read ${live} (${message}). Using public/sitemap.xml.`);
    return collectLocs(LOCAL_SITEMAP);
  }
}

async function submit(payload) {
  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(30_000),
  });
  const body = await response.text();
  if (response.status !== 200 && response.status !== 202) {
    throw new Error(`IndexNow responded HTTP ${response.status}: ${body}`);
  }
  console.log(
    `IndexNow accepted ${payload.urlList.length} URLs for ${payload.host} (HTTP ${response.status}).`,
  );
}

async function main() {
  const dryRun = process.argv.includes("--dry-run");
  const sitemapFlag = process.argv.indexOf("--sitemap");
  const sitemapPath = sitemapFlag === -1 ? undefined : process.argv[sitemapFlag + 1];
  if (sitemapFlag !== -1 && !sitemapPath) {
    throw new Error("Pass a path or URL after --sitemap.");
  }

  const key = findKey();
  const host = dryRun ? REQUESTED_HOST : (await resolveHost(key)).host;
  const keyLocation = `https://${host}/${key}.txt`;
  const locs = dryRun
    ? await collectLocs(sitemapPath ?? LOCAL_SITEMAP)
    : await loadLocs(host, sitemapPath);
  const urlList = urlsForHost(locs, host);
  if (urlList.length === 0) {
    throw new Error("Sitemap did not contain any dataspoke.io URLs.");
  }

  if (dryRun) {
    console.log(JSON.stringify({ host, key, keyLocation, urlList }, null, 2));
    console.log(
      `Dry run: ${urlList.length} URLs. Nothing was submitted. A production run uses www.dataspoke.io when the apex host redirects.`,
    );
    return;
  }

  for (let start = 0; start < urlList.length; start += URL_LIMIT) {
    await submit({
      host,
      key,
      keyLocation,
      urlList: urlList.slice(start, start + URL_LIMIT),
    });
  }
}

const isDirectRun =
  process.argv[1] !== undefined && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isDirectRun) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}
