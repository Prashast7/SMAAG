import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

type CtaProps = {
  actions?: ReactNode;
  description?: ReactNode;
  eyebrow?: ReactNode;
  title: ReactNode;
  className?: string;
};

/** Provides a reusable call-to-action shell for conversion moments without page-specific copy. */
export function Cta({ actions, className, description, eyebrow, title }: CtaProps) {
  return (
    <Card className={cn("rounded-2xl border-border/80", className)}>
      <CardContent className="flex flex-col gap-6 p-8 sm:p-10">
        <div className="max-w-3xl space-y-4">
          {eyebrow ? <div className="text-caption uppercase tracking-[0.24em]">{eyebrow}</div> : null}
          <h2 className="text-h2 text-balance">{title}</h2>
          {description ? <p className="text-body-lg text-balance text-muted">{description}</p> : null}
        </div>
        {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
      </CardContent>
    </Card>
  );
}
