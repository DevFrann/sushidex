import type { SushiSearchItem } from "./search-utils";

import { scoreSushiForQuery } from "./search-utils";

export function searchSushis<T extends SushiSearchItem>(
  catalog: readonly T[],
  query: string,
  limit = 12,
): T[] {
  const normalizedQuery = query.trim();

  if (!normalizedQuery) {
    return [];
  }

  return catalog
    .map((sushi) => ({
      sushi,
      score: scoreSushiForQuery(sushi, normalizedQuery),
    }))
    .filter(({ score }) => score > 0)
    .sort((left, right) => {
      if (right.score === left.score) {
        return right.sushi.popularity - left.sushi.popularity;
      }

      return right.score - left.score;
    })
    .slice(0, limit)
    .map(({ sushi }) => sushi);
}
