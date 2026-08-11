import type { MetadataRoute } from "next";

import { getSushiCatalog } from "@/application/catalog/sushi-catalog";
import { typeSlugs } from "@/domain/entities/sushi";
import { locales } from "@/i18n/config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ).replace(/\/$/, "");
  const sushiCatalog = getSushiCatalog("en");

  return [
    ...locales.map((locale) => ({
      url: `${baseUrl}/${locale}/`,
      changeFrequency: "daily" as const,
      priority: locale === "en" ? 1 : 0.9,
      alternates: {
        languages: { en: `${baseUrl}/en/`, es: `${baseUrl}/es/` },
      },
    })),
    ...locales.flatMap((locale) =>
      Object.values(typeSlugs).map((typeSlug) => ({
        url: `${baseUrl}/${locale}/types/${typeSlug}/`,
        changeFrequency: "weekly" as const,
        priority: locale === "en" ? 0.8 : 0.7,
        alternates: {
          languages: {
            en: `${baseUrl}/en/types/${typeSlug}/`,
            es: `${baseUrl}/es/types/${typeSlug}/`,
          },
        },
      })),
    ),
    ...locales.flatMap((locale) =>
      sushiCatalog.map((sushi) => ({
        url: `${baseUrl}/${locale}/sushi/${sushi.slug}/`,
        changeFrequency: "weekly" as const,
        priority: locale === "en" ? 0.7 : 0.6,
        alternates: {
          languages: {
            en: `${baseUrl}/en/sushi/${sushi.slug}/`,
            es: `${baseUrl}/es/sushi/${sushi.slug}/`,
          },
        },
      })),
    ),
  ];
}
