"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  Calendar,
  CheckCircle2,
  ClipboardList,
  CreditCard,
  FileText,
  Layers,
  LayoutDashboard,
  Package,
  PawPrint,
  Receipt,
  ScanLine,
  Settings,
  ShoppingCart,
  Sparkles,
  Stethoscope,
  Users,
  Wallet,
} from "lucide-react";

/* ============================================================================
   VIRTUAL ANIMATED CURSOR (Simulates real user clicking through the ERP)
============================================================================ */
interface VirtualCursorProps {
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  clicking: boolean;
  label?: string;
}

function VirtualCursor({ x, y, clicking, label }: VirtualCursorProps) {
  return (
    <div
      aria-hidden="true"
      style={{ left: `${x}%`, top: `${y}%` }}
      className="pointer-events-none absolute z-30 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
    >
      {clicking && (
        <span className="animate-cursor-ring absolute left-1 top-1 h-7 w-7 rounded-full border-2 border-emerald-500 bg-emerald-400/20" />
      )}
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        className={`drop-shadow-[0_3px_6px_rgba(0,0,0,0.35)] transition-transform duration-150 ${
          clicking ? "scale-90" : "scale-100"
        }`}
      >
        <path
          d="M4.5 3.5L19.5 11.2L12.6 13.1L9.6 19.8L4.5 3.5Z"
          fill="#1b1b1b"
          stroke="#ffffff"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
      {label && (
        <span className="ml-3 mt-0.5 inline-block whitespace-nowrap rounded-md bg-[#1b1b1b]/90 px-2 py-0.5 text-[9px] font-semibold text-white shadow-md">
          {label}
        </span>
      )}
    </div>
  );
}

/* ============================================================================
   DEMO 1: YOLTAN GIDA — TOPTANCI & DAĞITIM ERP (Matches user's burgundy/white UI)
============================================================================ */
export function ToptanciLiveDemo({ offsetMs = 0 }: { offsetMs?: number }) {
  // Steps:
  // 0: Overview -> cursor moves to "+ Yeni satış"
  // 1: Click "+ Yeni satış" -> opens modal & fills Çağrı Fırın / 40 Viyol
  // 2: Click "Satışı Kaydet" -> overview updates (+₺5.600,00) + toast
  // 3: Cursor moves to sidebar "Alışlar" & clicks -> AI Invoice scan screen
  const [step, setStep] = useState(0);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null;
    const startTimeout = setTimeout(() => {
      intervalId = setInterval(() => {
        setClicking(true);
        setTimeout(() => setClicking(false), 320);
        setStep((prev) => (prev + 1) % 4);
      }, 2800);
    }, offsetMs);

    return () => {
      clearTimeout(startTimeout);
      if (intervalId) clearInterval(intervalId);
    };
  }, [offsetMs]);

  const cursorPos = [
    { x: 88, y: 12, label: "+ Yeni satış" },
    { x: 64, y: 74, label: "Satışı Kaydet" },
    { x: 11, y: 54, label: "Alışlar (AI)" },
    { x: 52, y: 38, label: "Stoka İşlendi ✓" },
  ][step];

  const saleAdded = step >= 2;

  return (
    <div className="relative flex h-full w-full overflow-hidden bg-[#f6f7f9] text-[#1b1b1b] select-none">
      {/* Left Sidebar (Yoltan Gıda white + burgundy style) */}
      <aside className="flex w-[112px] shrink-0 flex-col border-r border-stone-200 bg-white p-2.5 sm:w-[130px]">
        <div className="flex items-center gap-1.5">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#7c1d32] text-[10px] font-bold text-white">
            Y
          </span>
          <div className="leading-tight">
            <p className="text-[10px] font-bold text-stone-900">Yoltan Gıda</p>
            <p className="text-[8px] text-stone-400">ERP SİSTEMİ</p>
          </div>
        </div>

        <div className="mt-2.5 rounded-lg bg-[#7c1d32] px-2 py-1.5 text-center text-[9px] font-semibold text-white">
          + Yeni satış
        </div>

        <ul className="mt-2.5 space-y-1 text-[9.5px]">
          {[
            { name: "Özet", active: step !== 3 },
            { name: "Satışlar", active: false },
            { name: "Müşteriler", active: false },
            { name: "Tahsilat", active: false },
            { name: "Ürün & Stok", active: false },
            { name: "Alışlar", active: step === 3 },
            { name: "Tedarikçiler", active: false },
            { name: "Giderler", active: false },
          ].map((nav) => (
            <li
              key={nav.name}
              className={`flex items-center gap-1.5 rounded-md px-2 py-1 transition-colors ${
                nav.active
                  ? "bg-[#7c1d32]/10 font-semibold text-[#7c1d32]"
                  : "text-stone-500"
              }`}
            >
              <span
                className={`h-1 w-1 rounded-full ${
                  nav.active ? "bg-[#7c1d32]" : "bg-stone-300"
                }`}
              />
              {nav.name}
            </li>
          ))}
        </ul>

        <div className="mt-auto rounded-md bg-emerald-50 px-2 py-1 text-center text-[8px] font-semibold text-emerald-700">
          Veritabanı Yedeği İndir
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="relative flex-1 overflow-hidden p-3 sm:p-3.5">
        {step === 3 ? (
          /* AI Purchase Invoice View */
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-stone-900">
                  Alışlar &amp; AI Fatura Okuma
                </p>
                <p className="text-[9px] text-stone-400">
                  e-Arşiv PDF / Kamera ile otomatik stok girişi
                </p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-md bg-emerald-600 px-2 py-1 text-[9px] font-semibold text-white">
                <Sparkles className="h-2.5 w-2.5" /> AI Tarandı (1.4 sn)
              </span>
            </div>

            <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-2.5">
              <div className="flex items-center justify-between text-[9.5px]">
                <span className="font-bold text-emerald-950">
                  Anadolu Kümes &amp; Gıda A.Ş.
                </span>
                <span className="font-semibold text-emerald-700">
                  ₺37.300,00 (KDV Dahil)
                </span>
              </div>
              <div className="mt-2 space-y-1.5 text-[9px]">
                {[
                  ["L Boy Yumurta (30'lu)", "120 Viyol", "₺140,00"],
                  ["M Boy Yumurta (15'li)", "80 Paket", "₺65,00"],
                  ["Doğal Maden Suyu Kasa", "45 Kasa", "₺130,00"],
                ].map(([prod, qty, cost]) => (
                  <div
                    key={prod}
                    className="flex items-center justify-between rounded-lg bg-white px-2 py-1.5 shadow-2xs"
                  >
                    <span className="font-medium text-stone-800">{prod}</span>
                    <span className="text-stone-500">{qty}</span>
                    <span className="font-bold text-emerald-700">{cost}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Overview Screen */
          <div className="space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-xs font-bold text-stone-900">Özet</p>
                <p className="text-[9px] text-stone-400">25.11.2026 Çar</p>
              </div>
              <div className="flex items-center gap-1 text-[8.5px]">
                <span className="rounded-md border border-stone-200 bg-white px-1.5 py-1 font-medium text-stone-600">
                  Tahsilat gir
                </span>
                <span
                  className={`rounded-md px-2 py-1 font-semibold text-white transition-transform ${
                    step === 0
                      ? "scale-105 bg-[#7c1d32] ring-2 ring-[#7c1d32]/30"
                      : "bg-[#7c1d32]"
                  }`}
                >
                  + Yeni satış
                </span>
              </div>
            </div>

            {/* KPI Row */}
            <div className="grid grid-cols-3 gap-2">
              <div
                className={`rounded-xl border p-2 transition-colors duration-500 ${
                  saleAdded
                    ? "border-emerald-300 bg-emerald-50/70"
                    : "border-stone-200 bg-white"
                }`}
              >
                <p className="text-[8.5px] text-stone-500">Bugün satış</p>
                <p className="mt-0.5 text-[11px] font-bold text-stone-900">
                  {saleAdded ? "₺5.600,00" : "₺0,00"}
                </p>
              </div>
              <div className="rounded-xl border border-stone-200 bg-white p-2">
                <p className="text-[8.5px] text-stone-500">Bu hafta satış</p>
                <p className="mt-0.5 text-[11px] font-bold text-stone-900">
                  {saleAdded ? "₺63.348,00" : "₺57.748,00"}
                </p>
              </div>
              <div className="rounded-xl border border-stone-200 bg-white p-2">
                <p className="text-[8.5px] text-stone-500">Bu ay net kâr</p>
                <p className="mt-0.5 text-[11px] font-bold text-emerald-700">
                  {saleAdded ? "₺28.740,18" : "₺27.620,18"}
                </p>
              </div>
            </div>

            {/* Cebimdeki Para */}
            <div className="flex items-center justify-between rounded-xl border border-stone-200 bg-white px-2.5 py-2">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <Wallet className="h-3 w-3" />
                </span>
                <div>
                  <p className="text-[8px] font-semibold text-stone-400">
                    CEBİMDEKİ PARA (NET KASA)
                  </p>
                  <p className="text-xs font-bold text-emerald-800">
                    {saleAdded ? "₺51.100,00" : "₺45.500,00"}
                  </p>
                </div>
              </div>
              <span className="rounded-md bg-rose-50 px-1.5 py-0.5 text-[8px] font-semibold text-rose-700">
                Toplam Alacak: ₺633.814
              </span>
            </div>

            {/* Customers & Recent Sales */}
            <div className="grid grid-cols-2 gap-2 text-[9px]">
              <div className="rounded-xl border border-stone-200 bg-white p-2">
                <p className="mb-1 font-bold text-stone-700">
                  En çok borcu olanlar
                </p>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-stone-700">Çağrı Fırın</span>
                    <span className="font-semibold text-rose-700">
                      ₺161.923
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-700">Fatsalı</span>
                    <span className="font-semibold text-rose-700">₺60.000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-700">Aka Köfte</span>
                    <span className="font-semibold text-rose-700">₺50.150</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-stone-200 bg-white p-2">
                <p className="mb-1 font-bold text-stone-700">Son satışlar</p>
                <div className="space-y-1">
                  {saleAdded && (
                    <div className="flex justify-between rounded bg-emerald-50 px-1 py-0.5 font-semibold text-emerald-800">
                      <span>Çağrı Fırın (Yeni)</span>
                      <span>₺5.600</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-stone-700">Öz Trabzon Fırın</span>
                    <span className="font-semibold text-stone-800">₺2.800</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-700">Boğaziçi</span>
                    <span className="font-semibold text-stone-800">
                      ₺20.685
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Simulated "+ Yeni satış" Modal in Step 1 */}
        {step === 1 && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-stone-950/35 p-3 backdrop-blur-[1px]">
            <div className="w-full max-w-[235px] rounded-xl border border-stone-200 bg-white p-3 shadow-2xl">
              <div className="flex items-center justify-between border-b border-stone-100 pb-1.5">
                <span className="flex items-center gap-1 text-[10px] font-bold text-stone-900">
                  <ShoppingCart className="h-3 w-3 text-[#7c1d32]" />
                  Hızlı Satış Girişi
                </span>
                <span className="text-[8px] text-emerald-700">Otomatik Kâr</span>
              </div>
              <div className="mt-2 space-y-1.5 text-[9px]">
                <div className="rounded-md border border-stone-200 bg-stone-50 px-2 py-1">
                  <span className="text-stone-400">Müşteri: </span>
                  <strong className="text-stone-900">Çağrı Fırın</strong>
                </div>
                <div className="rounded-md border border-stone-200 bg-stone-50 px-2 py-1">
                  <span className="text-stone-400">Ürün: </span>
                  <strong className="text-stone-900">
                    L Boy Yumurta × 40 Viyol
                  </strong>
                </div>
                <div className="flex items-center justify-between rounded-md bg-emerald-50 px-2 py-1 font-bold text-emerald-800">
                  <span>Toplam:</span>
                  <span>₺5.600,00</span>
                </div>
              </div>
              <div className="mt-2.5 rounded-lg bg-[#7c1d32] py-1.5 text-center text-[9.5px] font-bold text-white shadow-sm">
                Satışı Kaydet ✓
              </div>
            </div>
          </div>
        )}

        {/* Toast on Step 2 */}
        {step === 2 && (
          <div className="absolute bottom-2.5 right-2.5 z-20 inline-flex items-center gap-1 rounded-lg bg-[#1b1b1b] px-2.5 py-1 text-[9px] font-semibold text-emerald-400 shadow-lg">
            <CheckCircle2 className="h-3 w-3" />
            Satış kasaya işlendi (+₺5.600)
          </div>
        )}
      </div>

      <VirtualCursor
        x={cursorPos.x}
        y={cursorPos.y}
        clicking={clicking}
        label={cursorPos.label}
      />
    </div>
  );
}

/* ============================================================================
   DEMO 2: FİZYOTERAPİ ERP (Matches user's deep teal sidebar + crisp white UI)
============================================================================ */
export function FizyoterapiLiveDemo({ offsetMs = 900 }: { offsetMs?: number }) {
  // Steps:
  // 0: Klinik Özeti -> cursor moves to "Yeni Randevu"
  // 1: Yeni Randevu modal opens -> Zeynep Arslan / 15:30 Manuel Terapi
  // 2: Randevu created -> Bugünkü Seanslar (1) updates + toast
  // 3: Cursor clicks "Klinik Giderleri" -> matches user's Giderler screenshot!
  const [step, setStep] = useState(0);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null;
    const startTimeout = setTimeout(() => {
      intervalId = setInterval(() => {
        setClicking(true);
        setTimeout(() => setClicking(false), 320);
        setStep((prev) => (prev + 1) % 4);
      }, 2800);
    }, offsetMs);

    return () => {
      clearTimeout(startTimeout);
      if (intervalId) clearInterval(intervalId);
    };
  }, [offsetMs]);

  const cursorPos = [
    { x: 74, y: 12, label: "Yeni Randevu" },
    { x: 64, y: 74, label: "Randevu Oluştur" },
    { x: 11, y: 69, label: "Klinik Giderleri" },
    { x: 84, y: 39, label: "Gideri Kaydet" },
  ][step];

  const appointmentAdded = step >= 2;

  return (
    <div className="relative flex h-full w-full overflow-hidden bg-[#f8faf9] text-[#1b1b1b] select-none">
      {/* Left Sidebar (Deep Teal matching user screenshot) */}
      <aside className="flex w-[116px] shrink-0 flex-col bg-[#0c4a43] p-2.5 text-teal-100 sm:w-[134px]">
        <div className="flex items-center gap-1.5">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/20 text-emerald-300">
            <Activity className="h-3.5 w-3.5" />
          </span>
          <div className="leading-tight">
            <p className="text-[10px] font-bold text-white">Fizyoterapi ERP</p>
            <p className="text-[7.5px] text-teal-300/80">
              Klinik &amp; Manuel Terapi
            </p>
          </div>
        </div>

        <ul className="mt-3 space-y-1 text-[9.5px]">
          {[
            { name: "Klinik Özeti", icon: LayoutDashboard, active: step !== 3 },
            { name: "Randevu & Seans", icon: Calendar, active: false },
            { name: "Seans Paketleri", icon: Package, active: false },
            { name: "Danışan Dosyaları", icon: Users, active: false },
            { name: "Tahsilat", icon: CreditCard, active: false },
            { name: "Klinik Giderleri", icon: Receipt, active: step === 3 },
          ].map((nav) => {
            const Icon = nav.icon;
            return (
              <li
                key={nav.name}
                className={`flex items-center gap-1.5 rounded-md px-2 py-1.5 transition-colors ${
                  nav.active
                    ? "bg-teal-600/70 font-semibold text-white"
                    : "text-teal-100/75"
                }`}
              >
                <Icon className="h-3 w-3 shrink-0" />
                <span className="truncate">{nav.name}</span>
              </li>
            );
          })}
        </ul>

        <div className="mt-auto rounded-md bg-emerald-600 px-2 py-1 text-center text-[8px] font-semibold text-white">
          Veritabanı Yedeği İndir
        </div>
      </aside>

      {/* Main Content */}
      <div className="relative flex-1 overflow-hidden p-3 sm:p-3.5">
        {step === 3 ? (
          /* Klinik & Şahsi Giderler (from user screenshot 3) */
          <div className="space-y-2.5">
            <div>
              <p className="text-xs font-bold text-stone-900">
                Klinik &amp; Şahsi Giderler
              </p>
              <p className="text-[9px] text-stone-500">
                İşletme Giderleri: <strong>₺26.950,00</strong> • Şahsi: ₺0,00
              </p>
            </div>

            <div className="rounded-xl border border-stone-200 bg-white p-2.5">
              <p className="text-[9px] font-bold text-stone-700">
                Yeni Gider Kaydet
              </p>
              <div className="mt-1.5 grid grid-cols-3 gap-1.5 text-[8.5px]">
                <span className="rounded border border-stone-200 bg-stone-50 px-1.5 py-1 text-stone-700">
                  Klinik Hijyen
                </span>
                <span className="rounded border border-stone-200 bg-stone-50 px-1.5 py-1 text-stone-700">
                  ₺1.450,00
                </span>
                <span className="rounded bg-[#0c6b61] px-2 py-1 text-center font-semibold text-white">
                  Gideri Kaydet
                </span>
              </div>
            </div>

            <div className="space-y-1.5 rounded-xl border border-stone-200 bg-white p-2.5 text-[9px]">
              {[
                ["Çamaşırhane & Klinik Hijyen", "₺1.450,00"],
                ["Instagram / Google Reklam", "₺3.500,00"],
                ["Klinik Kirası & Aidat", "₺22.000,00"],
              ].map(([cat, amt]) => (
                <div
                  key={cat}
                  className="flex items-center justify-between border-b border-stone-100 pb-1 last:border-0 last:pb-0"
                >
                  <span className="font-medium text-stone-800">{cat}</span>
                  <span className="font-bold text-rose-600">{amt}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Klinik Özeti (from user screenshot 2) */
          <div className="space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-xs font-bold text-stone-900">
                  Hoş geldin, admin
                </p>
                <p className="text-[8.5px] text-stone-400">
                  Günlük seans takibi, aktif paketler ve kasa
                </p>
              </div>
              <div className="flex items-center gap-1 text-[8.5px]">
                <span
                  className={`rounded-md border px-1.5 py-1 font-semibold transition-transform ${
                    step === 0
                      ? "scale-105 border-teal-600 bg-teal-50 text-teal-900 ring-2 ring-teal-500/30"
                      : "border-stone-200 bg-white text-stone-700"
                  }`}
                >
                  Yeni Randevu
                </span>
                <span className="rounded-md bg-[#0c6b61] px-2 py-1 font-semibold text-white">
                  + Seans / Paket
                </span>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-xl border border-stone-200 bg-white p-2">
                <p className="text-[8.5px] text-stone-500">Aylık Ciro</p>
                <p className="mt-0.5 text-[11px] font-bold text-stone-900">
                  ₺47.750,00
                </p>
              </div>
              <div className="rounded-xl border border-teal-200 bg-teal-50/60 p-2">
                <p className="text-[8.5px] text-teal-800">Kasadaki Nakit</p>
                <p className="mt-0.5 text-[11px] font-bold text-teal-900">
                  ₺26.700,00
                </p>
              </div>
              <div className="rounded-xl border border-stone-200 bg-white p-2">
                <p className="text-[8.5px] text-stone-500">Danışan Alacağı</p>
                <p className="mt-0.5 text-[11px] font-bold text-amber-700">
                  ₺13.100,00
                </p>
              </div>
            </div>

            {/* Today's Sessions */}
            <div className="rounded-xl border border-stone-200 bg-white p-2.5">
              <div className="flex items-center justify-between text-[9px]">
                <span className="font-bold text-stone-800">
                  Bugünkü Seanslar ({appointmentAdded ? 1 : 0})
                </span>
                <span className="text-teal-700">Takvime Git →</span>
              </div>
              {appointmentAdded ? (
                <div className="mt-1.5 flex items-center justify-between rounded-lg border border-emerald-200 bg-emerald-50 px-2 py-1.5 text-[9px]">
                  <span className="font-semibold text-emerald-950">
                    15:30 • Zeynep Arslan (Manuel Terapi)
                  </span>
                  <span className="rounded bg-emerald-600 px-1.5 py-0.5 text-[8px] font-bold text-white">
                    Onaylandı
                  </span>
                </div>
              ) : (
                <p className="mt-1.5 text-center text-[9px] text-stone-400">
                  Bugün için yeni randevu ekleniyor...
                </p>
              )}
            </div>

            {/* Expiring Packages */}
            <div className="rounded-xl border border-stone-200 bg-white p-2.5">
              <div className="flex items-center justify-between text-[9px]">
                <span className="font-bold text-stone-800">
                  Paketi Bitmek Üzere (Son 1-2 Seans)
                </span>
                <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[8px] font-bold text-amber-800">
                  Kalan: 2 Seans
                </span>
              </div>
              <p className="mt-1 text-[9px] font-medium text-stone-700">
                Mehmet Demir • 10 Seans Manuel Terapi
              </p>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-stone-100">
                <div className="h-full w-4/5 rounded-full bg-amber-500" />
              </div>
            </div>
          </div>
        )}

        {/* Simulated "Yeni Randevu" Modal in Step 1 */}
        {step === 1 && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-stone-950/35 p-3 backdrop-blur-[1px]">
            <div className="w-full max-w-[235px] rounded-xl border border-stone-200 bg-white p-3 shadow-2xl">
              <div className="flex items-center justify-between border-b border-stone-100 pb-1.5">
                <span className="flex items-center gap-1 text-[10px] font-bold text-stone-900">
                  <Calendar className="h-3 w-3 text-[#0c6b61]" />
                  Yeni Seans Randevusu
                </span>
                <span className="text-[8px] text-teal-700">Paket: 6/10</span>
              </div>
              <div className="mt-2 space-y-1.5 text-[9px]">
                <div className="rounded-md border border-stone-200 bg-stone-50 px-2 py-1">
                  <span className="text-stone-400">Danışan: </span>
                  <strong className="text-stone-900">Zeynep Arslan</strong>
                </div>
                <div className="rounded-md border border-stone-200 bg-stone-50 px-2 py-1">
                  <span className="text-stone-400">Seans: </span>
                  <strong className="text-stone-900">
                    Manuel Terapi • 15:30
                  </strong>
                </div>
              </div>
              <div className="mt-2.5 rounded-lg bg-[#0c6b61] py-1.5 text-center text-[9.5px] font-bold text-white">
                Randevu Oluştur ✓
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="absolute bottom-2.5 right-2.5 z-20 inline-flex items-center gap-1 rounded-lg bg-[#1b1b1b] px-2.5 py-1 text-[9px] font-semibold text-emerald-400 shadow-lg">
            <CheckCircle2 className="h-3 w-3" />
            Randevu oluşturuldu (15:30)
          </div>
        )}
      </div>

      <VirtualCursor
        x={cursorPos.x}
        y={cursorPos.y}
        clicking={clicking}
        label={cursorPos.label}
      />
    </div>
  );
}

/* ============================================================================
   DEMO 3: VETERİNER ERP (Matches dark forest green sidebar + #f6f7f4 Klinik Özeti)
============================================================================ */
export function VeterinerLiveDemo({ offsetMs = 1800 }: { offsetMs?: number }) {
  // Steps:
  // 0: Klinik özeti -> cursor moves to "+ Yeni muayene / satış"
  // 1: Modal opens -> "Yeşilova Çiftliği • Sığır Karma Muayene & İlaç (₺850,00)"
  // 2: Saved -> Kasadaki net nakit updates (₺2.185,00), Bugün Ciro (₺850,00) + toast
  // 3: Cursor clicks "Alış faturaları" -> AI scans Medivet invoice & restocks Kedi Karma Aşı
  const [step, setStep] = useState(0);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null;
    const startTimeout = setTimeout(() => {
      intervalId = setInterval(() => {
        setClicking(true);
        setTimeout(() => setClicking(false), 320);
        setStep((prev) => (prev + 1) % 4);
      }, 2800);
    }, offsetMs);

    return () => {
      clearTimeout(startTimeout);
      if (intervalId) clearInterval(intervalId);
    };
  }, [offsetMs]);

  const cursorPos = [
    { x: 86, y: 11, label: "+ Yeni muayene / satış" },
    { x: 64, y: 74, label: "Kaydet" },
    { x: 11, y: 46, label: "Alış faturaları" },
    { x: 56, y: 42, label: "AI Fatura İşlendi ✓" },
  ][step];

  const examAdded = step >= 2;

  return (
    <div className="relative flex h-full w-full overflow-hidden bg-[#f5f6f3] text-[#1b1b1b] select-none">
      {/* Left Sidebar (Deep forest green matching user's Veteriner ERP screenshot) */}
      <aside className="flex w-[114px] shrink-0 flex-col bg-[#112219] p-2.5 text-stone-300 sm:w-[134px]">
        <div className="flex items-center gap-1.5 pb-1">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/10 text-emerald-300">
            <PawPrint className="h-3.5 w-3.5" />
          </span>
          <p className="text-[10px] font-bold text-white">Veteriner ERP</p>
        </div>

        <div className="mt-2 space-y-2 text-[9px]">
          <div>
            <p className="px-2 text-[7.5px] font-semibold text-stone-400/80">
              Klinik
            </p>
            <ul className="mt-1 space-y-0.5">
              {[
                { name: "Klinik özeti", icon: LayoutDashboard, active: step !== 3 },
                { name: "Hastalar", icon: PawPrint, active: false },
                { name: "Aşı takvimi", icon: Calendar, active: false },
              ].map((nav) => {
                const Icon = nav.icon;
                return (
                  <li
                    key={nav.name}
                    className={`flex items-center gap-1.5 rounded-md px-2 py-1 transition-colors ${
                      nav.active
                        ? "bg-[#223f30] font-semibold text-white"
                        : "text-stone-300/85"
                    }`}
                  >
                    <Icon className="h-2.5 w-2.5 shrink-0" />
                    <span className="truncate">{nav.name}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <p className="px-2 text-[7.5px] font-semibold text-stone-400/80">
              Ticari işlemler
            </p>
            <ul className="mt-1 space-y-0.5">
              {[
                { name: "Muayene ve satış", icon: Stethoscope, active: false },
                { name: "Alış faturaları", icon: FileText, active: step === 3 },
                { name: "Ürün ve stok", icon: Package, active: false },
                { name: "Müşteriler", icon: Users, active: false },
              ].map((nav) => {
                const Icon = nav.icon;
                return (
                  <li
                    key={nav.name}
                    className={`flex items-center gap-1.5 rounded-md px-2 py-1 transition-colors ${
                      nav.active
                        ? "bg-[#223f30] font-semibold text-white"
                        : "text-stone-300/85"
                    }`}
                  >
                    <Icon className="h-2.5 w-2.5 shrink-0" />
                    <span className="truncate">{nav.name}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <p className="px-2 text-[7.5px] font-semibold text-stone-400/80">
              Finans
            </p>
            <ul className="mt-1 space-y-0.5">
              <li className="flex items-center gap-1.5 rounded-md px-2 py-1 text-stone-300/85">
                <Wallet className="h-2.5 w-2.5 shrink-0" />
                <span className="truncate">Tahsilat ve ödeme</span>
              </li>
              <li className="flex items-center gap-1.5 rounded-md px-2 py-1 text-stone-300/85">
                <Receipt className="h-2.5 w-2.5 shrink-0" />
                <span className="truncate">Giderler</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-auto space-y-1 pt-2 text-[8px] text-stone-400">
          <div className="rounded px-2 py-0.5">Yedek indir</div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="relative flex-1 overflow-hidden p-3 sm:p-3.5">
        {step === 3 ? (
          /* AI Invoice Scan View */
          <div className="space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-xs font-bold text-stone-900">
                  Alış faturaları &amp; AI Tarama
                </p>
                <p className="text-[8.5px] text-stone-500">
                  Medivet Ecza Deposu • Kedi Karma Aşı stoka işlendi
                </p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-md bg-[#1d5e43] px-2 py-1 text-[8.5px] font-semibold text-white">
                <ScanLine className="h-2.5 w-2.5" /> AI Tarandı (1.3 sn)
              </span>
            </div>

            <div className="rounded-xl border border-emerald-200 bg-white p-2.5">
              <div className="flex items-center justify-between border-b border-stone-100 pb-1.5 text-[9px]">
                <span className="font-bold text-stone-900">
                  Stok uyarıları — Güncellendi
                </span>
                <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[8px] font-bold text-emerald-800">
                  +10 Doz Eklendi
                </span>
              </div>
              <div className="mt-2 space-y-1.5 text-[9px]">
                <div className="flex items-center justify-between rounded-lg bg-emerald-50/70 px-2 py-1.5">
                  <span className="font-semibold text-emerald-950">
                    Kedi Karma Aşı
                  </span>
                  <span className="text-stone-600">14.000 Doz</span>
                  <span className="rounded bg-emerald-600 px-1.5 py-0.5 text-[8px] font-bold text-white">
                    Stok Tamam
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-stone-50 px-2 py-1.5">
                  <span className="font-semibold text-stone-800">
                    Dış Parazit Uygulama Ürünü
                  </span>
                  <span className="text-stone-500">13.000 Doz</span>
                  <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[8px] font-bold text-emerald-800">
                    Güncellendi
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Klinik özeti (Matching user's screenshot) */
          <div className="space-y-2.5">
            {/* Header */}
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-xs font-bold text-stone-900">Klinik özeti</p>
                <p className="text-[8.5px] text-stone-500">
                  26 Kasım 2026 Perşembe
                </p>
              </div>
              <div className="flex items-center gap-1 text-[8.5px]">
                <span className="inline-flex items-center gap-1 rounded-md border border-stone-200 bg-white px-2 py-1 font-medium text-stone-700">
                  <ScanLine className="h-2.5 w-2.5 text-stone-500" />
                  Fatura tara
                </span>
                <span
                  className={`rounded-md px-2 py-1 font-semibold text-white transition-transform ${
                    step === 0
                      ? "scale-105 bg-[#1d5e43] ring-2 ring-emerald-500/35"
                      : "bg-[#1d5e43]"
                  }`}
                >
                  + Yeni muayene / satış
                </span>
              </div>
            </div>

            {/* Top KPI Row: Dark green Cash card + Bugün + Bu ay */}
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-5 rounded-xl bg-[#184430] p-2.5 text-white">
                <p className="flex items-center gap-1 text-[8px] text-emerald-200">
                  <Wallet className="h-2.5 w-2.5" />
                  Kasadaki net nakit
                </p>
                <p className="mt-1 text-sm font-bold tracking-tight">
                  {examAdded ? "₺2.185,00" : "₺1.335,00"}
                </p>
                <p className="mt-0.5 text-[7.5px] text-emerald-200/80 underline">
                  Kasa sayımı
                </p>
              </div>

              <div className="col-span-3 rounded-xl border border-stone-200 bg-white p-2">
                <p className="text-[8px] font-medium text-stone-500">Bugün</p>
                <p className="mt-1 text-[8px] text-stone-400">Ciro</p>
                <p className="text-[10.5px] font-bold text-stone-900">
                  {examAdded ? "₺850,00" : "₺0,00"}
                </p>
                <p className="mt-0.5 text-[8px] text-emerald-700">
                  Kâr: {examAdded ? "₺520,00" : "₺0,00"}
                </p>
              </div>

              <div className="col-span-4 rounded-xl border border-stone-200 bg-white p-2">
                <p className="text-[8px] font-medium text-stone-500">Bu ay</p>
                <p className="mt-1 text-[8px] text-stone-400">Ciro / Net kâr</p>
                <p className="text-[10.5px] font-bold text-stone-900">
                  {examAdded ? "₺3.280,00" : "₺2.430,00"}
                </p>
                <p className="mt-0.5 text-[8px] font-semibold text-emerald-700">
                  Net: {examAdded ? "₺2.390,00" : "₺1.870,00"}
                </p>
              </div>
            </div>

            {/* Middle Row: Aşı Takvimi + Stok Uyarıları */}
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-6 rounded-xl border border-stone-200 bg-white p-2.5">
                <div className="flex items-center justify-between">
                  <p className="text-[9px] font-bold text-stone-900">
                    Aşı ve kontrol takvimi
                  </p>
                  <span className="rounded border border-stone-200 px-1.5 py-0.5 text-[7.5px] text-stone-600">
                    Takvimi aç
                  </span>
                </div>
                <p className="mt-1.5 text-[8.5px] text-stone-500">
                  {examAdded
                    ? "Yeşilova Çiftliği • Kontrol (7 gün)"
                    : "Bugün ve önümüzdeki 7 gün"}
                </p>
                <div className="mt-2 border-t border-stone-100 pt-1.5">
                  <p className="text-[8.5px] font-bold text-stone-800">
                    En yüksek müşteri borçları
                  </p>
                  <div className="mt-1 flex justify-between text-[8.5px]">
                    <span className="text-[#1d5e43]">Yeşilova Çiftliği</span>
                    <span className="font-semibold text-stone-800">
                      ₺1.950,00
                    </span>
                  </div>
                  <div className="mt-0.5 flex justify-between text-[8.5px]">
                    <span className="text-[#1d5e43]">Elif Kaya</span>
                    <span className="font-semibold text-stone-800">
                      ₺1.230,00
                    </span>
                  </div>
                </div>
              </div>

              <div className="col-span-6 rounded-xl border border-stone-200 bg-white p-2.5">
                <div className="flex items-center justify-between">
                  <p className="text-[9px] font-bold text-stone-900">
                    Stok uyarıları
                  </p>
                  <span className="text-[7.5px] text-[#1d5e43]">Ürünler</span>
                </div>
                <div className="mt-1.5 space-y-1.5 text-[8.5px]">
                  <div className="flex items-center justify-between gap-1">
                    <span className="truncate font-medium text-[#1d5e43]">
                      Dış Parazit Uygulama
                    </span>
                    <span className="shrink-0 rounded bg-[#fce6d2] px-1.5 py-0.5 text-[7.5px] font-semibold text-[#9a4a17]">
                      Kritik stok
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-1">
                    <span className="truncate font-medium text-[#1d5e43]">
                      Kedi Karma Aşı
                    </span>
                    <span className="shrink-0 rounded bg-[#fce6d2] px-1.5 py-0.5 text-[7.5px] font-semibold text-[#9a4a17]">
                      Kritik stok
                    </span>
                  </div>
                </div>
                <div className="mt-2 border-t border-stone-100 pt-1.5 text-[8px]">
                  <p className="font-bold text-stone-800">Yaklaşan vadeler</p>
                  <div className="mt-0.5 flex justify-between text-stone-600">
                    <span>Yeşilova (26.11)</span>
                    <span className="font-semibold">₺500,00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Simulated "+ Yeni muayene / satış" Modal in Step 1 */}
        {step === 1 && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-stone-950/35 p-3 backdrop-blur-[1px]">
            <div className="w-full max-w-[235px] rounded-xl border border-stone-200 bg-white p-3 shadow-2xl">
              <div className="flex items-center justify-between border-b border-stone-100 pb-1.5">
                <span className="flex items-center gap-1 text-[10px] font-bold text-stone-900">
                  <Stethoscope className="h-3 w-3 text-[#1d5e43]" />
                  Yeni Muayene &amp; Satış
                </span>
                <span className="text-[8px] text-[#1d5e43]">Nakit Tahsilat</span>
              </div>
              <div className="mt-2 space-y-1.5 text-[9px]">
                <div className="rounded-md border border-stone-200 bg-stone-50 px-2 py-1">
                  <span className="text-stone-400">Cari / Hasta: </span>
                  <strong className="text-stone-900">Yeşilova Çiftliği</strong>
                </div>
                <div className="rounded-md border border-stone-200 bg-stone-50 px-2 py-1">
                  <span className="text-stone-400">İşlem: </span>
                  <strong className="text-stone-900">
                    Muayene + Parazit Aşısı
                  </strong>
                </div>
                <div className="flex items-center justify-between rounded-md bg-emerald-50 px-2 py-1 font-bold text-emerald-900">
                  <span>Tutar:</span>
                  <span>₺850,00</span>
                </div>
              </div>
              <div className="mt-2.5 rounded-lg bg-[#1d5e43] py-1.5 text-center text-[9.5px] font-bold text-white">
                Kaydet ✓
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="absolute bottom-2.5 right-2.5 z-20 inline-flex items-center gap-1 rounded-lg bg-[#184430] px-2.5 py-1 text-[9px] font-semibold text-white shadow-lg">
            <CheckCircle2 className="h-3 w-3 text-emerald-300" />
            Muayene kasaya işlendi (+₺850)
          </div>
        )}
      </div>

      <VirtualCursor
        x={cursorPos.x}
        y={cursorPos.y}
        clicking={clicking}
        label={cursorPos.label}
      />
    </div>
  );
}

/* ============================================================================
   DEMO 4: ATÖLYE ERP — KÜÇÜK İŞLETME & ATÖLYE YÖNETİMİ (Indigo/Navy UI)
============================================================================ */
export function AtolyeLiveDemo({ offsetMs = 2400 }: { offsetMs?: number }) {
  // Steps:
  // 0: Aylık Gelir–Gider -> cursor fills Gelir kaydet (350,00 TL) & hovers Kaydet
  // 1: Clicks Kaydet -> Toplam gelir becomes 1.700,00 TL, fark 1.480,00 TL + toast
  // 2: Cursor moves to sidebar "Siparişler"
  // 3: Displays Siparişler view (order production status & customer balance)
  const [step, setStep] = useState(0);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null;
    const startTimeout = setTimeout(() => {
      intervalId = setInterval(() => {
        setClicking(true);
        setTimeout(() => setClicking(false), 320);
        setStep((prev) => (prev + 1) % 4);
      }, 2800);
    }, offsetMs);

    return () => {
      clearTimeout(startTimeout);
      if (intervalId) clearInterval(intervalId);
    };
  }, [offsetMs]);

  const cursorPos = [
    { x: 31, y: 79, label: "Kaydet (350 TL)" },
    { x: 11, y: 74, label: "Siparişler" },
    { x: 58, y: 48, label: "Durum: Hazır ✓" },
    { x: 11, y: 63, label: "Aylık Gelir–Gider" },
  ][step];

  const incomeAdded = step >= 1 && step !== 3;

  return (
    <div className="relative flex h-full w-full overflow-hidden bg-[#f5f6fb] text-[#1b1b1b] select-none">
      {/* Left Sidebar (Deep Navy / Indigo matching user's Atölye ERP screenshot) */}
      <aside className="flex w-[114px] shrink-0 flex-col bg-[#161728] p-2.5 text-slate-300 sm:w-[134px]">
        <div className="flex items-center gap-1.5 pb-1">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#5b52d6] text-white">
            <Layers className="h-3.5 w-3.5" />
          </span>
          <p className="text-[10px] font-bold text-white">Atölye ERP</p>
        </div>

        <ul className="mt-3 space-y-1 text-[9px]">
          {[
            { name: "Genel Bakış", icon: LayoutDashboard, active: false },
            { name: "Ürünler", icon: Package, active: false },
            { name: "Müşteriler", icon: Users, active: false },
            { name: "Malzemeler", icon: Layers, active: false },
            {
              name: "Aylık Gelir–Gider",
              icon: Wallet,
              active: step !== 2 && step !== 3,
            },
            {
              name: "Siparişler",
              icon: ClipboardList,
              active: step === 2 || step === 3,
            },
            { name: "Ayarlar", icon: Settings, active: false },
          ].map((nav) => {
            const Icon = nav.icon;
            return (
              <li
                key={nav.name}
                className={`flex items-center gap-1.5 rounded-lg px-2 py-1.5 transition-colors ${
                  nav.active
                    ? "border border-[#5b52d6]/50 bg-[#282a45] font-semibold text-white"
                    : "text-slate-300/80"
                }`}
              >
                <Icon className="h-2.5 w-2.5 shrink-0" />
                <span className="truncate">{nav.name}</span>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Main Content */}
      <div className="relative flex-1 overflow-hidden p-3 sm:p-3.5">
        {step === 2 || step === 3 ? (
          /* Siparişler View */
          <div className="space-y-2.5">
            <div className="flex items-center justify-between rounded-2xl bg-[#1d1e34] px-3.5 py-2.5 text-white">
              <div>
                <p className="text-[8px] text-indigo-200/80">Atölye Üretim</p>
                <p className="text-xs font-bold">Siparişler</p>
              </div>
              <span className="rounded-lg bg-[#d9d6f9] px-2.5 py-1 text-[8.5px] font-bold text-[#1d1e34]">
                + Yeni Sipariş
              </span>
            </div>

            <div className="space-y-1.5 rounded-xl border border-slate-200 bg-white p-2.5 text-[9px]">
              {[
                {
                  title: "Özel Ahşap Kutu (20 Adet)",
                  client: "Kuzey Kahve",
                  price: "₺1.300,00",
                  status: step === 3 ? "Teslim Edildi" : "Hazırlanıyor",
                  done: step === 3,
                },
                {
                  title: "Lazer Kesim Kutu & Baskı",
                  client: "Mavi Butik",
                  price: "₺850,00",
                  status: "Ödeme Alındı",
                  done: true,
                },
                {
                  title: "Atölye Özel Tasarım Set",
                  client: "Ege Hediyelik",
                  price: "₺350,00",
                  status: "Yeni Gelir",
                  done: true,
                },
              ].map((order) => (
                <div
                  key={order.title}
                  className="flex items-center justify-between rounded-lg bg-slate-50 px-2.5 py-2"
                >
                  <div>
                    <p className="font-bold text-slate-900">{order.title}</p>
                    <p className="text-[8px] text-slate-500">{order.client}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-900">{order.price}</p>
                    <span
                      className={`inline-block rounded px-1.5 py-0.5 text-[7.5px] font-semibold ${
                        order.done
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-indigo-100 text-indigo-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Aylık Gelir–Gider (Matching user's Atölye ERP screenshot) */
          <div className="space-y-2.5">
            {/* Dark Banner */}
            <div className="flex items-center justify-between rounded-2xl bg-[#1d1e34] px-3.5 py-2.5 text-white">
              <div>
                <p className="text-[8px] text-slate-300">Kasım 2026</p>
                <p className="text-xs font-bold">Aylık Gelir–Gider</p>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="rounded-lg bg-white px-2 py-1 text-[8.5px] font-semibold text-slate-800">
                  2026-11
                </span>
                <span className="rounded-lg bg-[#dcd7fa] px-2 py-1 text-[8.5px] font-bold text-[#1d1e34]">
                  Ayı göster
                </span>
              </div>
            </div>

            {/* 3 KPI Cards */}
            <div className="grid grid-cols-3 gap-2">
              <div
                className={`rounded-xl border p-2 transition-colors ${
                  incomeAdded
                    ? "border-indigo-300 bg-indigo-50/70"
                    : "border-slate-200 bg-white"
                }`}
              >
                <p className="text-[8px] text-slate-500">Toplam gelir</p>
                <p className="mt-0.5 text-[11px] font-bold text-slate-900">
                  {incomeAdded ? "1.700,00 TL" : "1.350,00 TL"}
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-2">
                <p className="text-[8px] text-slate-500">Toplam gider</p>
                <p className="mt-0.5 text-[11px] font-bold text-slate-900">
                  220,00 TL
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-2">
                <p className="text-[8px] text-slate-500">Gelir–gider farkı</p>
                <p className="mt-0.5 text-[11px] font-bold text-[#493eb8]">
                  {incomeAdded ? "1.480,00 TL" : "1.130,00 TL"}
                </p>
              </div>
            </div>

            {/* Quick Summary Strip */}
            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-[8.5px]">
              <div className="flex gap-3">
                <span className="text-slate-500">
                  Siparişlerden{" "}
                  <strong className="text-slate-900">1.300,00 TL</strong>
                </span>
                <span className="text-slate-500">
                  Manuel{" "}
                  <strong className="text-slate-900">
                    {incomeAdded ? "400,00 TL" : "50,00 TL"}
                  </strong>
                </span>
              </div>
              <span className="rounded-md bg-[#4d42c7] px-2 py-0.5 font-semibold text-white">
                Gelir ekle
              </span>
            </div>

            {/* Two Entry Forms Side-by-Side */}
            <div className="grid grid-cols-2 gap-2 text-[8.5px]">
              <div className="rounded-xl border border-slate-200 bg-white p-2.5">
                <p className="font-bold text-slate-900">Gelir kaydet</p>
                <div className="mt-1.5 grid grid-cols-2 gap-1">
                  <span className="rounded border border-slate-200 px-1.5 py-1 text-slate-600">
                    26.11.2026
                  </span>
                  <span className="rounded border border-indigo-300 bg-indigo-50/50 px-1.5 py-1 font-semibold text-slate-900">
                    350,00 TL
                  </span>
                </div>
                <div className="mt-1 rounded border border-slate-200 px-1.5 py-1 text-slate-700">
                  Özel Tasarım Set
                </div>
                <div
                  className={`mt-1.5 inline-block rounded-md px-2.5 py-1 font-semibold text-white transition-transform ${
                    step === 0
                      ? "scale-105 bg-[#4d42c7] ring-2 ring-indigo-500/30"
                      : "bg-[#4d42c7]"
                  }`}
                >
                  Kaydet
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-2.5">
                <p className="font-bold text-slate-900">Aylık gider kayıtları</p>
                <div className="mt-1.5 space-y-1.5">
                  <div className="flex justify-between rounded bg-slate-50 px-1.5 py-1">
                    <span className="text-slate-700">Stok alımı · kartuş</span>
                    <span className="font-bold text-slate-900">200,00 TL</span>
                  </div>
                  <div className="flex justify-between rounded bg-slate-50 px-1.5 py-1">
                    <span className="text-slate-700">Kargo &amp; zarf</span>
                    <span className="font-bold text-slate-900">20,00 TL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="absolute bottom-2.5 right-2.5 z-20 inline-flex items-center gap-1 rounded-lg bg-[#1d1e34] px-2.5 py-1 text-[9px] font-semibold text-indigo-200 shadow-lg">
            <CheckCircle2 className="h-3 w-3 text-emerald-400" />
            Gelir eklendi (+350,00 TL)
          </div>
        )}
      </div>

      <VirtualCursor
        x={cursorPos.x}
        y={cursorPos.y}
        clicking={clicking}
        label={cursorPos.label}
      />
    </div>
  );
}
