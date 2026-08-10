import type { SushiType } from "@/domain/entities/sushi";
import type { SushiRepository } from "@/domain/repositories/sushi-repository";
import { getPrismaClient } from "@/infrastructure/prisma/client";

import { mapPrismaSushiToDomain } from "./mappers";

export class PrismaSushiRepository implements SushiRepository {
  async findAll() {
    const prisma = getPrismaClient();
    const sushiCatalog = await prisma.sushi.findMany({
      orderBy: [{ popularity: "desc" }, { name: "asc" }],
    });

    return sushiCatalog.map(mapPrismaSushiToDomain);
  }

  async findPopular(limit: number) {
    const prisma = getPrismaClient();
    const sushiCatalog = await prisma.sushi.findMany({
      take: limit,
      orderBy: [{ popularity: "desc" }, { name: "asc" }],
    });

    return sushiCatalog.map(mapPrismaSushiToDomain);
  }

  async findBySlug(slug: string) {
    const prisma = getPrismaClient();
    const sushi = await prisma.sushi.findUnique({
      where: { slug },
    });

    return sushi ? mapPrismaSushiToDomain(sushi) : null;
  }

  async findByType(type: SushiType) {
    const prisma = getPrismaClient();
    const sushiCatalog = await prisma.sushi.findMany({
      where: { type },
      orderBy: [{ popularity: "desc" }, { name: "asc" }],
    });

    return sushiCatalog.map(mapPrismaSushiToDomain);
  }
}
