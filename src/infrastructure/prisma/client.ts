import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "@/generated/prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export function getPrismaClient() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured.");
  }

  if (!globalThis.prisma) {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL,
    });

    globalThis.prisma = new PrismaClient({ adapter });
  }

  return globalThis.prisma;
}
