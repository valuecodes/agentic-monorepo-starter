import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://example.com", // TODO: Update when domain is set
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
