import {
  BadgePercent,
  CloudCheck,
  DatabaseZap,
  Sliders,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const iconMap = {
  simplicity: Sparkles,
  "cloud-backup": CloudCheck,
  "multi-device": Smartphone,
  "tailor-made": Sliders,
  "data-safety": DatabaseZap,
  "transparent-pricing": BadgePercent,
} as const;

export function WhyUsBento() {
  return (
    <section
      id="neden-biz"
      className="relative scroll-mt-20 border-b border-[#1b1b1b]/10 bg-[#eeede9] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-teal-800">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-teal-700/60" aria-hidden="true" />
            <span>Farkımız</span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-teal-700/60" aria-hidden="true" />
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#1b1b1b] sm:text-4xl lg:text-5xl">
            Neden Standart Hazır Programlar Yerine{" "}
            <span className="text-emerald-700">{siteConfig.brandName}?</span>
          </h2>
          <p className="mt-4 text-base text-[#1b1b1b]/70 sm:text-lg">
            Size kullanmayacağınız yüzlerce karmaşık ekran değil; işinizi
            hızlandıran, hatayı sıfırlayan, terzi işi sade sistemler kuruyoruz.
          </p>
        </div>

        {/* 6-Card Bento Grid */}
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
          {siteConfig.whyUsFeatures.map((item) => {
            const Icon = iconMap[item.id];
            const isFullWidth = item.id === "transparent-pricing";

            return (
              <article
                key={item.id}
                className={`group relative overflow-hidden rounded-3xl border border-[#1b1b1b]/10 bg-white/80 p-6 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-700/35 hover:bg-white hover:shadow-lg hover:shadow-[#1b1b1b]/5 ${item.span}`}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-emerald-500/10 blur-3xl transition-opacity duration-300 group-hover:opacity-100"
                />

                <div
                  className={`relative flex h-full flex-col justify-between gap-5 ${
                    isFullWidth
                      ? "lg:flex-row lg:items-center lg:justify-between"
                      : ""
                  }`}
                >
                  <div className={isFullWidth ? "max-w-2xl" : ""}>
                    <div className="flex items-center justify-between gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-700/20 bg-emerald-600/10 text-emerald-700 transition-transform duration-300 group-hover:scale-105">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="rounded-full border border-[#1b1b1b]/10 bg-[#eeede9] px-3 py-1 font-mono text-[11px] font-semibold text-[#1b1b1b]/75">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="mt-5 text-xl font-bold tracking-tight text-[#1b1b1b]">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-[#1b1b1b]/70">
                      {item.description}
                    </p>
                  </div>

                  {isFullWidth && (
                    <div className="flex shrink-0 flex-wrap gap-3">
                      <div className="rounded-2xl border border-emerald-700/20 bg-emerald-600/10 px-4 py-3 text-center">
                        <p className="font-mono text-lg font-bold text-emerald-800">
                          %0
                        </p>
                        <p className="text-[11px] font-medium text-[#1b1b1b]/75">
                          Sürpriz Yenileme
                        </p>
                      </div>
                      <div className="rounded-2xl border border-[#1b1b1b]/10 bg-[#eeede9] px-4 py-3 text-center">
                        <p className="font-mono text-lg font-bold text-[#1b1b1b]">
                          1:1
                        </p>
                        <p className="text-[11px] font-medium text-[#1b1b1b]/75">
                          Mühendis Desteği
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
