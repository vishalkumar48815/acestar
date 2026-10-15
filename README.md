# acestar.my

The new Acestar website, replacing the old WordPress/Elementor site.

- **Light mode:** soft glass (airy white, frosted cards, blue aurora)
- **Dark mode:** dark glass (deep navy, glowing blue)
- The site follows the visitor's system theme. A toggle in the header (System → Light → Dark) overrides it.

## Stack

| Concern | Choice | Why |
| --- | --- | --- |
| Framework | Next.js 16 (App Router, Cache Components) + React 19 + TypeScript | Static HTML at build time, fast first paint, strong SEO |
| Styling | Tailwind CSS v4 + CSS design tokens (`src/styles/tokens.css`) | One place to change colours for both themes |
| Animation | Plain CSS + small client hooks (no animation library) | Keeps JavaScript small; all motion respects `prefers-reduced-motion` |
| Smooth scroll | Lenis (lazy-loaded, desktop pointer only) | Native scrolling stays on phones |
| Fonts | Bricolage Grotesque, Manrope, JetBrains Mono, self-hosted with `next/font/local` | No request to Google, no layout shift |
| Icons | Inline SVG set in `src/components/ui/icons.tsx` (Lucide paths) | About 19 KB lighter than the icon package |

## Content source

All copy, numbers, contact details, logos, client/partner logos, awards, campaign banners and news
come from the live acestar.my site. The redesign changes the UI, not the content.

```bash
npm run import:legacy   # downloads every page + media file of the old site into legacy/ (git-ignored)
npm run media:build     # optimises the curated images into public/images + regenerates favicons
```

`scripts/build-media.mjs` holds the list of images used on the site; add an entry and re-run to bring
in more. It also generates the light-mode logo by recolouring the official logo's white wordmark.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (must pass before deploying)
npm run start    # serve the production build
npm run lint
npx prettier --write .
npm run import:legacy   # one-off: pull the old site into legacy/
npm run media:build     # rebuild optimised images from legacy/
```

Requires Node.js 20.9 or newer.

## Project structure

```
src/
  app/                  routes, root layout, error.tsx, global-error.tsx, not-found.tsx, sitemap.ts, robots.ts
  components/
    ui/                 Button, Logo, LogoMarquee, SectionHeading, Aurora, icons (the design system)
    motion/             RevealObserver, SmoothScroll, CountUp, PointerGlow, Magnetic
    layout/             Header, MobileNav, Footer, ThemeToggle
    sections/home/      Hero, Campaigns, Proof, Pillars, Beyond, CeoMessage, Voices, News, ClosingCta
  content/              ALL site copy and company details: edit text here, not in components
    site.ts             phone, WhatsApp, emails, address, socials
    navigation.ts       header, footer and legal links
    home.ts             homepage copy, stats, testimonials, news
    media.ts            images + alt text (paths/sizes from media.generated.json)
  lib/                  utils (cn, formatNumber, whatsappLink), theme script, SEO (JSON-LD)
  styles/tokens.css     colour tokens for light and dark
  types/content.ts      content types
  fonts/                self-hosted woff2 files (SIL OFL)
scripts/                import-legacy-site.mjs, build-media.mjs
public/images/          optimised WebP images (brand, clients, partners, awards, campaigns, news)
```

### Conventions

- **Content lives in `src/content/`.** Components never hard-code company details or copy.
- **Colours come only from tokens** (`bg-bg`, `text-fg-muted`, `text-brand-ink`, `glass`, `glass-strong`). Never use literal hex values in components, or dark mode will break.
- **Type scale utilities:** `text-display`, `text-title`, `text-heading`, `text-lead`, `text-eyebrow`. They are fluid, and body and input text never drop below 16px on phones (which also prevents iOS zooming into form fields).
- **Scroll reveal:** add `data-reveal` to any element. One shared observer handles them all. Content is only hidden while JavaScript is running, so the page still reads correctly without it.
- **Server components by default.** Only interactive pieces use `"use client"`.
- **Accessibility:** a skip link, visible focus rings, 44px minimum tap targets, labelled controls, a focus trap and Escape-to-close in the mobile menu, and a carousel that pauses on hover, focus and when off-screen.

## Redirects

`next.config.ts` maps every old WordPress URL to its new route with permanent redirects, so search rankings carry over (for example `/contact-acestarian` → `/contact`).

## Performance (homepage, production build)

| | Old site | New site |
| --- | --- | --- |
| Transfer size | 6.8 MB | about 280 KB gzipped (HTML 17 KB, CSS 7 KB, JS 192 KB, fonts 64 KB) |
| Requests | 154 | 14 |
| Images | 3.2 MB | Optimised WebP/AVIF, lazy-loaded below the fold |

## Open items

- [ ] Inboxes for each form (sales, support, careers) and whether Tech Support stays on Zoho Desk
- [ ] Optional: an SVG version of the logo (current one is the site's @2x PNG, sharp up to ~180px wide)
- [ ] English only, or a Bahasa Malaysia version too

## Roadmap

1. ~~Foundation, design system, header/footer, error pages~~
2. ~~Homepage~~
3. Solutions pages (creative software, workstations, digital workflow) and TechCare
4. About (profile, awards timeline, clients), Stories, Careers
5. Contact and Support forms (server actions, Zod validation, spam protection, email delivery)
6. Final pass: Open Graph image, analytics, Lighthouse and accessibility audit, launch
