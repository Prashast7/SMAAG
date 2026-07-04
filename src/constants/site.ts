export const siteConfig = {
  name: "SM Assurance & Advisory Group, APC",
  shortName: "SMAAG",
  domain: "smaagcpa.com",
  url: "https://smaagcpa.com",
  email: "shivangi@smaagcpa.com",
  phone: "+1 (000) 000-0000",
  location: "San Francisco Bay Area, California",
  tagline: "Assurance. Advisory. Delivered.",
  description:
    "A premium CPA firm focused on assurance, advisory, tax, and strategic financial insight for modern businesses and founders.",
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
