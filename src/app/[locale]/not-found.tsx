"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { defaultLocale, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { SushiDexLogo } from "@/presentation/components/site/sushidex-logo";

export default function NotFound() {
  const pathname = usePathname();
  const segment = pathname.split("/")[1];
  const locale = isLocale(segment) ? segment : defaultLocale;
  const dictionary = getDictionary(locale);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl items-center px-4 py-8 sm:px-6">
      <div className="w-full rounded-[36px] border border-stone-200 bg-white/80 p-10 text-center shadow-soft">
        <div className="flex items-center justify-center gap-2 font-semibold tracking-[0.08em] text-[#123f46]">
          <SushiDexLogo className="h-11 w-11" />
          <span>SushiDex</span>
        </div>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl text-stone-950">
          {dictionary.notFound.title}
        </h1>
        <p className="mt-4 text-stone-700">{dictionary.notFound.description}</p>
        <Link
          href={`/${locale}`}
          className="mt-8 inline-flex rounded-full bg-[#123f46] px-5 py-3 text-sm font-semibold text-[#f1cf71]"
        >
          {dictionary.notFound.action}
        </Link>
      </div>
    </main>
  );
}
