import { siteConfig } from "@/constants/site";
import { env } from "@/lib/env";

const RESEND_API_URL = "https://api.resend.com/emails";

export type InquirySource = "contact_page" | "popup";

export type InquiryEmailPayload = {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string;
  message?: string;
  source: InquirySource;
};

function buildEmailBody(payload: InquiryEmailPayload) {
  const lines = [
    `Name: ${payload.name}`,
    payload.company ? `Company: ${payload.company}` : null,
    `Email: ${payload.email}`,
    payload.phone ? `Phone: ${payload.phone}` : null,
    payload.service ? `Service needed: ${payload.service}` : null,
    payload.message ? `Message: ${payload.message}` : null,
    `Source: ${payload.source === "popup" ? "Inquiry pop-up" : "Contact page"}`,
  ].filter(Boolean);

  return lines.join("\n");
}

/**
 * Sends an inquiry notification through the configured email provider.
 * Reads credentials exclusively from environment variables — throws if unset.
 */
export async function sendInquiryEmail(
  payload: InquiryEmailPayload,
): Promise<void> {
  const apiKey = env.RESEND_API_KEY;
  const fromEmail = env.CONTACT_FROM_EMAIL;
  const toEmail = env.CONTACT_TO_EMAIL || siteConfig.email;

  if (!apiKey || !fromEmail) {
    throw new Error(
      "Email provider is not configured. Set RESEND_API_KEY and CONTACT_FROM_EMAIL.",
    );
  }

  const response = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: toEmail,
      reply_to: payload.email,
      subject: `New inquiry from ${payload.name}`,
      text: buildEmailBody(payload),
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Failed to send inquiry email: ${response.status} ${body}`);
  }
}
