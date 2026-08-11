import Image from "next/image";
import Link from "next/link";

import type { Sushi } from "@/domain/entities/sushi";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

import { Card, CardContent } from "../ui/card";
import { SushiIndicators } from "./sushi-indicators";

export function SushiCard({ sushi, locale }: { sushi: Sushi; locale: Locale }) {
  const dictionary = getDictionary(locale);

  return (
    <Link href={`/${locale}/sushi/${sushi.slug}`} className="block">
      <Card className="group h-full overflow-hidden transition-transform duration-200 hover:-translate-y-1">
        <div className="relative h-52 overflow-hidden">
          <Image
            src={sushi.imageUrl}
            alt={sushi.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <span className="absolute right-4 top-4 z-10 inline-flex max-w-[calc(100%-2rem)] items-center gap-2 rounded-full border border-white/20 bg-[#2f6d70] px-3 py-1.5 text-[10px] font-normal uppercase tracking-[0.08em] text-white shadow-[0_9px_22px_rgba(18,63,70,0.28)] sm:text-[11px]">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#e1b94f]" />
            <span className="truncate">{dictionary.typeLabels[sushi.type]}</span>
          </span>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent px-5 pb-4 pt-10 text-white">
            <h3 className="text-xl font-semibold">{sushi.name}</h3>
          </div>
        </div>
        <CardContent className="space-y-4">
          <p className="text-sm leading-6 text-stone-700">{sushi.shortDescription}</p>
          <SushiIndicators sushi={sushi} locale={locale} />
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
              {dictionary.detail.ingredients}
            </p>
            <p className="mt-2 text-sm text-stone-700">
              {sushi.ingredients.join(", ")}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
