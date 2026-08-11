"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { locales, type Locale } from "@/i18n/config";
import { formatMessage, getDictionary } from "@/i18n/dictionaries";
import { cn } from "@/presentation/lib/utils";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const dictionary = getDictionary(locale);

  function getTargetPath(targetLocale: Locale) {
    return /^\/(en|es)(?=\/|$)/.test(pathname)
      ? pathname.replace(/^\/(en|es)(?=\/|$)/, `/${targetLocale}`)
      : `/${targetLocale}`;
  }

  return (
    <nav
      aria-label={dictionary.language.label}
      className="relative flex rounded-full border border-[#d2a33a]/45 bg-[#2f6d70] p-1 shadow-[0_8px_20px_-12px_rgba(18,63,70,0.65)]"
    >
      {locales.map((targetLocale) => {
        const targetDictionary = getDictionary(targetLocale);
        const isActive = targetLocale === locale;

        return (
          <Link
            key={targetLocale}
            href={getTargetPath(targetLocale)}
            hrefLang={targetLocale}
            lang={targetLocale}
            aria-current={isActive ? "page" : undefined}
            aria-label={formatMessage(dictionary.language.switchTo, {
              language: targetDictionary.localeName,
            })}
            style={{ color: "#f4cf63" }}
            className={cn(
              "inline-flex h-8 min-w-9 items-center justify-center rounded-full px-2 text-[11px] font-semibold uppercase tracking-[0.08em] transition-colors",
              isActive
                ? "bg-white/10 ring-1 ring-inset ring-[#f4cf63]/75"
                : "hover:bg-white/10",
            )}
          >
            {targetLocale}
          </Link>
        );
      })}
    </nav>
  );
}
