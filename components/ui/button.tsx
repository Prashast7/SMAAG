import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium shadow-xs transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/92",
        secondary: "border border-border bg-secondary text-secondary-foreground hover:bg-accent",
        outline: "border border-border bg-background text-foreground hover:bg-accent",
        ghost: "bg-transparent text-foreground shadow-none hover:bg-accent",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-11 px-5",
        lg: "h-12 px-6 text-sm",
        icon: "size-11 rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
  };

/** Renders the shared button system used across actions and navigation. */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, asChild = false, loading = false, children, disabled, ...props },
  ref,
) {
  const Comp = asChild ? Slot : "button";
  const isDisabled = disabled || loading;

  return (
    <Comp
      ref={ref}
      aria-busy={loading}
      aria-disabled={asChild ? isDisabled : undefined}
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={asChild ? undefined : isDisabled}
      {...props}
    >
      {loading ? <LoaderCircle aria-hidden="true" className="animate-spin" /> : null}
      {children}
    </Comp>
  );
});

export { buttonVariants };
