import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getTypeFromSlug, typeDescriptions, typeLabels, typeSlugs } from "@/domain/entities/sushi";
import { getSushiRepository } from "@/infrastructure/repositories";
import { SiteHeader } from "@/presentation/components/site/site-header";
import { SushiCard } from "@/presentation/components/site/sushi-card";
import { Badge } from "@/presentation/components/ui/badge";

interface TypePageProps {
  params: Promise<{
    typeSlug: string;
  }>;
}

export async function generateStaticParams() {
  return Object.values(typeSlugs).map((typeSlug) => ({
    typeSlug,
  }));
}

export async function generateMetadata({
  params,
}: TypePageProps): Promise<Metadata> {
  const { typeSlug } = await params;
  const type = getTypeFromSlug(typeSlug);

  if (!type) {
    return {
      title: "Tipo no encontrado",
    };
  }

  return {
    title: typeLabels[type],
    description: typeDescriptions[type],
    alternates: {
      canonical: `/tipos/${typeSlug}`,
    },
  };
}

export default async function TypePage({ params }: TypePageProps) {
  const { typeSlug } = await params;
  const type = getTypeFromSlug(typeSlug);

  if (!type) {
    notFound();
  }

  const sushiItems = await getSushiRepository().findByType(type);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <SiteHeader backHref="/" backLabel="Volver al inicio" />
      <div className="mt-4 rounded-[36px] border border-white/60 bg-white/65 p-6 shadow-soft backdrop-blur sm:p-8 lg:p-10">
        <section className="space-y-6">
          <Badge className="w-fit bg-[var(--accent-soft)] text-stone-900">
            Tipo de sushi
          </Badge>
          <div className="max-w-3xl">
            <h1 className="font-[family-name:var(--font-display)] text-4xl text-stone-950 sm:text-5xl">
              {typeLabels[type]}
            </h1>
            <p className="mt-4 text-base leading-8 text-stone-700 sm:text-lg">
              {typeDescriptions[type]}
            </p>
          </div>
          <p className="text-sm text-stone-600">
            {sushiItems.length} entradas iniciales en esta categoria.
          </p>
        </section>

        <section className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {sushiItems.map((sushi) => (
            <SushiCard key={sushi.slug} sushi={sushi} />
          ))}
        </section>
      </div>
    </main>
  );
}
