import type { Metadata } from "next";

import type { Locale } from "./config";

export function getLocalizedAlternates(
  locale: Locale,
  path = "",
): Metadata["alternates"] {
  const suffix = path ? `/${path.replace(/^\/+|\/+$/g, "")}` : "";

  return {
    canonical: `/${locale}${suffix}`,
    languages: {
      en: `/en${suffix}`,
      es: `/es${suffix}`,
      "x-default": `/en${suffix}`,
    },
  };
}
