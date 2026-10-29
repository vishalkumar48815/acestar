/** Content model for the Products & Solutions pages. */

export type Img = { src: string; width: number; height: number; alt: string };

export type Crumb = { label: string; href?: string };

export type Cta = { label: string; href: string; external?: boolean };

export type PageHero = {
  eyebrow: string;
  title: string;
  /** Part of the title rendered with the brand gradient. */
  accent?: string;
  lead: string;
  primary?: Cta;
  secondary?: Cta;
  image?: Img;
  /**
   * "cover" = photo fills the right panel; "contain" = product/illustration floating on the right;
   * "banner" = ultra-wide artwork as a strip under the text; "backdrop" = pale artwork behind the hero.
   */
  imageFit?: "cover" | "contain" | "banner" | "backdrop";
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
