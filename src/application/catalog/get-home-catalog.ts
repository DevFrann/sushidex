import { sushiTypes, typeSlugs } from "@/domain/entities/sushi";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

import { getPopularSushi, getSushiCatalog } from "./sushi-catalog";

export function getHomeCatalog(locale: Locale) {
  const dictionary = getDictionary(locale);
  const sushiCatalog = getSushiCatalog(locale);
  const popularSushi = getPopularSushi(locale, 12);

  const types = sushiTypes.map((type) => ({
    id: type,
    label: dictionary.typeLabels[type],
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
