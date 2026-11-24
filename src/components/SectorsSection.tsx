"use client";

import {
  ArrowRight,
  Clock,
  Hammer,
  Pill,
  ShoppingBag,
  Sprout,
  Stethoscope,
  Wrench,
} from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const sectorIcons = [
  Wrench,
  Sprout,
  Hammer,
  Stethoscope,
  ShoppingBag,
  Pill,
];

interface SectorsSectionProps {
  onSelectSector?: (sectorName: string) => void;
}

export function SectorsSection({ onSelectSector }: SectorsSectionProps) {
  return (
    <section className="relative border-b border-[#1b1b1b]/10 bg-[#eeede9] py-20 sm:py-28">
      <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-800">
              <span className="h-[2px] w-6 rounded-full bg-emerald-700" aria-hidden="true" />
              <span>Terzi İşi Sektörel Çözümler</span>
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#1b1b1b] sm:text-4xl lg:text-5xl">
              Sizin Sektörünüz Hangisi?
            </h2>
            <p className="mt-3 text-base text-[#1b1b1b]/70 sm:text-lg">
              Listede olmasa bile iş akışınızı dinliyor, ihtiyacınız olan tüm
              cari, stok, fatura ve randevu modüllerini size özel kurguluyoruz.
            </p>
          </div>

          <div className="inline-flex items-center gap-3 rounded-2xl border border-amber-700/20 bg-white/85 px-4 py-3 text-sm text-[#1b1b1b] shadow-sm">
            <Clock className="h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
            <span>
              <strong>7 iş gününde</strong> teslim
            </span>
          </div>
        </div>

        {/* Sector Cards */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.sectorsData.map((sector, idx) => {
            const Icon = sectorIcons[idx % sectorIcons.length];
            return (
              <div
                key={sector.name}
                className="group flex flex-col justify-between rounded-3xl border border-[#1b1b1b]/10 bg-white/80 p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-700/35 hover:bg-white hover:shadow-lg hover:shadow-[#1b1b1b]/5"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#1b1b1b]/10 bg-[#eeede9] text-emerald-700 transition-colors group-hover:border-emerald-700/30 group-hover:bg-emerald-600/10">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="rounded-full border border-[#1b1b1b]/10 bg-[#eeede9] px-2.5 py-1 text-[11px] font-semibold text-[#1b1b1b]/75">
                      {sector.tag}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-[#1b1b1b]">
                    {sector.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#1b1b1b]/70">
                    {sector.desc}
                  </p>
                </div>

                <a
                  href="#iletisim"
                  onClick={() => onSelectSector?.(sector.name)}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 transition-colors hover:text-emerald-900"
                >
                  <span>Bu sektör için teklif al</span>
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
