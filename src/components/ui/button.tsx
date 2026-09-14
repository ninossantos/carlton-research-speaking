import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-sm)] text-sm font-semibold transition-[color,background-color,border-color,transform] duration-[var(--motion-quick)] ease-[var(--ease-smooth-out)] active:not-disabled:scale-[0.96] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-fg hover:bg-ink",
        ink: "bg-ink text-surface hover:bg-fg",
        outline:
          "border border-gold bg-transparent text-ink hover:bg-surface",
        ghost: "text-muted hover:text-ink hover:bg-surface",
      },
      size: {
        md: "min-h-11 px-5 py-2.5",
        sm: "min-h-10 px-3.5 py-2 text-sm",
        lg: "min-h-12 px-6 py-3",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

export function Button({
  className,
  variant,
  size,
  asChild,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}
