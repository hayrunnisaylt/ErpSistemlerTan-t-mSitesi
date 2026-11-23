import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${siteConfig.brandName} — Yapay Zeka Destekli Özel ERP, Cari, Stok ve Klinik Sistemleri`,
  description: siteConfig.heroSubtitle,
  openGraph: {
    title: `${siteConfig.brandName} — Yeni Nesil Yapay Zeka Destekli ERP & Klinik Sistemleri`,
    description: siteConfig.heroSubtitle,
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${inter.className} ${inter.variable} scroll-smooth`}
    >
      <body
        className={`${inter.className} min-h-screen bg-[#eeede9] font-sans text-[#1b1b1b] antialiased selection:bg-emerald-600/20 selection:text-[#1b1b1b]`}
      >
        {children}
      </body>
    </html>
  );
}
