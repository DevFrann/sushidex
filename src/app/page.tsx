import { getHomeCatalog } from "@/application/catalog/get-home-catalog";
import { CatalogSearch } from "@/presentation/components/site/catalog-search";
import { SiteHeader } from "@/presentation/components/site/site-header";

export default function HomePage() {
  const { popularSushi, sushiCatalog, totalSushi, types } = getHomeCatalog();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <SiteHeader showSearch={false} />
      <div className="mt-4 rounded-[36px] border border-white/60 bg-white/55 p-6 shadow-soft backdrop-blur sm:p-8 lg:p-10">
        <CatalogSearch
          popularSushi={popularSushi}
          sushiCatalog={sushiCatalog}
          totalSushi={totalSushi}
          types={types}
        />
      </div>
    </main>
  );
}
