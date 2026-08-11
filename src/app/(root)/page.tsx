"use client";

import Link from "next/link";
import { useEffect } from "react";

import { SushiDexLogo } from "@/presentation/components/site/sushidex-logo";

export default function RootRedirectPage() {
  useEffect(() => {
    window.location.replace("/en/");
  }, []);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl items-center px-4 py-8 sm:px-6">
      <div className="w-full rounded-[36px] border border-white/60 bg-white/70 p-10 text-center shadow-soft backdrop-blur">
        <SushiDexLogo className="mx-auto h-14 w-14" />
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl text-stone-950">
          SushiDex
        </h1>
        <p className="mt-4 text-stone-700">Opening the English version…</p>
        <Link
          href="/en/"
          className="mt-8 inline-flex rounded-full bg-[#123f46] px-5 py-3 text-sm font-semibold text-[#f1cf71]"
        >
          Continue in English
        </Link>
      </div>
    </main>
  );
}
