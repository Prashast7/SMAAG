import type { LabelHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

/** Labels form controls with consistent type and spacing. */
export function Label({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn("text-small font-medium text-foreground peer-disabled:opacity-60", className)}
      {...props}
    />
  );
}
