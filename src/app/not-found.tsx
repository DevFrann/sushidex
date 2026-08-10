import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl items-center px-4 py-8 sm:px-6">
      <div className="w-full rounded-[36px] border border-stone-200 bg-white/80 p-10 text-center shadow-soft">
        <p className="text-xs uppercase tracking-[0.24em] text-stone-500">
          SushiDex
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl text-stone-950">
          Esa ficha no existe
        </h1>
        <p className="mt-4 text-stone-700">
          Puede que el slug no este en el catalogo inicial o que el enlace este mal escrito.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white"
        >
          Volver al buscador
        </Link>
      </div>
    </main>
  );
}
