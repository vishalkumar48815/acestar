import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { aboutRoutes } from "@/content/about";
import { mediaRoutes } from "@/content/newsroom";
import { solutionRoutes } from "@/content/solutions";

/** Add routes here as pages are built. */
const routes = ["", ...aboutRoutes, ...solutionRoutes, ...mediaRoutes, "/careers", "/contact", "/support"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
