"use client";

import { useState } from "react";
import Image from "next/image";
import { Mail, Menu, Sparkles, X } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

interface BrandLogoProps {
  className?: string;
}

export function BrandLogo({ className = "h-11 w-auto" }: BrandLogoProps) {
  return (
    <a
      href="#"
      className="inline-flex shrink-0 items-center transition-opacity hover:opacity-85"
      aria-label={`${siteConfig.brandName} Ana Sayfa`}
    >
      <Image
        src={siteConfig.logoPath}
        alt={siteConfig.brandName}
        width={1024}
        height={689}
        priority
        className={`${className} object-contain`}
      />
    </a>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#1b1b1b]/10 bg-[#eeede9]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-[1520px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        <div className="flex items-center gap-6">
          <BrandLogo className="h-12 w-auto" />

          {/* Single semantic navigation landmark aligned next to logo */}
          <nav aria-label="Ana Menü" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {siteConfig.navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-[#1b1b1b]/75 transition-colors duration-200 hover:bg-[#1b1b1b]/5 hover:text-[#1b1b1b]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2.5 sm:flex">
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#1b1b1b]/15 bg-white/70 px-3.5 py-2 text-sm font-medium text-[#1b1b1b] transition-all duration-200 hover:border-emerald-600/40 hover:bg-emerald-600/10 hover:text-emerald-900"
            >
              <Mail className="h-4 w-4 text-emerald-700" aria-hidden="true" />
              <span>E-Posta ile Ulaşın</span>
            </a>
            <a
              href="#iletisim"
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#1b1b1b] px-4 py-2 text-sm font-semibold text-[#eeede9] shadow-md shadow-[#1b1b1b]/15 transition-all duration-200 hover:bg-emerald-700 hover:text-white"
            >
              <Sparkles className="h-4 w-4 text-emerald-400" aria-hidden="true" />
              <span>Canlı Demo Talep Et</span>
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-panel"
            aria-label={mobileOpen ? "Menüyü Kapat" : "Menüyü Aç"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#1b1b1b]/15 bg-white/70 text-[#1b1b1b] transition-colors hover:bg-white lg:hidden"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Panel */}
      {mobileOpen && (
        <div
          id="mobile-nav-panel"
          className="border-t border-[#1b1b1b]/10 bg-[#eeede9]/98 px-4 pb-5 pt-3 backdrop-blur-xl lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {siteConfig.navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-xl px-3.5 py-2.5 text-sm font-medium text-[#1b1b1b]/85 transition-colors hover:bg-[#1b1b1b]/5 hover:text-[#1b1b1b]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 grid grid-cols-1 gap-2.5 sm:hidden">
            <a
              href={`mailto:${siteConfig.contact.email}`}
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#1b1b1b]/15 bg-white/80 px-4 py-3 text-sm font-medium text-[#1b1b1b]"
            >
              <Mail className="h-4 w-4 text-emerald-700" aria-hidden="true" />
              E-Posta ile Ulaşın
            </a>
            <a
              href="#iletisim"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1b1b1b] px-4 py-3 text-sm font-semibold text-[#eeede9]"
            >
              <Sparkles className="h-4 w-4 text-emerald-400" aria-hidden="true" />
              Canlı Demo Talep Et
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
