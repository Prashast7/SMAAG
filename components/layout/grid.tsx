import type { HTMLAttributes } from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const gridVariants = cva("grid", {
  variants: {
    columns: {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
      4: "grid-cols-1 md:grid-cols-2 xl:grid-cols-4",
      6: "grid-cols-2 md:grid-cols-3 xl:grid-cols-6",
      12: "layout-grid",
    },
    gap: {
      sm: "gap-4",
      md: "gap-6",
      lg: "gap-8",
    },
  },
  defaultVariants: {
    columns: 1,
    gap: "md",
  },
});

type GridProps = HTMLAttributes<HTMLDivElement> & VariantProps<typeof gridVariants>;

/** Provides a reusable responsive grid primitive for future page compositions. */
export function Grid({ className, columns, gap, ...props }: GridProps) {
  return <div className={cn(gridVariants({ columns, gap }), className)} {...props} />;
}
