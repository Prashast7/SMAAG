import type { HTMLAttributes } from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const fieldMessageVariants = cva("text-small", {
  variants: {
    tone: {
      default: "text-muted",
      success: "text-success",
      error: "text-destructive",
    },
  },
  defaultVariants: {
    tone: "default",
  },
});

type FieldMessageProps = HTMLAttributes<HTMLParagraphElement> &
  VariantProps<typeof fieldMessageVariants>;

/** Displays helper, success, or error messaging for form controls. */
export function FieldMessage({ className, tone, ...props }: FieldMessageProps) {
  return <p className={cn(fieldMessageVariants({ tone }), className)} {...props} />;
}
