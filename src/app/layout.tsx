import type { Metadata } from "next";
import { Manrope, Noto_Serif_JP } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

const notoSerifJp = Noto_Serif_JP({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "SushiDex",
    template: "%s | SushiDex",
  },
  description:
    "Diccionario visual de sushi para entender rapidamente platos frecuentes de delivery y cartas japonesas.",
  openGraph: {
    title: "SushiDex",
    description:
      "Busca Dragon Roll, California Roll, nigiri, gunkan y otros platos japoneses en segundos.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${manrope.variable} ${notoSerifJp.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">{children}</body>
    </html>
  );
}
