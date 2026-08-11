import type { Sushi as PrismaSushi } from "@/generated/prisma/client";

import type { Sushi } from "@/domain/entities/sushi";

export function mapPrismaSushiToDomain(model: PrismaSushi): Sushi {
  return {
    id: model.id,
    name: model.name,
    slug: model.slug,
    japaneseName: model.japaneseName,
    shortDescription: model.shortDescription,
    type: model.type,
    ingredients: model.ingredients,
    aliases: model.aliases,
    rawFish: model.rawFish,
    spicyLevel: model.spicyLevel,
    flavorIntensity: model.flavorIntensity,
    texture: model.texture,
    imageUrl: model.imageUrl,
    origin: model.origin,
    popularity: model.popularity,
    searchTerms: model.searchTerms,
  };
}
