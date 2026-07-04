import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

/** Separates adjacent content groups with a subtle horizontal rule. */
export function Divider({ className, ...props }: HTMLAttributes<HTMLHRElement>) {
  return <hr className={cn("border-0 border-t border-border", className)} {...props} />;
}
