import type { Metadata } from "next";

import { siteConfig } from "@/constants/site";
import { env } from "@/lib/env";

type MetadataOverrides = {
  description?: string;
  title?: string;
};

export function createMetadata(overrides?: MetadataOverrides): Metadata {
  const title = overrides?.title ?? `${siteConfig.shortName} | ${siteConfig.tagline}`;
  const description = overrides?.description ?? siteConfig.description;

  return {
    metadataBase: new URL(siteConfig.url || env.NEXT_PUBLIC_SITE_URL),
    title: {
      default: title,
      template: `%s | ${siteConfig.shortName}`,
    },
    description,
    applicationName: siteConfig.name,
    keywords: ["CPA firm", "tax advisory", "assurance", "accounting", "financial reporting"],
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: siteConfig.url || env.NEXT_PUBLIC_SITE_URL,
      siteName: siteConfig.shortName,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    category: "business",
  };
}
