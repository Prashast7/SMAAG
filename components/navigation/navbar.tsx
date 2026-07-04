import { siteConfig } from "@/constants/site";
import { Container } from "@/components/layout/container";
import { NavbarClient } from "@/components/navigation/navbar-client";

/** Renders the server-driven global navigation wrapper and passes centralized config to the client layer. */
export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background">
      <Container size="xl">
        <NavbarClient
          brand={{
            name: siteConfig.name,
            shortName: siteConfig.shortName,
            tagline: siteConfig.tagline,
          }}
          contactHref={`mailto:${siteConfig.email}`}
          navigation={siteConfig.navigation}
        />
      </Container>
    </header>
  );
}
