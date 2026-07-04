import type { Metadata } from "next";

import { Clock, Mail, MapPin } from "lucide-react";

import { InquiryForm } from "@/components/forms/inquiry-form";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/constants/site";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description:
    "Get in touch with SM Assurance & Advisory Group, APC to discuss bookkeeping, financial statement preparation, or business advisory needs.",
});

export default function ContactPage() {
  return (
    <Section spacing="lg">
      <Container size="lg">
        <PageHeader
          description="Available for new client inquiries."
          eyebrow="Contact"
          title="Get in touch"
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <Card className="h-fit">
            <CardContent className="space-y-6 p-6 sm:p-8">
              <div className="flex items-start gap-3">
                <Mail
                  aria-hidden="true"
                  className="text-primary mt-1 size-5 shrink-0"
                />
                <div>
                  <p className="text-small text-foreground font-medium">
                    Email
                  </p>
                  <a
                    className="text-body text-muted hover:text-foreground"
                    href={`mailto:${siteConfig.email}`}
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin
                  aria-hidden="true"
                  className="text-primary mt-1 size-5 shrink-0"
                />
                <div>
                  <p className="text-small text-foreground font-medium">
                    Location
                  </p>
                  <p className="text-body text-muted">{siteConfig.location}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock
                  aria-hidden="true"
                  className="text-primary mt-1 size-5 shrink-0"
                />
                <div>
                  <p className="text-small text-foreground font-medium">
                    Availability
                  </p>
                  <p className="text-body text-muted">
                    Available for new client inquiries
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card id="inquiry-form">
            <CardContent className="p-6 sm:p-8">
              <InquiryForm source="contact_page" variant="full" />
            </CardContent>
          </Card>
        </div>
      </Container>
    </Section>
  );
}
