import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Divider } from "@/components/ui/divider";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "About",
  description:
    "SMAAG is a California Professional Corporation bringing Big 4 caliber accounting and advisory expertise to growing businesses in the San Francisco Bay Area.",
});

const credentials = [
  "Licensed Certified Public Accountant — State of California",
  "Over a decade of experience in public accounting",
  "Big 4 and top-tier firm experience across KPMG, Deloitte, and Grant Thornton",
  "Extensive background in audit, assurance, and advisory services",
  "Hands-on experience across multiple industries and complex engagements",
  "Brings institutional-quality judgment to every client relationship",
];

export default function AboutPage() {
  return (
    <Section spacing="lg">
      <Container size="md">
        <Reveal>
          <PageHeader
            description="SMAAG is a California Professional Corporation founded with a clear purpose: to bring the rigor and depth of Big 4 accounting to businesses that deserve that level of expertise without the Big 4 price tag. Based in the San Francisco Bay Area, the firm serves clients across all industries with a commitment to precision, integrity, and meaningful advisory relationships."
            eyebrow="About"
            title="About the firm"
          />
        </Reveal>

        <Divider className="my-12" />

        <Reveal className="space-y-6">
          <h2 className="text-h2 text-balance">
            About Shivangi Mansinghka, CPA — Founder
          </h2>
          <ul className="space-y-3">
            {credentials.map((item) => (
              <li className="text-body-lg text-muted" key={item}>
                {item}
              </li>
            ))}
          </ul>
          <p className="text-small text-muted">
            California CPA License No. 160958
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
