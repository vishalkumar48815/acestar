import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { aboutRoutes } from "@/content/about";
import { getMediaRoutes } from "@/server/content/media";
import { solutionRoutes } from "@/content/solutions";

/** Add routes here as pages are built. */
const staticRoutes = ["", ...aboutRoutes, ...solutionRoutes, "/careers", "/contact", "/support"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [...staticRoutes, ...(await getMediaRoutes())];
  return routes.map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
