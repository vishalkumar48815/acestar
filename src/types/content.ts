export type NavLink = {
  label: string;
  href: string;
  description?: string;
  external?: boolean;
};

export type NavItem = NavLink & {
  children?: NavLink[];
};

export type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export type PillarKey = "create" | "compute" | "collaborate";

export type Pillar = {
  key: PillarKey;
  eyebrow: string;
  title: string;
  summary: string;
  points: string[];
  brands: string[];
  fact: { value: string; label: string };
  href: string;
};

export type Offering = {
  key: string;
  eyebrow: string;
  title: string;
  body: string;
  tags?: string[];
  cta: NavLink;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

export type NewsItem = {
  title: string;
  excerpt: string;
  source: string;
  href: string;
  lang: "en" | "ms";
  image?: string;
};
