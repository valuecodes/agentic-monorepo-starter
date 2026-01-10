import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    // TODO: Uncomment when domain is set
    // sitemap: "https://example.com/sitemap.xml",
  };
}
