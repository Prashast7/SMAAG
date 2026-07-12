import type { Metadata } from "next";
import Link from "next/link";

import { CheckCircle2 } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/constants/site";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata();

const pillars = [
  {
    title: "Assurance",
    description: "Precision and accuracy in every engagement.",
  },
  {
    title: "Advisory",
    description: "Strategic insight tailored to your business.",
  },
  {
    title: "Delivered",
    description: "Reliable execution you can count on.",
  },
];

const reasons = [
  "Licensed California CPA with Big 4 experience",
  "Boutique firm — personal attention, not a number in a queue",
  "Serving businesses across all industries",
  "Committed to quality, confidentiality, and client success",
];

export default function HomePage() {
  return (
    <>
      <Section
        className="bg-gradient-to-b from-[oklch(0.96_0.018_196)] to-background"
        spacing="lg"
      >
        <Container size="lg">
          <Reveal className="mx-auto max-w-3xl space-y-8 text-center">
            <div className="space-y-4">
              <p className="text-caption text-primary font-semibold tracking-[0.3em] uppercase">
                {siteConfig.shortName}
              </p>
              <h1 className="text-display text-balance">{siteConfig.name}</h1>
              <p className="text-h4 text-primary/80 font-normal">
                {siteConfig.tagline}
              </p>
            </div>
            <p className="text-body-lg text-muted mx-auto max-w-2xl text-balance">
              A California CPA firm bringing Big 4 expertise to growing
              businesses.
            </p>
            <div className="flex justify-center">
              <Button asChild size="lg">
                <Link href="/contact#inquiry-form">Get in Touch</Link>
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section tone="subtle">
        <Container size="lg">
          <Grid columns={3} gap="lg">
            {pillars.map((pillar, index) => (
              <Reveal delayMs={index * 80} key={pillar.title}>
                <Card className="h-full border-t-2 border-t-primary/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <CardContent className="space-y-2 p-8">
                    <h2 className="text-h3 text-primary">{pillar.title}</h2>
                    <p className="text-body text-muted">{pillar.description}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </Grid>
        </Container>
      </Section>

      <Section>
        <Container size="md">
          <Reveal className="space-y-8">
            <h2 className="text-h2 text-balance">
              Why{" "}
              <span className="text-primary">SMAAG</span>
            </h2>
            <ul className="space-y-4">
              {reasons.map((reason) => (
                <li key={reason} className="flex gap-3">
                  <CheckCircle2
                    aria-hidden="true"
                    className="text-primary mt-1 size-5 shrink-0"
                  />
                  <span className="text-body-lg text-muted">{reason}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
