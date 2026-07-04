import { LoaderCircle } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { siteConfig } from "@/constants/site";

/** Provides a minimal loading state aligned with the system typography and motion rules. */
export default function Loading() {
  return (
    <Section className="min-h-screen" spacing="lg">
      <Container className="flex min-h-[70vh] flex-col items-center justify-center gap-4 text-center" size="md">
        <LoaderCircle aria-hidden="true" className="size-8 animate-spin text-primary" />
        <div className="space-y-2">
          <p className="text-h3">{siteConfig.shortName}</p>
          <p className="text-small text-muted">Preparing the experience.</p>
        </div>
      </Container>
    </Section>
  );
}
