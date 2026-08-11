import { CookingPot, Fish, Flame, Gauge } from "lucide-react";

import type { Sushi } from "@/domain/entities/sushi";
import {
  flavorIntensityLabels,
  spicyLevelLabels,
} from "@/presentation/lib/labels";
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
  size?: "sm" | "md";
}

export function SushiIndicators({ sushi, size = "sm" }: SushiIndicatorsProps) {
  const activeFlames = spiceStrength[sushi.spicyLevel];
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
        <span>{spicyLevelLabels[sushi.spicyLevel]}</span>
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
        <span>{sushi.rawFish ? "Pescado crudo" : "Sin pescado crudo"}</span>
      </div>

      <div className={cn(chipClass, flavorTone[sushi.flavorIntensity])}>
        <Gauge className={size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"} />
        <span>
          Sabor {flavorIntensityLabels[sushi.flavorIntensity].toLowerCase()}
        </span>
      </div>
    </div>
  );
}
