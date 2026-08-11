import type { Metadata } from "next";

import { fraunces, manrope } from "../fonts";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: "SushiDex",
  description: "A visual sushi dictionary for restaurant and delivery menus.",
  robots: { index: false, follow: true },
};

export default function RootRedirectLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">{children}</body>
    </html>
  );
}
