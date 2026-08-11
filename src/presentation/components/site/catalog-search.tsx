"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useDeferredValue, useEffect, useMemo, useState } from "react";

import { getSearchMatchLabel } from "@/application/search/search-utils";
import type { Sushi } from "@/domain/entities/sushi";

import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { SushiCard } from "./sushi-card";

type SearchResponse = {
  query: string;
  results: Sushi[];
};

interface CatalogSearchProps {
  popularSushi: Sushi[];
  totalSushi: number;
  types: Array<{
    id: string;
    label: string;
    slug: string;
    count: number;
  }>;
}

export function CatalogSearch({
  popularSushi,
  totalSushi,
  types,
}: CatalogSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Sushi[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const deferredQuery = useDeferredValue(query.trim());

  useEffect(() => {
    let cancelled = false;

    async function runSearch() {
      if (!deferredQuery) {
        setResults([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      const response = await fetch(
        `/api/search?q=${encodeURIComponent(deferredQuery)}`,
        {
          cache: "no-store",
        },
      );

      if (!response.ok || cancelled) {
        setIsLoading(false);
        return;
      }

      const payload = (await response.json()) as SearchResponse;

      if (!cancelled) {
        setResults(payload.results);
        setIsLoading(false);
      }
    }

    void runSearch();

    return () => {
      cancelled = true;
    };
  }, [deferredQuery]);

  const visibleResults = deferredQuery ? results : popularSushi;
  const suggestionResults = useMemo(() => results.slice(0, 5), [results]);

  return (
    <div className="space-y-10">
      <section className="space-y-6">
        <Badge className="w-fit bg-[var(--accent-soft)] text-stone-900">
          Diccionario visual de sushi
        </Badge>
        <div className="max-w-3xl space-y-4">
          <h1 className="font-[family-name:var(--font-display)] text-4xl leading-tight text-balance text-stone-950 sm:text-5xl">
            ¿Que sushi quieres buscar?
          </h1>
          <p className="max-w-2xl text-base leading-7 text-stone-700 sm:text-lg">
            Busca nombres que aparecen en Just Eat, Glovo, Uber Eats o en la web
            del restaurante y entiende al instante que lleva cada pieza.
          </p>
        </div>
        <div className="relative">
          <div className="flex items-center gap-3 rounded-[32px] border border-stone-200 bg-white/85 p-2 shadow-soft">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-stone-950 text-white">
              <Search className="h-5 w-5" />
            </div>
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Ejemplo: Dragon Roll, sake nigiri, gunkan..."
              className="h-14 border-0 bg-transparent px-1 shadow-none focus:border-0"
            />
          </div>
          {deferredQuery && suggestionResults.length > 0 ? (
            <div className="absolute inset-x-0 top-[calc(100%+12px)] z-10 rounded-[28px] border border-stone-200 bg-white/95 p-3 shadow-soft backdrop-blur">
              {suggestionResults.map((sushi, index) => (
                <div key={sushi.slug}>
                  <Link
                    href={`/sushi/${sushi.slug}`}
                    className="flex items-center justify-between rounded-2xl px-3 py-3 text-sm transition-colors hover:bg-stone-50"
                  >
                    <div>
                      <p className="font-semibold text-stone-900">{sushi.name}</p>
                      <p className="mt-1 text-stone-600">
                        {getSearchMatchLabel(sushi, deferredQuery)}
                      </p>
                    </div>
                    <Badge variant="outline">{sushi.type.toLowerCase()}</Badge>
                  </Link>
                  {index < suggestionResults.length - 1 ? <Separator className="my-1" /> : null}
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-3">
          {types.map((type) => (
            <Link
              key={type.id}
              href={`/tipos/${type.slug}`}
              className="rounded-full border border-stone-200 bg-white/70 px-4 py-2 text-sm text-stone-700 transition-colors hover:bg-white"
            >
              {type.label} · {type.count}
            </Link>
          ))}
        </div>
        <p className="text-sm text-stone-600">
          {totalSushi}+ entradas iniciales entre nigiri, maki, uramaki, temaki y mas.
        </p>
      </section>

      <section className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
              {deferredQuery ? "Resultados" : "Populares"}
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-stone-950">
              {deferredQuery
                ? `Coincidencias para "${deferredQuery}"`
                : "Empieza por los nombres mas habituales"}
            </h2>
          </div>
          {isLoading ? (
            <p className="text-sm text-stone-500">Buscando...</p>
          ) : null}
        </div>
        {visibleResults.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-stone-300 bg-white/60 p-8 text-sm leading-7 text-stone-600">
            No he encontrado coincidencias claras. Prueba con ingredientes como
            &quot;salmon&quot;, &quot;atun&quot;, &quot;ebi&quot; o con el tipo de pieza.
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {visibleResults.map((sushi) => (
              <SushiCard key={sushi.slug} sushi={sushi} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
