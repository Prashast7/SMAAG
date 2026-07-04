import type { MetadataRoute } from "next";

import { env } from "@/lib/env";
import { siteConfig } from "@/constants/site";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteConfig.url || env.NEXT_PUBLIC_SITE_URL;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
