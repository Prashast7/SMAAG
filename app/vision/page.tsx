import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { createMetadata } from "@/lib/metadata";

const paragraphs = [
  "At SMAAG, our vision is simple: to be the trusted financial partner that growing businesses can rely on at every stage of their journey.",
  "We believe that quality accounting and advisory services should not be reserved for large corporations. Every business — regardless of size or industry — deserves access to a licensed CPA who brings genuine expertise, clear communication, and a long-term perspective to the relationship.",
  "We are building a firm that grows with our clients. As your business evolves, so will the depth and breadth of services we bring to the table.",
];

export const metadata: Metadata = createMetadata({
  title: "Vision",
  description:
    "SMAAG's vision is to be the trusted financial partner that growing businesses rely on at every stage of their journey.",
});

export default function VisionPage() {
  return (
    <Section spacing="lg">
      <Container size="md">
        <Reveal>
          <PageHeader eyebrow="Vision" title="Our Vision" />
        </Reveal>

        <div className="mt-10 space-y-6">
          {paragraphs.map((paragraph, index) => (
            <Reveal delayMs={index * 100} key={paragraph}>
              <p className="text-body-lg text-muted text-balance">
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
