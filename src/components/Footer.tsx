import { BrandLogo } from "@/components/Navbar";
import { buildWhatsAppUrl, siteConfig } from "@/lib/site-config";

export function Footer() {
  const year = 2026;

  return (
    <footer className="border-t border-[#1b1b1b]/10 bg-[#eeede9] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <BrandLogo className="h-14 w-auto" />
            <p className="mt-3 max-w-sm text-sm text-[#1b1b1b]/70">
              {siteConfig.brandTagline}. Defter ve karmaşık Excel süreçlerini
              yapay zeka hızına taşıyoruz.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#1b1b1b]/75">
            {siteConfig.navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-[#1b1b1b]"
              >
                {link.label}
              </a>
            ))}
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-emerald-700 transition-colors hover:text-emerald-900"
            >
              WhatsApp Destek
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-[#1b1b1b]/10 pt-6 text-xs text-[#1b1b1b]/55 sm:flex-row sm:items-center">
          <p>
            © {year} {siteConfig.brandName}. Tüm hakları saklıdır.
          </p>
          <p>
            {siteConfig.contact.email} • {siteConfig.contact.phoneDisplay}
          </p>
        </div>
      </div>
    </footer>
  );
}
