import type { Sushi, SushiType } from "@/domain/entities/sushi";

const nameTranslations: Record<string, string> = {
  "pez-mantequilla-nigiri": "Butterfish Nigiri",
  "maki-mixto": "Mixed Maki",
  "maki-salmon-queso": "Salmon Cream Cheese Maki",
  "maki-atun-aguacate": "Tuna Avocado Maki",
  "maki-salmon-aguacate": "Salmon Avocado Maki",
  "maki-vegetal": "Vegetable Maki",
  "futomaki-clasico": "Classic Futomaki",
  "pez-mantequilla-uramaki": "Butterfish Uramaki",
  "pez-mantequilla-sashimi": "Butterfish Sashimi",
  "tataki-de-atun": "Tuna Tataki",
  "tataki-de-salmon": "Salmon Tataki",
  "sashimi-mixto": "Mixed Sashimi",
  "sashimi-de-vieira-flambeada": "Seared Scallop Sashimi",
  "sashimi-de-lubina-con-ponzu": "Sea Bass Ponzu Sashimi",
  "sashimi-de-salmon-picante": "Spicy Salmon Sashimi",
  "sashimi-de-atun-picante": "Spicy Tuna Sashimi",
};

const ingredientTranslations: Record<string, string> = {
  "salmon": "salmon",
  "arroz de sushi": "sushi rice",
  "wasabi opcional": "optional wasabi",
  "salmon flameado": "seared salmon",
  "salsa opcional": "optional sauce",
  "atun": "tuna",
  "ventresca de atun": "fatty tuna belly",
  "langostino cocido": "cooked prawn",
  "gamba dulce": "sweet shrimp",
  "anguila cocinada": "cooked eel",
  "salsa unagi": "unagi sauce",
  "anago cocinado": "cooked conger eel",
  "salsa dulce opcional": "optional sweet sauce",
  "hamachi": "yellowtail",
  "dorada": "sea bream",
  "lubina": "sea bass",
  "caballa": "mackerel",
  "vinagre opcional": "optional vinegar",
  "calamar": "squid",
  "pulpo cocido": "cooked octopus",
  "vieira": "scallop",
  "almeja hokkigai": "hokkigai surf clam",
  "cangrejo o surimi": "crab or surimi",
  "ikura": "salmon roe",
  "nori opcional": "optional nori",
  "tobiko": "flying fish roe",
  "tamago": "Japanese omelette",
  "aguacate": "avocado",
  "shiitake": "shiitake mushroom",
  "pez mantequilla": "butterfish",
  "foie": "foie gras",
  "wagyu o ternera": "wagyu or beef",
  "nori": "nori",
  "rellenos variados": "assorted fillings",
  "queso crema": "cream cheese",
  "pepino": "cucumber",
  "zanahoria": "carrot",
  "relleno en tempura": "tempura filling",
  "daikon encurtido": "pickled daikon",
  "kanpyo": "kanpyo gourd",
  "atun graso picado": "minced fatty tuna",
  "cebolleta": "spring onion",
  "salsa picante": "spicy sauce",
  "wakame": "wakame seaweed",
  "sesamo opcional": "optional sesame",
  "langostino": "prawn",
  "tamago opcional": "optional Japanese omelette",
  "surimi o cangrejo": "surimi or crab",
  "relleno tempura": "tempura filling",
  "soft shell crab": "soft-shell crab",
  "lechuga o pepino": "lettuce or cucumber",
  "sesamo": "sesame",
  "langostino tempura": "tempura prawn",
  "aguacate o pepino": "avocado or cucumber",
  "pepino o aguacate": "cucumber or avocado",
  "mayonesa picante": "spicy mayonnaise",
  "pollo teriyaki": "teriyaki chicken",
  "mango": "mango",
  "aguacate opcional": "optional avocado",
  "surimi": "surimi",
  "salsa dulce": "sweet sauce",
  "pato": "duck",
  "salsa hoisin opcional": "optional hoisin sauce",
  "verduras tempura": "tempura vegetables",
  "pepino opcional": "optional cucumber",
  "pollo cocinado": "cooked chicken",
  "verduras": "vegetables",
  "masago": "capelin roe",
  "atun picado": "minced tuna",
  "salmon picado": "minced salmon",
  "mayonesa": "mayonnaise",
  "maiz": "sweetcorn",
  "atun cocido": "cooked tuna",
  "salsa": "sauce",
  "salsa unagi opcional": "optional unagi sauce",
  "atun sellado": "seared tuna",
  "salsa ponzu opcional": "optional ponzu sauce",
  "salmon sellado": "seared salmon",
  "pescados variados": "assorted fish",
  "mariscos variados": "assorted seafood",
  "vieira flameada": "seared scallop",
  "salsa ponzu": "ponzu sauce",
  "cebolleta opcional": "optional spring onion",
  "tofu frito sazonado": "seasoned fried tofu",
  "toppings variables": "variable toppings",
  "toppings opcionales": "optional toppings",
  "arroz": "rice",
  "pescado o tofu": "fish or tofu",
  "edamame": "edamame",
  "salsas": "sauces",
  "aguacate o anguila": "avocado or eel",
  "langostino tempura frecuente": "tempura prawn",
  "surimi o cangrejo frecuente": "surimi or crab",
  "topping crujiente": "crunchy topping",
  "relleno variable": "variable filling",
  "pepino o lechuga": "cucumber or lettuce",
  "topping cremoso": "creamy topping",
  "salsa picante opcional": "optional spicy sauce",
  "langostino o marisco frecuente": "prawn or seafood",
  "langostino frecuente": "prawn",
  "anguila o relleno variable": "eel or a variable filling",
  "tempura o rebozado": "tempura or fried coating",
  "salmon o pescado variable": "salmon or another fish",
  "queso crema frecuente": "cream cheese",
  "tempura opcional": "optional tempura",
  "salmon frecuente": "salmon",
  "aguacate o queso crema": "avocado or cream cheese",
  "salsa variable": "variable sauce",
  "anguila o salmon frecuente": "eel or salmon",
};

const textureWords: Record<string, string> = {
  suave: "soft",
  melosa: "silky",
  meloso: "silky",
  tierno: "tender",
  tierna: "tender",
  untuoso: "rich",
  untuosa: "rich",
  firme: "firm",
  sedosa: "silky",
  muy: "very",
  delicada: "delicate",
  mantecosa: "buttery",
  limpia: "clean",
  ligera: "light",
  grasa: "rich",
  elastica: "springy",
  cremosa: "creamy",
  carnosa: "meaty",
  fibrosa: "fibrous",
  jugosa: "juicy",
  perlada: "beaded",
  crujiente: "crisp",
  pequena: "small",
  esponjosa: "fluffy",
  compacta: "compact",
  fresca: "fresh",
  variada: "varied",
  completa: "substantial",
  densa: "dense",
  picante: "spicy",
  granulada: "grainy",
  dulce: "sweet",
  abundante: "generous",
  variable: "variable",
};

const descriptionLead: Record<SushiType, string> = {
  NIGIRI: "Nigiri topped with",
  MAKI: "Maki with",
  HOSOMAKI: "Thin hosomaki with",
  FUTOMAKI: "Thick futomaki with",
  URAMAKI: "Inside-out roll with",
  TEMAKI: "Nori hand roll with",
  GUNKAN: "Gunkan topped with",
  SASHIMI: "Sashimi with",
  INARI: "Seasoned fried tofu pouch with",
  CHIRASHI: "Sushi rice bowl with",
  WESTERN_ROLLS: "Western-style roll with",
};

const supportingIngredients = new Set([
  "sushi rice",
  "rice",
  "nori",
  "optional nori",
  "optional wasabi",
  "optional sesame",
]);

function translateIngredient(ingredient: string) {
  return ingredientTranslations[ingredient] ?? ingredient;
}

function translateTexture(texture: string) {
  if (texture === "Crujiente por fuera y suave por dentro") {
    return "Crisp outside and soft inside";
  }

  return texture
    .toLowerCase()
    .split(" ")
    .map((word) => textureWords[word] ?? (word === "y" ? "and" : word))
    .join(" ")
    .replace(/^./, (letter) => letter.toUpperCase());
}

function buildDescription(sushi: Sushi, ingredients: string[]) {
  const featured = ingredients.filter((item) => !supportingIngredients.has(item));
  const selection = (featured.length > 0 ? featured : ingredients).slice(0, 3);
  const list = new Intl.ListFormat("en", {
    style: "long",
    type: "conjunction",
  }).format(selection);
  const variation = sushi.shortDescription.includes("Puede variar")
    ? " Ingredients may vary depending on the restaurant."
    : "";

  if (sushi.type === "SASHIMI") {
    return `Slices of ${list} served without rice.${variation}`;
  }

  if (sushi.type === "INARI") {
    const toppings = selection.filter((item) => item !== "seasoned fried tofu");
    return toppings.length > 0
      ? `Seasoned fried tofu pouch with ${new Intl.ListFormat("en", { type: "conjunction" }).format(toppings)}.${variation}`
      : `Seasoned fried tofu pouch filled with sushi rice.${variation}`;
  }

  return `${descriptionLead[sushi.type]} ${list}.${variation}`;
}

function translateOrigin(sushi: Sushi) {
  if (sushi.type === "WESTERN_ROLLS") {
    return "Western fusion roll commonly found on European restaurant and delivery menus.";
  }

  if (/fusion|occidental|americano|adaptacion/i.test(sushi.origin)) {
    return "A modern fusion adaptation commonly found on European sushi menus.";
  }

  if (/vegetal|vegetariana/i.test(sushi.origin)) {
    return "A plant-based adaptation commonly found on European sushi menus.";
  }

  if (/sin crudo|sin pescado/i.test(sushi.origin)) {
    return "A cooked option commonly found on European sushi menus.";
  }

  return "A Japanese preparation commonly found on European sushi menus.";
}

export function localizeSushiCatalogInEnglish(catalog: readonly Sushi[]): Sushi[] {
  return catalog.map((sushi) => {
    const ingredients = sushi.ingredients.map(translateIngredient);

    return {
      ...sushi,
      name: nameTranslations[sushi.slug] ?? sushi.name,
      ingredients,
      shortDescription: buildDescription(sushi, ingredients),
      texture: translateTexture(sushi.texture),
      origin: translateOrigin(sushi),
    };
  });
}
