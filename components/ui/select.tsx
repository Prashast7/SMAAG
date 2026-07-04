import * as React from "react";

import { ChevronDown } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const selectVariants = cva(
  "h-12 w-full appearance-none rounded-md border bg-background px-4 pr-10 text-body text-foreground shadow-xs outline-none disabled:cursor-not-allowed disabled:bg-muted/50 disabled:text-muted-foreground",
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

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> &
  VariantProps<typeof selectVariants>;

/** Renders a native select control styled for the shared form system. */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, children, state, ...props },
  ref,
) {
  return (
    <div className="relative">
      <select ref={ref} className={cn(selectVariants({ state }), className)} {...props}>
        {children}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
      />
    </div>
  );
});
