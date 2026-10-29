import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { solutionRoutes } from "@/content/solutions";

/** Add routes here as pages are built. */
const routes = ["", "/about", ...solutionRoutes, "/stories", "/careers", "/contact", "/support"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
