import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export function SiteFooter({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);

  return (
    <footer className="mx-auto w-full max-w-7xl px-4 pb-5 sm:px-6 lg:px-8">
      <div className="site-header-surface flex flex-col gap-4 rounded-[28px] border border-[#123f46]/15 px-5 py-5 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-semibold tracking-[0.08em] text-[#123f46]">
          SushiDex
        </p>

        <div className="space-y-1 text-sm text-stone-600 sm:text-right">
          <p className="font-medium text-[#123f46]">{dictionary.footer.brandLine}</p>
          <p>{dictionary.footer.description}</p>
          <p className="text-xs text-stone-500">Copyright 2026 Lamarbis</p>
        </div>
      </div>
    </footer>
  );
}
