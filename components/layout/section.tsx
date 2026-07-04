import type { HTMLAttributes } from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const sectionVariants = cva("py-16 sm:py-20 lg:py-24", {
  variants: {
    tone: {
      default: "bg-transparent",
      subtle: "surface-subtle",
      muted: "bg-muted/60",
      card: "bg-card",
    },
    spacing: {
      sm: "py-12 sm:py-16",
      md: "py-16 sm:py-20",
      lg: "py-20 sm:py-24 lg:py-28",
    },
  },
  defaultVariants: {
    tone: "default",
    spacing: "md",
  },
});

type SectionProps = HTMLAttributes<HTMLElement> & VariantProps<typeof sectionVariants>;

/** Establishes vertical rhythm and background treatment for page sections. */
export function Section({ className, tone, spacing, ...props }: SectionProps) {
  return <section className={cn(sectionVariants({ tone, spacing }), className)} {...props} />;
}
