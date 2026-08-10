import { NextResponse } from "next/server";

import { searchSushis } from "@/application/search/search-sushis";
import { getSushiRepository } from "@/infrastructure/repositories";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim() ?? "";

  const results = query
    ? await searchSushis(getSushiRepository(), query, 12)
    : [];

  return NextResponse.json({
    query,
    results,
  });
}
