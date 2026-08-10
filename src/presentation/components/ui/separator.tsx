import { cn } from "@/presentation/lib/utils";

export function Separator({ className }: { className?: string }) {
  return <div aria-hidden className={cn("h-px w-full bg-stone-200", className)} />;
}
