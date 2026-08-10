import { PrismaSushiRepository } from "./prisma-sushi-repository";
import { ResilientSushiRepository } from "./resilient-sushi-repository";
import { StaticSushiRepository } from "./static-sushi-repository";

const fallback = new StaticSushiRepository();

export function getSushiRepository() {
  if (!process.env.DATABASE_URL) {
    return fallback;
  }

  return new ResilientSushiRepository(new PrismaSushiRepository(), fallback);
}
