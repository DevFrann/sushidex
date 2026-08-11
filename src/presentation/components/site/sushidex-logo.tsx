import { cn } from "@/presentation/lib/utils";

interface SushiDexLogoProps {
  className?: string;
}

export function SushiDexLogo({ className }: SushiDexLogoProps) {
  return (
    <svg
      aria-hidden="true"
      className={cn("shrink-0", className)}
      focusable="false"
      viewBox="0 0 100 100"
    >
      <path
        className="fill-[#123f46]"
        d="M18 12h31c25 0 43 16 43 38S74 88 49 88H37c11-6 18-15 21-25 4-13 0-25-10-31-8-5-18-5-30 1V12Z"
      />
      <path
        className="fill-[#d2a33a]"
        d="M18 57c14-8 28-6 34 3 6 10 1 22-12 28H18V57Z"
      />
      <path
        className="fill-[#f7f3ec]"
        d="M21 33c11-10 28-11 38-2 8 7 8 17 1 23-5 5-12 7-19 9-7 2-10 6-7 10 4 5 14 5 21-1l7 10c-13 11-33 9-40-3-6-11 0-23 13-27 7-2 14-4 17-7 3-3 2-7-1-9-6-5-16-3-23 4L21 33Z"
      />
    </svg>
  );
}
