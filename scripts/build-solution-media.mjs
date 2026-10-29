#!/usr/bin/env node
/**
 * Optimised images for the Products & Solutions pages, sourced from the legacy import.
 *
 *   npm run import:legacy          # once: downloads the old site into legacy/
 *   npm run media:solutions        # converts the list below into public/images/pages/*
 *
 * Writes src/content/solutions/media.generated.json keyed by the legacy path
 * (e.g. "2026/03/Image-13.png") so content files stay traceable to the old site.
 * Missing source files are reported and skipped (components render without them).
 */
import { mkdir, writeFile, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LEGACY = path.resolve(process.env.LEGACY_DIR ?? path.join(ROOT, "legacy/assets"));
const OUT_DIR = path.join(ROOT, "public/images/pages");
const OUT_JSON = path.join(ROOT, "src/content/solutions/media.generated.json");

/** [legacy path, max width] grouped by role. Quality is chosen per role below. */
const ICON = 192; // app/product icons
const LOGO = 480; // brand wordmarks
const PRODUCT = 760; // device shots
const WIDE = 1600; // banners & backgrounds
const HERO = 1920; // full-bleed hero backgrounds

const groups = {
  icons: [
    "2026/03/Image-12.png",
    "2026/03/Image-13.png",
    "2026/03/Image-14.png",
    "2026/03/Image-15.png",
    "2026/03/Image-16.png",
    "2026/03/Image-17.png",
    "2026/03/Image-26.png",
    "2026/03/Image-27.png",
    "2026/03/Image-28.png",
    "2026/03/Image-29.png",
    "2026/03/Image-30.png",
    "2026/03/Image-31.png",
    "2026/03/Image-33.png",
    "2026/03/Image-36.png",
    "2026/03/Image-37.png",
    "2026/03/Mask-Group-15.png",
    "2026/03/fonts.png",
    "2026/03/photoshop-icon-logo.png",
    "2026/03/Adobe_Illustrator_CC_icon.svg.png",
    "2026/03/Adobe_Premiere_Pro_CC_icon.svg.png",
    "2026/03/Adobe_Firefly_Logo.svg.png",
    "2026/03/Adobe_Express_Logo.svg.png",
    "2025/09/ALL-LOGO-19.png",
    "2025/09/ALL-LOGO-23.png",
    "2025/09/ALL-LOGO-29.png",
    "2025/09/ALL-LOGO-30.png",
    "2025/09/ALL-LOGO-31.png",
    "2025/09/ALL-LOGO-32.png",
    "2025/09/ALL-LOGO.png",
    "2025/10/ALL-LOGO-17.png",
    "2025/10/ALL-LOGO-18.png",
    "2025/10/ALL-LOGO-21.png",
    "2025/10/Adobe_Acrobat_DC_logo_2020.svg.png",
    "2025/10/Adobe_Firefly_Logo.svg.png",
    "2025/10/Adobe_Express_logo_RGB_1024px.png",
    "2026/03/arena7icon.png",
    "2026/03/avenue7icon.png",
    "2026/03/Logo-500x500-1.png",
    "2026/03/logo.png",
    "2026/03/continium.png",
    "2026/03/Group-207.png",
    "2026/03/mini-logo.png",
    "2026/03/Group-10.png",
    "2026/03/pi-logo.png",
    "2026/03/Group-9.png",
    "2026/03/Group-11.png",
    "2026/03/Optics2023_Icon_LightBkg.png",
    "2026/03/brand_identity-icon-music_studio-lightbkg.png",
    "2026/03/brand_identity-icon-samplitude-lightbkg.png",
    "2021/11/Microsoft_Word.png",
    "2021/11/Microsoft_Excel.png",
    "2021/11/Microsoft_Onedrive.png",
    "2021/11/Microsoft_Outlook.png",
    "2021/11/Microsoft_Powerpoint.png",
    "2021/11/Microsoft_Sharepoint.png",
    "2021/11/Microsoft_Teams.png",
    "2021/11/adobe_sign.png",
    "2021/11/deep_freezw-removebg-preview-1.png",
    "2021/11/deploy.png",
    "2021/11/mdm-RB.png",
    "2021/11/antivirus-RB.png",
    "2021/11/PowerSaveLogo.png",
    "2025/10/bg-1.png",
    "2025/10/bg-2.png",
    "2025/10/bg-3.png",
    "2025/10/bg-4.png",
    "2025/10/bg-1-03.png",
  ].map((p) => [p, ICON]),
  logos: [
    "2026/03/ALL-LOGO-114.png",
    "2026/03/ALL-LOGO-116.png",
    "2026/03/ALL-LOGO-117.png",
    "2026/03/ALL-LOGO-118.png",
    "2026/03/ALL-LOGO-119.png",
    "2021/12/zoom.png",
    "2022/09/Jabra_Logo.png",
    "2021/12/Logitech_logo.svg_.png",
  ].map((p) => [p, LOGO]),
  products: [
    "2021/11/Apple-Mac-Propng1.png",
    "2021/11/iMac.png",
    "2021/11/Macbook-Pro.png",
    "2021/11/MacBook-Air.png",
    "2021/11/HP-Probook-series.png",
    "2021/11/HP-Elitebook-series.png",
    "2021/11/HP-Elite-Dragonfly-Series.png",
    "2021/11/HP-Zbook-mobile-workstation-series.webp",
    "2021/11/HP-Elite-X360-series.webp",
    "2021/11/Lenovo-Thinkpad-P-series.webp",
    "2021/11/Lenovo-Thinkpad-T-series.webp",
    "2021/11/Lenovo-Thinkpad-X1-Carbon.webp",
    "2021/11/Dell-Latitude_8xsmall.png",
    "2021/11/Dell-Precision-Mobile-Workstations_6xsmall.png",
    "2021/11/Dell-XPS-laptops_6xsmall.png",
    "2025/07/Asset-42x.png",
    "2025/07/Asset-52x.png",
    "2025/07/Asset-62x.png",
    "2025/10/BG-1-05.png",
    "2025/10/BG-1-06.png",
    "2025/10/BG-1-07.png",
    "2025/10/BG-1-08.png",
    "2025/10/BG-1-09.png",
    "2025/10/BG-1-10.png",
    "2025/10/adobe-acrobat-studio.png",
    "2025/10/adobe-ai.png",
    "2025/11/banner.png",
    "2025/11/footer-1.png",
    "2025/11/footer-2.png",
  ].map((p) => [p, PRODUCT]),
  photos: [
    "2026/09/apple-hero-1.webp",
    "2026/09/apple-hero-2.webp",
    "2026/09/apple-hero-3.webp",
    "2026/09/apple-hero-4.webp",
    "2026/09/apple-hero-5.webp",
    "2026/09/apple-hero-6.webp",
    "2026/09/apple-hero-7.webp",
    "2026/09/apple-hero-8.webp",
    "2026/09/apple-banner-image.png",
    "2025/10/20250586_ADO_Acro_Studio_Channel_Collage_1200x960.png",
    "2025/10/BG-1-01.png",
    "2025/10/BG-1-02.png",
    "2025/10/BG-1-04.png",
    "2025/10/Firefly-white-cat-cute-and-fat-happy-skydive-34230.jpg",
    "2025/10/owl.png",
    "2026/03/adobe-video.png",
    "2025/07/Asset-72x-optimized.png",
    "2025/07/Untitled-1-02-1.jpg",
  ].map((p) => [p, 1200]),
  hero: ["2026/03/Banner-3.png", "2025/10/2.png", "2021/12/High-Performance-Computers-Background.png"].map((p) => [
    p,
    HERO,
  ]),
  wide: [
    "2026/03/3.png",
    "2026/03/4.png",
    "2026/03/5.png",
    "2026/03/7.png",
    "2026/03/8.png",
    "2021/12/Apple-Background.png",
    "2021/12/HP-Background.png",
    "2021/12/Lenovo-Background.png",
    "2021/12/Dell-Background.png",
    "2023/10/BANNER-ASUS.png",
    "2021/12/Digital-Workflow-Background.png",
    "2022/09/Baneer-adobe-document.jpg",
    "2021/12/Microsoft365-Background.png",
    "2021/12/Faronics-Background.png",
    "2021/12/Saleslive-Background.png",
    "2021/12/Video-Conferencing-Solution-Background.jpg",
    "2025/07/Website-Techcare-01-01-01-1.jpg",
    "2025/10/1.png",
    "2025/10/BG1-Footer.png",
  ].map((p) => [p, WIDE]),
};

const quality = { icons: 92, logos: 90, products: 82, photos: 80, wide: 78, hero: 80 };

const exists = (f) =>
  access(f).then(
    () => true,
    () => false,
  );
const slug = (p) =>
  p
    .replace(/\.(png|jpe?g|webp)$/i, "")
    .replace(/\.svg$/i, "")
    .replace(/[^a-z0-9]+/gi, "-")
    .toLowerCase();

async function main() {
  const manifest = {};
  let bytes = 0;
  const missing = [];
  for (const [group, list] of Object.entries(groups)) {
    for (const [rel, maxWidth] of list) {
      const input = path.join(LEGACY, rel);
      if (!(await exists(input))) {
        missing.push(rel);
        continue;
      }
      const outRel = `images/pages/${group}/${slug(rel)}.webp`;
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
    `Built ${Object.keys(manifest).length} images (${(bytes / 1048576).toFixed(1)} MB WebP) → public/images/pages`,
  );
  if (missing.length)
    console.log(`Skipped ${missing.length} missing (re-run import:legacy):\n  ${missing.join("\n  ")}`);
  void OUT_DIR;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
