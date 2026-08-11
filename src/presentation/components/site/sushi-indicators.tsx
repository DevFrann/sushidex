import { CookingPot, Fish, Flame, Gauge } from "lucide-react";

import type { Sushi } from "@/domain/entities/sushi";
import type { Locale } from "@/i18n/config";
import { formatMessage, getDictionary } from "@/i18n/dictionaries";
import { cn } from "@/presentation/lib/utils";

const spiceStrength = {
  NONE: 0,
  MILD: 1,
  MEDIUM: 2,
  HIGH: 3,
} as const;

const spiceTone = {
  NONE: "border-rose-200 bg-rose-50 text-rose-700",
  MILD: "border-amber-200 bg-amber-50 text-amber-800",
  MEDIUM: "border-orange-300 bg-orange-50 text-orange-800",
  HIGH: "border-red-300 bg-red-50 text-red-800",
} as const;

const flavorTone = {
  DELICATE: "border-teal-200 bg-teal-50 text-teal-800",
  BALANCED: "border-blue-200 bg-blue-50 text-blue-800",
  BOLD: "border-indigo-200 bg-indigo-50 text-indigo-800",
} as const;

interface SushiIndicatorsProps {
  sushi: Pick<Sushi, "spicyLevel" | "rawFish" | "flavorIntensity">;
  locale: Locale;
  size?: "sm" | "md";
}

export function SushiIndicators({ sushi, locale, size = "sm" }: SushiIndicatorsProps) {
  const dictionary = getDictionary(locale);
  const activeFlames = spiceStrength[sushi.spicyLevel];
  const flavorLabel = formatMessage(dictionary.indicators.flavor, {
    value:
      dictionary.indicators.flavorIntensity[sushi.flavorIntensity].toLowerCase(),
  }).replace(/^./, (letter) => letter.toUpperCase());
  const chipClass = cn(
    "inline-flex items-center gap-2 rounded-full border font-medium",
    size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm",
  );

  return (
    <div className="flex flex-wrap gap-2">
      <div className={cn(chipClass, spiceTone[sushi.spicyLevel])}>
        <span className="flex items-center gap-0.5" aria-hidden>
          {[1, 2, 3].map((level) => (
            <Flame
              key={level}
              className={cn(
                size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4",
                level <= activeFlames ? "fill-current" : "text-stone-300",
              )}
            />
          ))}
        </span>
        <span>{dictionary.indicators.spicy[sushi.spicyLevel]}</span>
      </div>

      <div
        className={cn(
          chipClass,
          sushi.rawFish
            ? "border-sky-200 bg-sky-50 text-sky-800"
            : "border-emerald-200 bg-emerald-50 text-emerald-800",
        )}
      >
        {sushi.rawFish ? (
          <Fish className={size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"} />
        ) : (
          <CookingPot className={size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"} />
        )}
        <span>
          {sushi.rawFish
            ? dictionary.indicators.rawFish
            : dictionary.indicators.noRawFish}
        </span>
      </div>

      <div className={cn(chipClass, flavorTone[sushi.flavorIntensity])}>
        <Gauge className={size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"} />
        <span>{flavorLabel}</span>
      </div>
    </div>
  );
}
