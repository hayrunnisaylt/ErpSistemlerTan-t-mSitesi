"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle2,
  ExternalLink,
  Mail,
  Maximize2,
  Pause,
  Play,
  X,
} from "lucide-react";
import {
  AtolyeLiveDemo,
  FizyoterapiLiveDemo,
  ToptanciLiveDemo,
  VeterinerLiveDemo,
} from "@/components/LiveProjectDemos";
import { ScaledFrame } from "@/components/ScaledFrame";
import { siteConfig, type PortfolioItem } from "@/lib/site-config";

const demoUrls: Record<PortfolioItem["id"], string> = {
  toptanci: "erp.yoltangida.com.tr/ozet",
  fizyoterapi: "panel.fizyovita.com.tr/klinik-ozeti",
  veteriner: "klinik.pativet.com.tr/ozet",
  atolye: "erp.zanaatatolye.com.tr/gelir-gider",
};

const demoBrands: Record<PortfolioItem["id"], string> = {
  toptanci: "Yoltan Gıda A.Ş.",
  fizyoterapi: "Fizyovita Klinik",
  veteriner: "PatiVet & Çiftlik Polikliniği",
  atolye: "Zanaat Tasarım Atölyesi",
};

const demoStepHints: Record<PortfolioItem["id"], string> = {
  toptanci: "Satış Girişi • Cebimdeki Para • AI Alış Faturası",
  fizyoterapi: "Randevu Oluşturma • Seans Paketi • Klinik Giderleri",
  veteriner: "Klinik Özeti • Muayene & Satış • Kritik Stok & AI Fatura",
  atolye: "Aylık Gelir–Gider • Malzeme Stoğu • Sipariş Takibi",
};

function renderLiveDemo(id: PortfolioItem["id"], offsetMs: number) {
  if (id === "toptanci") return <ToptanciLiveDemo offsetMs={offsetMs} />;
  if (id === "fizyoterapi") return <FizyoterapiLiveDemo offsetMs={offsetMs} />;
  if (id === "veteriner") return <VeterinerLiveDemo offsetMs={offsetMs} />;
  return <AtolyeLiveDemo offsetMs={offsetMs} />;
}

export function PortfolioShowcase() {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [manualPaused, setManualPaused] = useState(false);
  const [expandedItem, setExpandedItem] = useState<PortfolioItem | null>(null);

  // Close expanded spotlight modal on Escape
  useEffect(() => {
    if (!expandedItem) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpandedItem(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [expandedItem]);

  // Order for stream: Toptancı -> Fizyoterapi -> Veteriner -> Atölye (duplicated for seamless loop)
  const orderedProjects: PortfolioItem[] = [
    siteConfig.portfolioData.find((p) => p.id === "toptanci")!,
    siteConfig.portfolioData.find((p) => p.id === "fizyoterapi")!,
    siteConfig.portfolioData.find((p) => p.id === "veteriner")!,
    siteConfig.portfolioData.find((p) => p.id === "atolye")!,
  ];

  const streamItems = [
    ...orderedProjects.map((item, idx) => ({
      item,
      key: `a-${item.id}`,
      offsetMs: idx * 900,
    })),
    ...orderedProjects.map((item, idx) => ({
      item,
      key: `b-${item.id}`,
      offsetMs: idx * 900,
    })),
  ];

  return (
    <section
      id="vitrin"
      className="relative scroll-mt-20 overflow-x-clip border-b border-[#1b1b1b]/10 bg-[#eeede9] py-20 sm:py-28"
    >
      {/* Section Header */}
      <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-10">
        <div className="scroll-reveal mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-800">
            <span
              className="h-px w-8 bg-gradient-to-r from-transparent to-emerald-700/60"
              aria-hidden="true"
            />
            <span>Canlı Sistem Vitrini</span>
            <span
              className="h-px w-8 bg-gradient-to-l from-transparent to-emerald-700/60"
              aria-hidden="true"
            />
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#1b1b1b] sm:text-4xl lg:text-5xl">
            Gerçek İşletmeler İçin Geliştirdiğimiz Sistemleri{" "}
            <span className="text-emerald-700">Canlı İnceleyin</span>
          </h2>
          <p className="mt-4 text-base text-[#1b1b1b]/70 sm:text-lg">
            Aşağıdaki canlı proje akışı bir video gibi kendi içinde satış girer,
            randevu oluşturur ve stok işler.{" "}
            <strong className="font-semibold text-[#1b1b1b]">
              <span className="pointer-coarse:hidden">
                Herhangi bir pencerenin üzerine gelin:
              </span>
              <span className="hidden pointer-coarse:inline">Herhangi bir pencereye dokunun:</span>
            </strong>{" "}
            <span className="pointer-coarse:hidden">
              akış durur ve o proje büyüyerek detaylı görünür.
            </span>
            <span className="hidden pointer-coarse:inline">
              o proje büyüyerek tüm detaylarıyla açılır.
            </span>
          </p>

          {/* Stream Status & Pause/Play Control */}
          <div className="mt-6 inline-flex items-center gap-3 text-xs font-medium text-[#1b1b1b]/70">
            <span className="inline-flex items-center gap-1.5">
              <span
                className={`h-2 w-2 rounded-full ${
                  manualPaused || hoveredKey
                    ? "bg-amber-500"
                    : "animate-pulse bg-emerald-600"
                }`}
              />
              {hoveredKey
                ? "Akış duraklatıldı — inceleme modu"
                : manualPaused
                ? "Akış durduruldu"
                : "Canlı akış oynatılıyor"}
            </span>
            <span className="text-[#1b1b1b]/25">•</span>
            <button
              type="button"
              onClick={() => setManualPaused((prev) => !prev)}
              className="inline-flex items-center gap-1 rounded-lg bg-[#1b1b1b]/8 px-2.5 py-1 text-xs font-semibold text-[#1b1b1b] transition-colors hover:bg-[#1b1b1b]/15"
            >
              {manualPaused ? (
                <>
                  <Play className="h-3 w-3" aria-hidden="true" />
                  Devam Et
                </>
              ) : (
                <>
                  <Pause className="h-3 w-3" aria-hidden="true" />
                  Duraklat
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Infinite Moving Project Stream Viewport */}
      <div className="marquee-viewport relative mt-10 w-full py-10">
        {/* Soft Left & Right Edge Fades matching #eeede9 */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-20 hidden w-20 bg-gradient-to-r from-[#eeede9] to-transparent md:block"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-20 hidden w-20 bg-gradient-to-l from-[#eeede9] to-transparent md:block"
        />

        <div
          className={`marquee-track gap-6 px-6 ${
            manualPaused || expandedItem ? "is-paused" : ""
          }`}
        >
          {streamItems.map(({ item, key, offsetMs }) => {
            const isHovered = hoveredKey === key;
            const someHovered = hoveredKey !== null;

            return (
              <article
                key={key}
                onMouseEnter={() => setHoveredKey(key)}
                onMouseLeave={() => setHoveredKey(null)}
                onClick={() => setExpandedItem(item)}
                className={`group relative w-[86vw] max-w-[600px] shrink-0 cursor-pointer rounded-3xl border bg-white/95 p-3 shadow-xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:w-[540px] lg:w-[600px] ${
                  isHovered
                    ? "z-30 border-emerald-700/45 pointer-fine:scale-[1.09] shadow-2xl shadow-[#1b1b1b]/20 ring-4 ring-emerald-600/15"
                    : someHovered
                    ? "border-[#1b1b1b]/10 opacity-70 pointer-fine:scale-[0.97]"
                    : "border-[#1b1b1b]/12 shadow-[#1b1b1b]/8"
                }`}
              >
                {/* Realistic Browser Chrome */}
                <div className="flex items-center justify-between gap-2 rounded-t-2xl border-b border-stone-200 bg-stone-100/90 px-3.5 py-2.5">
                  <div className="flex min-w-0 items-center gap-1.5">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-rose-400" />
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-amber-400" />
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500" />
                    <span className="ml-2 truncate rounded-md bg-white px-2 py-0.5 font-mono text-[10px] text-stone-500 shadow-2xs">
                      {demoUrls[item.id]}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full bg-emerald-600/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-800">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Canlı Akış
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedItem(item);
                      }}
                      aria-label={`${item.title} penceresini büyüt`}
                      className="inline-flex h-6 w-6 items-center justify-center rounded-md text-stone-500 transition-colors hover:bg-stone-200 hover:text-stone-900"
                    >
                      <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                {/* Live Animated Project Window */}
                <ScaledFrame
                  designWidth={520}
                  designHeight={340}
                  className="rounded-b-2xl border-x border-b border-stone-200"
                >
                  {renderLiveDemo(item.id, offsetMs)}
                </ScaledFrame>

                {/* Project Caption & Hover Detail Drawer */}
                <div className="mt-3 flex items-start justify-between gap-3 px-1.5 pb-1">
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                      {demoBrands[item.id]} • {item.badge}
                    </p>
                    <h3 className="truncate text-base font-bold text-[#1b1b1b]">
                      {item.title}
                    </h3>
                    <p className="mt-0.5 text-xs text-[#1b1b1b]/65">
                      {demoStepHints[item.id]}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                      isHovered
                        ? "bg-[#1b1b1b] text-white"
                        : "bg-[#eeede9] text-[#1b1b1b]"
                    }`}
                  >
                    Detaylı İncele →
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Bottom Compact Sector Summary Strip */}
      <div className="mx-auto mt-6 max-w-[1520px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {orderedProjects.map((proj) => (
            <div
              key={proj.id}
              className="scroll-reveal-card flex flex-col justify-between rounded-2xl border border-[#1b1b1b]/10 bg-white/75 p-5 shadow-sm transition-colors hover:border-emerald-700/30 hover:bg-white"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                    {proj.shortLabel}
                  </span>
                  <span className="font-mono text-xs font-bold text-[#1b1b1b]">
                    {proj.metrics[0].value} • {proj.metrics[0].label}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[#1b1b1b]/75">
                  {proj.story}
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-[#1b1b1b]/10 pt-3">
                <button
                  type="button"
                  onClick={() => setExpandedItem(proj)}
                  className="text-xs font-bold text-[#1b1b1b] underline-offset-4 hover:text-emerald-700 hover:underline"
                >
                  Ekranı Büyüt &amp; Modülleri Gör
                </button>
                <a
                  href="#iletisim"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-900"
                >
                  Demo İste
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expanded Spotlight Modal when clicking any project window */}
      {expandedItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="spotlight-title"
          onClick={() => setExpandedItem(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/70 p-3 backdrop-blur-sm sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-[92dvh] w-full max-w-6xl overflow-y-auto overscroll-contain rounded-3xl border border-[#1b1b1b]/15 bg-[#eeede9] p-4 shadow-2xl sm:p-7"
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#1b1b1b]/10 pb-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-800">
                  {expandedItem.badge}
                </p>
                <h3
                  id="spotlight-title"
                  className="mt-1 text-xl font-bold text-[#1b1b1b] sm:text-2xl"
                >
                  {expandedItem.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setExpandedItem(null)}
                aria-label="Önizlemeyi Kapat"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#1b1b1b]/15 bg-white text-[#1b1b1b] transition-colors hover:bg-[#1b1b1b] hover:text-white"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-12">
              {/* Large Live Demo Window */}
              <div className="lg:col-span-7">
                <div className="overflow-hidden rounded-2xl border border-[#1b1b1b]/15 bg-white shadow-xl">
                  <div className="flex items-center justify-between gap-2 border-b border-stone-200 bg-stone-100 px-4 py-2.5">
                    <div className="flex min-w-0 items-center gap-1.5">
                      <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-rose-400" />
                      <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-amber-400" />
                      <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500" />
                      <span className="ml-2 truncate font-mono text-xs text-stone-500">
                        {demoUrls[expandedItem.id]}
                      </span>
                    </div>
                    <span className="shrink-0 whitespace-nowrap rounded-full bg-emerald-600/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-800">
                      Canlı Video Simülasyonu
                    </span>
                  </div>
                  <ScaledFrame designWidth={560} designHeight={420}>
                    {renderLiveDemo(expandedItem.id, 0)}
                  </ScaledFrame>
                </div>
              </div>

              {/* Project Details & Demo CTA */}
              <div className="flex flex-col justify-between gap-4 lg:col-span-5">
                <div className="space-y-4">
                  <p className="text-sm leading-relaxed text-[#1b1b1b]/80">
                    &ldquo;{expandedItem.story}&rdquo;
                  </p>

                  <div className="rounded-2xl border border-[#1b1b1b]/10 bg-white/80 p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#1b1b1b]/60">
                      Çözülen Problemler
                    </p>
                    <ul className="mt-2 space-y-1.5 text-sm text-[#1b1b1b]/85">
                      {expandedItem.solvedProblems.map((prob) => (
                        <li key={prob} className="flex items-start gap-2">
                          <CheckCircle2
                            className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700"
                            aria-hidden="true"
                          />
                          <span>{prob}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    {expandedItem.keyFeatures.map((feat, idx) => (
                      <div
                        key={feat.title}
                        className="rounded-xl border border-[#1b1b1b]/10 bg-white/80 p-3"
                      >
                        <p className="text-xs font-bold text-[#1b1b1b]">
                          {idx + 1}. {feat.title}
                        </p>
                        <p className="mt-1 text-xs text-[#1b1b1b]/70">
                          {feat.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2.5 pt-2">
                  <a
                    href="#iletisim"
                    onClick={() => setExpandedItem(null)}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#1b1b1b] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
                  >
                    <span>Bu Sistem İçin Demo İste</span>
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <a
                    href={`mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
                      `${expandedItem.title} — Canlı Demo Talebi`
                    )}`}
                    className="inline-flex items-center justify-center rounded-xl border border-[#1b1b1b]/15 bg-white px-4 py-3 text-sm font-semibold text-[#1b1b1b] hover:bg-emerald-50"
                    aria-label="E-Posta ile bilgi al"
                  >
                    <Mail className="h-4 w-4 text-emerald-700" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
