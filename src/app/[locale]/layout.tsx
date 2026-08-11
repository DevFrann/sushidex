import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { fraunces, manrope } from "../fonts";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocalizedAlternates } from "@/i18n/metadata";
import { SiteFooter } from "@/presentation/components/site/site-footer";

import "../globals.css";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const dictionary = getDictionary(locale);

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    ),
    title: { default: "SushiDex", template: "%s | SushiDex" },
    description: dictionary.metadata.description,
    alternates: getLocalizedAlternates(locale),
    openGraph: {
      title: "SushiDex",
      description: dictionary.metadata.openGraphDescription,
      type: "website",
      locale: locale === "en" ? "en_GB" : "es_ES",
      alternateLocale: locale === "en" ? ["es_ES"] : ["en_GB"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      className={`${manrope.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <div className="flex min-h-screen flex-col">
          {children}
          <SiteFooter locale={locale} />
        </div>
      </body>
    </html>
  );
}
