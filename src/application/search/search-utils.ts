import type { Sushi } from "@/domain/entities/sushi";

const synonymGroups = [
  ["salmon", "sake", "salmones", "salmon"],
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
  ["roll", "maki"],
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

  return [...new Set(baseTokens.flatMap((token) => synonymMap.get(token) ?? [token]))];
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

export function scoreSushiForQuery(sushi: Sushi, query: string) {
  const normalizedQuery = normalizeSearchText(query);

  if (!normalizedQuery) {
    return 0;
  }

  const tokens = buildSearchTokens(query);
  const searchable = normalizeSearchText(
    [
      sushi.name,
      sushi.japaneseName,
      sushi.searchTerms,
      sushi.type,
      sushi.description,
      ...sushi.aliases,
      ...sushi.ingredients,
    ]
      .filter(Boolean)
      .join(" "),
  );

  const normalizedName = normalizeSearchText(sushi.name);
  const normalizedAliases = sushi.aliases.map(normalizeSearchText);
  const normalizedIngredients = sushi.ingredients.map(normalizeSearchText);

  let score = 0;

  if (normalizedName === normalizedQuery) {
    score += 60;
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

  score += Math.round(diceCoefficient(normalizedQuery, searchable) * 20);
  score += Math.round((sushi.popularity / 100) * 5);

  return score;
}
