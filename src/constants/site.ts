export const siteConfig = {
  name: "SM Assurance & Advisory Group, APC",
  shortName: "SMAAG",
  domain: "smaagcpa.com",
  url: "https://smaagcpa.com",
  email: "shivangi@smaagcpa.com",
  location: "San Francisco Bay Area, California — serving clients nationwide",
  tagline: "Assurance. Advisory. Delivered.",
  description:
    "A California CPA firm bringing Big 4 expertise to growing businesses — bookkeeping, financial statement preparation, and business advisory.",
  locale: "en_US",
  address: {
    region: "California",
    country: "US",
    locality: "San Francisco Bay Area",
    postalCode: "",
    streetAddress: "",
  },
  social: {
    linkedin: "",
  },
  navigation: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Vision", href: "/vision" },
    { label: "Contact", href: "/contact" },
  ],
  footer: {
    legalName: "SM Assurance & Advisory Group, APC",
    copyright: "All rights reserved.",
  },
} as const;
