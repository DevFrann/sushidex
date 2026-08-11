"use client";

import { Search, X } from "lucide-react";
import Link from "next/link";
import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";

import { searchSushis } from "@/application/search/search-sushis";
import {
  getSearchMatchLabel,
  type SushiSearchItem,
} from "@/application/search/search-utils";
import { typeLabels } from "@/presentation/lib/labels";

export function HeaderSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [catalog, setCatalog] = useState<SushiSearchItem[] | null>(null);
  const deferredQuery = useDeferredValue(query.trim());
  const results = useMemo(
    () => searchSushis(catalog ?? [], deferredQuery, 6),
    [catalog, deferredQuery],
  );
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    inputRef.current?.focus();

    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || catalog) {
      return;
    }

    const controller = new AbortController();

    async function loadCatalog() {
      try {
        const response = await fetch("/search-index.json", {
          signal: controller.signal,
        });

        setCatalog(
          response.ok ? ((await response.json()) as SushiSearchItem[]) : [],
        );
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          setCatalog([]);
        }
      }
    }

    void loadCatalog();

    return () => controller.abort();
  }, [catalog, isOpen]);

  return (
    <div ref={rootRef} className="relative justify-self-end">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label={isOpen ? "Cerrar búsqueda" : "Buscar sushi"}
        onClick={() => setIsOpen((open) => !open)}
        className="inline-flex h-10 w-10 items-center justify-center gap-2 rounded-full border border-[#123f46]/15 bg-white/55 text-[#123f46] transition-colors hover:bg-white/85 sm:h-auto sm:w-auto sm:px-3.5 sm:py-2.5"
      >
        {isOpen ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
        <span className="hidden text-sm font-medium sm:inline">
          {isOpen ? "Cerrar" : "Buscar sushi"}
        </span>
      </button>

      {isOpen ? (
        <div
          role="dialog"
          aria-label="Buscar sushi sin salir de la página"
          className="absolute right-0 top-[calc(100%+1rem)] w-[min(32rem,calc(100vw-2rem))] overflow-hidden rounded-[28px] border border-[#123f46]/15 bg-[#f9fbf8]/95 p-3 shadow-[0_28px_70px_-30px_rgba(18,63,70,0.55)] backdrop-blur-xl"
        >
          <div className="flex items-center gap-3 rounded-[20px] border border-[#123f46]/15 bg-white/80 px-4">
            <Search className="h-4 w-4 shrink-0 text-[#123f46]" />
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Dragon Roll, salmón, nigiri..."
              className="h-12 min-w-0 flex-1 bg-transparent text-sm text-stone-900 outline-none placeholder:text-stone-500"
            />
          </div>

          <div className="mt-2 max-h-[22rem] overflow-y-auto" aria-live="polite">
            {!catalog ? (
              <p className="px-3 py-5 text-sm text-stone-600">
                Preparando buscador...
              </p>
            ) : !deferredQuery ? (
              <p className="px-3 py-5 text-sm text-stone-600">
                Escribe un nombre, alias o ingrediente.
              </p>
            ) : results.length === 0 ? (
              <p className="px-3 py-5 text-sm text-stone-600">
                No hay coincidencias claras para &quot;{deferredQuery}&quot;.
              </p>
            ) : (
              results.map((sushi) => (
                <Link
                  key={sushi.slug}
                  href={`/sushi/${sushi.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between gap-4 rounded-[18px] px-3 py-3 transition-colors hover:bg-[#e8f2ef]"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-stone-900">
                      {sushi.name}
                    </p>
                    <p className="mt-1 truncate text-xs text-stone-600">
                      {getSearchMatchLabel(sushi, deferredQuery)}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full border border-[#123f46]/15 bg-white/70 px-2.5 py-1 text-xs text-[#123f46]">
                    {typeLabels[sushi.type]}
                  </span>
                </Link>
              ))
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
