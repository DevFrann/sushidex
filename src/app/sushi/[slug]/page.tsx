import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getSushiRepository } from "@/infrastructure/repositories";
import {
  flavorIntensityLabels,
  spicyLevelLabels,
  typeLabels,
  typeSlugs,
} from "@/presentation/lib/labels";

import { Badge } from "@/presentation/components/ui/badge";
import { Separator } from "@/presentation/components/ui/separator";
import { SushiCard } from "@/presentation/components/site/sushi-card";

interface SushiPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const catalog = await getSushiRepository().findAll();

  return catalog.map((sushi) => ({
    slug: sushi.slug,
  }));
}

export async function generateMetadata({
  params,
}: SushiPageProps): Promise<Metadata> {
  const { slug } = await params;
  const sushi = await getSushiRepository().findBySlug(slug);

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
  const repository = getSushiRepository();
  const sushi = await repository.findBySlug(slug);

  if (!sushi) {
    notFound();
  }

  const related = (await repository.findByType(sushi.type))
    .filter((item) => item.slug !== sushi.slug)
    .slice(0, 3);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-[36px] border border-white/60 bg-white/65 p-6 shadow-soft backdrop-blur sm:p-8 lg:p-10">
        <div className="flex flex-wrap items-center gap-3 text-sm text-stone-600">
          <Link href="/" className="transition-colors hover:text-stone-950">
            Inicio
          </Link>
          <span>/</span>
          <Link
            href={`/tipos/${typeSlugs[sushi.type]}`}
            className="transition-colors hover:text-stone-950"
          >
            {typeLabels[sushi.type]}
          </Link>
          <span>/</span>
          <span className="text-stone-950">{sushi.name}</span>
        </div>

        <section className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="space-y-6">
            <Badge className="w-fit bg-[var(--accent-soft)] text-stone-900">
              {typeLabels[sushi.type]}
            </Badge>
            <div>
              <h1 className="font-[family-name:var(--font-display)] text-4xl leading-tight text-stone-950 sm:text-5xl">
                {sushi.name}
              </h1>
              {sushi.japaneseName ? (
                <p className="mt-3 text-lg text-stone-600">{sushi.japaneseName}</p>
              ) : null}
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
            <div className="flex flex-wrap gap-3">
              <Badge variant="outline">{spicyLevelLabels[sushi.spicyLevel]}</Badge>
              <Badge variant="outline">
                {sushi.rawFish ? "Contiene pescado crudo" : "No contiene pescado crudo"}
              </Badge>
              <Badge variant="secondary">
                Sabor {flavorIntensityLabels[sushi.flavorIntensity].toLowerCase()}
              </Badge>
            </div>
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
                  src={sushi.imageUrl ?? "/images/types/maki.svg"}
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
