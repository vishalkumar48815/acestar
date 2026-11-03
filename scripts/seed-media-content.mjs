#!/usr/bin/env node
/**
 * One-time seed of the Media section (News, Blog, Gallery) from the legacy import.
 *
 *   npm run import:legacy   # downloads the old site, incl. every blog post
 *   npm run media:seed      # writes src/data/{news,blog,gallery}.json + optimised images
 *
 * After seeding, the JSON files are the source of truth (edited by hand or, later, by /admin).
 * Existing files are never overwritten unless you pass --force (all) or --force=blog etc.
 * Images go to public/images/media/{news,blog,gallery}/ as WebP with their real dimensions.
 */
import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const sharp = (await import(process.env.SHARP_MODULE ?? "sharp")).default;

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LEGACY = path.join(ROOT, "legacy");
const ASSETS = path.join(LEGACY, "assets");
const DATA = path.join(ROOT, "src/data");
const PUBLIC = path.join(ROOT, "public");

const forceArg = process.argv.find((a) => a.startsWith("--force"));
const force = (name) => forceArg === "--force" || forceArg === `--force=${name}`;

/* ------------------------------------------------------------------ helpers */

const exists = (f) =>
  access(f).then(
    () => true,
    () => false,
  );

const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", hellip: "…", ndash: "–", mdash: "—" };
const decode = (s) =>
  s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&([a-z]+);/gi, (m, n) => ENTITIES[n.toLowerCase()] ?? m);
const text = (html) =>
  decode(html.replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
const slugify = (s) =>
  s
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);

const MONTHS = "january february march april may june july august september october november december".split(" ");
function isoDate(s) {
  const m = s.trim().match(/^(\d{1,2})\s+([a-z]+)\s+(\d{4})$/i);
  if (!m) return s;
  const month = MONTHS.indexOf(m[2].toLowerCase()) + 1;
  return `${m[3]}-${String(month).padStart(2, "0")}-${m[1].padStart(2, "0")}`;
}

/** "2024/08/4-300x165.jpg" → the original upload, if we have it. */
async function legacyFile(rel) {
  const clean = decodeURIComponent(rel.split("?")[0]);
  const candidates = [
    clean,
    clean.replace(/-\d{2,4}x\d{2,4}(_c)?(?=\.[a-z]+$)/i, ""),
    clean.replace(/-scaled(?=\.[a-z]+$)/i, ""),
    clean.replace(/-\d{2,4}x\d{2,4}(_c)?(?=\.[a-z]+$)/i, "").replace(/-scaled(?=\.[a-z]+$)/i, ""),
  ];
  for (const c of candidates) if (await exists(path.join(ASSETS, c))) return path.join(ASSETS, c);
  // "-scaled" originals sometimes only exist in scaled form
  const scaled = clean.replace(/-\d{2,4}x\d{2,4}(_c)?(?=\.[a-z]+$)/i, "").replace(/(\.[a-z]+)$/i, "-scaled$1");
  if (await exists(path.join(ASSETS, scaled))) return path.join(ASSETS, scaled);
  return null;
}

let bytes = 0;
/** Optimise one legacy image → { src, width, height } (or undefined when missing). */
async function image(rel, folder, name, maxWidth) {
  if (!rel) return undefined;
  const input = await legacyFile(rel);
  if (!input) {
    console.warn(`  ! missing ${rel}`);
    return undefined;
  }
  const outRel = `images/media/${folder}/${name}.webp`;
  const output = path.join(PUBLIC, outRel);
  await mkdir(path.dirname(output), { recursive: true });
  const { data, info } = await sharp(input)
    .rotate()
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality: 80, effort: 6 })
    .toBuffer({ resolveWithObject: true });
  await writeFile(output, data);
  bytes += data.length;
  return { src: `/${outRel}`, width: info.width, height: info.height };
}

/** The Elementor "posts" grid used by /news/ and /blogs/. */
function parsePostGrid(html) {
  return [...html.matchAll(/<article class="elementor-post[^"]*"[\s\S]*?<\/article>/g)].map(([a]) => {
    const href = a.match(/class="elementor-post__title">\s*<a href="([^"]+)"/)?.[1] ?? "";
    return {
      title: text(a.match(/class="elementor-post__title">([\s\S]*?)<\/h3>/)?.[1] ?? ""),
      date: isoDate(text(a.match(/elementor-post-date">([\s\S]*?)<\/span>/)?.[1] ?? "")),
      href: href.replace(/#new_tab$/, "").trim(),
      excerpt: text(a.match(/elementor-post__excerpt">([\s\S]*?)<\/div>/)?.[1] ?? ""),
      image: a.match(/<img[^>]+src="([^"]+)"/)?.[1]?.split("/wp-content/uploads/")[1],
    };
  });
}

/** Never clobber edited content: seed a file only if it is missing or --force'd. */
async function shouldSeed(name) {
  if (!(await exists(path.join(DATA, `${name}.json`))) || force(name)) return true;
  console.log(`  • src/data/${name}.json exists, kept (use --force=${name} to rebuild)`);
  return false;
}

async function writeJson(name, value) {
  const file = path.join(DATA, `${name}.json`);
  await mkdir(DATA, { recursive: true });
  await writeFile(file, `${JSON.stringify(value, null, 2)}\n`);
  console.log(`  ✓ src/data/${name}.json`);
  return true;
}

/* ------------------------------------------------------------------ news */

const PUBLISHERS = {
  "thestar.com.my": "The Star",
  "bernama.com": "Bernama",
  "astroawani.com": "Astro Awani",
  "buletintv3.my": "Buletin TV3",
  "prweb.com": "PRWeb",
  "malaysiakini.com": "Malaysiakini",
  "sinarharian.com.my": "Sinar Harian",
  "epena.com.my": "e-Pena",
  "weareunited.com.my": "We Are United",
  "siakapkeli.my": "Siakap Keli",
  "tatlerasia.com": "Tatler Asia",
  "uitm.edu.my": "UiTM",
  "rtm.gov.my": "Berita RTM",
  "themalaysianreserve.com": "The Malaysian Reserve",
  "vulcanpost.com": "Vulcan Post",
  "theedgemarkets.com": "The Edge Malaysia",
  "ey.com": "EY",
  "thepeak.com.my": "The Peak",
  "chinapress.com.my": "China Press",
  "amanz.my": "Amanz",
  "hitechcentury.com": "HiTech Century",
  "thesundaily.my": "The Sun",
  "rage.com.my": "R.AGE",
  "blogspot.com": "Blog",
  "acestar.my": "Acestar",
};
const publisher = (href) => {
  try {
    const host = new URL(href).hostname.replace(/^www\./, "");
    const key = Object.keys(PUBLISHERS).find((k) => host === k || host.endsWith(`.${k}`));
    return key ? PUBLISHERS[key] : host;
  } catch {
    return "Press";
  }
};
const language = (s) =>
  /[一-鿿]/.test(s)
    ? "zh"
    : /\b(pelajar|kerjasama|juara|kejohanan|menerima|menyampaikan|lancar|bakal|wakili|peluang|diperlukan|naib|johan|cemerlang|pekerjaan)\b/i.test(
          s,
        )
      ? "ms"
      : "en";
/** Strip tracking parameters the old site carried along. */
const cleanUrl = (href) => {
  if (!href || href === "#") return undefined;
  try {
    const u = new URL(href.trim());
    ["fbclid", "utm_source", "utm_medium", "utm_campaign"].forEach((p) => u.searchParams.delete(p));
    if (/^#(lz|google_vignette|:~:)/.test(u.hash) || u.hash.includes("google_vignette")) u.hash = "";
    return u.toString();
  } catch {
    return undefined;
  }
};

async function seedNews() {
  if (!(await shouldSeed("news"))) return;
  const html = await readFile(path.join(LEGACY, "pages/news.html"), "utf8");
  const rows = parsePostGrid(html);
  const seen = new Set();
  const items = [];
  for (const r of rows) {
    let id = slugify(`${r.date}-${r.title}`);
    while (seen.has(id)) id += "-2";
    seen.add(id);
    const url = cleanUrl(r.href);
    const internal = url?.startsWith("https://acestar.my/blog/");
    items.push({
      id,
      title: r.title,
      date: r.date,
      publisher: url ? publisher(url) : "Press",
      language: language(`${r.title} ${r.excerpt}`),
      excerpt: r.excerpt,
      url: internal ? url.replace("https://acestar.my", "").replace(/\/$/, "") : url,
      image: await image(r.image, "news", id, 960),
      featured: false,
    });
  }
  items.sort((a, b) => b.date.localeCompare(a.date));
  if (items[0]) items[0].featured = true;
  return writeJson("news", { items });
}

/* ------------------------------------------------------------------ blog */

const CATEGORY = (title) =>
  /intern|rejection|learned as an intern/i.test(title)
    ? "Life at Acestar"
    : /shortcut|control keys|tips/i.test(title)
      ? "Tips & tricks"
      : /alert/i.test(title)
        ? "Announcements"
        : "Product guides";

/** "ALERT ON WEBSITE…" → "Alert on website…" (keeps names like Acestar capitalised). */
const shout = (t) =>
  t === t.toUpperCase()
    ? t.charAt(0) +
      t
        .slice(1)
        .toLowerCase()
        .replace(/acestar/g, "Acestar")
    : t;

/** Split an unbroken wall of text into readable paragraphs (~3 sentences, max ~650 chars). */
function paragraphs(t) {
  if (t.length < 650) return [t];
  // Sentences, re-joined where a "." only ends an abbreviation (Ms., a.m., e.g., Sdn. …).
  const ABBR =
    /\b(?:Mr|Mrs|Ms|Dr|Prof|St|Sdn|Bhd|Co|Inc|Ltd|vs|etc|e\.g|i\.e|a\.m|p\.m|No|Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)\.\s*$/i;
  const sentences = [];
  for (const piece of t.match(/[^.!?]+(?:[.!?]+["”’)]*|$)\s*/g) ?? [t]) {
    if (sentences.length && (ABBR.test(sentences[sentences.length - 1]) || /^[a-z0-9]/.test(piece)))
      sentences[sentences.length - 1] += piece;
    else sentences.push(piece);
  }
  const out = [];
  let cur = "";
  let count = 0;
  for (const s of sentences) {
    if (cur && (cur.length + s.length > 650 || count >= 3)) {
      out.push(cur.trim());
      cur = "";
      count = 0;
    }
    cur += s;
    count++;
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}

/**
 * WordPress/Elementor post HTML → Markdown (the subset our renderer supports).
 * Handles tagged content (p, h2–h4, lists, quotes) and Elementor's untagged text blocks.
 */
async function toMarkdown(html, slug, counter, coverRel) {
  const base = (r) => (r ?? "").replace(/-\d{2,4}x\d{2,4}(_c)?(?=\.[a-z]+$)/i, "").replace(/-scaled(?=\.[a-z]+$)/i, "");
  const BR = "\u2028";
  let s = html.replace(/<(script|style|noscript|svg)[\s\S]*?<\/\1>/gi, "").replace(/<!--[\s\S]*?-->/g, "");
  const imgs = [];
  s = s.replace(/<img[^>]*?src="([^"]+)"[^>]*>/gi, (tag, src) => {
    imgs.push({ src, alt: decode(tag.match(/alt="([^"]*)"/)?.[1] ?? "") });
    return `\n\n@@IMG${imgs.length - 1}@@\n\n`;
  });
  s = s
    .replace(/<br\s*\/?>/gi, BR)
    .replace(/<(strong|b)\b[^>]*>([\s\S]*?)<\/\1>/gi, (_, __, t) => (text(t) ? ` **${text(t)}** ` : ""))
    .replace(/<(em|i)\b[^>]*>([\s\S]*?)<\/\1>/gi, (_, __, t) => (text(t) ? ` *${text(t)}* ` : ""))
    .replace(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, (_, href, t) =>
      text(t) ? ` [${text(t)}](${href}) ` : "",
    )
    .replace(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi, (_, n, t) =>
      text(t) ? `\n\n${Number(n) <= 2 ? "##" : Number(n) === 3 ? "###" : "####"} ${text(t)}\n\n` : "",
    )
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_, t) => `\n@@LI@@${text(t)}\n`)
    .replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (_, t) => `\n\n@@BQ@@${text(t)}\n\n`)
    .replace(/<\/?(p|div|section|figure|figcaption|ul|ol|article|header|footer|table|tr)\b[^>]*>/gi, "\n\n")
    .replace(/<[^>]+>/g, " ");
  s = decode(s);

  const blocks = [];
  let list = [];
  const flushList = () => {
    if (list.length) blocks.push(list.map((li) => `- ${li}`).join("\n"));
    list = [];
  };
  for (const raw of s.split(/\n\s*\n/)) {
    for (const line of raw.split("\n")) {
      const t = line
        .replace(/[ \t\u00a0]+/g, " ")
        .replace(/\s+([,.;:!?])/g, "$1")
        .trim();
      if (!t) continue;
      if (t.startsWith("@@LI@@")) {
        list.push(t.slice(6).trim());
        continue;
      }
      flushList();
      const img = t.match(/^@@IMG(\d+)@@$/);
      if (img) {
        const { src, alt } = imgs[Number(img[1])];
        const rel = src.split("/wp-content/uploads/")[1];
        // The cover is shown above the article; don't repeat it as the first image.
        if (!blocks.length && coverRel && base(rel) === base(coverRel)) continue;
        const out = await image(rel, "blog", `${slug}-${++counter.n}`, 1400);
        if (out) blocks.push(`![${alt}](${out.src} "${out.width}x${out.height}")`);
      } else if (/^#{2,4} /.test(t)) {
        blocks.push(t);
      } else if (t.startsWith("@@BQ@@")) {
        blocks.push(`> ${t.slice(6).trim()}`);
      } else if (/^\*?Written by .+ at Acestar\*?$/i.test(t)) {
        // author is shown in the page header
      } else {
        for (const para of t
          .split(BR)
          .map((x) => x.trim())
          .filter(Boolean))
          blocks.push(...paragraphs(para));
      }
    }
    flushList();
  }
  // Collapse duplicate consecutive blocks (Elementor sometimes repeats content for mobile).
  return blocks.filter((b, i) => b !== blocks[i - 1]).join("\n\n");
}

/** Article body from a saved post page (Elementor theme-post-content, or classic entry-content). */
function postContent(html) {
  const start =
    html.search(/elementor-widget-theme-post-content/) >= 0
      ? html.search(/elementor-widget-theme-post-content/)
      : html.search(/class="[^"]*entry-content/);
  if (start < 0) return null;
  const from = html.indexOf(">", start) + 1;
  // Stop at the next major widget/section boundary after the content.
  const rest = html.slice(from);
  const end = rest.search(
    /elementor-widget-post-navigation|elementor-widget-share-buttons|elementor-widget-post-comments|elementor-widget-posts|<h[1-6][^>]*>\s*Related Blogs|<footer|class="elementor-location-footer/,
  );
  return end > 0 ? rest.slice(0, end) : rest;
}

async function seedBlog() {
  if (!(await shouldSeed("blog"))) return;
  const html = await readFile(path.join(LEGACY, "pages/blogs.html"), "utf8");
  const rows = parsePostGrid(html);
  const posts = [];
  let withBody = 0;
  for (const r of rows) {
    const slug = r.href.match(/\/blog\/([^/]+)/)?.[1] ?? slugify(r.title);
    const author = r.excerpt.match(/^Written by (.+?)\s*[–-]\s*(Intern at Acestar)/i);
    let body = "";
    const pageFile = path.join(LEGACY, `pages/blog__${slug}.html`);
    if (await exists(pageFile)) {
      const content = postContent(await readFile(pageFile, "utf8"));
      if (content) body = await toMarkdown(content, slug, { n: 0 }, r.image);
      if (body) withBody++;
    }
    const words = (body || r.excerpt).split(/\s+/).length;
    posts.push({
      slug,
      title: shout(r.title.replace(/\s+!$/, "!")),
      date: r.date,
      category: CATEGORY(r.title),
      author: author ? `${author[1].trim()}, ${author[2].trim()}` : "Acestar",
      excerpt: r.excerpt.replace(/^Written by [^–-]+[–-]\s*Intern at Acestar\s*/i, "").replace(/^”\s*/, ""),
      cover: await image(r.image, "blog", `${slug}-cover`, 1600),
      readingMinutes: Math.max(1, Math.round(words / 220)),
      body,
    });
  }
  posts.sort((a, b) => b.date.localeCompare(a.date));
  console.log(`  blog: ${posts.length} posts, ${withBody} with full text`);
  return writeJson("blog", { posts });
}

/* ------------------------------------------------------------------ gallery */

const ALBUMS = [
  {
    id: "mces",
    title: "Micro-Credentials Education Summit",
    year: "2023–2025",
    description:
      "MCES and the Malaysia National Championship grand finales: celebrating Malaysia's certified creative and digital talent.",
    photos: [
      ["2026/07/web-11.jpg", "MCES stage celebration with confetti"],
      ["2026/07/web-20-1.jpg", "Certified students with their certificates at MCES"],
      ["2026/07/web-24.jpg", "Champions on stage with the Malaysian flag"],
      ["2026/07/web-12.jpg", "Malaysia National Championship 2024 Grand Finale guests"],
      ["2026/07/web-30.jpg", "Award winners at the Micro-Credentials Education Summit"],
      ["2026/07/web-26.jpg", "Industry forum panel at MCES"],
      ["2026/07/web-25.jpg", "Students celebrating their awards"],
      ["2026/07/web-17.jpg", "Adobe keynote on stage"],
      ["2026/07/web-10.jpg", "Student finalists with the Acestar team"],
      ["2026/07/web-08.jpg", "The Acestar team with partners"],
      ["2026/07/web-31.jpg", "Audience at the closing ceremony"],
      ["2026/07/web-04.jpg", "Winners with their bouquets at MCES 2025"],
      ["2026/07/web-02.jpg", "Students cheering in the audience"],
      ["2026/07/web-15-1.jpg", "Performers on the MCES stage"],
      ["2026/07/web-23.jpg", "The hall during the grand finale"],
      ["2026/07/web-07.jpg", "Champions holding their mock cheques"],
      ["2026/07/web-13.jpg", "Partners from ASUS, Certiport and Pearson"],
      ["2026/07/web-21.jpg", "Grand finale audience"],
      ["2026/07/web-09.jpg", "Dance performance at the summit"],
      ["2026/07/web-05.jpg", "Educators at MCES 2023"],
      ["2026/07/web-06.jpg", "Guests of honour at MCES 2023"],
      ["2026/07/web-16.jpg", "Keynote session at the summit"],
    ],
  },
  {
    id: "acp-2022",
    title: "ACP & MOS Championship Malaysia",
    year: "2022",
    description: "The national Adobe Certified Professional and Microsoft Office Specialist championship grand finale.",
    photos: [
      ["2022/09/acp-432-1.webp", "ACP & MOS Championship Malaysia 2022 grand finale stage"],
      ["2022/09/acp-147-1.webp", "Guests and partners at the championship"],
      ["2022/09/ezgif-3-5b564c21cd.webp", "Winners celebrating on stage"],
    ],
  },
  {
    id: "sea-connect",
    title: "SEA Connect Creative Conference",
    year: "2019–2020",
    description: "Bringing the region's creative community together for talks, workshops and celebration.",
    photos: [
      ["2021/11/2019_06_13-Sea-Connect-2008.jpg", "ACA Championship winners celebrating at SEA Connect"],
      ["2021/11/2019_06_13-Sea-Connect-384.jpg", "Packed hall at SEA Connect 2019"],
      ["2021/11/2019_06_13-Sea-Connect-402.jpg", "Let the Acestarians roar"],
      ["2021/11/2019_06_13-Sea-Connect-148.jpg", "Hands-on workshop at SEA Connect"],
      ["2021/11/2019_06_13-Sea-Connect-1480.jpg", "Live design session on stage"],
      ["2021/11/2019_06_13-Sea-Connect-1492.jpg", "Audience at SEA Connect"],
      ["2021/11/2019_06_13-Sea-Connect-1801-crop.jpg", "Creative Cloud Community on stage"],
      ["2021/11/DSCF6492.jpg", "Conference audience"],
      ["2021/11/DSCF6481.jpg", "Crowd cheering at the conference"],
      ["2021/11/DSCF6372.jpg", "Speaker on stage"],
      ["2021/11/DSC_0109.jpg", "Natalie Sit speaking on a panel"],
      ["2021/11/IMG_3669.jpg", "Team photo with Microsoft"],
      ["2021/11/IMG_9326.jpg", "SEA Connect 2020 Virtual: The Gig Revolution"],
    ],
  },
  {
    id: "awards",
    title: "Awards nights",
    year: "2015–2019",
    description: "Moments from the EY, Enterprise 50, SOBA and SME award ceremonies.",
    photos: [
      ["2021/11/Enterprise-50-E50-Award-2019-1.jpg", "Enterprise 50 Award 2019 ceremony"],
      ["2021/11/Enterprise-50-E50-Award-2019.jpg", "Acestar on stage at the E50 Award 2019"],
      ["2021/11/EY-2018-Top-Nominee.jpg", "EY Entrepreneur of the Year 2018"],
      ["2021/11/EY-2018-Top-Nominee-1.jpg", "The Acestar team at EY Entrepreneur of the Year 2018"],
      ["2021/11/SME-Platinum-Business-Awards-2018.jpg", "SME Platinum Business Awards 2018"],
      ["2021/11/SME-Platinum-Business-Awards-2018-1.jpg", "The team at the SME Platinum Business Awards 2018"],
      ["2021/11/SOBA-Star-Outstanding-Business-Awards.jpg", "Star Outstanding Business Awards (SOBA)"],
      [
        "2021/11/SOBA-Star-Outstanding-Business-Awards-Certificate-of-Recognition-Growth-Excellence.jpg",
        "SOBA Certificate of Recognition: Growth Excellence",
      ],
      ["2021/11/STAR-SOBA-2015-Most-Promising-Award.jpg", "Star SOBA 2015 Most Promising Award"],
      ["2021/11/STAR-SOBA-2015-Most-Promising-Award-1.jpg", "Receiving the Star SOBA 2015 award"],
      [
        "2021/11/SME-RECOGNITION-AWARDS-2015-Young-Entrepreneur-Award.jpg",
        "SME Recognition Awards 2015: Young Entrepreneur",
      ],
      ["2021/11/DSC_0128.jpg", "SME award ceremony stage"],
    ],
  },
  {
    id: "community",
    title: "Creative Cloud Community",
    year: "2020–2021",
    description: "Talks, launches and forums from the Creative Cloud Community and Acestar.",
    photos: [
      [
        "2021/11/CCC-Talk-Show-006-v3-2-people-photo-big-photo-small-font-v2-01.jpg",
        "Creative Talk Show #6: How to turn crisis to opportunity",
      ],
      ["2021/11/IMG_9734.jpg", "Live-streamed talk with Tun Dr. Mahathir Mohamad"],
      ["2021/11/IMG_9736.jpg", "Natalie Sit hosting the Creative Talk Show"],
      ["2021/11/20200220-ACA-Championship-Launching-508.jpg", "ACA Championship 2020 launch"],
      ["2021/11/SME22.jpg", "Speaking at the CEO Forum"],
    ],
  },
];

async function seedGallery() {
  if (!(await shouldSeed("gallery"))) return;
  const albums = [];
  for (const a of ALBUMS) {
    const photos = [];
    for (const [rel, alt] of a.photos) {
      const id = slugify(path.basename(rel).replace(/\.[a-z]+$/i, ""));
      const img = await image(rel, `gallery/${a.id}`, id, 1800);
      if (img) photos.push({ id, ...img, alt });
    }
    albums.push({ id: a.id, title: a.title, year: a.year, description: a.description, cover: photos[0]?.id, photos });
  }
  console.log(`  gallery: ${albums.length} albums, ${albums.reduce((n, a) => n + a.photos.length, 0)} photos`);
  return writeJson("gallery", { albums });
}

/* ------------------------------------------------------------------ run */

console.log("Seeding Media content from legacy/ …");
await seedNews();
await seedBlog();
await seedGallery();
console.log(`Images: ${(bytes / 1048576).toFixed(1)} MB WebP → public/images/media`);
