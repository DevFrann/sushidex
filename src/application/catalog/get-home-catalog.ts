import { sushiTypes, typeLabels, typeSlugs } from "@/domain/entities/sushi";

import { getPopularSushi, getSushiCatalog } from "./sushi-catalog";

export function getHomeCatalog() {
  const sushiCatalog = getSushiCatalog();
  const popularSushi = getPopularSushi(12);

  const types = sushiTypes.map((type) => ({
    id: type,
    label: typeLabels[type],
    slug: typeSlugs[type],
    count: sushiCatalog.filter((sushi) => sushi.type === type).length,
  }));

  return {
    popularSushi,
    sushiCatalog,
    types,
    totalSushi: sushiCatalog.length,
  };
}
