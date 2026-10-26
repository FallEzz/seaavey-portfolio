import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://seaavey.com",
      lastModified: new Date("2026-10-26T00:00:00.000Z"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
