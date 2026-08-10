import { getHomeCatalog } from "@/application/catalog/get-home-catalog";
import { getSushiRepository } from "@/infrastructure/repositories";
import { CatalogSearch } from "@/presentation/components/site/catalog-search";

export default async function HomePage() {
  const repository = getSushiRepository();
  const { popularSushi, totalSushi, types } = await getHomeCatalog(repository);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="rounded-[36px] border border-white/60 bg-white/55 p-6 shadow-soft backdrop-blur sm:p-8 lg:p-10">
        <div className="mb-8 flex items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-[var(--accent)]" />
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-600">
            SushiDex
          </p>
        </div>
        <CatalogSearch
          popularSushi={popularSushi}
          totalSushi={totalSushi}
          types={types}
        />
      </div>
    </main>
  );
}
