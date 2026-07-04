import { z } from "zod";

import { siteConfig } from "@/constants/site";

const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z
    .string()
    .url()
    .default(`https://${siteConfig.domain}`),
  CMS_BASE_URL: z.string().url().optional().or(z.literal("")),
  CMS_ACCESS_TOKEN: z.string().min(1).optional().or(z.literal("")),
  RESEND_API_KEY: z.string().min(1).optional().or(z.literal("")),
  CONTACT_FROM_EMAIL: z.string().email().optional().or(z.literal("")),
  CONTACT_TO_EMAIL: z.string().email().optional().or(z.literal("")),
});

const parsedEnv = envSchema.safeParse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  CMS_BASE_URL: process.env.CMS_BASE_URL,
  CMS_ACCESS_TOKEN: process.env.CMS_ACCESS_TOKEN,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL,
  CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
});

if (!parsedEnv.success) {
  throw new Error(`Invalid environment variables: ${parsedEnv.error.message}`);
}

export const env = parsedEnv.data;
