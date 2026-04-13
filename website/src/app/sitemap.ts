import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://puhuikouq.com";

  const routes = [
    "",
    "/services/implant",
    "/services/orthodontics",
    "/services/restoration",
    "/services/periodontal",
    "/services/pediatric",
    "/doctors",
    "/knowledge",
    "/guide",
    "/contact",
    "/booking",
    "/privacy",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.7,
  }));
}
