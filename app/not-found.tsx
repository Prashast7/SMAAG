import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { siteConfig } from "@/constants/site";

/** Provides a restrained not-found experience without introducing page-specific marketing content. */
export default function NotFound() {
  return (
    <Section className="min-h-screen" spacing="lg">
      <Container className="flex min-h-[70vh] flex-col items-start justify-center gap-6" size="md">
        <p className="text-caption uppercase tracking-[0.3em]">404</p>
        <div className="space-y-4">
          <h1 className="text-h1 text-balance">That page isn&apos;t available yet.</h1>
          <p className="text-body-lg max-w-2xl text-muted">
            {siteConfig.shortName} is being assembled carefully. If you need immediate help, reach
            out at{" "}
            <a className="font-medium text-foreground underline underline-offset-4" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>
            .
          </p>
        </div>
        <Button asChild>
          <a href={`mailto:${siteConfig.email}`}>Contact {siteConfig.shortName}</a>
        </Button>
      </Container>
    </Section>
  );
}
