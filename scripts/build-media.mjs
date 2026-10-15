#!/usr/bin/env node
/**
 * Builds optimised site images from the legacy import.
 *
 *   npm run import:legacy   # once: downloads the old site into legacy/
 *   npm run media:build     # converts the curated list below into public/images/*
 *
 * - Resizes and converts to WebP (keeps transparency), strips metadata
 * - Generates the light-mode logo by recolouring the white wordmark of the official logo
 * - Generates favicon.ico, icon.png and apple-icon.png from the official mark
 * - Writes src/content/media.generated.json (paths + intrinsic sizes) for next/image
 *
 * To add an image: add an entry to IMAGES and re-run. LEGACY_DIR can point elsewhere.
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LEGACY = path.resolve(process.env.LEGACY_DIR ?? path.join(ROOT, "legacy/assets"));
const PUBLIC = path.join(ROOT, "public");
const OUT_JSON = path.join(ROOT, "src/content/media.generated.json");

/** key → [legacy file, output path under public/, max width, quality] */
const IMAGES = {
  "brand.signature": [
    "2022/04/natalie-sit_dd9257fb25bebcac1250f8bb7c136a1c-1.png",
    "images/brand/ceo-signature.webp",
    252,
    90,
  ],
  "awards.ey2020": [
    "2022/04/EY-Entrepreneur-of-the-year-2020-small.png",
    "images/awards/ey-entrepreneur-2020.webp",
    252,
    90,
  ],
  "awards.e50": ["2022/04/e50-2019-small.png", "images/awards/e50-2019.webp", 210, 90],
  "awards.soba": ["2022/04/SOBA-10-years-most-award-won-small.png", "images/awards/soba-most-awards.webp", 222, 90],
  "awards.malaysiaDigital": ["2025/11/malaysia-digital-company.png", "images/awards/malaysia-digital.webp", 480, 90],

  "clients.petronas": ["2021/11/petronas.png", "images/clients/petronas.webp", 400, 85],
  "clients.bnm": ["2021/11/Bank_Negara_Malaysia.png", "images/clients/bank-negara-malaysia.webp", 400, 85],
  "clients.tng": ["2021/11/Touch_N_Go-e1637640247868.png", "images/clients/touch-n-go.webp", 400, 85],
  "clients.mrl": ["2021/11/Malaysia_Rail_Link.png", "images/clients/malaysia-rail-link.webp", 400, 85],
  "clients.sarawakEnergy": ["2021/11/Sarawak_Energy.png", "images/clients/sarawak-energy.webp", 400, 85],
  "clients.mindvalley": ["2021/11/mindvalley.png", "images/clients/mindvalley.webp", 400, 85],
  "clients.lemonSky": ["2021/11/Lemon_Sky_Studio.png", "images/clients/lemon-sky-studios.webp", 400, 85],

  "partners.adobe": ["2021/11/Adobe.png", "images/partners/adobe.webp", 400, 85],
  "partners.apple": ["2021/11/Apple.png", "images/partners/apple.webp", 400, 85],
  "partners.hp": ["2021/11/HP.png", "images/partners/hp.webp", 400, 85],
  "partners.microsoft": ["2021/12/microsoft.png", "images/partners/microsoft.webp", 400, 85],
  "partners.certiport": ["2021/11/Certiport.png", "images/partners/certiport.webp", 400, 85],
  "partners.autodesk": ["2022/09/autodesk.png", "images/partners/autodesk.webp", 400, 85],
  "partners.lenovo": ["2021/11/Lenovo.png", "images/partners/lenovo.webp", 400, 85],

  "campaigns.paperwork.desktop": [
    "2026/04/Website_BG-Website-copy-2.png",
    "images/campaigns/paperwork-desktop.webp",
    1920,
    78,
  ],
  "campaigns.paperwork.mobile": ["2026/04/Website_BG-Mobile.png", "images/campaigns/paperwork-mobile.webp", 750, 78],
  "campaigns.firefly.desktop": [
    "2025/11/WEBSITE-BASKETBALL_BG-Website-1.jpg",
    "images/campaigns/firefly-basketball-desktop.webp",
    1920,
    78,
  ],
  "campaigns.firefly.mobile": [
    "2025/11/WEBSITE-BASKETBALL_BG-Mobile-1.jpg",
    "images/campaigns/firefly-basketball-mobile.webp",
    750,
    78,
  ],
  "campaigns.hp.desktop": [
    "2025/09/HP-Digital_BG-Website-copy-2-1.jpg",
    "images/campaigns/hp-elitebook-x-desktop.webp",
    1920,
    78,
  ],
  "campaigns.hp.mobile": ["2025/09/HP-Digital_BG-Mobile.jpg", "images/campaigns/hp-elitebook-x-mobile.webp", 750, 78],
  "campaigns.anniversary.desktop": [
    "2025/09/17th-ann_BG-Website-copy-1.jpg",
    "images/campaigns/sweet-17th-desktop.webp",
    1920,
    78,
  ],
  "campaigns.anniversary.mobile": [
    "2025/09/17th-ann_BG-Mobile.jpg",
    "images/campaigns/sweet-17th-mobile.webp",
    750,
    78,
  ],
  "campaigns.imagination.desktop": [
    "2024/08/ADOBE-FIREFLY-BANNER_BD-Website-1.jpg",
    "images/campaigns/imagination-desktop.webp",
    1920,
    78,
  ],
  "campaigns.sign.mobile": ["2025/07/WBSITE-mobile-02.jpg", "images/campaigns/acrobat-sign-mobile.webp", 750, 78],

  "news.prweb": ["2024/08/4.jpg", "images/news/acp-world-champion-prweb.webp", 800, 80],
  "news.buletin": ["2024/08/3.jpg", "images/news/acp-world-champion-buletin-tv3.webp", 800, 80],
  "news.awani": ["2024/08/2.jpg", "images/news/acp-world-champion-astro-awani.webp", 800, 80],
};

const LOGO_SOURCE = "2022/01/NewGroup-45@2x.png"; // official header logo (gradient mark + white wordmark)
const MARK_SOURCE = "2021/12/Acestar-Logo.png"; // mark only, 336×358
const LIGHT_WORDMARK = [24, 128, 184]; // sampled from the old blue logo (NewBlueLogo.png)

const manifest = {};
const record = (key, rel, w, h) => (manifest[key] = { src: `/${rel}`, width: w, height: h });

async function convert(key, [src, rel, maxWidth, quality]) {
  const input = path.join(LEGACY, src);
  const output = path.join(PUBLIC, rel);
  await mkdir(path.dirname(output), { recursive: true });
  const { data, info } = await sharp(input)
    .rotate()
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality, effort: 6, alphaQuality: 95 })
    .toBuffer({ resolveWithObject: true });
  await writeFile(output, data);
  record(key, rel, info.width, info.height);
  return data.length;
}

async function buildLogos() {
  const input = path.join(LEGACY, LOGO_SOURCE);
  await mkdir(path.join(PUBLIC, "images/brand"), { recursive: true });

  const dark = await sharp(input).png({ compressionLevel: 9 }).toBuffer({ resolveWithObject: true });
  await writeFile(path.join(PUBLIC, "images/brand/acestar-logo-dark.png"), dark.data);
  record("brand.logoDark", "images/brand/acestar-logo-dark.png", dark.info.width, dark.info.height);

  // Light mode: recolour the near-white wordmark pixels to the brand blue; keep alpha + gradient mark.
  const raw = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const px = Buffer.from(raw.data);
  for (let i = 0; i < px.length; i += 4) {
    const max = Math.max(px[i], px[i + 1], px[i + 2]);
    const min = Math.min(px[i], px[i + 1], px[i + 2]);
    if (min > 185 && max - min < 40) [px[i], px[i + 1], px[i + 2]] = LIGHT_WORDMARK;
  }
  const light = await sharp(px, { raw: raw.info }).png({ compressionLevel: 9 }).toBuffer({ resolveWithObject: true });
  await writeFile(path.join(PUBLIC, "images/brand/acestar-logo-light.png"), light.data);
  record("brand.logoLight", "images/brand/acestar-logo-light.png", light.info.width, light.info.height);
}

async function buildIcons() {
  const mark = path.join(LEGACY, MARK_SOURCE);
  const square = async (size, padRatio, background) => {
    const inner = Math.round(size * (1 - padRatio * 2));
    const pad = Math.round((size - inner) / 2);
    let img = sharp(mark)
      .resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .extend({
        top: pad,
        bottom: size - inner - pad,
        left: pad,
        right: size - inner - pad,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      });
    if (background) img = sharp(await img.png().toBuffer()).flatten({ background });
    return img.png({ compressionLevel: 9 }).toBuffer();
  };
  const appDir = path.join(ROOT, "src/app");
  await writeFile(path.join(appDir, "icon.png"), await square(512, 0.04));
  await writeFile(path.join(appDir, "apple-icon.png"), await square(180, 0.12, "#ffffff"));

  // favicon.ico containing 16/32/48 PNG images
  const sizes = [16, 32, 48];
  const images = await Promise.all(sizes.map((s) => square(s, 0.02)));
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(sizes.length, 4);
  let offset = 6 + 16 * sizes.length;
  const entries = sizes.map((s, i) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(s, 0);
    e.writeUInt8(s, 1);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(images[i].length, 8);
    e.writeUInt32LE(offset, 12);
    offset += images[i].length;
    return e;
  });
  await writeFile(path.join(appDir, "favicon.ico"), Buffer.concat([header, ...entries, ...images]));
}

async function main() {
  console.log(`Reading legacy images from ${path.relative(ROOT, LEGACY) || LEGACY}`);
  await buildLogos();
  await buildIcons();
  let total = 0;
  let failed = 0;
  for (const [key, spec] of Object.entries(IMAGES)) {
    try {
      total += await convert(key, spec);
    } catch (err) {
      failed++;
      console.error(`  ✗ ${key} (${spec[0]}): ${err.message}`);
    }
  }
  const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
  await writeFile(OUT_JSON, `${JSON.stringify(sorted, null, 2)}\n`);
  console.log(`Built ${Object.keys(manifest).length} images (${(total / 1024).toFixed(0)} KB WebP), ${failed} failed.`);
  console.log(`Wrote ${path.relative(ROOT, OUT_JSON)}`);
  if (failed) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
