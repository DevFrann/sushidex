import type { Sushi } from "@/domain/entities/sushi";

export type SushiSearchItem = Pick<
  Sushi,
  | "name"
  | "slug"
  | "japaneseName"
  | "aliases"
  | "type"
  | "ingredients"
  | "popularity"
>;

// Grupos de equivalencia: sinonimos entre idiomas, romaji alternativo y errores
// de escritura frecuentes ("niguiri", "urumaki", "tanpura"...). Cualquier token
// del grupo recupera al resto. Los tokens se normalizan al construir el mapa,
// asi que se pueden escribir en su forma natural.
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
  ["crab", "cangrejo", "kani", "surimi"],
  ["seaweed", "wakame", "alga"],
  ["spicy", "picante"],
  ["avocado", "aguacate", "palta", "abocado"],
  ["cheese", "queso", "philadelphia", "filadelfia", "philadelfia"],
  ["rice", "arroz"],
  ["cucumber", "pepino", "kappa"],
  ["egg", "huevo", "tamago", "tortilla"],
  ["aburi", "flameado", "flambeado", "soplete"],
  ["wasabi", "wasabe", "guasabi"],
  ["soja", "soya", "shoyu", "soyu"],
  ["temaki", "cono", "cone"],
  ["tempura", "tenpura", "tanpura", "tempora", "rebozado", "rebozada"],
  ["uramaki", "urumaki", "huramaki", "oramaki"],
  ["nigiri", "niguiri", "nigri", "niguri"],
  ["sashimi", "sasimi", "sachimi", "shasimi"],
  ["gyoza", "gioza", "gyosa", "guioza", "empanadilla"],
  ["dorada", "tai", "bream"],
  ["lubina", "suzuki", "bass"],
  ["caballa", "saba", "mackerel"],
  ["gari", "jengibre", "ginger"],
];

// Pliega variantes de transliteracion del romaji a una forma canonica comun.
// Se aplica igual a consultas y a campos indexados, asi que solo importa que
// ambos lados converjan: "sasimi"/"sashimi" -> "sasimi", "gioza"/"gyoza" ->
// "gioza", "niguiri"/"nigiri" -> "nigiri", "soyu"/"shoyu" -> "soiu".
function foldTransliteration(value: string) {
  return value
    .replace(/sh/g, "s")
    .replace(/y/g, "i")
    .replace(/gui/g, "gi")
    .replace(/gue/g, "ge");
}

export function normalizeSearchText(value: string) {
  return foldTransliteration(
    value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  );
}

const synonymMap = new Map<string, string[]>();

for (const group of synonymGroups) {
  const normalizedGroup = [...new Set(group.map(normalizeSearchText))];

  for (const token of normalizedGroup) {
    const existing = synonymMap.get(token);

    if (existing) {
      for (const sibling of normalizedGroup) {
        if (!existing.includes(sibling)) {
          existing.push(sibling);
        }
      }
    } else {
      synonymMap.set(token, [...normalizedGroup]);
    }
  }
}

// Palabras vacias en ambos idiomas ("nigiri de salmon", "roll of tuna"). La
// "i" suelta cubre la conjuncion "y" tras el plegado de transliteracion.
const stopwords = new Set([
  "de",
  "del",
  "la",
  "el",
  "lo",
  "los",
  "las",
  "un",
  "una",
  "al",
  "con",
  "en",
  "of",
  "the",
  "an",
  "and",
  "with",
  "in",
]);

function isStopword(token: string) {
  return token.length === 1 || stopwords.has(token);
}

function singularVariants(token: string) {
  const variants = [token];

  if (token.length > 4 && token.endsWith("es")) {
    variants.push(token.slice(0, -2));
  }

  if (token.length > 3 && token.endsWith("s")) {
    variants.push(token.slice(0, -1));
  }

  return variants;
}

// Un grupo por palabra de la consulta; cada grupo reune la palabra, su forma
// singular y sus sinonimos. La busqueda exige que cada grupo encuentre algo
// (AND entre grupos, OR dentro del grupo).
export function buildSearchTokenGroups(query: string) {
  const tokens = normalizeSearchText(query).split(" ").filter(Boolean);
  const meaningfulTokens = tokens.filter((token) => !isStopword(token));

  return (meaningfulTokens.length > 0 ? meaningfulTokens : tokens)
    .map((token) => {
      const variants = new Set(singularVariants(token));

      for (const variant of [...variants]) {
        for (const synonym of synonymMap.get(variant) ?? []) {
          variants.add(synonym);
        }
      }

      return [...variants];
    });
}

export function buildSearchTokens(query: string) {
  return [...new Set(buildSearchTokenGroups(query).flat())];
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

// Coincidencia difusa de un token contra un campo ya normalizado: contiene el
// token literal o alguna palabra del campo se parece lo suficiente.
export function fuzzyTokenMatch(normalizedField: string, token: string) {
  if (normalizedField.includes(token)) {
    return true;
  }

  if (token.length < 4) {
    return false;
  }

  return normalizedField
    .split(" ")
    .some((word) => word.length >= 4 && diceCoefficient(token, word) >= 0.72);
}

function getSearchableFields(sushi: SushiSearchItem) {
  return [
    sushi.name,
    sushi.japaneseName,
    ...sushi.aliases,
    ...sushi.ingredients,
  ].filter((field): field is string => Boolean(field));
}

// Puntuacion de relevancia para ordenar candidatos ya recuperados; el filtrado
// tolerante a errores lo hace el indice difuso en searchSushis.
export function scoreSushiForQuery(sushi: SushiSearchItem, query: string) {
  const normalizedQuery = normalizeSearchText(query);

  if (!normalizedQuery) {
    return 0;
  }

  const tokens = buildSearchTokens(query);
  const searchableFields = getSearchableFields(sushi).map(normalizeSearchText);
  const searchable = searchableFields.join(" ");
  const normalizedName = normalizeSearchText(sushi.name);
  const normalizedJapaneseName = sushi.japaneseName
    ? normalizeSearchText(sushi.japaneseName)
    : "";
  const normalizedAliases = sushi.aliases.map(normalizeSearchText);
  const normalizedIngredients = sushi.ingredients.map(normalizeSearchText);

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

export function getSearchMatchLabel(
  sushi: SushiSearchItem,
  query: string,
  labels: { alias: string; ingredient: string } = {
    alias: "Alias: {value}",
    ingredient: "Ingredient: {value}",
  },
) {
  const normalizedQuery = normalizeSearchText(query);

  if (!normalizedQuery) {
    return sushi.ingredients.slice(0, 3).join(", ");
  }

  const tokens = buildSearchTokens(query);

  const fieldMatches = (field: string) => {
    const normalizedField = normalizeSearchText(field);

    return (
      normalizedField.includes(normalizedQuery) ||
      tokens.some((token) => fuzzyTokenMatch(normalizedField, token))
    );
  };

  const aliasMatch = sushi.aliases.find(fieldMatches);

  if (aliasMatch) {
    return labels.alias.replace("{value}", aliasMatch);
  }

  const ingredientMatch = sushi.ingredients.find(fieldMatches);

  if (ingredientMatch) {
    return labels.ingredient.replace("{value}", ingredientMatch);
  }

  return sushi.ingredients.slice(0, 3).join(", ");
}
