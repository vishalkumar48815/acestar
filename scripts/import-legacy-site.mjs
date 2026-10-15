#!/usr/bin/env node
/**
 * One-off import of the old WordPress site (acestar.my).
 *
 *   npm run import:legacy
 *
 * - Saves every page's HTML to legacy/pages/ (reference for content migration)
 * - Downloads every image/media file from /wp-content/uploads/ to legacy/assets/
 *   (prefers the full-size original over WordPress's resized "-300x200" variants)
 * - Writes legacy/manifest.json: url → local file, size, pages it appears on, alt text
 *
 * Safe to re-run: files already downloaded are skipped. No dependencies (Node 18+).
 * The legacy/ folder is git-ignored; curated, optimised images are copied into public/.
 */
import { mkdir, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ORIGIN = "https://acestar.my";
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "legacy");
const PAGES = [
  "/",
  "/company-profile/",
  "/awards/",
  "/clients-partners/",
  "/creative-software/",
  "/creative-cloud/",
  "/high-performance-computer/",
  "/solution/apple/",
  "/digital-workflow/",
  "/adobe-acrobat/",
  "/techcare/",
  "/news/",
  "/blogs/",
  "/gallery/",
  "/career/",
  "/contact-acestarian/",
  "/techsupport/",
  "/acestar-privacy-policies/",
  "/terms-of-use/",
  "/return-and-refund-policy/",
  "/delivery-policy/",
];
const MEDIA_RE =
  /(?:https?:)?(?:\\?\/\\?\/acestar\.my)?\\?\/wp-content\\?\/uploads\\?\/[^"'\s)<>,]+?\.(?:png|jpe?g|gif|webp|avif|svg|ico|mp4|webm|pdf)/gi;
const CONCURRENCY = 6;
const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AcestarLegacyImport/1.0";

const slug = (p) => (p === "/" ? "home" : p.replace(/^\/|\/$/g, "").replace(/\//g, "__"));
const exists = (f) =>
  stat(f).then(
    () => true,
    () => false,
  );

function normalise(raw) {
  let u = raw.replace(/\\\//g, "/");
  if (u.startsWith("//")) u = `https:${u}`;
  if (u.startsWith("/")) u = `${ORIGIN}${u}`;
  return u.split("?")[0].split("#")[0];
}

/** WordPress resized variant ("photo-300x200.jpg") → original ("photo.jpg"). */
const originalOf = (u) => u.replace(/-\d{2,4}x\d{2,4}(?=\.[a-z]+$)/i, "").replace(/-scaled(?=\.[a-z]+$)/i, "");

async function fetchWithRetry(url, tries = 3) {
  for (let attempt = 1; attempt <= tries; attempt++) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": UA } });
      if (res.status === 404) return res;
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res;
    } catch (err) {
      if (attempt === tries) throw err;
      await new Promise((r) => setTimeout(r, 800 * attempt));
    }
  }
}

async function pool(items, worker) {
  let i = 0;
  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (i < items.length) await worker(items[i++]);
    }),
  );
}

async function main() {
  await mkdir(path.join(ROOT, "pages"), { recursive: true });
  const media = new Map(); // url -> { pages:Set, alt:Set }

  console.log(`Fetching ${PAGES.length} pages from ${ORIGIN} …`);
  await pool(PAGES, async (p) => {
    try {
      const res = await fetchWithRetry(ORIGIN + p);
      const html = await res.text();
      await writeFile(path.join(ROOT, "pages", `${slug(p)}.html`), html);
      for (const m of html.matchAll(MEDIA_RE)) {
        const url = normalise(m[0]);
        if (!media.has(url)) media.set(url, { pages: new Set(), alt: new Set() });
        media.get(url).pages.add(p);
      }
      for (const m of html.matchAll(/<img[^>]+src="([^"]+)"[^>]*alt="([^"]*)"/gi)) {
        const url = normalise(m[1]);
        if (media.has(url) && m[2]) media.get(url).alt.add(m[2]);
      }
      console.log(`  ✓ page ${p}`);
    } catch (err) {
      console.error(`  ✗ page ${p}: ${err.message}`);
    }
  });

  // Prefer originals; keep the variant only if no original is referenced/available.
  const targets = new Map();
  for (const [url, info] of media) {
    const orig = originalOf(url);
    const t = targets.get(orig) ?? { candidates: new Set(), pages: new Set(), alt: new Set() };
    t.candidates.add(orig);
    t.candidates.add(url);
    info.pages.forEach((p) => t.pages.add(p));
    info.alt.forEach((a) => t.alt.add(a));
    targets.set(orig, t);
  }

  console.log(`\nDownloading ${targets.size} media files …`);
  const manifest = [];
  let ok = 0,
    skipped = 0,
    failed = 0;
  await pool([...targets.values()], async (t) => {
    for (const candidate of t.candidates) {
      const rel = candidate.replace(`${ORIGIN}/wp-content/uploads/`, "");
      const file = path.join(ROOT, "assets", rel);
      try {
        if (await exists(file)) {
          skipped++;
        } else {
          const res = await fetchWithRetry(candidate);
          if (res.status === 404) continue;
          const buf = Buffer.from(await res.arrayBuffer());
          await mkdir(path.dirname(file), { recursive: true });
          await writeFile(file, buf);
          ok++;
        }
        const { size } = await stat(file);
        manifest.push({
          url: candidate,
          file: `legacy/assets/${rel}`,
          bytes: size,
          pages: [...t.pages],
          alt: [...t.alt],
        });
        return;
      } catch (err) {
        console.error(`  ✗ ${candidate}: ${err.message}`);
      }
    }
    failed++;
  });

  manifest.sort((a, b) => a.url.localeCompare(b.url));
  await writeFile(path.join(ROOT, "manifest.json"), JSON.stringify(manifest, null, 2));
  const mb = (manifest.reduce((s, m) => s + m.bytes, 0) / 1048576).toFixed(1);
  console.log(`\nDone: ${ok} downloaded, ${skipped} already present, ${failed} failed (${mb} MB total).`);
  console.log(`Manifest: legacy/manifest.json`);
  if (manifest.length === 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
