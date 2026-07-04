import * as React from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex h-12 w-full rounded-md border bg-background px-4 text-body text-foreground shadow-xs outline-none placeholder:text-subtle disabled:cursor-not-allowed disabled:bg-muted/50 disabled:text-muted-foreground",
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

type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputVariants>;

/** Renders a reusable single-line text input with validation states. */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, state, type = "text", ...props },
  ref,
) {
  return <input ref={ref} type={type} className={cn(inputVariants({ state }), className)} {...props} />;
});
