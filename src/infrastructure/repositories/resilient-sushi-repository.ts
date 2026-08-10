import type { SushiType } from "@/domain/entities/sushi";
import type { SushiRepository } from "@/domain/repositories/sushi-repository";

export class ResilientSushiRepository implements SushiRepository {
  constructor(
    private readonly primary: SushiRepository,
    private readonly fallback: SushiRepository,
  ) {}

  async findAll() {
    return this.runWithFallback((repository) => repository.findAll());
  }

  async findPopular(limit: number) {
    return this.runWithFallback((repository) => repository.findPopular(limit));
  }

  async findBySlug(slug: string) {
    return this.runWithFallback((repository) => repository.findBySlug(slug));
  }

  async findByType(type: SushiType) {
    return this.runWithFallback((repository) => repository.findByType(type));
  }

  private async runWithFallback<T>(operation: (repository: SushiRepository) => Promise<T>) {
    try {
      return await operation(this.primary);
    } catch {
      return operation(this.fallback);
    }
  }
}
