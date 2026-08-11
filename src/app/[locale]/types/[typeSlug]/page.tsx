import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getSushiByType } from "@/application/catalog/sushi-catalog";
import { getTypeFromSlug, typeSlugs } from "@/domain/entities/sushi";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocalizedAlternates } from "@/i18n/metadata";
import { SiteHeader } from "@/presentation/components/site/site-header";
import { SushiCard } from "@/presentation/components/site/sushi-card";
import { Badge } from "@/presentation/components/ui/badge";

interface TypePageProps {
  params: Promise<{ locale: string; typeSlug: string }>;
}

export function generateStaticParams() {
  return Object.values(typeSlugs).map((typeSlug) => ({ typeSlug }));
}

export async function generateMetadata({
  params,
}: TypePageProps): Promise<Metadata> {
  const { locale, typeSlug } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const dictionary = getDictionary(locale);
  const type = getTypeFromSlug(typeSlug);

  if (!type) {
    return { title: dictionary.typePage.notFoundTitle };
  }

  return {
    title: dictionary.typeLabels[type],
    description: dictionary.typeDescriptions[type],
    alternates: getLocalizedAlternates(locale, `types/${typeSlug}`),
  };
}

export default async function TypePage({ params }: TypePageProps) {
  const { locale, typeSlug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale);
  const type = getTypeFromSlug(typeSlug);

  if (!type) {
    notFound();
  }

  const sushiItems = getSushiByType(locale, type);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <SiteHeader
        locale={locale}
        backHref={`/${locale}`}
        backLabel={dictionary.navigation.backHome}
      />
      <div className="mt-4 rounded-[36px] border border-white/60 bg-white/65 p-6 shadow-soft backdrop-blur sm:p-8 lg:p-10">
        <section className="space-y-6">
          <Badge className="w-fit bg-[var(--accent-soft)] text-stone-900">
            {dictionary.typePage.badge}
          </Badge>
          <div className="max-w-3xl">
            <h1 className="font-[family-name:var(--font-display)] text-4xl text-stone-950 sm:text-5xl">
              {dictionary.typeLabels[type]}
            </h1>
            <p className="mt-4 text-base leading-8 text-stone-700 sm:text-lg">
              {dictionary.typeDescriptions[type]}
            </p>
          </div>
        </section>

        <section className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {sushiItems.map((sushi) => (
            <SushiCard key={sushi.slug} sushi={sushi} locale={locale} />
          ))}
        </section>
      </div>
    </main>
  );
}
