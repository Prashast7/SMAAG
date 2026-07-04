import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type PageHeaderProps = {
  actions?: ReactNode;
  description?: ReactNode;
  eyebrow?: ReactNode;
  title: ReactNode;
  className?: string;
};

/** Establishes a consistent page-level heading pattern for future route templates. */
export function PageHeader({
  actions,
  className,
  description,
  eyebrow,
  title,
}: PageHeaderProps) {
  return (
    <header className={cn("content-grid gap-6", className)}>
      <div className="max-w-3xl space-y-4">
        {eyebrow ? <div className="text-caption uppercase tracking-[0.24em]">{eyebrow}</div> : null}
        <h1 className="text-h1 text-balance">{title}</h1>
        {description ? <p className="text-body-lg text-balance text-muted">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
    </header>
  );
}
