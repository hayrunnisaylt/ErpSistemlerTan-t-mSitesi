"use client";

import { useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  FileSpreadsheet,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Wallet,
  Zap,
} from "lucide-react";
import { siteConfig } from "@/lib/site-config";

type Timeframe = "bugun" | "hafta" | "ay";

const dashboardSnapshots: Record<
  Timeframe,
  {
    cash: string;
    profit: string;
    profitDelta: string;
    invoices: string;
    bars: { label: string; value: number; amount: string }[];
  }
> = {
  bugun: {
    cash: "₺482.650,00",
    profit: "₺34.890,00",
    profitDelta: "+%18,4",
    invoices: "18 Kalem",
    bars: [
      { label: "09:00", value: 34, amount: "₺4.2K" },
      { label: "11:00", value: 58, amount: "₺7.8K" },
      { label: "13:00", value: 46, amount: "₺6.1K" },
      { label: "15:00", value: 82, amount: "₺11.4K" },
      { label: "17:00", value: 94, amount: "₺14.2K" },
      { label: "19:00", value: 72, amount: "₺9.8K" },
    ],
  },
  hafta: {
    cash: "₺482.650,00",
    profit: "₺186.420,00",
    profitDelta: "+%24,1",
    invoices: "94 Kalem",
    bars: [
      { label: "Pzt", value: 52, amount: "₺24K" },
      { label: "Sal", value: 68, amount: "₺31K" },
      { label: "Çar", value: 61, amount: "₺28K" },
      { label: "Per", value: 84, amount: "₺39K" },
      { label: "Cum", value: 96, amount: "₺44K" },
      { label: "Cmt", value: 76, amount: "₺35K" },
    ],
  },
  ay: {
    cash: "₺482.650,00",
    profit: "₺742.900,00",
    profitDelta: "+%31,8",
    invoices: "412 Kalem",
    bars: [
      { label: "1. Hf", value: 48, amount: "₺142K" },
      { label: "2. Hf", value: 66, amount: "₺178K" },
      { label: "3. Hf", value: 79, amount: "₺196K" },
      { label: "4. Hf", value: 95, amount: "₺226K" },
      { label: "Ek", value: 88, amount: "₺211K" },
      { label: "Hedef", value: 100, amount: "₺245K" },
    ],
  },
};

export function HeroSection() {
  const [timeframe, setTimeframe] = useState<Timeframe>("bugun");
  const current = dashboardSnapshots[timeframe];

  return (
    <section
      id="cozumler"
      className="relative overflow-hidden border-b border-[#1b1b1b]/10 bg-[#eeede9] pb-20 pt-14 sm:pb-28 sm:pt-20"
    >
      {/* Subtle architectural grid & soft ambient washes */}
      <div className="bg-grid-pattern pointer-events-none absolute inset-0 opacity-70" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-[440px] w-[780px] -translate-x-1/2 rounded-full bg-emerald-500/12 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-40 h-[320px] w-[400px] rounded-full bg-teal-400/10 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-[280px] w-[360px] rounded-full bg-amber-500/10 blur-[110px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Centered Hero Copy */}
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-700/20 bg-white/80 px-4 py-1.5 text-xs font-semibold text-emerald-800 shadow-sm backdrop-blur-md sm:text-sm">
            <Sparkles className="h-3.5 w-3.5 text-amber-600" aria-hidden="true" />
            <span>{siteConfig.aiBadge}</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-[#1b1b1b] sm:text-5xl lg:text-6xl lg:leading-[1.08]">
            {siteConfig.heroTitle}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#1b1b1b]/70 sm:text-lg">
            {siteConfig.heroSubtitle}
          </p>

          {/* CTA Buttons */}
          <div className="mt-9 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
            <a
              href="#vitrin"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#1b1b1b] px-7 py-4 text-base font-semibold text-[#eeede9] shadow-xl shadow-[#1b1b1b]/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-700 hover:text-white sm:w-auto"
            >
              <span>Örnek Sistemleri İncele</span>
              <ArrowDown
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
                aria-hidden="true"
              />
            </a>

            <a
              href="#iletisim"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[#1b1b1b]/15 bg-white/80 px-7 py-4 text-base font-semibold text-[#1b1b1b] backdrop-blur-md transition-all duration-300 hover:border-[#1b1b1b]/30 hover:bg-white sm:w-auto"
            >
              <Calendar className="h-4 w-4 text-emerald-700" aria-hidden="true" />
              <span>15 Dakikalık Canlı Sunum İste</span>
            </a>
          </div>

          {/* Trust micro-bar */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-[#1b1b1b]/70 sm:text-sm">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-700" aria-hidden="true" />
              7 İş Gününde Anahtar Teslim
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-amber-600" aria-hidden="true" />
              3 Saniyede AI Fatura Okuma
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-teal-700" aria-hidden="true" />
              Telefon, Tablet &amp; PC Uyumlu
            </span>
          </div>
        </div>

        {/* Interactive Live Browser Dashboard Mockup */}
        <div className="relative mx-auto mt-14 max-w-5xl">
          {/* Floating AI Notification Pill */}
          <div className="animate-float-slow relative z-20 mx-auto mb-4 flex max-w-md items-center gap-3 rounded-2xl border border-emerald-400/30 bg-stone-900/90 px-4 py-3 shadow-2xl shadow-emerald-950/80 backdrop-blur-xl md:absolute md:-right-4 md:-top-7 md:mb-0">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
            </span>
            <div className="min-w-0 text-left">
              <p className="text-xs font-semibold text-emerald-300">
                AI Fatura Tarandı • Gemini 2.5
              </p>
              <p className="truncate text-xs text-stone-300">
                18 Kalem 2.4 Saniyede Stoka İşlendi
              </p>
            </div>
            <span className="ml-auto rounded-full bg-emerald-500/20 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-300">
              %99.6
            </span>
          </div>

          {/* Realistic Browser Window */}
          <div className="overflow-hidden rounded-3xl border border-white/12 bg-slate-950/90 shadow-2xl shadow-black/70 ring-1 ring-white/5 backdrop-blur-xl">
            {/* Browser Top Chrome */}
            <div className="flex items-center justify-between border-b border-white/10 bg-stone-900/80 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                <span className="h-3 w-3 rounded-full bg-amber-400/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-stone-950/80 px-3 py-1 font-mono text-[11px] text-stone-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                app.ynsoftwaresolutions.com/canli-panel
              </div>
              <div className="hidden items-center gap-1.5 text-[11px] text-emerald-400 sm:flex">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Canlı Senkron
              </div>
            </div>

            {/* Dashboard Inner Content */}
            <div className="grid grid-cols-1 gap-5 p-5 sm:p-6 lg:grid-cols-12">
              {/* Left KPI Column */}
              <div className="flex flex-col gap-4 lg:col-span-5">
                {/* Live Cash Card */}
                <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/12 via-stone-900/70 to-stone-950 p-5">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-300">
                      <Wallet className="h-4 w-4" aria-hidden="true" />
                      Cebimdeki Para (Canlı Kasa)
                    </span>
                    <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-semibold text-emerald-300">
                      Net Nakit
                    </span>
                  </div>
                  <p className="mt-3 font-mono text-3xl font-bold tracking-tight text-white">
                    {current.cash}
                  </p>
                  <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3 text-xs">
                    <span className="text-stone-400">Net Kâr ({timeframe === "bugun" ? "Bugün" : timeframe === "hafta" ? "Bu Hafta" : "Bu Ay"})</span>
                    <span className="inline-flex items-center gap-1 font-mono font-semibold text-emerald-400">
                      {current.profit} ({current.profitDelta})
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  </div>
                </div>

                {/* Recent AI Activity List */}
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                      Son Otomatik İşlemler
                    </span>
                    <span className="font-mono text-[11px] text-teal-400">
                      {current.invoices}
                    </span>
                  </div>
                  <ul className="space-y-2.5 text-xs">
                    <li className="flex items-center justify-between rounded-xl bg-white/[0.03] px-3 py-2">
                      <span className="flex items-center gap-2 text-stone-200">
                        <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                        Anadolu Gıda e-Arşiv
                      </span>
                      <span className="font-mono text-emerald-400">+18 Kalem</span>
                    </li>
                    <li className="flex items-center justify-between rounded-xl bg-white/[0.03] px-3 py-2">
                      <span className="flex items-center gap-2 text-stone-200">
                        <TrendingUp className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />
                        Ağırlıklı Ort. Maliyet
                      </span>
                      <span className="font-mono text-amber-300">Güncellendi</span>
                    </li>
                    <li className="flex items-center justify-between rounded-xl bg-white/[0.03] px-3 py-2">
                      <span className="flex items-center gap-2 text-stone-200">
                        <CheckCircle2 className="h-3.5 w-3.5 text-teal-400" aria-hidden="true" />
                        WhatsApp Ekstre &amp; Hatırlatma
                      </span>
                      <span className="font-mono text-teal-300">12 Gönderim</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right Interactive Profit Chart */}
              <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-5 lg:col-span-7">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Anlık Net Kâr &amp; Tahsilat Grafiği
                    </p>
                    <p className="text-xs text-stone-400">
                      Ağırlıklı ortalama alış maliyeti düşüldükten sonra
                    </p>
                  </div>
                  <div
                    role="group"
                    aria-label="Zaman Aralığı"
                    className="inline-flex rounded-xl border border-white/10 bg-stone-950/80 p-1 text-xs"
                  >
                    {(
                      [
                        { id: "bugun", label: "Bugün" },
                        { id: "hafta", label: "Bu Hafta" },
                        { id: "ay", label: "Bu Ay" },
                      ] as const
                    ).map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setTimeframe(tab.id)}
                        className={`rounded-lg px-3 py-1 font-medium transition-all ${
                          timeframe === tab.id
                            ? "bg-emerald-500 text-stone-950 shadow-sm"
                            : "text-stone-400 hover:text-white"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bar Chart */}
                <div className="mt-6 grid h-48 grid-cols-6 items-end gap-2.5 sm:gap-4">
                  {current.bars.map((bar) => (
                    <div
                      key={bar.label}
                      className="group flex h-full flex-col items-center justify-end gap-2"
                    >
                      <span className="font-mono text-[10px] font-medium text-stone-400 transition-colors group-hover:text-emerald-300 sm:text-xs">
                        {bar.amount}
                      </span>
                      <div className="relative flex h-32 w-full items-end overflow-hidden rounded-xl bg-white/5 p-1">
                        <div
                          style={{ height: `${bar.value}%` }}
                          className="w-full rounded-lg bg-gradient-to-t from-emerald-600 via-emerald-400 to-teal-300 transition-all duration-500 group-hover:brightness-110"
                        />
                      </div>
                      <span className="text-[11px] font-medium text-stone-400">
                        {bar.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-3 text-xs text-stone-400">
                  <span>Otomatik bulut yedeği: 4 dakika önce</span>
                  <span className="font-mono text-emerald-400">
                    Sıfır veri kaybı koruması aktif
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
