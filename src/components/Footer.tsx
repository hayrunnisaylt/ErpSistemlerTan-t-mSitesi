import { BrandLogo } from "@/components/Navbar";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  const year = 2026;

  return (
    <footer className="border-t border-[#1b1b1b]/10 bg-[#eeede9] py-12">
      <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-10">
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
              href={`mailto:${siteConfig.contact.email}`}
              className="font-semibold text-emerald-700 transition-colors hover:text-emerald-900"
            >
              E-Posta ile Ulaşın
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-[#1b1b1b]/10 pt-6 text-xs text-[#1b1b1b]/55 sm:flex-row sm:items-center">
          <p>
            © {year} {siteConfig.brandName}. Tüm hakları saklıdır.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a
              href={siteConfig.social.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              data-track-placement="Alt Bilgi (Footer)"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-pink-700"
            >
              <InstagramIcon className="h-3.5 w-3.5" />
              {siteConfig.social.instagram.handle}
            </a>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="transition-colors hover:text-[#1b1b1b]"
            >
              {siteConfig.contact.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
