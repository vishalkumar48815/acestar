/**
 * Images migrated from the old acestar.my site.
 * Files are produced by `npm run media:build` (see scripts/build-media.mjs), which also writes
 * media.generated.json with paths and intrinsic sizes. Alt text and captions live here.
 */
import generated from "./media.generated.json";

export type ImageAsset = { src: string; width: number; height: number; alt: string };
type GeneratedKey = keyof typeof generated;

function img(key: GeneratedKey, alt: string): ImageAsset {
  return { ...generated[key], alt };
}

export type Campaign = {
  title: string;
  caption: string;
  href?: string;
  desktop?: ImageAsset;
  mobile?: ImageAsset;
};

export const media = {
  logoLight: img("brand.logoLight", "Acestar"),
  logoDark: img("brand.logoDark", "Acestar"),
  ceoSignature: img("brand.signature", "Signature of Natalie Sit"),
  ceoAwards: [
    img("awards.ey2020", "EY Entrepreneur of the Year 2020, Top Nominee"),
    img("awards.e50", "Enterprise 50 Award 2019"),
    img("awards.soba", "Star SOBA 10 Years, Most Awards Won"),
  ],
  digitalStatusBadge: img("awards.malaysiaDigital", "Malaysia Digital status company"),
  clientLogos: [
    img("clients.petronas", "Petronas"),
    img("clients.bnm", "Bank Negara Malaysia"),
    img("clients.tng", "Touch 'n Go"),
    img("clients.mrl", "Malaysia Rail Link"),
    img("clients.sarawakEnergy", "Sarawak Energy"),
    img("clients.mindvalley", "Mindvalley"),
    img("clients.lemonSky", "Lemon Sky Studios"),
  ],
  partnerLogos: [
    img("partners.adobe", "Adobe Platinum Reseller"),
    img("partners.apple", "Apple"),
    img("partners.hp", "HP"),
    img("partners.microsoft", "Microsoft"),
    img("partners.certiport", "Certiport"),
    img("partners.autodesk", "Autodesk"),
    img("partners.lenovo", "Lenovo"),
  ],
  /** The old homepage hero slider, in its original order. */
  campaigns: [
    {
      title: "Paperwork. Without paper.",
      caption: "Adobe Acrobat Studio",
      href: "/solutions/digital-workflow",
      desktop: img(
        "campaigns.paperwork.desktop",
        "Paperwork. Without paper. Urusan dokumen tanpa kertas. Adobe Acrobat Studio",
      ),
      mobile: img("campaigns.paperwork.mobile", "Paperwork. Without paper. Adobe Acrobat Studio"),
    },
    {
      title: "Made with Adobe Firefly",
      caption: "Generative AI for creatives",
      href: "/solutions/creative-software",
      desktop: img(
        "campaigns.firefly.desktop",
        "Basketball player shooting a hoop above the clouds, made with Adobe Firefly",
      ),
      mobile: img(
        "campaigns.firefly.mobile",
        "Basketball player shooting a hoop above the clouds, made with Adobe Firefly",
      ),
    },
    {
      title: "Take a higher view",
      caption: "HP EliteBook X, next-gen AI PCs",
      href: "/techcare",
      desktop: img(
        "campaigns.hp.desktop",
        "HP EliteBook X next-gen AI PC. Berpandangan jauh, take a higher view. HP and Acestar",
      ),
      mobile: img("campaigns.hp.mobile", "HP EliteBook X next-gen AI PC. Take a higher view"),
    },
    {
      title: "Sweet 17th",
      caption: "Add more value, work with passion",
      desktop: img(
        "campaigns.anniversary.desktop",
        "Acestar Sweet 17th anniversary: add more value, work with passion",
      ),
      mobile: img("campaigns.anniversary.mobile", "Acestar Sweet 17th anniversary"),
    },
    {
      title: "Imagination is everything",
      caption: "Adobe Firefly, by Adobe's Platinum Reseller",
      href: "/solutions/creative-software",
      desktop: img(
        "campaigns.imagination.desktop",
        "Hummingbird artwork: Imaginasi ialah segalanya, imagination is everything, Albert Einstein",
      ),
    },
    {
      title: "Boss, please sign!",
      caption: "Adobe Acrobat Sign",
      href: "/solutions/digital-workflow",
      mobile: img("campaigns.sign.mobile", "Tuan, sila tandatangan! Boss, please sign! Adobe Acrobat Sign"),
    },
  ] satisfies Campaign[],
  news: [
    img("news.prweb", "Izzul Zafran Abd Razak on stage with fellow ACP World Championship 2024 medallists"),
    img("news.buletin", "Izzul Zafran Abd Razak holding the Malaysian flag with Certiport and Adobe representatives"),
    img("news.awani", "Tahniah poster: Izzul Zafran Abd Razak, Juara Dunia Adobe Certified Professional"),
  ],
};
