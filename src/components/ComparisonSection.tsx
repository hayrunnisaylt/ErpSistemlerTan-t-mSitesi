import { CheckCircle2, Sparkles, XCircle } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function ComparisonSection() {
  const { comparisonData } = siteConfig;

  return (
    <section className="relative border-b border-[#1b1b1b]/10 bg-[#eeede9] py-20 sm:py-28">
      <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-amber-800">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-amber-700/60" aria-hidden="true" />
            <span>Net Karşılaştırma</span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-amber-700/60" aria-hidden="true" />
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#1b1b1b] sm:text-4xl lg:text-5xl">
            Eski Düzen vs.{" "}
            <span className="text-emerald-700">Yeni Nesil Sistemimiz</span>
          </h2>
          <p className="mt-4 text-base text-[#1b1b1b]/70 sm:text-lg">
            Her gün kaybettiğiniz saatleri ve gözden kaçan kâr kaçaklarını
            yan yana görün.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Old Way Card */}
          <div className="rounded-3xl border border-rose-600/20 bg-white/75 p-6 shadow-sm sm:p-8">
            <div className="border-b border-[#1b1b1b]/10 pb-5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-600/10 px-3 py-1 text-xs font-semibold text-rose-700">
                <XCircle className="h-3.5 w-3.5" aria-hidden="true" />
                Zaman &amp; Para Kaybettiren Yöntem
              </span>
              <h3 className="mt-3 text-2xl font-bold text-[#1b1b1b]">
                {comparisonData.oldWayTitle}
              </h3>
              <p className="mt-1 text-sm text-[#1b1b1b]/65">
                {comparisonData.oldWaySubtitle}
              </p>
            </div>

            <ul className="mt-6 space-y-4">
              {comparisonData.oldWayItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-relaxed text-[#1b1b1b]/80 sm:text-base"
                >
                  <XCircle
                    className="mt-0.5 h-5 w-5 shrink-0 text-rose-600"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* New Way Card */}
          <div className="relative overflow-hidden rounded-3xl border border-[#1b1b1b]/15 bg-[#1b1b1b] p-6 text-stone-100 shadow-2xl shadow-[#1b1b1b]/15 sm:p-8">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-500/20 blur-3xl"
            />
            <div className="relative border-b border-white/10 pb-5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Hızlı, Güvenli &amp; Yapay Zeka Destekli
              </span>
              <h3 className="mt-3 text-2xl font-bold text-white">
                {comparisonData.newWayTitle}
              </h3>
              <p className="mt-1 text-sm text-emerald-200/80">
                {comparisonData.newWaySubtitle}
              </p>
            </div>

            <ul className="relative mt-6 space-y-4">
              {comparisonData.newWayItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-relaxed text-stone-100 sm:text-base"
                >
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
