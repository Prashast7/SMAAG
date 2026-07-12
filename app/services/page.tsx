import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Services",
  description:
    "Bookkeeping and accounting, financial statement preparation, and internal controls and business advisory services from SM Assurance & Advisory Group, APC.",
});

const services: { title: string; description: string; disclaimer?: string }[] =
  [
    {
      title: "Bookkeeping & Accounting",
      description:
        "Accurate, organized, and timely financial records for your business.",
    },
  {
    title: "Financial Statement Preparation",
    description:
      "Clean, professional financial statements for internal use, lenders, and stakeholders.",
    disclaimer:
      "Financial statements are prepared by management. SMAAG does not express an opinion or any other form of assurance on these statements.",
  },
  {
    title: "Internal Controls & Business Advisory",
    description:
      "Internal controls assessment, process improvement, and practical financial guidance for business decisions.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <Section
        className="bg-gradient-to-b from-[oklch(0.96_0.018_196)] to-background"
        spacing="lg"
      >
        <Container size="lg">
          <Reveal>
            <PageHeader title="Current services" />
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {services.map((service, index) => (
              <Reveal delayMs={index * 80} key={service.title}>
                <Card className="border-t-2 border-t-primary/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <CardContent className="space-y-2 p-8">
                    <CardTitle className="text-primary">{service.title}</CardTitle>
                    <CardDescription className="text-body">
                      {service.description}
                    </CardDescription>
                    {service.disclaimer ? (
                      <p className="text-caption text-muted pt-2">
                        {service.disclaimer}
                      </p>
                    ) : null}
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="subtle">
        <Container size="md">
          <Reveal className="space-y-4">
            <h2 className="text-h2 text-balance">Where We Are Headed</h2>
            <p className="text-body-lg text-muted text-balance">
              As SMAAG grows, we plan to expand into audit and assurance
              services — including financial statement audits, reviews, and
              agreed-upon procedures — for businesses and organizations that
              require the highest level of financial credibility, subject to
              applicable licensing requirements from the California Board of
              Accountancy (CBA).
            </p>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
