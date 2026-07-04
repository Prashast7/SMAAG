import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

/** Provides the base surface wrapper for grouped content. */
export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card text-card-foreground shadow-sm",
        className,
      )}
      {...props}
    />
  );
}

/** Arranges the header region of a card. */
export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-2 p-6", className)} {...props} />;
}

/** Renders the primary heading inside a card. */
export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-h4", className)} {...props} />;
}

/** Renders supporting text inside a card header. */
export function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-small text-muted", className)} {...props} />;
}

/** Provides the main content region for a card. */
export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-6 pb-6", className)} {...props} />;
}

/** Provides an action or metadata footer for a card. */
export function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center gap-3 px-6 pb-6 pt-2", className)} {...props} />;
}
