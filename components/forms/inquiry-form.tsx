"use client";

import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { FieldMessage } from "@/components/ui/field-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/constants/site";
import type { InquirySource } from "@/lib/email";

const SERVICE_OPTIONS = [
  "Bookkeeping & Accounting",
  "Financial Statement Preparation",
  "Internal Controls & Business Advisory",
  "Other",
];

type InquiryFormProps = {
  source: InquirySource;
  variant?: "full" | "compact";
  onSuccess?: () => void;
};

type FormStatus = "idle" | "submitting" | "success" | "error";

/** Renders the shared inquiry form used on the Contact page and the inquiry pop-up. */
export function InquiryForm({
  source,
  variant = "full",
  onSuccess,
}: InquiryFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isFull = variant === "full";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company") || undefined,
      phone: formData.get("phone") || undefined,
      service: formData.get("service") || undefined,
      message: formData.get("message") || undefined,
      source,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(
          data?.error ?? "Something went wrong. Please try again.",
        );
      }

      setStatus("success");
      form.reset();
      onSuccess?.();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="border-success/30 bg-success/5 space-y-2 rounded-lg border p-6">
        <p className="text-body text-foreground font-medium">
          Thank you for reaching out.
        </p>
        <p className="text-body text-muted">
          Shivangi will be in touch within 1–2 business days.
        </p>
      </div>
    );
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor={`${source}-name`}>Full Name</Label>
        <Input
          id={`${source}-name`}
          name="name"
          required
          type="text"
          autoComplete="name"
        />
      </div>

      {isFull ? (
        <div className="space-y-2">
          <Label htmlFor={`${source}-company`}>Company Name</Label>
          <Input
            id={`${source}-company`}
            name="company"
            required
            type="text"
            autoComplete="organization"
          />
        </div>
      ) : null}

      <div className="space-y-2">
        <Label htmlFor={`${source}-email`}>Email Address</Label>
        <Input
          id={`${source}-email`}
          name="email"
          required
          type="email"
          autoComplete="email"
        />
      </div>

      {isFull ? (
        <>
          <div className="space-y-2">
            <Label htmlFor={`${source}-phone`}>Phone Number</Label>
            <Input
              id={`${source}-phone`}
              name="phone"
              type="tel"
              autoComplete="tel"
            />
            <FieldMessage>Optional</FieldMessage>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`${source}-service`}>Type of Service Needed</Label>
            <Select
              id={`${source}-service`}
              name="service"
              defaultValue=""
              required
            >
              <option disabled value="">
                Select a service
              </option>
              {SERVICE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </div>
        </>
      ) : null}

      <div className="space-y-2">
        <Label htmlFor={`${source}-message`}>
          {isFull ? "Brief description of your needs" : "Brief message"}
        </Label>
        <Textarea
          id={`${source}-message`}
          name="message"
          required={!isFull}
          rows={isFull ? 4 : 3}
        />
        {isFull ? <FieldMessage>Optional</FieldMessage> : null}
      </div>

      {status === "error" && errorMessage ? (
        <FieldMessage tone="error">
          {errorMessage} You can also email us directly at{" "}
          <a
            className="underline underline-offset-4"
            href={`mailto:${siteConfig.email}`}
          >
            {siteConfig.email}
          </a>
          .
        </FieldMessage>
      ) : null}

      <Button
        className="w-full justify-center sm:w-auto"
        loading={status === "submitting"}
        type="submit"
      >
        {isFull ? "Send Inquiry" : "Send Message"}
      </Button>
    </form>
  );
}
