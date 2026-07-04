import { siteConfig } from "@/constants/site";
import { Container } from "@/components/layout/container";
import { NavbarClient } from "@/components/navigation/navbar-client";

/** Renders the server-driven global navigation wrapper and passes centralized config to the client layer. */
export function Navbar() {
  return (
    <header className="border-border/80 bg-background sticky top-0 z-40 border-b">
      <Container size="xl">
        <NavbarClient
          brand={{
            name: siteConfig.name,
            shortName: siteConfig.shortName,
            tagline: siteConfig.tagline,
          }}
          navigation={siteConfig.navigation}
        />
      </Container>
    </header>
  );
}
