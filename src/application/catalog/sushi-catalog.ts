import type { Sushi, SushiType } from "@/domain/entities/sushi";
import { sushiSeedCatalog } from "@/infrastructure/seed/sushi-seed-data";

import type { SushiSearchItem } from "../search/search-utils";

export function getSushiCatalog(): Sushi[] {
  return sushiSeedCatalog;
}

export function getPopularSushi(limit: number): Sushi[] {
  return [...sushiSeedCatalog]
    .sort((left, right) => right.popularity - left.popularity)
    .slice(0, limit);
}

export function getSushiBySlug(slug: string): Sushi | null {
  return sushiSeedCatalog.find((sushi) => sushi.slug === slug) ?? null;
}

export function getSushiByType(type: SushiType): Sushi[] {
  return sushiSeedCatalog
    .filter((sushi) => sushi.type === type)
    .sort((left, right) => right.popularity - left.popularity);
}

export function getSushiSearchIndex(): SushiSearchItem[] {
  return sushiSeedCatalog.map(
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
