export const sushiTypes = [
  "NIGIRI",
  "MAKI",
  "HOSOMAKI",
  "FUTOMAKI",
  "URAMAKI",
  "TEMAKI",
  "GUNKAN",
  "SASHIMI",
  "INARI",
  "CHIRASHI",
  "WESTERN_ROLLS",
] as const;

export const spicyLevels = ["NONE", "MILD", "MEDIUM", "HIGH"] as const;
export const flavorIntensities = ["DELICATE", "BALANCED", "BOLD"] as const;

export type SushiType = (typeof sushiTypes)[number];
export type SpicyLevel = (typeof spicyLevels)[number];
export type FlavorIntensity = (typeof flavorIntensities)[number];

export interface Sushi {
  id: string;
  name: string;
  slug: string;
  japaneseName: string | null;
  shortDescription: string;
  type: SushiType;
  ingredients: string[];
  aliases: string[];
  rawFish: boolean;
  spicyLevel: SpicyLevel;
  flavorIntensity: FlavorIntensity;
  texture: string;
  imageUrl: string | null;
  origin: string;
  popularity: number;
  searchTerms: string;
}

export const typeSlugs: Record<SushiType, string> = {
  NIGIRI: "nigiri",
  MAKI: "maki",
  HOSOMAKI: "hosomaki",
  FUTOMAKI: "futomaki",
  URAMAKI: "uramaki",
  TEMAKI: "temaki",
  GUNKAN: "gunkan",
  SASHIMI: "sashimi",
  INARI: "inari",
  CHIRASHI: "chirashi",
  WESTERN_ROLLS: "rolls-occidentales",
};

export const typeLabels: Record<SushiType, string> = {
  NIGIRI: "Nigiri",
  MAKI: "Maki",
  HOSOMAKI: "Hosomaki",
  FUTOMAKI: "Futomaki",
  URAMAKI: "Uramaki",
  TEMAKI: "Temaki",
  GUNKAN: "Gunkan",
  SASHIMI: "Sashimi",
  INARI: "Inari",
  CHIRASHI: "Chirashi",
  WESTERN_ROLLS: "Rolls occidentales",
};

export const spicyLevelLabels: Record<SpicyLevel, string> = {
  NONE: "Nada picante",
  MILD: "Picante suave",
  MEDIUM: "Picante medio",
  HIGH: "Picante alto",
};

export const flavorIntensityLabels: Record<FlavorIntensity, string> = {
  DELICATE: "Delicado",
  BALANCED: "Equilibrado",
  BOLD: "Intenso",
};

export const typeDescriptions: Record<SushiType, string> = {
  NIGIRI:
    "Bocado de arroz prensado con una cobertura encima. Es la forma más directa de reconocer el ingrediente principal.",
  MAKI:
    "Nombre general para piezas enrolladas con alga nori. En cartas occidentales también actúa como categoría paraguas.",
  HOSOMAKI:
    "Roll fino, normalmente con un solo ingrediente principal. Suele ser la opción más simple y fácil de identificar.",
  FUTOMAKI:
    "Roll grueso con varios ingredientes. Tiene un perfil más completo y cada restaurante puede variar la combinación.",
  URAMAKI:
    "Roll invertido con el arroz por fuera. Es el formato más frecuente en menús occidentales.",
  TEMAKI:
    "Cono de alga nori relleno de arroz y toppings. Se come con la mano y suele sentirse más fresco y directo.",
  GUNKAN:
    "Base ovalada de arroz rodeada por nori para sujetar ingredientes sueltos como huevas, ensaladas o tartares.",
  SASHIMI:
    "Cortes de pescado o marisco sin arroz. Ideal para quien quiere centrarse en el ingrediente principal.",
  INARI:
    "Bolsa de tofu frito sazonado rellena normalmente de arroz. Tiene un sabor dulce-salado muy reconocible.",
  CHIRASHI:
    "Bol de arroz con diferentes cortes de pescado y toppings por encima. Se acerca más a un plato completo que a una pieza individual.",
  WESTERN_ROLLS:
    "Rolls de estilo occidental o fusion con nombres comerciales. Su composicion puede cambiar bastante segun el restaurante.",
};

export function isSushiType(value: string): value is SushiType {
  return sushiTypes.includes(value as SushiType);
}

export function getTypeFromSlug(typeSlug: string): SushiType | null {
  const entry = Object.entries(typeSlugs).find(([, slug]) => slug === typeSlug);
  return (entry?.[0] as SushiType | undefined) ?? null;
}
