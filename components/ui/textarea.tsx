import * as React from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const textareaVariants = cva(
  "flex min-h-32 w-full rounded-md border bg-background px-4 py-3 text-body text-foreground shadow-xs outline-none placeholder:text-subtle disabled:cursor-not-allowed disabled:bg-muted/50 disabled:text-muted-foreground",
  {
    variants: {
      state: {
        default: "border-input",
        success: "border-success/40 focus-visible:ring-success/30",
        error: "border-destructive/40 focus-visible:ring-destructive/30",
      },
    },
    defaultVariants: {
      state: "default",
    },
  },
);

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  VariantProps<typeof textareaVariants>;

/** Renders a reusable multiline text area with validation states. */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, state, ...props },
  ref,
) {
  return <textarea ref={ref} className={cn(textareaVariants({ state }), className)} {...props} />;
});
