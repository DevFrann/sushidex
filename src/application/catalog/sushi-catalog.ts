import type { Sushi, SushiType } from "@/domain/entities/sushi";
import { sushiSeedCatalog } from "@/infrastructure/seed/sushi-seed-data";
import { localizeSushiCatalogInEnglish } from "@/infrastructure/localization/english-sushi-catalog";
import type { Locale } from "@/i18n/config";

import type { SushiSearchItem } from "../search/search-utils";

const englishCatalog = localizeSushiCatalogInEnglish(sushiSeedCatalog);

export function getSushiCatalog(locale: Locale): Sushi[] {
  return locale === "en" ? englishCatalog : sushiSeedCatalog;
}

export function getPopularSushi(locale: Locale, limit: number): Sushi[] {
  return [...getSushiCatalog(locale)]
    .sort((left, right) => right.popularity - left.popularity)
    .slice(0, limit);
}

export function getSushiBySlug(locale: Locale, slug: string): Sushi | null {
  return getSushiCatalog(locale).find((sushi) => sushi.slug === slug) ?? null;
}

export function getSushiByType(locale: Locale, type: SushiType): Sushi[] {
  return getSushiCatalog(locale)
    .filter((sushi) => sushi.type === type)
    .sort((left, right) => right.popularity - left.popularity);
}

export function getSushiSearchIndex(locale: Locale): SushiSearchItem[] {
  return getSushiCatalog(locale).map(
    ({ name, slug, japaneseName, aliases, type, ingredients, popularity }) => ({
      name,
      slug,
      japaneseName,
      aliases,
      type,
      ingredients,
      popularity,
    }),
  );
}
