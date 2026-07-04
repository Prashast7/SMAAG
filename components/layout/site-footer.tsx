import Link from "next/link";

import { Container } from "@/components/layout/container";
import { siteConfig } from "@/constants/site";
import { Divider } from "@/components/ui/divider";

/** Renders the reusable global footer using centralized business configuration. */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <Container className="py-10 sm:py-12" size="xl">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-h4">{siteConfig.shortName}</p>
              <p className="text-body max-w-xl text-muted">{siteConfig.tagline}</p>
            </div>
            <div className="space-y-1 text-small text-muted">
              <p>{siteConfig.footer.legalName}</p>
              <p>{siteConfig.location}</p>
              <a className="block hover:text-foreground" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>
              <a
                className="block hover:text-foreground"
                href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
              >
                {siteConfig.phone}
              </a>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div className="space-y-3">
              <p className="text-small font-medium text-foreground">Navigation</p>
              <nav aria-label="Footer navigation" className="grid gap-2">
                {siteConfig.navigation.map((item) => (
                  <Link
                    key={item.href}
                    className="text-small text-muted hover:text-foreground"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="space-y-3">
              <p className="text-small font-medium text-foreground">Business</p>
              <div className="grid gap-2 text-small text-muted">
                <p>{siteConfig.domain}</p>
                <p>{siteConfig.address.region}</p>
                <p>{siteConfig.address.country}</p>
              </div>
            </div>
          </div>
        </div>

        <Divider className="my-8" />

        <div className="flex flex-col gap-2 text-small text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {siteConfig.shortName}. {siteConfig.footer.copyright}
          </p>
          <p>{siteConfig.tagline}</p>
        </div>
      </Container>
    </footer>
  );
}
