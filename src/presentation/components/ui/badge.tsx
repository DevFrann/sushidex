import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/presentation/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "bg-stone-900 text-stone-50",
        secondary: "bg-stone-100 text-stone-700",
        outline: "border border-stone-200 bg-white/70 text-stone-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
