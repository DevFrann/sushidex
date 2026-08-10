import type { MetadataRoute } from "next";

import { typeSlugs } from "@/domain/entities/sushi";
import { getSushiRepository } from "@/infrastructure/repositories";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const repository = getSushiRepository();
  const sushiCatalog = await repository.findAll();

  return [
    {
      url: `${baseUrl}/`,
      changeFrequency: "daily",
      priority: 1,
    },
    ...Object.values(typeSlugs).map((typeSlug) => ({
      url: `${baseUrl}/tipos/${typeSlug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...sushiCatalog.map((sushi) => ({
      url: `${baseUrl}/sushi/${sushi.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
