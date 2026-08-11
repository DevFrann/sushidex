import Fuse from "fuse.js";

import type { SushiSearchItem } from "./search-utils";

import {
  buildSearchTokenGroups,
  normalizeSearchText,
  scoreSushiForQuery,
} from "./search-utils";

type FuseRecord = {
  sushi: SushiSearchItem;
  name: string;
  japaneseName: string;
  aliases: string[];
  ingredients: string[];
};

// El indice se construye sobre los campos ya normalizados (tildes fuera,
// transliteracion plegada) para que la tolerancia a errores de Fuse actue
// sobre la misma forma canonica que ven los tokens de la consulta.
const fuseCache = new WeakMap<readonly SushiSearchItem[], Fuse<FuseRecord>>();

function getCatalogFuse(catalog: readonly SushiSearchItem[]) {
  const cached = fuseCache.get(catalog);

  if (cached) {
    return cached;
  }

  const records: FuseRecord[] = catalog.map((sushi) => ({
    sushi,
    name: normalizeSearchText(sushi.name),
    japaneseName: sushi.japaneseName
      ? normalizeSearchText(sushi.japaneseName)
      : "",
    aliases: sushi.aliases.map(normalizeSearchText),
    ingredients: sushi.ingredients.map(normalizeSearchText),
  }));

  const fuse = new Fuse(records, {
    keys: [
      { name: "name", weight: 3 },
      { name: "aliases", weight: 2.5 },
      { name: "japaneseName", weight: 2 },
      { name: "ingredients", weight: 1.5 },
    ],
    includeScore: true,
    ignoreLocation: true,
    threshold: 0.32,
    useExtendedSearch: true,
  });

  fuseCache.set(catalog, fuse);

  return fuse;
}

export function searchSushis<T extends SushiSearchItem>(
  catalog: readonly T[],
  query: string,
  limit = 12,
): T[] {
  const tokenGroups = buildSearchTokenGroups(query);

  if (tokenGroups.length === 0 || catalog.length === 0) {
    return [];
  }

  const fuse = getCatalogFuse(catalog);

  // AND entre grupos (cada palabra de la consulta debe encontrar algo), OR
  // difuso dentro de cada grupo (la palabra, su singular y sus sinonimos).
  let matches: Map<T, number> | null = null;

  for (const group of tokenGroups) {
    const groupMatches = new Map<T, number>();

    for (const result of fuse.search(group.join(" | "))) {
      const sushi = result.item.sushi as T;
      const score = result.score ?? 1;
      const previous = groupMatches.get(sushi);

      if (previous === undefined || score < previous) {
        groupMatches.set(sushi, score);
      }
    }

    if (matches === null) {
      matches = groupMatches;
    } else {
      const intersection = new Map<T, number>();

      for (const [sushi, accumulated] of matches) {
        const groupScore = groupMatches.get(sushi);

        if (groupScore !== undefined) {
          intersection.set(sushi, accumulated + groupScore);
        }
      }

      matches = intersection;
    }

    if (matches.size === 0) {
      return [];
    }
  }

  return [...(matches ?? new Map<T, number>())]
    .map(([sushi, fuseTotal]) => ({
      sushi,
      score:
        scoreSushiForQuery(sushi, query) +
        Math.round((1 - fuseTotal / tokenGroups.length) * 30),
    }))
    .sort((left, right) => {
      if (right.score === left.score) {
        return right.sushi.popularity - left.sushi.popularity;
      }

      return right.score - left.score;
    })
    .slice(0, limit)
    .map(({ sushi }) => sushi);
}
