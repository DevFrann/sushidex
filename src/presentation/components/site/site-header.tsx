import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import type { Locale } from "@/i18n/config";
import { localizedPath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

import { HeaderSearch } from "./header-search";
import { LanguageSwitcher } from "./language-switcher";
import { SushiDexLogo } from "./sushidex-logo";

interface SiteHeaderProps {
  locale: Locale;
  backHref?: string;
  backLabel?: string;
  showSearch?: boolean;
}

export function SiteHeader({
  locale,
  backHref,
  backLabel,
  showSearch = true,
}: SiteHeaderProps) {
  const dictionary = getDictionary(locale);

  return (
    <header className="site-header-surface sticky top-3 z-50 grid min-h-[4.75rem] grid-cols-[auto_auto_1fr] items-center gap-2 rounded-[28px] border border-[#123f46]/15 px-3 backdrop-blur-xl sm:gap-4 sm:px-5 md:grid-cols-[auto_1fr_auto]">
      {backHref ? (
        <Link
          href={backHref}
          aria-label={backLabel ?? dictionary.navigation.back}
          className="relative inline-flex h-10 w-10 items-center justify-center gap-2 justify-self-start rounded-full border border-[#123f46]/15 bg-white/55 text-[#123f46] transition-colors hover:bg-white/85 md:h-auto md:w-auto md:border-0 md:bg-transparent md:px-1 md:py-2 md:hover:bg-transparent md:hover:text-[#0b2f34]"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden text-sm font-medium md:inline">
            {backLabel ?? dictionary.navigation.back}
          </span>
        </Link>
      ) : (
        <span aria-hidden />
      )}

      <Link
        href={localizedPath(locale)}
        aria-label={dictionary.navigation.home}
        className="inline-flex items-center gap-2 font-semibold tracking-[0.08em] text-[#123f46] transition-opacity hover:opacity-80 md:absolute md:left-1/2 md:-translate-x-1/2"
      >
        <SushiDexLogo className="h-9 w-9 sm:h-11 sm:w-11" />
        <span className="hidden sm:inline">SushiDex</span>
      </Link>

      <div className="relative flex items-center gap-2 justify-self-end">
        {showSearch ? <HeaderSearch locale={locale} /> : null}
        <LanguageSwitcher locale={locale} />
      </div>
    </header>
  );
}
