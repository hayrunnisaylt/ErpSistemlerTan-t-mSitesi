"use client";

import { useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  CalendarClock,
  Check,
  CheckCircle2,
  ExternalLink,
  HeartPulse,
  Mail,
  MessageCircle,
  Package,
  PawPrint,
  Plus,
  RefreshCw,
  ShieldAlert,
  Sparkles,
  Syringe,
  TrendingDown,
  Wallet,
} from "lucide-react";
import { siteConfig, type PortfolioItem } from "@/lib/site-config";

const tabIcons = {
  toptanci: Package,
  veteriner: PawPrint,
  fizyoterapi: HeartPulse,
};

const accentStyles = {
  emerald: {
    activeTab:
      "border-emerald-700/40 bg-[#1b1b1b] text-white shadow-xl shadow-[#1b1b1b]/15",
    badge: "border-emerald-700/25 bg-emerald-600/10 text-emerald-800",
    button: "bg-[#1b1b1b] hover:bg-emerald-700 text-white",
    iconBox: "bg-emerald-500/20 text-emerald-400 border-emerald-400/30",
    glow: "from-emerald-500/5 via-white/90 to-white/90",
  },
  teal: {
    activeTab:
      "border-teal-700/40 bg-[#1b1b1b] text-white shadow-xl shadow-[#1b1b1b]/15",
    badge: "border-teal-700/25 bg-teal-600/10 text-teal-800",
    button: "bg-[#1b1b1b] hover:bg-teal-700 text-white",
    iconBox: "bg-teal-500/20 text-teal-300 border-teal-400/30",
    glow: "from-teal-500/5 via-white/90 to-white/90",
  },
  amber: {
    activeTab:
      "border-amber-700/40 bg-[#1b1b1b] text-white shadow-xl shadow-[#1b1b1b]/15",
    badge: "border-amber-700/25 bg-amber-600/10 text-amber-800",
    button: "bg-[#1b1b1b] hover:bg-amber-700 text-white",
    iconBox: "bg-amber-500/20 text-amber-300 border-amber-400/30",
    glow: "from-amber-500/5 via-white/90 to-white/90",
  },
};

/* ============================================================================
   SIMULATOR 1: TOPTANCI & GIDA DAĞITIM ERP
============================================================================ */
function ToptanciSimulator() {
  const [selectedCashTab, setSelectedCashTab] = useState<"isletme" | "sahsi">(
    "isletme"
  );

  return (
    <div className="space-y-4">
      {/* Top KPI Row */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-3.5">
          <p className="text-[11px] font-medium text-emerald-300">
            Depo Stok Değeri
          </p>
          <p className="mt-1 font-mono text-xl font-bold text-white">
            ₺1.248.400
          </p>
          <p className="mt-0.5 text-[11px] text-emerald-300/80">
            42 Aktif SKU • Güncel Maliyet
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-medium text-stone-300">
              Cebimdeki Para
            </p>
            <div className="flex gap-1 rounded-md bg-stone-950 p-0.5 text-[10px]">
              <button
                type="button"
                onClick={() => setSelectedCashTab("isletme")}
                className={`rounded px-1.5 py-0.5 ${
                  selectedCashTab === "isletme"
                    ? "bg-emerald-500 font-semibold text-stone-950"
                    : "text-stone-400"
                }`}
              >
                Kasa
              </button>
              <button
                type="button"
                onClick={() => setSelectedCashTab("sahsi")}
                className={`rounded px-1.5 py-0.5 ${
                  selectedCashTab === "sahsi"
                    ? "bg-amber-400 font-semibold text-stone-950"
                    : "text-stone-400"
                }`}
              >
                Şahsi
              </button>
            </div>
          </div>
          <p className="mt-1 font-mono text-xl font-bold text-white">
            {selectedCashTab === "isletme" ? "₺312.850" : "₺18.400"}
          </p>
          <p className="mt-0.5 text-[11px] text-stone-400">
            {selectedCashTab === "isletme"
              ? "İşletme net nakit & banka"
              : "Ayrıştırılmış emanet/şahsi borç"}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5">
          <p className="text-[11px] font-medium text-stone-300">
            Açık Veresiye Alacak
          </p>
          <p className="mt-1 font-mono text-xl font-bold text-amber-300">
            ₺264.900
          </p>
          <p className="mt-0.5 text-[11px] text-stone-400">
            14 Market / Bayi • 3 Vadesi Yakın
          </p>
        </div>
      </div>

      {/* AI Invoice Line Matching Preview */}
      <div className="rounded-2xl border border-white/10 bg-stone-900/70 p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-emerald-400" aria-hidden="true" />
            <span className="text-xs font-semibold text-white">
              AI Fatura Satır Eşleştirme &amp; Maliyet Motoru
            </span>
          </div>
          <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-emerald-300">
            GIB2026..48192 • 2.1 sn
          </span>
        </div>

        <div className="space-y-2 text-xs">
          {[
            {
              raw: "L BOY GEZEN YUMURTA 30'LU",
              matched: "L Boy Yumurta (30 Viyol)",
              qty: "120 Adet",
              cost: "₺140,00 (KDV Dahil)",
              avg: "Yeni Ort: ₺136,40",
            },
            {
              raw: "SADE MADEN SUYU 24X200",
              matched: "Doğal Maden Suyu Kasa",
              qty: "45 Kasa",
              cost: "₺130,00 (KDV Dahil)",
              avg: "Yeni Ort: ₺127,80",
            },
          ].map((row) => (
            <div
              key={row.raw}
              className="grid grid-cols-1 gap-2 rounded-xl border border-white/5 bg-white/[0.03] p-2.5 sm:grid-cols-12 sm:items-center"
            >
              <div className="sm:col-span-5">
                <p className="font-mono text-[10px] text-stone-500 line-through">
                  {row.raw}
                </p>
                <p className="font-medium text-stone-100">{row.matched}</p>
              </div>
              <div className="font-mono text-stone-300 sm:col-span-2">
                {row.qty}
              </div>
              <div className="font-mono text-emerald-300 sm:col-span-3">
                {row.cost}
              </div>
              <div className="text-right font-mono text-[11px] text-amber-300 sm:col-span-2">
                {row.avg}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Ledgers */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <div className="mb-2.5 flex items-center justify-between">
          <span className="text-xs font-semibold text-stone-200">
            Müşteri Cari Bakiyeleri
          </span>
          <span className="text-[11px] text-stone-400">
            Özel fiyat listesi aktif
          </span>
        </div>
        <div className="divide-y divide-white/5 text-xs">
          {[
            {
              name: "Özlem Şarküteri & Market",
              tier: "Toptan A",
              balance: "₺42.600",
              status: "Bugün Tahsilat",
            },
            {
              name: "Bereketoğlu Fırın & Unlu Mam.",
              tier: "Özel Fiyat",
              balance: "₺28.150",
              status: "7 Gün Vade",
            },
            {
              name: "Kardeşler Büfe Zinciri",
              tier: "Toptan B",
              balance: "₺14.800",
              status: "Güncel",
            },
          ].map((c) => (
            <div
              key={c.name}
              className="flex items-center justify-between py-2 first:pt-0 last:pb-0"
            >
              <div>
                <p className="font-medium text-stone-100">{c.name}</p>
                <p className="text-[11px] text-stone-400">
                  {c.tier} • {c.status}
                </p>
              </div>
              <span className="font-mono font-semibold text-white">
                {c.balance}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   SIMULATOR 2: VETERİNER KLİNİĞİ & ECZA / PETSHOP ERP
============================================================================ */
function VeterinerSimulator() {
  const [remindedIds, setRemindedIds] = useState<string[]>([]);

  const handleRemind = (id: string) => {
    setRemindedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const vaccines = [
    {
      id: "v1",
      pet: "Pamuk (British Shorthair)",
      owner: "Selin Kaya",
      tag: "Çip: 900182004912",
      vaccine: "Kuduz + Karma Aşı",
      due: "Yarın",
    },
    {
      id: "v2",
      pet: "Simental Düve #42",
      owner: "Yılmaz Besi Çiftliği",
      tag: "Küpe: TR-42-88412",
      vaccine: "Şap & Parazit Tekrarı",
      due: "2 Gün Kaldı",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Upcoming Vaccines with working WhatsApp preview button */}
      <div className="rounded-2xl border border-teal-500/25 bg-teal-500/10 p-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Syringe className="h-4 w-4 text-teal-300" aria-hidden="true" />
            <span className="text-xs font-semibold text-white">
              Yaklaşan Aşı &amp; Parazit Takvimi
            </span>
          </div>
          <span className="rounded-full bg-teal-500/20 px-2.5 py-0.5 text-[10px] font-semibold text-teal-200">
            Tek Tıkla WhatsApp
          </span>
        </div>

        <div className="space-y-2.5">
          {vaccines.map((v) => {
            const sent = remindedIds.includes(v.id);
            return (
              <div
                key={v.id}
                className="flex flex-col justify-between gap-2.5 rounded-xl border border-white/10 bg-stone-950/75 p-3 sm:flex-row sm:items-center"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-semibold text-white">{v.pet}</p>
                    <span className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[10px] text-stone-300">
                      {v.tag}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[11px] text-stone-400">
                    Sahibi: {v.owner} •{" "}
                    <span className="text-teal-300">{v.vaccine}</span> ({v.due})
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemind(v.id)}
                  className={`inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-semibold transition-all ${
                    sent
                      ? "bg-emerald-500/20 text-emerald-300"
                      : "bg-teal-400 text-stone-950 hover:bg-teal-300"
                  }`}
                >
                  {sent ? (
                    <>
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                      Mesaj Hazırlandı
                    </>
                  ) : (
                    <>
                      <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                      Hatırlat
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom 2 columns: Farm Ledger & Critical Pharmacy Stock */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="mb-2.5 flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-200">
              Çiftlik Veresiye Carisi
            </span>
            <Wallet className="h-3.5 w-3.5 text-teal-400" aria-hidden="true" />
          </div>
          <ul className="space-y-2 text-xs">
            <li className="flex items-center justify-between rounded-lg bg-white/[0.03] px-2.5 py-2">
              <span className="text-stone-200">Yılmaz Besi Çiftliği</span>
              <span className="font-mono font-semibold text-amber-300">
                ₺38.450
              </span>
            </li>
            <li className="flex items-center justify-between rounded-lg bg-white/[0.03] px-2.5 py-2">
              <span className="text-stone-200">Karadağ Süt İşletmesi</span>
              <span className="font-mono font-semibold text-white">
                ₺19.200
              </span>
            </li>
            <li className="flex items-center justify-between rounded-lg bg-white/[0.03] px-2.5 py-2">
              <span className="text-stone-200">Bozkurt Hayvancılık</span>
              <span className="font-mono font-semibold text-emerald-400">
                Ödendi
              </span>
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="mb-2.5 flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-200">
              Ecza &amp; Aşı Kritik Stok
            </span>
            <ShieldAlert
              className="h-3.5 w-3.5 text-amber-400"
              aria-hidden="true"
            />
          </div>
          <ul className="space-y-2 text-xs">
            <li className="flex items-center justify-between rounded-lg border border-rose-500/20 bg-rose-500/10 px-2.5 py-2">
              <span className="text-stone-100">Köpek Karma (DHPPi+L)</span>
              <span className="font-mono font-semibold text-rose-300">
                4 Doz Kaldı
              </span>
            </li>
            <li className="flex items-center justify-between rounded-lg border border-amber-500/20 bg-amber-500/10 px-2.5 py-2">
              <span className="text-stone-100">Kedi Parazit Damla</span>
              <span className="font-mono font-semibold text-amber-300">
                6 Kutu
              </span>
            </li>
            <li className="flex items-center justify-between rounded-lg bg-white/[0.03] px-2.5 py-2">
              <span className="text-stone-200">Oksitetrasiklin 100ml</span>
              <span className="font-mono font-semibold text-emerald-400">
                28 Şişe
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   SIMULATOR 3: FİZYOTERAPİ & KLİNİK PİLATES SİSTEMİ
============================================================================ */
function FizyoterapiSimulator() {
  const [clients, setClients] = useState([
    {
      id: "c1",
      name: "Ayşe Demir",
      pkg: "10'lu Bel Fıtığı & Manuel Terapi",
      completed: 7,
      total: 10,
      remainingDebt: "₺2.500 Taksit",
      vasStart: 8,
      vasNow: 2,
      time: "14:00",
    },
    {
      id: "c2",
      name: "Murat Aksoy",
      pkg: "10'lu Klinik Pilates Paketi",
      completed: 8,
      total: 10,
      remainingDebt: "Ödendi",
      vasStart: 7,
      vasNow: 2,
      time: "15:30",
    },
  ]);

  const incrementSession = (id: string) => {
    setClients((prev) =>
      prev.map((c) =>
        c.id === id && c.completed < c.total
          ? { ...c, completed: c.completed + 1 }
          : c
      )
    );
  };

  const resetSessions = () => {
    setClients((prev) =>
      prev.map((c, idx) => ({ ...c, completed: idx === 0 ? 7 : 8 }))
    );
  };

  return (
    <div className="space-y-4">
      {/* Interactive Session Package Counter */}
      <div className="rounded-2xl border border-amber-500/25 bg-amber-500/10 p-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarClock
              className="h-4 w-4 text-amber-300"
              aria-hidden="true"
            />
            <span className="text-xs font-semibold text-white">
              Bugünün Seansları &amp; Akıllı Paket Sayacı
            </span>
          </div>
          <button
            type="button"
            onClick={resetSessions}
            className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] text-amber-200/80 transition-colors hover:bg-white/10 hover:text-white"
            title="Sayaçları Sıfırla"
          >
            <RefreshCw className="h-3 w-3" aria-hidden="true" />
            Sıfırla
          </button>
        </div>

        <div className="space-y-3">
          {clients.map((client) => {
            const left = client.total - client.completed;
            const pct = Math.round((client.completed / client.total) * 100);
            const isLow = left <= 2 && left > 0;
            const isDone = left === 0;

            return (
              <div
                key={client.id}
                className="rounded-xl border border-white/10 bg-stone-950/80 p-3.5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] text-amber-300">
                        {client.time}
                      </span>
                      <p className="text-xs font-semibold text-white">
                        {client.name}
                      </p>
                      {isLow && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-semibold text-amber-300">
                          <AlertTriangle className="h-3 w-3" aria-hidden="true" />
                          Son {left} Seans!
                        </span>
                      )}
                      {isDone && (
                        <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                          Paket Tamamlandı
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-[11px] text-stone-400">
                      {client.pkg} • Kalan Borç:{" "}
                      <span className="text-stone-200">
                        {client.remainingDebt}
                      </span>
                    </p>
                  </div>

                  <button
                    type="button"
                    disabled={isDone}
                    onClick={() => incrementSession(client.id)}
                    className="inline-flex items-center gap-1 rounded-lg bg-amber-400 px-3 py-1.5 text-[11px] font-semibold text-stone-950 transition-all hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                    Seansa Geldi
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="mt-3">
                  <div className="mb-1 flex items-center justify-between text-[11px]">
                    <span className="font-medium text-stone-300">
                      {client.completed}/{client.total} Seans Tamamlandı
                    </span>
                    <span className="font-mono text-amber-300">%{pct}</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      style={{ width: `${pct}%` }}
                      className="h-full rounded-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-300"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* VAS Pain Score & Cash Summary */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-200">
              VAS Ağrı Skoru Gelişimi
            </span>
            <TrendingDown
              className="h-4 w-4 text-emerald-400"
              aria-hidden="true"
            />
          </div>
          <p className="mt-1 text-[11px] text-stone-400">
            Ayşe Demir • 7. Seans Sonu
          </p>
          <div className="mt-3 flex items-center gap-3">
            <div className="flex-1 rounded-xl border border-rose-500/20 bg-rose-500/10 p-2.5 text-center">
              <p className="text-[10px] text-rose-300">İlk Geliş</p>
              <p className="font-mono text-xl font-bold text-rose-200">8/10</p>
            </div>
            <ArrowUpRight
              className="h-4 w-4 rotate-45 text-stone-500"
              aria-hidden="true"
            />
            <div className="flex-1 rounded-xl border border-emerald-500/25 bg-emerald-500/15 p-2.5 text-center">
              <p className="text-[10px] text-emerald-300">Güncel Ağrı</p>
              <p className="font-mono text-xl font-bold text-emerald-300">
                2/10
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-200">
                Günlük Klinik Kasa
              </span>
              <Activity
                className="h-4 w-4 text-amber-400"
                aria-hidden="true"
              />
            </div>
            <p className="mt-2 font-mono text-2xl font-bold text-white">
              ₺24.600
            </p>
            <p className="text-[11px] text-stone-400">
              Bugün 9 Seans • 4 Taksit Tahsilatı
            </p>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-2.5 text-[11px]">
            <span className="text-stone-400">Bekleyen Taksitler</span>
            <span className="font-mono font-semibold text-amber-300">
              ₺18.500
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PortfolioShowcase() {
  const [activeId, setActiveId] = useState<PortfolioItem["id"]>("toptanci");
  const activeItem =
    siteConfig.portfolioData.find((item) => item.id === activeId) ??
    siteConfig.portfolioData[0];
  const styles = accentStyles[activeItem.accent];

  return (
    <section
      id="vitrin"
      className="relative scroll-mt-20 border-b border-[#1b1b1b]/10 bg-[#eeede9] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-10">
        {/* Section Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-800">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-emerald-700/60" aria-hidden="true" />
            <span>Canlı Sistem Vitrini</span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-emerald-700/60" aria-hidden="true" />
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#1b1b1b] sm:text-4xl lg:text-5xl">
            Gerçek İşletmeler İçin Geliştirdiğimiz Sistemleri{" "}
            <span className="text-emerald-700">Canlı İnceleyin</span>
          </h2>
          <p className="mt-4 text-base text-[#1b1b1b]/70 sm:text-lg">
            Aşağıdaki sektörlerden birini seçin; gerçek ekran simülasyonunu
            tıklayarak test edin, çözülen problemleri ve öne çıkan modülleri
            görün.
          </p>
        </div>

        {/* 3 Large Sector Tabs */}
        <div
          role="tablist"
          aria-label="Sektörel Örnek Sistemler"
          className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-3"
        >
          {siteConfig.portfolioData.map((item) => {
            const Icon = tabIcons[item.id];
            const isActive = item.id === activeId;
            const itemStyles = accentStyles[item.accent];
            return (
              <button
                key={item.id}
                role="tab"
                type="button"
                id={`tab-${item.id}`}
                aria-selected={isActive}
                aria-controls={`panel-${item.id}`}
                onClick={() => setActiveId(item.id)}
                className={`group flex items-center gap-3.5 rounded-2xl border p-4 text-left transition-all duration-300 ${
                  isActive
                    ? itemStyles.activeTab
                    : "border-[#1b1b1b]/12 bg-white/70 text-[#1b1b1b] hover:border-[#1b1b1b]/25 hover:bg-white"
                }`}
              >
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-105 ${
                    isActive
                      ? itemStyles.iconBox
                      : "border-[#1b1b1b]/10 bg-[#eeede9] text-[#1b1b1b]/70"
                  }`}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p
                    className={`text-xs font-medium ${
                      isActive ? "text-stone-300" : "text-[#1b1b1b]/60"
                    }`}
                  >
                    {item.badge}
                  </p>
                  <p
                    className={`truncate text-sm font-bold sm:text-base ${
                      isActive ? "text-white" : "text-[#1b1b1b]"
                    }`}
                  >
                    {item.tabLabel}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Tab Panel */}
        <div
          role="tabpanel"
          id={`panel-${activeItem.id}`}
          aria-labelledby={`tab-${activeItem.id}`}
          className={`relative mt-8 overflow-clip rounded-3xl border border-[#1b1b1b]/12 bg-gradient-to-br ${styles.glow} p-5 shadow-xl shadow-[#1b1b1b]/5 sm:p-8`}
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
            {/* Left Info Column */}
            <div className="space-y-5 lg:col-span-5">
              <div>
                <span
                  className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${styles.badge}`}
                >
                  {activeItem.badge}
                </span>
                <h3 className="mt-3 text-2xl font-bold text-[#1b1b1b] sm:text-3xl">
                  {activeItem.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#1b1b1b]/75 sm:text-base">
                  &ldquo;{activeItem.story}&rdquo;
                </p>
              </div>

              {/* Solved Problems */}
              <div className="rounded-2xl border border-[#1b1b1b]/10 bg-[#eeede9]/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#1b1b1b]/60">
                  Çözülen Temel Problemler
                </p>
                <ul className="mt-2.5 space-y-2 text-sm text-[#1b1b1b]/85">
                  {activeItem.solvedProblems.map((prob) => (
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

              {/* Key Features */}
              <div className="space-y-2.5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#1b1b1b]/60">
                  Öne Çıkan Modüller
                </p>
                {activeItem.keyFeatures.map((feat, idx) => (
                  <div
                    key={feat.title}
                    className="rounded-2xl border border-[#1b1b1b]/10 bg-white/80 p-4 transition-colors hover:border-[#1b1b1b]/20"
                  >
                    <div className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#1b1b1b] font-mono text-[11px] font-bold text-[#eeede9]">
                        {idx + 1}
                      </span>
                      <h4 className="text-sm font-bold text-[#1b1b1b]">
                        {feat.title}
                      </h4>
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-[#1b1b1b]/70 sm:text-sm">
                      {feat.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Interactive Live UI Mockup + Metrics + Demo CTA Column */}
            <div className="space-y-4 lg:sticky lg:top-24 lg:col-span-7">
              <div className="overflow-hidden rounded-3xl border border-white/12 bg-stone-950 shadow-2xl">
                {/* Simulator Window Topbar */}
                <div className="flex items-center justify-between border-b border-white/10 bg-stone-900/90 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 font-mono text-[11px] text-stone-400">
                      {activeItem.shortLabel} • Canlı Önizleme
                    </span>
                  </div>
                  <span className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-300">
                    İnteraktif Simülasyon
                  </span>
                </div>

                {/* Live Simulator Body */}
                <div className="p-4 sm:p-5">
                  {activeItem.id === "toptanci" && <ToptanciSimulator />}
                  {activeItem.id === "veteriner" && <VeterinerSimulator />}
                  {activeItem.id === "fizyoterapi" && <FizyoterapiSimulator />}
                </div>
              </div>

              {/* Metrics Strip below Simulator */}
              <div className="grid grid-cols-3 gap-3">
                {activeItem.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-2xl border border-[#1b1b1b]/10 bg-[#eeede9]/80 p-3.5"
                  >
                    <p className="font-mono text-lg font-bold text-[#1b1b1b] sm:text-xl">
                      {m.value}
                    </p>
                    <p className="mt-0.5 text-xs font-semibold text-[#1b1b1b]/80">
                      {m.label}
                    </p>
                    <p className="text-[11px] text-[#1b1b1b]/55">{m.sub}</p>
                  </div>
                ))}
              </div>

              {/* Demo CTA Card below Metrics */}
              <div className="flex flex-col gap-3 rounded-2xl border border-[#1b1b1b]/15 bg-[#eeede9]/90 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-bold text-[#1b1b1b]">
                    Bu sistemi canlı denemek ister misiniz?
                  </p>
                  <p className="text-xs text-[#1b1b1b]/65">
                    Kendi verilerinizle 15 dakikalık demo kuralım.
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <a
                    href={activeItem.demoUrl}
                    className={`inline-flex items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all ${styles.button}`}
                  >
                    <span>Demoyu Aç</span>
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                  <a
                    href={`mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
                      `${activeItem.title} — Canlı Demo Talebi`
                    )}`}
                    className="inline-flex items-center justify-center rounded-xl border border-[#1b1b1b]/15 bg-white px-3 py-2.5 text-xs font-medium text-[#1b1b1b] transition-colors hover:bg-emerald-50"
                    aria-label={`${activeItem.shortLabel} için e-posta gönder`}
                  >
                    <Mail
                      className="h-4 w-4 text-emerald-700"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
