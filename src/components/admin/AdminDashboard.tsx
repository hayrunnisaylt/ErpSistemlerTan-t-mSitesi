"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  Eye,
  Lock,
  LogOut,
  Mail,
  MousePointerClick,
  RefreshCw,
  Send,
  Users,
} from "lucide-react";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import type { DailyStat, StatsReport } from "@/lib/analytics-store";

type Status = "loading" | "login" | "ready" | "error";

const RANGES = [
  { days: 1, label: "Bugün" },
  { days: 7, label: "7 gün" },
  { days: 30, label: "30 gün" },
  { days: 90, label: "90 gün" },
  { days: 365, label: "1 yıl" },
];

type MetricKey = keyof Omit<DailyStat, "day">;

const METRICS: { key: MetricKey; label: string }[] = [
  { key: "visitors", label: "Tekil ziyaretçi" },
  { key: "pageviews", label: "Ziyaret" },
  { key: "contactSubmissions", label: "Form başvurusu" },
  { key: "instagramClicks", label: "Instagram tıklaması" },
  { key: "emailClicks", label: "E-posta tıklaması" },
  { key: "demoCtaClicks", label: "Demo butonu tıklaması" },
];

const nf = new Intl.NumberFormat("tr-TR");
const dayFmt = new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "short" });
const dateTimeFmt = new Intl.DateTimeFormat("tr-TR", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Europe/Istanbul",
});

function parseDay(day: string) {
  return new Date(`${day}T12:00:00+03:00`);
}

type FetchResult =
  | { kind: "login" }
  | { kind: "error"; error: string }
  | { kind: "ok"; report: StatsReport };

async function fetchStats(range: number): Promise<FetchResult> {
  try {
    const res = await fetch(`/api/admin/stats?days=${range}`, {
      cache: "no-store",
    });
    if (res.status === 401) return { kind: "login" };
    const data = await res.json();
    if (!data.ok) return { kind: "error", error: data.error || "Veriler alınamadı." };
    return { kind: "ok", report: data.report };
  } catch {
    return { kind: "error", error: "Veriler alınamadı. Bağlantınızı kontrol edin." };
  }
}

export function AdminDashboard() {
  const [status, setStatus] = useState<Status>("loading");
  const [days, setDays] = useState(30);
  const [report, setReport] = useState<StatsReport | null>(null);
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const apply = useCallback((r: FetchResult) => {
    setRefreshing(false);
    if (r.kind === "login") return setStatus("login");
    if (r.kind === "error") {
      setError(r.error);
      return setStatus("error");
    }
    setReport(r.report);
    setStatus("ready");
  }, []);

  const load = useCallback(
    async (range: number) => apply(await fetchStats(range)),
    [apply]
  );

  useEffect(() => {
    let active = true;
    fetchStats(30).then((r) => {
      if (active) apply(r);
    });
    return () => {
      active = false;
    };
  }, [apply]);

  function reload(range = days) {
    setRefreshing(true);
    setDays(range);
    void load(range);
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setReport(null);
    setStatus("login");
  }

  if (status === "loading") {
    return (
      <Shell>
        <p className="py-24 text-center text-sm text-[#1b1b1b]/60">Yükleniyor…</p>
      </Shell>
    );
  }

  if (status === "login") {
    return <LoginForm onSuccess={() => reload()} />;
  }

  if (status === "error" || !report) {
    return (
      <Shell>
        <div className="mx-auto max-w-md rounded-2xl border border-rose-200 bg-white p-6 text-sm text-rose-800">
          {error}
          <button
            type="button"
            onClick={() => reload()}
            className="mt-4 block font-semibold underline"
          >
            Tekrar dene
          </button>
        </div>
      </Shell>
    );
  }

  return (
    <Shell
      actions={
        <>
          <button
            type="button"
            onClick={() => reload()}
            aria-label="Verileri yenile"
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#1b1b1b]/15 bg-white/70 hover:bg-white"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
          </button>
          <button
            type="button"
            onClick={logout}
            className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-[#1b1b1b]/15 bg-white/70 px-3 text-sm font-medium hover:bg-white"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Çıkış</span>
          </button>
        </>
      }
    >
      {!report.configured && (
        <div className="mb-6 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          <strong>Veri deposu bağlı değil.</strong> Vercel → Storage → Upstash
          Redis ekleyip projeye bağlayın ve yeniden deploy edin. Bağlanana kadar
          ziyaretler kaydedilmez.
        </div>
      )}

      {/* Range filter */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Site Raporları</h1>
        <div
          role="tablist"
          aria-label="Tarih aralığı"
          className="inline-flex rounded-xl border border-[#1b1b1b]/12 bg-white/70 p-1"
        >
          {RANGES.map((r) => (
            <button
              key={r.days}
              role="tab"
              aria-selected={days === r.days}
              type="button"
              onClick={() => reload(r.days)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors sm:text-sm ${
                days === r.days
                  ? "bg-[#1b1b1b] text-white"
                  : "text-[#1b1b1b]/70 hover:bg-[#1b1b1b]/5"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <KpiGrid report={report} />

      <TrendChart daily={report.daily} />

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <RankedList
          title="Ziyaretçiler nereden geliyor?"
          rows={report.referrers}
          empty="Henüz ziyaret yok."
        />
        <RankedList
          title="Cihaz"
          rows={report.devices}
          empty="Henüz ziyaret yok."
        />
        <RankedList
          title="Instagram tıklamaları — hangi butondan?"
          rows={report.instagramPlacements}
          empty="Henüz Instagram tıklaması yok."
        />
      </div>

      <ContactsTable report={report} />
    </Shell>
  );
}

/* ------------------------------------------------------------------------- */

function Shell({
  children,
  actions,
}: {
  children: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#eeede9] text-[#1b1b1b]">
      <header className="sticky top-0 z-40 border-b border-[#1b1b1b]/10 bg-[#eeede9]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1b1b1b]/70 hover:text-[#1b1b1b]"
            >
              <ArrowLeft className="h-4 w-4" />
              Siteye dön
            </Link>
            <span className="text-[#1b1b1b]/25">|</span>
            <span className="text-sm font-semibold">y&amp;n Yönetim Paneli</span>
          </div>
          <div className="flex items-center gap-2">{actions}</div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}

function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setError(data.error || "Giriş yapılamadı.");
        return;
      }
      onSuccess();
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#eeede9] px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-3xl border border-[#1b1b1b]/12 bg-white p-7 shadow-xl shadow-[#1b1b1b]/5"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1b1b1b] text-white">
          <Lock className="h-5 w-5" />
        </span>
        <h1 className="mt-4 text-xl font-bold">Yönetim Paneli</h1>
        <p className="mt-1 text-sm text-[#1b1b1b]/60">
          Site raporlarını görmek için şifrenizi girin.
        </p>
        <label htmlFor="admin-pw" className="mt-5 block text-sm font-semibold">
          Şifre
        </label>
        <input
          id="admin-pw"
          type="password"
          autoComplete="current-password"
          required
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-[#1b1b1b]/20 bg-[#eeede9]/50 px-4 py-3 text-base focus:border-emerald-700 focus:bg-white focus:outline-none"
        />
        {error && (
          <p role="alert" className="mt-2 text-sm text-rose-700">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={pending}
          className="mt-5 w-full rounded-xl bg-[#1b1b1b] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 disabled:opacity-60"
        >
          {pending ? "Giriş yapılıyor…" : "Giriş Yap"}
        </button>
      </form>
    </div>
  );
}

function KpiGrid({ report }: { report: StatsReport }) {
  const t = report.totals;
  const conversion =
    t.visitors > 0 ? (t.contactSubmissions / t.visitors) * 100 : 0;

  const tiles = [
    { label: "Tekil ziyaretçi", value: t.visitors, icon: Users },
    { label: "Toplam ziyaret", value: t.pageviews, icon: Eye },
    {
      label: "İletişim formu",
      value: t.contactSubmissions,
      icon: Send,
      sub: `Dönüşüm: %${conversion.toLocaleString("tr-TR", { maximumFractionDigits: 1 })}`,
    },
    { label: "Instagram tıklaması", value: t.instagramClicks, icon: InstagramIcon },
    { label: "E-posta tıklaması", value: t.emailClicks, icon: Mail },
    { label: "Demo butonu tıklaması", value: t.demoCtaClicks, icon: MousePointerClick },
  ];

  return (
    <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
      {tiles.map(({ label, value, icon: Icon, sub }) => (
        <div
          key={label}
          className="rounded-2xl border border-[#1b1b1b]/10 bg-white/80 p-4 shadow-sm"
        >
          <div className="flex items-center gap-2 text-xs font-medium text-[#1b1b1b]/60">
            <Icon className="h-4 w-4" />
            {label}
          </div>
          <p className="mt-2 text-2xl font-bold tabular-nums sm:text-3xl">
            {nf.format(value)}
          </p>
          {sub && <p className="mt-0.5 text-xs text-[#1b1b1b]/55">{sub}</p>}
        </div>
      ))}
    </div>
  );
}

function TrendChart({ daily }: { daily: DailyStat[] }) {
  const [metric, setMetric] = useState<MetricKey>("visitors");
  const [hover, setHover] = useState<number | null>(null);
  const [showTable, setShowTable] = useState(false);

  // Çok uzun aralıklarda günleri haftalara topla ki çubuklar okunur kalsın
  const buckets = useMemo(() => {
    if (daily.length <= 92) {
      return daily.map((d) => ({ label: dayFmt.format(parseDay(d.day)), from: d.day, row: d }));
    }
    const out: { label: string; from: string; row: DailyStat }[] = [];
    for (let i = 0; i < daily.length; i += 7) {
      const chunk = daily.slice(i, i + 7);
      const row = chunk.reduce(
        (a, d) => ({
          ...a,
          pageviews: a.pageviews + d.pageviews,
          visitors: a.visitors + d.visitors,
          instagramClicks: a.instagramClicks + d.instagramClicks,
          emailClicks: a.emailClicks + d.emailClicks,
          demoCtaClicks: a.demoCtaClicks + d.demoCtaClicks,
          contactSubmissions: a.contactSubmissions + d.contactSubmissions,
        }),
        { ...chunk[0], pageviews: 0, visitors: 0, instagramClicks: 0, emailClicks: 0, demoCtaClicks: 0, contactSubmissions: 0 }
      );
      out.push({ label: `${dayFmt.format(parseDay(chunk[0].day))} haftası`, from: chunk[0].day, row });
    }
    return out;
  }, [daily]);

  const values = buckets.map((b) => b.row[metric]);
  const max = Math.max(1, ...values);
  const niceMax = niceCeil(max);
  const ticks = [0, niceMax / 2, niceMax];
  const metricLabel = METRICS.find((m) => m.key === metric)!.label;
  const H = 220;
  const labelEvery = Math.ceil(buckets.length / 8);

  return (
    <section className="mt-6 rounded-2xl border border-[#1b1b1b]/10 bg-white/80 p-4 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-bold">
          {metricLabel}{" "}
          <span className="font-normal text-[#1b1b1b]/55">
            — {buckets.length > 0 && daily.length > 92 ? "haftalık" : "günlük"}
          </span>
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={metric}
            onChange={(e) => setMetric(e.target.value as MetricKey)}
            aria-label="Grafikte gösterilecek veri"
            className="rounded-lg border border-[#1b1b1b]/15 bg-white px-2.5 py-1.5 text-sm"
          >
            {METRICS.map((m) => (
              <option key={m.key} value={m.key}>
                {m.label}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setShowTable((v) => !v)}
            className="rounded-lg border border-[#1b1b1b]/15 bg-white px-2.5 py-1.5 text-sm"
          >
            {showTable ? "Grafik" : "Tablo"}
          </button>
        </div>
      </div>

      {showTable ? (
        <div className="mt-4 max-h-[320px] overflow-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-white text-left text-xs text-[#1b1b1b]/55">
              <tr>
                <th className="py-2 font-medium">Tarih</th>
                <th className="py-2 text-right font-medium">{metricLabel}</th>
              </tr>
            </thead>
            <tbody>
              {[...buckets].reverse().map((b) => (
                <tr key={b.from} className="border-t border-[#1b1b1b]/8">
                  <td className="py-1.5">{b.label}</td>
                  <td className="py-1.5 text-right tabular-nums">{nf.format(b.row[metric])}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-4 flex gap-2">
          {/* y-axis */}
          <div
            className="relative w-8 shrink-0 text-right text-[11px] tabular-nums text-[#1b1b1b]/45"
            style={{ height: H }}
            aria-hidden="true"
          >
            {ticks.map((t) => (
              <span
                key={t}
                className="absolute right-0 -translate-y-1/2"
                style={{ top: H - (t / niceMax) * H }}
              >
                {nf.format(t)}
              </span>
            ))}
          </div>
          <div className="min-w-0 flex-1">
            <div
              className="relative"
              style={{ height: H }}
              onMouseLeave={() => setHover(null)}
              role="img"
              aria-label={`${metricLabel} grafiği. Toplam ${nf.format(values.reduce((a, b) => a + b, 0))}.`}
            >
              {ticks.map((t) => (
                <div
                  key={t}
                  className={`absolute inset-x-0 border-t ${t === 0 ? "border-[#1b1b1b]/25" : "border-dashed border-[#1b1b1b]/10"}`}
                  style={{ top: H - (t / niceMax) * H }}
                />
              ))}
              <div className="absolute inset-0 flex items-end gap-[2px]">
                {buckets.map((b, i) => {
                  const v = values[i];
                  const h = (v / niceMax) * H;
                  return (
                    <div
                      key={b.from}
                      className="relative flex h-full min-w-0 flex-1 items-end"
                      onMouseEnter={() => setHover(i)}
                      onTouchStart={() => setHover(i)}
                    >
                      <div
                        className={`w-full rounded-t-[4px] transition-colors ${
                          hover === i ? "bg-emerald-800" : "bg-emerald-600"
                        }`}
                        style={{ height: v > 0 ? Math.max(2, h) : 0 }}
                      />
                    </div>
                  );
                })}
              </div>
              {hover !== null && buckets[hover] && (
                <div
                  className="pointer-events-none absolute z-10 -translate-x-1/2 whitespace-nowrap rounded-lg bg-[#1b1b1b] px-2.5 py-1.5 text-xs text-white shadow-lg"
                  style={{
                    left: `${Math.min(88, Math.max(12, ((hover + 0.5) / buckets.length) * 100))}%`,
                    top: 4,
                  }}
                >
                  <span className="text-white/70">{buckets[hover].label}: </span>
                  <strong className="tabular-nums">{nf.format(values[hover])}</strong>
                </div>
              )}
            </div>
            <div className="relative mt-1.5 h-4 text-[11px] text-[#1b1b1b]/45" aria-hidden="true">
              {buckets.map((b, i) =>
                i % labelEvery === 0 ? (
                  <span
                    key={b.from}
                    className={`absolute -translate-x-1/2 whitespace-nowrap ${
                      (i / labelEvery) % 2 === 1 ? "hidden sm:block" : ""
                    }`}
                    style={{ left: `${((i + 0.5) / buckets.length) * 100}%` }}
                  >
                    {buckets.length === 1 ? b.label : b.label.replace(" haftası", "")}
                  </span>
                ) : null
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function niceCeil(v: number) {
  if (v <= 4) return 4;
  const pow = 10 ** Math.floor(Math.log10(v));
  for (const m of [1, 2, 2.5, 5, 10]) {
    if (m * pow >= v) return m * pow;
  }
  return 10 * pow;
}

function RankedList({
  title,
  rows,
  empty,
}: {
  title: string;
  rows: { name: string; count: number }[];
  empty: string;
}) {
  const total = rows.reduce((a, r) => a + r.count, 0);
  const max = Math.max(1, ...rows.map((r) => r.count));
  const shown = rows.slice(0, 8);
  const other = rows.slice(8).reduce((a, r) => a + r.count, 0);
  if (other > 0) shown.push({ name: "Diğer", count: other });

  return (
    <section className="rounded-2xl border border-[#1b1b1b]/10 bg-white/80 p-4 shadow-sm sm:p-5">
      <h2 className="text-sm font-bold">{title}</h2>
      {shown.length === 0 ? (
        <p className="mt-4 text-sm text-[#1b1b1b]/50">{empty}</p>
      ) : (
        <ul className="mt-3 space-y-2.5">
          {shown.map((r) => (
            <li key={r.name}>
              <div className="flex items-baseline justify-between gap-3 text-sm">
                <span className="truncate">{r.name}</span>
                <span className="shrink-0 tabular-nums text-[#1b1b1b]/70">
                  {nf.format(r.count)}{" "}
                  <span className="text-xs text-[#1b1b1b]/45">
                    %{Math.round((r.count / total) * 100)}
                  </span>
                </span>
              </div>
              <div className="mt-1 h-1.5 rounded-full bg-[#1b1b1b]/6">
                <div
                  className="h-full rounded-full bg-emerald-600"
                  style={{ width: `${(r.count / max) * 100}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function ContactsTable({ report }: { report: StatsReport }) {
  const rows = report.contacts;

  function downloadCsv() {
    const esc = (v: string) => `"${v.replaceAll('"', '""')}"`;
    const lines = [
      ["Tarih", "Ad Soyad", "Sektör", "Telefon", "Mesaj", "E-posta iletildi"].join(";"),
      ...rows.map((c) =>
        [
          dateTimeFmt.format(new Date(c.createdAt)),
          c.fullName,
          c.sector,
          c.phone,
          c.message,
          c.emailDelivered ? "Evet" : "Hayır",
        ]
          .map((v) => esc(String(v)))
          .join(";")
      ),
    ];
    const blob = new Blob(["﻿" + lines.join("\n")], {
      type: "text/csv;charset=utf-8",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `iletisim-formlari-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  return (
    <section className="mt-6 rounded-2xl border border-[#1b1b1b]/10 bg-white/80 p-4 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-bold">
          İletişim formu başvuruları{" "}
          <span className="font-normal text-[#1b1b1b]/55">
            ({nf.format(rows.length)} bu aralıkta · toplam {nf.format(report.contactsTotal)})
          </span>
        </h2>
        {rows.length > 0 && (
          <button
            type="button"
            onClick={downloadCsv}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#1b1b1b]/15 bg-white px-3 py-1.5 text-sm font-medium hover:bg-[#1b1b1b]/5"
          >
            <Download className="h-4 w-4" />
            Excel (CSV) indir
          </button>
        )}
      </div>

      {rows.length === 0 ? (
        <p className="mt-4 text-sm text-[#1b1b1b]/50">
          Bu tarih aralığında form başvurusu yok.
        </p>
      ) : (
        <ul className="mt-4 divide-y divide-[#1b1b1b]/8">
          {rows.map((c) => (
            <li key={c.id} className="grid gap-1 py-3 sm:grid-cols-12 sm:gap-4">
              <div className="sm:col-span-3">
                <p className="font-semibold">{c.fullName}</p>
                <p className="text-xs text-[#1b1b1b]/55">
                  {dateTimeFmt.format(new Date(c.createdAt))}
                </p>
              </div>
              <div className="text-sm sm:col-span-3">
                <a
                  href={`tel:${c.phone.replace(/\s+/g, "")}`}
                  className="font-medium text-emerald-800 hover:underline"
                >
                  {c.phone}
                </a>
                <p className="text-xs text-[#1b1b1b]/60">{c.sector}</p>
              </div>
              <p className="whitespace-pre-line text-sm text-[#1b1b1b]/75 sm:col-span-4">
                {c.message || <span className="text-[#1b1b1b]/40">Mesaj yok</span>}
              </p>
              <div className="sm:col-span-2 sm:text-right">
                {!c.emailDelivered && (
                  <span
                    title="Bildirim e-postası gönderilemedi"
                    className="inline-block whitespace-nowrap rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-800"
                  >
                    ⚠ e-posta gitmedi
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
