import { sushiTypes, typeLabels, typeSlugs } from "@/domain/entities/sushi";
import type { SushiRepository } from "@/domain/repositories/sushi-repository";

export async function getHomeCatalog(repository: SushiRepository) {
  const [allSushi, popularSushi] = await Promise.all([
    repository.findAll(),
    repository.findPopular(12),
  ]);

  const types = sushiTypes.map((type) => ({
    id: type,
    label: typeLabels[type],
    slug: typeSlugs[type],
    count: allSushi.filter((sushi) => sushi.type === type).length,
  }));

  return {
    popularSushi,
    types,
    totalSushi: allSushi.length,
  };
}
