import { NextResponse } from "next/server";
import { z } from "zod";

import { sendInquiryEmail } from "@/lib/email";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  company: z.string().trim().max(200).optional(),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().max(40).optional(),
  service: z.string().trim().max(120).optional(),
  message: z.string().trim().max(4000).optional(),
  source: z.enum(["contact_page", "popup"]).default("contact_page"),
});

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Please review the highlighted fields.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  try {
    await sendInquiryEmail(parsed.data);
  } catch (error) {
    console.error("Failed to send inquiry email", error);
    return NextResponse.json(
      {
        error:
          "We couldn't send your message right now. Please email us directly.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
