import type { HTMLAttributes } from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const containerVariants = cva("mx-auto w-full px-4 sm:px-6 lg:px-8", {
  variants: {
    size: {
      sm: "max-w-(--container-sm)",
      md: "max-w-(--container-md)",
      lg: "max-w-(--container-lg)",
      xl: "max-w-(--container-xl)",
      "2xl": "max-w-(--container-2xl)",
      full: "max-w-none",
    },
  },
  defaultVariants: {
    size: "xl",
  },
});

type ContainerProps = HTMLAttributes<HTMLDivElement> & VariantProps<typeof containerVariants>;

/** Provides consistent responsive widths for page-level layout regions. */
export function Container({ className, size, ...props }: ContainerProps) {
  return <div className={cn(containerVariants({ size }), className)} {...props} />;
}
