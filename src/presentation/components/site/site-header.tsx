import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { HeaderSearch } from "./header-search";
import { SushiDexLogo } from "./sushidex-logo";

interface SiteHeaderProps {
  backHref?: string;
  backLabel?: string;
  showSearch?: boolean;
}

export function SiteHeader({
  backHref,
  backLabel = "Volver",
  showSearch = true,
}: SiteHeaderProps) {
  return (
    <header className="site-header-surface sticky top-3 z-50 grid min-h-[4.75rem] grid-cols-[2.75rem_1fr_2.75rem] items-center gap-2 rounded-[28px] border border-[#123f46]/15 px-3 backdrop-blur-xl sm:grid-cols-[1fr_auto_1fr] sm:gap-4 sm:px-5">
      {backHref ? (
        <Link
          href={backHref}
          aria-label={backLabel}
          className="relative inline-flex h-10 w-10 items-center justify-center gap-2 justify-self-start rounded-full border border-[#123f46]/15 bg-white/55 text-[#123f46] transition-colors hover:bg-white/85 md:h-auto md:w-auto md:border-0 md:bg-transparent md:px-1 md:py-2 md:hover:bg-transparent md:hover:text-[#0b2f34]"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden text-sm font-medium md:inline">{backLabel}</span>
        </Link>
      ) : (
        <span aria-hidden />
      )}

      <Link
        href="/"
        aria-label="Ir al inicio de SushiDex"
        className="relative inline-flex items-center gap-2 justify-self-center font-semibold tracking-[0.08em] text-[#123f46] transition-opacity hover:opacity-80"
      >
        <SushiDexLogo className="h-10 w-10 sm:h-11 sm:w-11" />
        <span>SushiDex</span>
      </Link>

      {showSearch ? <HeaderSearch /> : <span aria-hidden />}
    </header>
  );
}
