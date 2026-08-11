import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import {
  getSushiBySlug,
  getSushiByType,
  getSushiCatalog,
} from "@/application/catalog/sushi-catalog";
import { typeSlugs } from "@/domain/entities/sushi";
import { isLocale } from "@/i18n/config";
import { formatMessage, getDictionary } from "@/i18n/dictionaries";
import { getLocalizedAlternates } from "@/i18n/metadata";
import { SiteHeader } from "@/presentation/components/site/site-header";
import { SushiCard } from "@/presentation/components/site/sushi-card";
import { SushiIndicators } from "@/presentation/components/site/sushi-indicators";
import { Badge } from "@/presentation/components/ui/badge";
import { Separator } from "@/presentation/components/ui/separator";

interface SushiPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return getSushiCatalog("en").map((sushi) => ({ slug: sushi.slug }));
}

export async function generateMetadata({
  params,
}: SushiPageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const dictionary = getDictionary(locale);
  const sushi = getSushiBySlug(locale, slug);

  if (!sushi) {
    return { title: dictionary.detail.notFoundTitle };
  }

  return {
    title: sushi.name,
    description: `${sushi.shortDescription} ${dictionary.detail.ingredients}: ${sushi.ingredients.join(", ")}.`,
    alternates: getLocalizedAlternates(locale, `sushi/${sushi.slug}`),
    openGraph: {
      title: sushi.name,
      description: sushi.shortDescription,
      images: [{ url: sushi.imageUrl, alt: sushi.name }],
    },
  };
}

export default async function SushiPage({ params }: SushiPageProps) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale);
  const sushi = getSushiBySlug(locale, slug);

  if (!sushi) {
    notFound();
  }

  const typeLabel = dictionary.typeLabels[sushi.type];
  const related = getSushiByType(locale, sushi.type)
    .filter((item) => item.slug !== sushi.slug)
    .slice(0, 3);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <SiteHeader
        locale={locale}
        backHref={`/${locale}/types/${typeSlugs[sushi.type]}`}
        backLabel={formatMessage(dictionary.navigation.exploreType, {
          type: typeLabel,
        })}
      />
      <div className="mt-4 rounded-[36px] border border-white/60 bg-white/65 p-6 shadow-soft backdrop-blur sm:p-8 lg:p-10">
        <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="space-y-6">
            <Badge className="w-fit bg-[var(--accent-soft)] text-stone-900">
              {typeLabel}
            </Badge>
            <h1 className="font-[family-name:var(--font-display)] text-4xl leading-tight text-stone-950 sm:text-5xl">
              {sushi.name}
            </h1>
            <p className="max-w-2xl text-base leading-8 text-stone-700 sm:text-lg">
              {sushi.shortDescription}
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <InfoBlock
                label={dictionary.detail.ingredients}
                value={sushi.ingredients.join(", ")}
              />
              <InfoBlock
                label={dictionary.detail.texture}
                value={sushi.texture}
              />
            </div>
            <SushiIndicators sushi={sushi} locale={locale} size="md" />
            {sushi.aliases.length > 0 ? (
              <div className="rounded-[28px] border border-stone-200 bg-white/80 p-5">
                <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
                  {dictionary.detail.aliases}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {sushi.aliases.map((alias) => (
                    <Badge key={alias} variant="secondary">
                      {alias}
                    </Badge>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <aside className="space-y-5">
            <div className="relative overflow-hidden rounded-[32px] border border-stone-200 bg-stone-100">
              <div className="relative aspect-[4/3]">
                <Image
                  src={sushi.imageUrl}
                  alt={sushi.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
            <div className="rounded-[32px] border border-stone-200 bg-white/80 p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
                {dictionary.detail.quickSummary}
              </p>
              <div className="mt-4 space-y-4 text-sm text-stone-700">
                <SummaryRow label={dictionary.detail.type} value={typeLabel} strong />
                <Separator />
                <SummaryRow label={dictionary.detail.origin} value={sushi.origin} />
                <Separator />
                <SummaryRow
                  label={dictionary.detail.popularity}
                  value={`${sushi.popularity}/100`}
                  strong
                />
              </div>
            </div>
          </aside>
        </section>

        {related.length > 0 ? (
          <section className="mt-12 space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
                {dictionary.detail.keepExploring}
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-stone-950">
                {formatMessage(dictionary.detail.moreType, { type: typeLabel })}
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {related.map((item) => (
                <SushiCard key={item.slug} sushi={item} locale={locale} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[28px] border border-stone-200 bg-white/80 p-5">
      <p className="text-xs uppercase tracking-[0.22em] text-stone-500">{label}</p>
      <p className="mt-3 text-sm leading-7 text-stone-700">{value}</p>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span>{label}</span>
      <span
        className={strong ? "font-semibold text-stone-950" : "max-w-[14rem] text-right"}
      >
        {value}
      </span>
    </div>
  );
}
