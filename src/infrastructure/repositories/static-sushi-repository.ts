import type { SushiType } from "@/domain/entities/sushi";
import type { SushiRepository } from "@/domain/repositories/sushi-repository";
import { sushiSeedCatalog } from "@/infrastructure/seed/sushi-seed-data";

export class StaticSushiRepository implements SushiRepository {
  async findAll() {
    return [...sushiSeedCatalog];
  }

  async findPopular(limit: number) {
    return [...sushiSeedCatalog]
      .sort((left, right) => right.popularity - left.popularity)
      .slice(0, limit);
  }

  async findBySlug(slug: string) {
    return sushiSeedCatalog.find((sushi) => sushi.slug === slug) ?? null;
  }

  async findByType(type: SushiType) {
    return sushiSeedCatalog
      .filter((sushi) => sushi.type === type)
      .sort((left, right) => right.popularity - left.popularity);
  }
}
