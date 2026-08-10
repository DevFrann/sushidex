import * as React from "react";

import { cn } from "@/presentation/lib/utils";

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[28px] border border-stone-200/80 bg-white/90 shadow-[0_18px_60px_-40px_rgba(17,24,39,0.25)] backdrop-blur",
        className,
      )}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-5", className)} {...props} />;
}
