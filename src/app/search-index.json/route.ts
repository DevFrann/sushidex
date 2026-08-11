import { getSushiSearchIndex } from "@/application/catalog/sushi-catalog";

export const dynamic = "force-static";

export function GET() {
  return Response.json(getSushiSearchIndex());
}
