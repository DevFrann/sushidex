export const locales = ["en", "es"] as const;
export const defaultLocale = "en" as const;

export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function localizedPath(locale: Locale, path = "") {
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${suffix === "/" ? "" : suffix}`;
}
