"use client";

import { useEffect, useRef, useState } from "react";
import {
  CheckCircle2,
  FileText,
  RotateCcw,
  ScanLine,
  Sparkles,
  Zap,
} from "lucide-react";
import { siteConfig } from "@/lib/site-config";

type ScanState = "idle" | "scanning" | "done";

const formatTL = (amount: number) =>
  new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 2,
  }).format(amount);

export function AiInvoiceDemo() {
  const [sampleIndex, setSampleIndex] = useState(0);
  const [scanState, setScanState] = useState<ScanState>("idle");
  const [scanStep, setScanStep] = useState(0);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const sample = siteConfig.aiInvoiceSamples[sampleIndex];
  const grandTotal = sample.items.reduce((acc, i) => acc + i.lineTotal, 0);

  const clearTimers = () => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
  };

  useEffect(() => {
    return () => clearTimers();
  }, []);

  const handleSelectSample = (idx: number) => {
    clearTimers();
    setSampleIndex(idx);
    setScanState("idle");
    setScanStep(0);
  };

  const handleScan = () => {
    clearTimers();
    setScanState("scanning");
    setScanStep(1);

    timersRef.current.push(setTimeout(() => setScanStep(2), 500));
    timersRef.current.push(setTimeout(() => setScanStep(3), 1000));
    timersRef.current.push(
      setTimeout(() => {
        setScanState("done");
        setScanStep(4);
      }, 1500)
    );
  };

  const handleReset = () => {
    clearTimers();
    setScanState("idle");
    setScanStep(0);
  };

  const stepLabels = [
    "",
    "Belge taranıyor & satırlar ayrıştırılıyor...",
    "KDV oranları ve birim maliyetler hesaplanıyor...",
    "Depo stok kartlarıyla eşleştiriliyor...",
  ];

  return (
    <section
      id="yapay-zeka"
      className="relative scroll-mt-20 overflow-hidden border-b border-[#1b1b1b]/10 bg-[#eeede9] py-20 sm:py-28"
    >
      <div className="scroll-reveal relative mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-10">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-800">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-emerald-700/60" aria-hidden="true" />
            <span>Canlı AI Deneyim Alanı</span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-emerald-700/60" aria-hidden="true" />
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#1b1b1b] sm:text-4xl lg:text-5xl">
            Yapay Zeka Fatura Taramayı{" "}
            <span className="text-emerald-700">Şimdi Kendiniz Test Edin</span>
          </h2>
          <p className="mt-4 text-base text-[#1b1b1b]/70 sm:text-lg">
            <span className="hidden lg:inline">Soldaki</span>
            <span className="lg:hidden">Aşağıdaki</span> karmaşık e-Arşiv faturayı yapay zekaya taratın; 1.5 saniyede
            tedarikçi, KDV dahil birim maliyet ve stok eşleşmelerinin nasıl
            otomatik oluştuğunu görün.
          </p>

          {/* Sample Switcher */}
          <div className="mt-6 inline-flex rounded-2xl border border-[#1b1b1b]/12 bg-white/75 p-1 shadow-sm">
            {siteConfig.aiInvoiceSamples.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => handleSelectSample(idx)}
                className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all sm:text-sm ${
                  sampleIndex === idx
                    ? "bg-[#1b1b1b] text-[#eeede9] shadow-sm"
                    : "text-[#1b1b1b]/70 hover:text-[#1b1b1b]"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3-Part Interactive Sandbox */}
        <div className="mt-10 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12">
          {/* LEFT: Raw e-Arşiv Invoice Document */}
          <div className="relative overflow-hidden rounded-3xl border border-white/12 bg-stone-900/90 p-5 shadow-2xl lg:col-span-5">
            {/* Laser Scan Beam */}
            {scanState === "scanning" && (
              <div
                aria-hidden="true"
                className="animate-laser-scan pointer-events-none absolute inset-x-0 z-20 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_25px_6px_rgba(52,211,153,0.75)]"
              />
            )}

            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-stone-400" aria-hidden="true" />
                <span className="font-mono text-xs font-semibold text-stone-200">
                  GİB e-Arşiv Fatura (PDF / Fotoğraf)
                </span>
              </div>
              <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-[10px] text-stone-300">
                {sample.invoiceNo}
              </span>
            </div>

            {/* Paper-like Invoice Body */}
            <div className="mt-4 rounded-2xl border border-stone-700/60 bg-stone-950/90 p-4 font-mono text-[11px] text-stone-300">
              <div className="flex flex-wrap items-start justify-between gap-2 border-b border-dashed border-stone-700 pb-3">
                <div>
                  <p className="font-bold text-white">{sample.supplier}</p>
                  <p className="mt-0.5 text-[10px] text-stone-400">
                    {sample.taxNo}
                  </p>
                </div>
                <div className="text-right text-[10px] text-stone-400">
                  <p>Tarih: {sample.invoiceDate}</p>
                  <p>Senaryo: TİCARİFATURA</p>
                </div>
              </div>

              <div className="mt-3 space-y-2.5">
                <div className="grid grid-cols-12 text-[10px] font-semibold uppercase text-stone-500">
                  <span className="col-span-6">Mal / Hizmet Açıklaması</span>
                  <span className="col-span-2 text-right">Miktar</span>
                  <span className="col-span-2 text-right">KDV</span>
                  <span className="col-span-2 text-right">Tutar</span>
                </div>
                {sample.items.map((item) => (
                  <div
                    key={item.rawText}
                    className={`grid grid-cols-12 items-center gap-1 rounded-lg px-1.5 py-1.5 transition-colors ${
                      scanState === "scanning"
                        ? "bg-emerald-500/10 text-emerald-200"
                        : "bg-white/[0.02]"
                    }`}
                  >
                    <span className="col-span-6 truncate text-[10px]">
                      {item.rawText}
                    </span>
                    <span className="col-span-2 text-right text-[10px] text-stone-400">
                      {item.quantity.split(" ")[0]}
                    </span>
                    <span className="col-span-2 text-right text-[10px] text-amber-300">
                      %{item.vatRate}
                    </span>
                    <span className="col-span-2 text-right text-[10px] text-stone-200">
                      {Math.round(item.lineTotal).toLocaleString("tr-TR")}₺
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-dashed border-stone-700 pt-3 text-xs font-bold text-white">
                <span>ÖDENECEK TUTAR (KDV DAHİL)</span>
                <span>{formatTL(grandTotal)}</span>
              </div>
            </div>

            {/* Action Button Bar */}
            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={handleScan}
                disabled={scanState === "scanning"}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3.5 text-sm font-bold text-stone-950 shadow-lg shadow-emerald-500/25 transition-all duration-200 hover:bg-emerald-400 disabled:cursor-wait disabled:opacity-75"
              >
                {scanState === "scanning" ? (
                  <>
                    <ScanLine
                      className="h-4 w-4 animate-pulse"
                      aria-hidden="true"
                    />
                    <span>Yapay Zeka Okuyor...</span>
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4" aria-hidden="true" />
                    <span>Yapay Zeka İle Faturayı Tara (Test Et)</span>
                  </>
                )}
              </button>

              {scanState === "done" && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center justify-center gap-1.5 rounded-2xl border border-white/15 bg-white/5 px-4 py-3.5 text-xs font-semibold text-stone-200 transition-colors hover:bg-white/10"
                  aria-label="Simülasyonu Sıfırla"
                >
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                  Sıfırla
                </button>
              )}
            </div>
          </div>

          {/* RIGHT: Structured ERP Output Table */}
          <div className="flex flex-col justify-between rounded-3xl border border-white/12 bg-slate-950/90 p-5 shadow-2xl lg:col-span-7">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles
                    className="h-4 w-4 text-emerald-400"
                    aria-hidden="true"
                  />
                  <span className="text-sm font-semibold text-white">
                    ERP Stok &amp; Maliyet Çıktısı
                  </span>
                </div>

                {scanState === "done" ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-3 py-1 font-mono text-xs font-semibold text-emerald-300">
                    <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                    Güven: {sample.confidence} • {sample.durationSec}
                  </span>
                ) : (
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-stone-400">
                    {scanState === "scanning"
                      ? "İşleniyor..."
                      : "Taramayı Başlatın"}
                  </span>
                )}
              </div>

              {/* Idle State */}
              {scanState === "idle" && (
                <div className="flex min-h-[290px] flex-col items-center justify-center text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-500/25 bg-emerald-500/10 text-emerald-400">
                    <ScanLine className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <p className="mt-4 text-base font-semibold text-white">
                    Fatura taranmayı bekliyor
                  </p>
                  <p className="mt-1.5 max-w-sm text-sm text-stone-400">
                    <span className="hidden lg:inline">Soldaki</span>
                    <span className="lg:hidden">Yukarıdaki</span>{" "}
                    <strong className="text-emerald-300">
                      &ldquo;Yapay Zeka İle Faturayı Tara&rdquo;
                    </strong>{" "}
                    butonuna tıklayın ve tüm kalemlerin saniyeler içinde nasıl
                    stoka dönüştüğünü izleyin.
                  </p>
                </div>
              )}

              {/* Scanning State */}
              {scanState === "scanning" && (
                <div
                  role="status"
                  aria-live="polite"
                  className="flex min-h-[290px] flex-col items-center justify-center text-center"
                >
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-400/40 bg-emerald-500/15">
                    <Sparkles
                      className="h-7 w-7 animate-spin text-emerald-300"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="mt-4 font-mono text-sm font-semibold text-emerald-300">
                    {stepLabels[scanStep]}
                  </p>
                  <div className="mt-4 h-2 w-64 overflow-hidden rounded-full bg-white/10">
                    <div
                      style={{ width: `${scanStep * 33}%` }}
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-300 transition-all duration-300"
                    />
                  </div>
                </div>
              )}

              {/* Done State */}
              {scanState === "done" && (
                <div role="status" aria-live="polite" className="mt-4 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-xs">
                    <div>
                      <p className="text-stone-400">Tedarikçi Cari Eşleşmesi</p>
                      <p className="font-semibold text-white">
                        {sample.supplier}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-stone-400">Toplam Fatura</p>
                      <p className="font-mono text-sm font-bold text-emerald-300">
                        {formatTL(grandTotal)}
                      </p>
                    </div>
                  </div>

                  {/* Extracted Table */}
                  <div className="overflow-x-auto rounded-2xl border border-white/10">
                    <table className="w-full min-w-[480px] text-left text-xs">
                      <thead className="border-b border-white/10 bg-white/[0.04] text-[11px] uppercase text-stone-400">
                        <tr>
                          <th className="px-3.5 py-2.5">Stok Kartı</th>
                          <th className="px-3 py-2.5">Miktar</th>
                          <th className="px-3 py-2.5">KDV Dahil Birim</th>
                          <th className="px-3 py-2.5 text-right">Durum</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {sample.items.map((item) => (
                          <tr
                            key={item.matchedProduct}
                            className="bg-white/[0.015] transition-colors hover:bg-white/[0.04]"
                          >
                            <td className="px-3.5 py-3 font-medium text-white">
                              {item.matchedProduct}
                              <span className="block font-mono text-[10px] text-stone-500">
                                KDV %{item.vatRate} dahil
                              </span>
                            </td>
                            <td className="px-3 py-3 font-mono text-stone-300">
                              {item.quantity}
                            </td>
                            <td className="px-3 py-3 font-mono font-semibold text-emerald-300">
                              {formatTL(item.vatIncludedUnitCost)}
                            </td>
                            <td className="px-3 py-3 text-right">
                              <span
                                className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                                  item.stockStatus === "Eşleşti"
                                    ? "bg-emerald-500/15 text-emerald-300"
                                    : "bg-amber-500/15 text-amber-300"
                                }`}
                              >
                                {item.stockStatus}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-3.5 text-xs text-stone-400">
              <span>
                PDF, e-Arşiv HTML veya cep telefonu kamera fotoğrafı desteklenir.
              </span>
              <span className="font-mono text-emerald-400">
                Stok + Cari + Ortalama Maliyet Tek Tıkla
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
