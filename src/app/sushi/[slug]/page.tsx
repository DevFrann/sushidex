import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import {
  getSushiBySlug,
  getSushiByType,
  getSushiCatalog,
} from "@/application/catalog/sushi-catalog";
import {
  typeLabels,
  typeSlugs,
} from "@/presentation/lib/labels";

import { Badge } from "@/presentation/components/ui/badge";
import { Separator } from "@/presentation/components/ui/separator";
import { SushiIndicators } from "@/presentation/components/site/sushi-indicators";
import { SiteHeader } from "@/presentation/components/site/site-header";
import { SushiCard } from "@/presentation/components/site/sushi-card";

interface SushiPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return getSushiCatalog().map((sushi) => ({
    slug: sushi.slug,
  }));
}

export async function generateMetadata({
  params,
}: SushiPageProps): Promise<Metadata> {
  const { slug } = await params;
  const sushi = getSushiBySlug(slug);

  if (!sushi) {
    return {
      title: "Ficha no encontrada",
    };
  }

  return {
    title: sushi.name,
    description: `${sushi.shortDescription} Ingredientes habituales: ${sushi.ingredients.join(", ")}.`,
    alternates: {
      canonical: `/sushi/${sushi.slug}`,
    },
  };
}

export default async function SushiPage({ params }: SushiPageProps) {
  const { slug } = await params;
  const sushi = getSushiBySlug(slug);

  if (!sushi) {
    notFound();
  }

  const related = getSushiByType(sushi.type)
    .filter((item) => item.slug !== sushi.slug)
    .slice(0, 3);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <SiteHeader
        backHref={`/tipos/${typeSlugs[sushi.type]}`}
        backLabel={`Explorar ${typeLabels[sushi.type]}`}
      />
      <div className="mt-4 rounded-[36px] border border-white/60 bg-white/65 p-6 shadow-soft backdrop-blur sm:p-8 lg:p-10">
        <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="space-y-6">
            <Badge className="w-fit bg-[var(--accent-soft)] text-stone-900">
              {typeLabels[sushi.type]}
            </Badge>
            <div>
              <h1 className="font-[family-name:var(--font-display)] text-4xl leading-tight text-stone-950 sm:text-5xl">
                {sushi.name}
              </h1>
            </div>
            <p className="max-w-2xl text-base leading-8 text-stone-700 sm:text-lg">
              {sushi.shortDescription}
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[28px] border border-stone-200 bg-white/80 p-5">
                <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
                  Ingredientes habituales
                </p>
                <p className="mt-3 text-sm leading-7 text-stone-700">
                  {sushi.ingredients.join(", ")}
                </p>
              </div>
              <div className="rounded-[28px] border border-stone-200 bg-white/80 p-5">
                <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
                  Textura
                </p>
                <p className="mt-3 text-sm leading-7 text-stone-700">{sushi.texture}</p>
              </div>
            </div>
            <SushiIndicators sushi={sushi} size="md" />
            {sushi.aliases.length > 0 ? (
              <div className="rounded-[28px] border border-stone-200 bg-white/80 p-5">
                <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
                  Nombres alternativos
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
                Resumen rapido
              </p>
              <div className="mt-4 space-y-4 text-sm text-stone-700">
                <div className="flex items-center justify-between gap-4">
                  <span>Tipo</span>
                  <span className="font-semibold text-stone-950">{typeLabels[sushi.type]}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between gap-4">
                  <span>Origen</span>
                  <span className="max-w-[14rem] text-right">{sushi.origin}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between gap-4">
                  <span>Popularidad</span>
                  <span className="font-semibold text-stone-950">{sushi.popularity}/100</span>
                </div>
              </div>
            </div>
          </aside>
        </section>

        {related.length > 0 ? (
          <section className="mt-12 space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
                Sigue explorando
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-stone-950">
                Mas piezas de {typeLabels[sushi.type]}
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {related.map((item) => (
                <SushiCard key={item.slug} sushi={item} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
