import type { MetadataRoute } from "next";

import { getSushiCatalog } from "@/application/catalog/sushi-catalog";
import { typeSlugs } from "@/domain/entities/sushi";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const sushiCatalog = getSushiCatalog();

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
