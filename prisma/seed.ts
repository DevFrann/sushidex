import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "../src/generated/prisma/client";

import { sushiSeedCatalog } from "../src/infrastructure/seed/sushi-seed-data";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL ?? "",
});

const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.sushi.deleteMany();
  await prisma.sushi.createMany({
    data: sushiSeedCatalog.map((entry) => {
      const { id, ...sushi } = entry;
      void id;
      return sushi;
    }),
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
