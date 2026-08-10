import * as React from "react";

import { cn } from "@/presentation/lib/utils";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "flex h-14 w-full rounded-full border border-stone-200 bg-white/85 px-5 text-base text-stone-900 outline-none placeholder:text-stone-400 focus:border-stone-300",
        className,
      )}
      {...props}
    />
  );
}
