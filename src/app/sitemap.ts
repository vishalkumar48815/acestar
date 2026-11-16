import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { aboutRoutes } from "@/content/about";
import { getMediaRoutes } from "@/server/content/media";
import { solutionRoutes } from "@/content/solutions";
import { legalRoutes } from "@/content/legal";

/** Add routes here as pages are built. */
const staticRoutes = [
  "",
  ...aboutRoutes,
  ...solutionRoutes,
  "/career/",
  "/contact-acestarian/",
  "/techsupport/",
  "/techcare/",
  ...legalRoutes,
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Every URL ends in "/" (as on the old acestar.my); normalise first so nothing is listed twice.
  const withSlash = (path: string) => (path.endsWith("/") ? path : `${path}/`);
  const routes = [...new Set([...staticRoutes, ...(await getMediaRoutes())].map(withSlash))];
  return routes.map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
