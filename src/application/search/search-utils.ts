import type { Sushi } from "@/domain/entities/sushi";

const synonymGroups = [
  ["salmon", "sake", "salmones"],
  ["tuna", "atun", "maguro"],
  ["shrimp", "ebi", "gamba", "langostino", "camaron"],
  ["eel", "unagi", "anguila"],
  ["yellowtail", "hamachi"],
  ["scallop", "vieira", "hotate"],
  ["octopus", "pulpo", "tako"],
  ["squid", "calamar", "ika"],
  ["roe", "huevas", "ikura", "tobiko"],
  ["crab", "cangrejo", "kani"],
  ["seaweed", "wakame", "alga"],
  ["spicy", "picante"],
];

const synonymMap = new Map<string, string[]>();

for (const group of synonymGroups) {
  for (const token of group) {
    synonymMap.set(token, group);
  }
}

export function normalizeSearchText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function buildSearchTokens(query: string) {
  const baseTokens = normalizeSearchText(query)
    .split(" ")
    .filter(Boolean);

  return [
    ...new Set(baseTokens.flatMap((token) => synonymMap.get(token) ?? [token])),
  ];
}

function buildSearchGroups(query: string) {
  return normalizeSearchText(query)
    .split(" ")
    .filter(Boolean)
    .map((token) => [...new Set(synonymMap.get(token) ?? [token])]);
}

function getSearchableFields(sushi: Sushi) {
  return [
    sushi.name,
    sushi.japaneseName,
    ...sushi.aliases,
    ...sushi.ingredients,
  ].filter((field): field is string => Boolean(field));
}

function bigrams(value: string) {
  const normalized = ` ${normalizeSearchText(value)} `;
  const grams: string[] = [];

  for (let index = 0; index < normalized.length - 1; index += 1) {
    grams.push(normalized.slice(index, index + 2));
  }

  return grams;
}

function diceCoefficient(left: string, right: string) {
  const leftBigrams = bigrams(left);
  const rightBigrams = bigrams(right);

  if (leftBigrams.length === 0 || rightBigrams.length === 0) {
    return 0;
  }

  const rightCounts = new Map<string, number>();

  for (const gram of rightBigrams) {
    rightCounts.set(gram, (rightCounts.get(gram) ?? 0) + 1);
  }

  let matches = 0;

  for (const gram of leftBigrams) {
    const count = rightCounts.get(gram) ?? 0;

    if (count > 0) {
      matches += 1;
      rightCounts.set(gram, count - 1);
    }
  }

  return (2 * matches) / (leftBigrams.length + rightBigrams.length);
}

function fieldMatchesToken(field: string, token: string) {
  return (
    field.includes(token) ||
    (token.length >= 4 && diceCoefficient(token, field) >= 0.82)
  );
}

export function scoreSushiForQuery(sushi: Sushi, query: string) {
  const normalizedQuery = normalizeSearchText(query);

  if (!normalizedQuery) {
    return 0;
  }

  const tokenGroups = buildSearchGroups(query);
  const tokens = tokenGroups.flat();
  const searchableFields = getSearchableFields(sushi).map(normalizeSearchText);
  const searchable = searchableFields.join(" ");
  const normalizedName = normalizeSearchText(sushi.name);
  const normalizedJapaneseName = sushi.japaneseName
    ? normalizeSearchText(sushi.japaneseName)
    : "";
  const normalizedAliases = sushi.aliases.map(normalizeSearchText);
  const normalizedIngredients = sushi.ingredients.map(normalizeSearchText);
  const hasEveryQueryPart = tokenGroups.every((group) =>
    group.some((token) =>
      searchableFields.some((field) => fieldMatchesToken(field, token)),
    ),
  );

  if (!hasEveryQueryPart) {
    return 0;
  }

  let score = 0;

  if (normalizedName === normalizedQuery) {
    score += 60;
  }

  if (normalizedJapaneseName === normalizedQuery) {
    score += 45;
  }

  if (normalizedAliases.includes(normalizedQuery)) {
    score += 40;
  }

  if (searchable.includes(normalizedQuery)) {
    score += 25;
  }

  for (const token of tokens) {
    if (normalizedName.includes(token)) {
      score += 12;
    }

    if (normalizedJapaneseName.includes(token)) {
      score += 10;
    }

    if (normalizedAliases.some((alias) => alias.includes(token))) {
      score += 9;
    }

    if (normalizedIngredients.some((ingredient) => ingredient.includes(token))) {
      score += 7;
    }

    if (searchable.includes(token)) {
      score += 4;
    }
  }

  const bestFieldSimilarity = Math.max(
    ...searchableFields.map((field) => diceCoefficient(normalizedQuery, field)),
  );

  if (normalizedQuery.length >= 4 && bestFieldSimilarity >= 0.72) {
    score += Math.round(bestFieldSimilarity * 20);
  }

  score += Math.round((sushi.popularity / 100) * 5);

  return score;
}

export function getSearchMatchLabel(sushi: Sushi, query: string) {
  const normalizedQuery = normalizeSearchText(query);
  const tokens = buildSearchTokens(query);

  if (!normalizedQuery) {
    return sushi.ingredients.slice(0, 3).join(", ");
  }

  const aliasMatch = sushi.aliases.find((alias) => {
    const normalizedAlias = normalizeSearchText(alias);

    return (
      normalizedAlias.includes(normalizedQuery) ||
      tokens.some((token) => normalizedAlias.includes(token))
    );
  });

  if (aliasMatch) {
    return `Alias: ${aliasMatch}`;
  }

  const ingredientMatch = sushi.ingredients.find((ingredient) => {
    const normalizedIngredient = normalizeSearchText(ingredient);

    return (
      normalizedIngredient.includes(normalizedQuery) ||
      tokens.some((token) => normalizedIngredient.includes(token))
    );
  });

  if (ingredientMatch) {
    return `Ingrediente: ${ingredientMatch}`;
  }

  return sushi.ingredients.slice(0, 3).join(", ");
}
