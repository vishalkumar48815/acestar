#!/usr/bin/env node
/**
 * Optimised images for the About pages (Company Profile, Awards, Clients & Partners),
 * sourced from the legacy import.
 *
 *   npm run import:legacy     # once: downloads the old site into legacy/
 *   npm run media:about       # converts the list below into public/images/pages/about/*
 *
 * Writes src/content/about/media.generated.json keyed by the legacy path, so content files
 * stay traceable to the old site. Missing files are reported and skipped.
 */
import { access, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LEGACY = path.resolve(process.env.LEGACY_DIR ?? path.join(ROOT, "legacy/assets"));
const OUT_JSON = path.join(ROOT, "src/content/about/media.generated.json");

/** group → [legacy path, max width] */
const groups = {
  awards: [
    "2026/07/adobe-awards-logo.png",
    "2026/07/lenovo-awards-logo.png",
    "2026/07/autodesk-awards-logo.png",
    "2026/07/sme-awards-logo.png",
    "2026/07/mcmc-awards-logo.png",
    "2026/07/pikom-awards-logo.png",
    "2026/07/asus-awards-logo.png",
    "2026/07/certiport-awards-logo.png",
    "2026/07/mcwea-awards-logo.png",
    "2021/11/Adobe-top-seller-FY20.png",
    "2021/11/EY-Entrepreneur-of-the-year-2020.png",
    "2021/11/Soba.png",
    "2021/11/e50-2019.png",
    "2021/11/Frost-Sullivan.png",
    "2021/11/SOBA-10-years-most-award-won.png",
    "2021/11/EY-Enterpreneur-of-the-year-2018.png",
    "2021/11/MMC-Millan-woods-global-award.png",
    "2021/11/Platinum-business-award-2018.png",
    "2021/11/SME-enterpreneurship-business-award.png",
    "2021/11/Business-Excellent-Awards-2016.png",
    "2021/11/Platinum-business-award-2016.png",
    "2021/11/SOBA-2016-grand-winner-female-entrepreneur-of-the-year.png",
    "2021/11/SOBA-2016-winnar-best-employer.png",
    "2021/11/Adobe-award.png",
    "2021/11/SOBA-most-promising-award-2015.png",
    "2021/11/SME-Recognition-Award-2015.png",
    "2021/11/Adobe-Partner-of-the-year-award.png",
    "2021/11/Adobe-Top-Creative-Partner.png",
    "2021/11/Adobe-1.png",
    "2021/11/SME-Recognition-Award-2014.png",
    "2021/11/SME-Recognition-Award-2013.png",
  ].map((p) => [p, 960]),
  photos: [
    ["2025/12/WhatsApp-Image-2025-12-26-at-6.05.38-PM.jpeg", 2560],
    ["2026/07/web-11.jpg", 2560],
    ["2026/07/web-12.jpg", 2560],
    ["2026/07/web-20-1.jpg", 2560],
    ["2026/07/web-24.jpg", 2560],
    ["2026/07/web-08.jpg", 2560],
    ["2022/09/acp-432-1.webp", 2560],
  ],
};

const quality = { awards: 90, photos: 88 };

const exists = (f) =>
  access(f).then(
    () => true,
    () => false,
  );
const slug = (p) =>
  p
    .replace(/\.(png|jpe?g|webp)$/i, "")
    .replace(/[^a-z0-9]+/gi, "-")
    .toLowerCase();

async function main() {
  const manifest = {};
  const missing = [];
  let bytes = 0;
  for (const [group, list] of Object.entries(groups)) {
    for (const [rel, maxWidth] of list) {
      const input = path.join(LEGACY, rel);
      if (!(await exists(input))) {
        missing.push(rel);
        continue;
      }
      const outRel = `images/pages/about/${group}/${slug(rel)}.webp`;
      const output = path.join(ROOT, "public", outRel);
      await mkdir(path.dirname(output), { recursive: true });
      const { data, info } = await sharp(input)
        .rotate()
        .resize({ width: maxWidth, withoutEnlargement: true })
        .webp({ quality: quality[group], effort: 6, alphaQuality: 95 })
        .toBuffer({ resolveWithObject: true });
      await writeFile(output, data);
      bytes += data.length;
      manifest[rel] = { src: `/${outRel}`, width: info.width, height: info.height };
    }
  }
  await mkdir(path.dirname(OUT_JSON), { recursive: true });
  const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
  await writeFile(OUT_JSON, `${JSON.stringify(sorted, null, 2)}\n`);
  console.log(
    `Built ${Object.keys(manifest).length} images (${(bytes / 1048576).toFixed(1)} MB) → public/images/pages/about`,
  );
  if (missing.length) console.log(`Skipped ${missing.length} missing:\n  ${missing.join("\n  ")}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
