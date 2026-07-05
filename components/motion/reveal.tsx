import type { CSSProperties, PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

type RevealProps = PropsWithChildren<{
  className?: string;
  delayMs?: number;
}>;

/**
 * Fades content in on load via a pure CSS keyframe animation — no JS, so
 * there's no hydration-timing window where content is blank. Reduced-motion
 * users get the animation clamped to 1ms by the global rule in globals.css.
 */
export function Reveal({ children, className, delayMs = 0 }: RevealProps) {
  const style: CSSProperties | undefined = delayMs
    ? { animationDelay: `${delayMs}ms` }
    : undefined;

  return (
    <div className={cn("animate-fade-in-up", className)} style={style}>
      {children}
    </div>
  );
}
