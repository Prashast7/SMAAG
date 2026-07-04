import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Vision",
  description:
    "SMAAG's vision is to be the trusted financial partner that growing businesses rely on at every stage of their journey.",
});

export default function VisionPage() {
  return (
    <Section spacing="lg">
      <Container size="md">
        <PageHeader eyebrow="Vision" title="Our Vision" />

        <div className="mt-10 space-y-6">
          <p className="text-body-lg text-muted text-balance">
            At SMAAG, our vision is simple: to be the trusted financial partner
            that growing businesses can rely on at every stage of their journey.
          </p>
          <p className="text-body-lg text-muted text-balance">
            We believe that quality accounting and advisory services should not
            be reserved for large corporations. Every business — regardless of
            size or industry — deserves access to a licensed CPA who brings
            genuine expertise, clear communication, and a long-term perspective
            to the relationship.
          </p>
          <p className="text-body-lg text-muted text-balance">
            We are building a firm that grows with our clients. As your business
            evolves, so will the depth and breadth of services we bring to the
            table.
          </p>
        </div>
      </Container>
    </Section>
  );
}
