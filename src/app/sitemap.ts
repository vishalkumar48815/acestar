import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/** Add routes here as pages are built. */
const routes = [
  "",
  "/about",
  "/solutions/creative-software",
  "/solutions/workstations",
  "/solutions/digital-workflow",
  "/techcare",
  "/stories",
  "/careers",
  "/contact",
  "/support",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
