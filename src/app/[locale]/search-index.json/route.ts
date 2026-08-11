import { getSushiSearchIndex } from "@/application/catalog/sushi-catalog";
import { isLocale } from "@/i18n/config";

export const dynamic = "force-static";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }];
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return Response.json([], { status: 404 });
  }

  return Response.json(getSushiSearchIndex(locale));
}
