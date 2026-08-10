import type { Sushi, SushiType } from "@/domain/entities/sushi";

export interface SushiRepository {
  findAll(): Promise<Sushi[]>;
  findPopular(limit: number): Promise<Sushi[]>;
  findBySlug(slug: string): Promise<Sushi | null>;
  findByType(type: SushiType): Promise<Sushi[]>;
}
