import type { SushiRepository } from "@/domain/repositories/sushi-repository";

import { scoreSushiForQuery } from "./search-utils";

export async function searchSushis(
  repository: SushiRepository,
  query: string,
  limit = 12,
) {
  const normalizedQuery = query.trim();

  if (!normalizedQuery) {
    return [];
  }

  const sushiCatalog = await repository.findAll();

  return sushiCatalog
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
