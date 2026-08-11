import type { FlavorIntensity, SpicyLevel, SushiType } from "@/domain/entities/sushi";
import {
  flavorIntensityLabels,
  spicyLevelLabels,
  typeDescriptions,
  typeLabels,
} from "@/domain/entities/sushi";

import type { Locale } from "./config";

const englishTypeLabels: Record<SushiType, string> = {
  ...typeLabels,
  WESTERN_ROLLS: "Western rolls",
};

const englishTypeDescriptions: Record<SushiType, string> = {
  NIGIRI: "A hand-pressed bite of sushi rice topped with one main ingredient. It is one of the easiest ways to identify the featured fish or topping.",
  MAKI: "A general name for sushi rolled with nori. On Western menus it is also used as a broad category for several roll formats.",
  HOSOMAKI: "A thin roll, usually with one main filling. It is generally one of the simplest sushi formats to identify.",
  FUTOMAKI: "A thick roll with several fillings. Combinations are more elaborate and can vary from one restaurant to another.",
  URAMAKI: "An inside-out roll with rice on the outside. It is one of the most common formats on Western sushi menus.",
  TEMAKI: "A hand-held cone of nori filled with rice and toppings, designed to be eaten directly by hand.",
  GUNKAN: "An oval base of rice wrapped in nori, made to hold loose toppings such as roe, salads or tartare.",
  SASHIMI: "Slices of fish or seafood served without rice, putting the focus entirely on the main ingredient.",
  INARI: "A seasoned fried tofu pouch usually filled with sushi rice, with a distinctive sweet and savory profile.",
  CHIRASHI: "A bowl of sushi rice topped with assorted fish and garnishes, closer to a full dish than an individual piece.",
  WESTERN_ROLLS: "Western-style or fusion rolls sold under commercial names. Their composition can vary considerably by restaurant.",
};

const englishSpicyLabels: Record<SpicyLevel, string> = {
  NONE: "Not spicy",
  MILD: "Mild",
  MEDIUM: "Medium spicy",
  HIGH: "Very spicy",
};

const englishFlavorLabels: Record<FlavorIntensity, string> = {
  DELICATE: "Delicate",
  BALANCED: "Balanced",
  BOLD: "Bold",
};

const dictionaries = {
  en: {
    localeName: "English",
    metadata: {
      description: "A visual sushi dictionary for quickly understanding dishes found on Japanese and delivery menus.",
      openGraphDescription: "Look up Dragon Roll, California Roll, nigiri, gunkan and other Japanese dishes in seconds.",
    },
    navigation: {
      home: "Go to SushiDex home",
      back: "Back",
      backHome: "Back to home",
      exploreType: "Explore {type}",
    },
    language: { label: "Language", switchTo: "Switch to {language}" },
    home: {
      badge: "Visual sushi dictionary",
      title: "Find your sushi",
      description: "Search {count} popular dishes from delivery apps and Japanese restaurants, and instantly discover what each one contains.",
      placeholder: "Try: Dragon Roll, sake nigiri, gunkan...",
      popular: "Popular",
      results: "Results",
      matches: "Matches for “{query}”",
      empty: "No clear matches found. Try ingredients such as “salmon”, “tuna” or “ebi”, or search by sushi type.",
    },
    search: {
      open: "Search sushi",
      close: "Close",
      closeLabel: "Close search",
      dialogLabel: "Search sushi without leaving this page",
      placeholder: "Dragon Roll, salmon, nigiri...",
      loading: "Preparing search...",
      prompt: "Enter a name, alias or ingredient.",
      noMatches: "No clear matches for “{query}”.",
      alias: "Alias: {value}",
      ingredient: "Ingredient: {value}",
    },
    detail: {
      ingredients: "Typical ingredients",
      texture: "Texture",
      aliases: "Alternative names",
      quickSummary: "Quick summary",
      type: "Type",
      origin: "Origin",
      popularity: "Popularity",
      keepExploring: "Keep exploring",
      moreType: "More {type}",
      notFoundTitle: "Sushi not found",
    },
    typePage: {
      badge: "Sushi type",
      notFoundTitle: "Type not found",
    },
    notFound: {
      title: "This page does not exist",
      description: "The address may be incorrect or the item may not be part of the current catalog.",
      action: "Back to search",
    },
    indicators: {
      rawFish: "Raw fish",
      noRawFish: "No raw fish",
      flavor: "{value} flavor",
      spicy: englishSpicyLabels,
      flavorIntensity: englishFlavorLabels,
    },
    typeLabels: englishTypeLabels,
    typeDescriptions: englishTypeDescriptions,
  },
  es: {
    localeName: "Español",
    metadata: {
      description: "Diccionario visual de sushi para entender rápidamente platos frecuentes de delivery y cartas japonesas.",
      openGraphDescription: "Busca Dragon Roll, California Roll, nigiri, gunkan y otros platos japoneses en segundos.",
    },
    navigation: {
      home: "Ir al inicio de SushiDex",
      back: "Volver",
      backHome: "Volver al inicio",
      exploreType: "Explorar {type}",
    },
    language: { label: "Idioma", switchTo: "Cambiar a {language}" },
    home: {
      badge: "Diccionario visual de sushi",
      title: "Encuentra tu sushi",
      description: "Busca entre {count} platos habituales de apps de delivery y restaurantes japoneses, y descubre al instante qué lleva cada uno.",
      placeholder: "Ejemplo: Dragon Roll, sake nigiri, gunkan...",
      popular: "Populares",
      results: "Resultados",
      matches: "Coincidencias para “{query}”",
      empty: "No he encontrado coincidencias claras. Prueba con ingredientes como “salmón”, “atún” o “ebi”, o busca por tipo de pieza.",
    },
    search: {
      open: "Buscar sushi",
      close: "Cerrar",
      closeLabel: "Cerrar búsqueda",
      dialogLabel: "Buscar sushi sin salir de la página",
      placeholder: "Dragon Roll, salmón, nigiri...",
      loading: "Preparando buscador...",
      prompt: "Escribe un nombre, alias o ingrediente.",
      noMatches: "No hay coincidencias claras para “{query}”.",
      alias: "Alias: {value}",
      ingredient: "Ingrediente: {value}",
    },
    detail: {
      ingredients: "Ingredientes habituales",
      texture: "Textura",
      aliases: "Nombres alternativos",
      quickSummary: "Resumen rápido",
      type: "Tipo",
      origin: "Origen",
      popularity: "Popularidad",
      keepExploring: "Sigue explorando",
      moreType: "Más piezas de {type}",
      notFoundTitle: "Ficha no encontrada",
    },
    typePage: {
      badge: "Tipo de sushi",
      notFoundTitle: "Tipo no encontrado",
    },
    notFound: {
      title: "Esta página no existe",
      description: "Puede que la dirección esté mal escrita o que la pieza no forme parte del catálogo actual.",
      action: "Volver al buscador",
    },
    indicators: {
      rawFish: "Pescado crudo",
      noRawFish: "Sin pescado crudo",
      flavor: "Sabor {value}",
      spicy: spicyLevelLabels,
      flavorIntensity: flavorIntensityLabels,
    },
    typeLabels,
    typeDescriptions,
  },
} as const;

export type Dictionary = (typeof dictionaries)[Locale];

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function formatMessage(
  template: string,
  values: Record<string, string | number>,
) {
  return Object.entries(values).reduce(
    (message, [key, value]) => message.replaceAll(`{${key}}`, String(value)),
    template,
  );
}
