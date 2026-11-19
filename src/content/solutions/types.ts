/** Content model for the Products & Solutions pages. */

/** `darkInvert`: a black mark that should turn white in dark mode (e.g. the OpenAI logo). */
export type Img = { src: string; width: number; height: number; alt: string; darkInvert?: boolean };

export type Crumb = { label: string; href?: string };

export type Cta = { label: string; href: string; external?: boolean };

export type PageHero = {
  eyebrow: string;
  /**
   * SEO keyword line carried over from the old site. Shown in the eyebrow position but placed
   * inside the <h1>, so the heading reads "<keyword> <title>" to search engines.
   */
  keyword?: string;
  title: string;
  /** Second keyword line from the old site, shown under the title as an <h2>. */
  subheading?: string;
  /** Part of the title rendered with the brand gradient. */
  accent?: string;
  lead: string;
  primary?: Cta;
  secondary?: Cta;
  image?: Img;
  /** Optional dark-theme version of `image` (backdrop only). */
  imageDark?: Img;
  /**
   * "cover" = photo fills the right panel; "contain" = product/illustration floating on the right;
   * "banner" = ultra-wide artwork as a strip under the text; "backdrop" = pale artwork behind the hero.
   */
  imageFit?: "cover" | "contain" | "banner" | "backdrop";
  /** Backdrop only: how strong the artwork shows (0–1, default 1). Dark mode is dimmed further. */
  imageOpacity?: number;
  /** Backdrop only: a solid fade behind the text so a full-colour photo can sit on the right. */
  imageScrim?: boolean;
  /** Backdrop only: start the artwork below the fixed header instead of behind it. */
  imageBelowHeader?: boolean;
  /** "center": text-only hero with everything centred (no image or side visual). */
  align?: "start" | "center";
  /** Backdrop only, 1280px and wider: move the artwork up (negative) or down, as a % of the hero height. */
  imageShiftY?: string;
  /** false hides the breadcrumb trail above the eyebrow. */
  showCrumbs?: boolean;
  crumbs: Crumb[];
  chips?: string[];
};

/* ---------- Creative software brand catalogue ---------- */
export type BrandProductData = { id: string; name: string; desc: string; icon?: string };
export type BrandData = {
  key: string;
  name: string;
  banner?: string;
  logo?: string;
  description: string;
  groups: { title?: string; products: BrandProductData[] }[];
  video?: { poster?: string; caption: string };
};

export type BrandProduct = { id: string; name: string; desc: string; icon?: Img };
export type Brand = {
  key: string;
  name: string;
  banner?: Img;
  logo?: Img;
  description: string;
  groups: { title?: string; products: BrandProduct[] }[];
  feature?: { image?: Img; caption: string };
  link?: Cta;
};

/* ---------- Hardware catalogue ---------- */
export type DeviceProduct = { name: string; desc: string; image?: Img };
export type DeviceBrand = {
  key: string;
  name: string;
  banner?: Img;
  intro: string;
  /** Full brand story from the old site (shown expandable). */
  story: string[];
  products: DeviceProduct[];
  link?: Cta;
};

/* ---------- Generic blocks ---------- */
export type Feature = { title: string; body: string; image?: Img; icon?: Img };
export type Stat = { value: string; label: string };
export type Step = { title: string; body: string };

export type CompareTable = {
  caption: string;
  columns: string[];
  groups: {
    title?: string;
    rows: { label: string; cells: (string | boolean)[] }[];
  }[];
  note?: string;
};

/** Solution-page copy from the Acestar 3.0 brief: overview, offerings, "Why Acestar" and CTA. */
export type SolutionBrief = {
  meta: { title: string; description: string; keywords: string[] };
  overview: { eyebrow: string; title: string; paragraphs: string[]; offeringsTitle: string; offerings: Step[] };
  /** Intro paragraphs plus four short highlights, shown as a row like the AI page. */
  why: { title: string; paragraphs: string[]; highlights: { title: string; body: string }[] };
  closing: { eyebrow: string; title: string; body: string; cta: { label: string; href: string } };
};
