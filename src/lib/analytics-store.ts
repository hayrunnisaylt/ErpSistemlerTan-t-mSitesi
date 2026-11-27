/**
 * Sunucu tarafı ziyaret / tıklama / form istatistikleri (Upstash Redis).
 *
 * Gerekli ortam değişkenleri (Vercel → Storage → Upstash Redis bağlanınca
 * otomatik eklenir):
 *   KV_REST_API_URL + KV_REST_API_TOKEN
 *   (veya UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN)
 *
 * Redis yapılandırılmamışsa tüm fonksiyonlar sessizce hiçbir şey yapmaz;
 * site normal çalışmaya devam eder.
 *
 * Bu dosya yalnızca sunucuda (route handler'larda) içe aktarılmalıdır.
 */
import { createHash } from "node:crypto";
import { Redis } from "@upstash/redis";

export const TRACKABLE_EVENTS = [
  "pageview",
  "instagram_click",
  "email_click",
  "demo_cta_click",
] as const;
export type TrackableEvent = (typeof TRACKABLE_EVENTS)[number];

export interface ContactRecord {
  id: string;
  createdAt: string; // ISO
  fullName: string;
  sector: string;
  phone: string;
  message: string;
  emailDelivered: boolean;
}

export interface DailyStat {
  day: string; // YYYY-MM-DD (Europe/Istanbul)
  pageviews: number;
  visitors: number;
  instagramClicks: number;
  emailClicks: number;
  demoCtaClicks: number;
  contactSubmissions: number;
}

export interface StatsReport {
  configured: boolean;
  rangeDays: number;
  totals: Omit<DailyStat, "day">;
  daily: DailyStat[];
  referrers: { name: string; count: number }[];
  devices: { name: string; count: number }[];
  instagramPlacements: { name: string; count: number }[];
  contacts: ContactRecord[];
  contactsTotal: number;
}

const KEY_TTL_SECONDS = 60 * 60 * 24 * 400; // ~13 ay sakla
const MAX_CONTACTS = 1000;

let cached: Redis | null | undefined;

export function getRedis(): Redis | null {
  if (cached !== undefined) return cached;
  const url =
    process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || "";
  const token =
    process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || "";
  cached = url && token ? new Redis({ url, token }) : null;
  return cached;
}

/** Europe/Istanbul gününü YYYY-MM-DD olarak verir. */
export function istanbulDay(date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Istanbul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function lastNDays(n: number): string[] {
  const days: string[] = [];
  const now = Date.now();
  for (let i = n - 1; i >= 0; i--) {
    days.push(istanbulDay(new Date(now - i * 86_400_000)));
  }
  return [...new Set(days)];
}

const k = {
  pv: (d: string) => `a:pv:${d}`,
  uv: (d: string) => `a:uv:${d}`,
  ig: (d: string) => `a:ig:${d}`,
  em: (d: string) => `a:em:${d}`,
  cta: (d: string) => `a:cta:${d}`,
  cf: (d: string) => `a:cf:${d}`,
  ref: (d: string) => `a:ref:${d}`,
  dev: (d: string) => `a:dev:${d}`,
  igPlace: (d: string) => `a:igp:${d}`,
  contacts: "a:contacts",
  contactsTotal: "a:contacts:total",
};

const BOT_RE =
  /bot|crawl|spider|slurp|preview|facebookexternalhit|whatsapp|telegram|headless|lighthouse|vercel-screenshot|curl|wget|python|axios|node-fetch/i;

export function isBot(userAgent: string | null): boolean {
  return !userAgent || BOT_RE.test(userAgent);
}

/**
 * Çerez kullanmadan, kişisel veri saklamadan tekil ziyaretçi kimliği:
 * IP + tarayıcı bilgisinin tuzlu özeti. Ham IP hiçbir yerde tutulmaz.
 */
export function visitorHash(ip: string, userAgent: string): string {
  const salt =
    process.env.ANALYTICS_SALT || process.env.ADMIN_PASSWORD || "yn-analytics";
  return createHash("sha256")
    .update(`${salt}|${ip}|${userAgent}`)
    .digest("hex")
    .slice(0, 24);
}

export function deviceFromUserAgent(ua: string): string {
  if (/ipad|tablet|(android(?!.*mobile))/i.test(ua)) return "Tablet";
  if (/mobi|iphone|android/i.test(ua)) return "Mobil";
  return "Masaüstü";
}

export function referrerLabel(referrer: string, ownHost: string): string {
  if (!referrer) return "Doğrudan / Bilinmiyor";
  try {
    const host = new URL(referrer).hostname.replace(/^www\./, "");
    if (!host || host === ownHost.replace(/^www\./, "")) return "Doğrudan / Bilinmiyor";
    if (/instagram\./.test(host)) return "Instagram";
    if (/(^|\.)google\./.test(host)) return "Google";
    if (/facebook\.|fb\./.test(host)) return "Facebook";
    if (/linkedin\./.test(host)) return "LinkedIn";
    if (/youtube\.|youtu\.be/.test(host)) return "YouTube";
    if (/t\.co$|twitter\.|x\.com/.test(host)) return "X (Twitter)";
    if (/bing\./.test(host)) return "Bing";
    if (/yandex\./.test(host)) return "Yandex";
    return host.slice(0, 60);
  } catch {
    return "Doğrudan / Bilinmiyor";
  }
}

export async function recordEvent(params: {
  event: TrackableEvent;
  visitorId: string;
  device: string;
  referrer: string;
  placement?: string;
}): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  const day = istanbulDay();
  const p = redis.pipeline();

  if (params.event === "pageview") {
    p.incr(k.pv(day));
    p.pfadd(k.uv(day), params.visitorId);
    p.hincrby(k.ref(day), params.referrer, 1);
    p.hincrby(k.dev(day), params.device, 1);
    for (const key of [k.pv(day), k.uv(day), k.ref(day), k.dev(day)]) {
      p.expire(key, KEY_TTL_SECONDS);
    }
  } else if (params.event === "instagram_click") {
    p.incr(k.ig(day));
    p.hincrby(k.igPlace(day), params.placement || "Diğer", 1);
    p.expire(k.ig(day), KEY_TTL_SECONDS);
    p.expire(k.igPlace(day), KEY_TTL_SECONDS);
  } else if (params.event === "email_click") {
    p.incr(k.em(day));
    p.expire(k.em(day), KEY_TTL_SECONDS);
  } else if (params.event === "demo_cta_click") {
    p.incr(k.cta(day));
    p.expire(k.cta(day), KEY_TTL_SECONDS);
  }

  await p.exec();
}

export async function recordContactSubmission(
  data: Omit<ContactRecord, "id" | "createdAt">
): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  const day = istanbulDay();
  const record: ContactRecord = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...data,
  };
  const p = redis.pipeline();
  p.incr(k.cf(day));
  p.expire(k.cf(day), KEY_TTL_SECONDS);
  p.incr(k.contactsTotal);
  p.lpush(k.contacts, JSON.stringify(record));
  p.ltrim(k.contacts, 0, MAX_CONTACTS - 1);
  await p.exec();
}

function toNum(v: unknown): number {
  const n = Number(v ?? 0);
  return Number.isFinite(n) ? n : 0;
}

function sumHashes(
  hashes: (Record<string, unknown> | null)[]
): { name: string; count: number }[] {
  const acc = new Map<string, number>();
  for (const h of hashes) {
    if (!h) continue;
    for (const [name, v] of Object.entries(h)) {
      acc.set(name, (acc.get(name) ?? 0) + toNum(v));
    }
  }
  return [...acc.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

function parseContact(raw: unknown): ContactRecord | null {
  if (!raw) return null;
  if (typeof raw === "object") return raw as ContactRecord;
  try {
    return JSON.parse(String(raw)) as ContactRecord;
  } catch {
    return null;
  }
}

export async function getStatsReport(rangeDays: number): Promise<StatsReport> {
  const days = lastNDays(rangeDays);
  const empty = {
    pageviews: 0,
    visitors: 0,
    instagramClicks: 0,
    emailClicks: 0,
    demoCtaClicks: 0,
    contactSubmissions: 0,
  };
  const redis = getRedis();
  if (!redis) {
    return {
      configured: false,
      rangeDays,
      totals: empty,
      daily: days.map((day) => ({ day, ...empty })),
      referrers: [],
      devices: [],
      instagramPlacements: [],
      contacts: [],
      contactsTotal: 0,
    };
  }

  const p = redis.pipeline();
  for (const d of days) {
    p.get(k.pv(d));
    p.pfcount(k.uv(d));
    p.get(k.ig(d));
    p.get(k.em(d));
    p.get(k.cta(d));
    p.get(k.cf(d));
  }
  for (const d of days) p.hgetall(k.ref(d));
  for (const d of days) p.hgetall(k.dev(d));
  for (const d of days) p.hgetall(k.igPlace(d));
  // Seçilen aralıktaki tekil ziyaretçi (aynı kişi birden çok gün gelse de 1 sayılır)
  p.pfcount(days.map(k.uv)[0], ...days.map(k.uv).slice(1));
  p.lrange(k.contacts, 0, 199);
  p.get(k.contactsTotal);

  const res = (await p.exec()) as unknown[];
  let i = 0;
  const daily: DailyStat[] = days.map((day) => ({
    day,
    pageviews: toNum(res[i++]),
    visitors: toNum(res[i++]),
    instagramClicks: toNum(res[i++]),
    emailClicks: toNum(res[i++]),
    demoCtaClicks: toNum(res[i++]),
    contactSubmissions: toNum(res[i++]),
  }));
  const refs = res.slice(i, (i += days.length)) as (Record<string, unknown> | null)[];
  const devs = res.slice(i, (i += days.length)) as (Record<string, unknown> | null)[];
  const igp = res.slice(i, (i += days.length)) as (Record<string, unknown> | null)[];
  const uniqueVisitors = toNum(res[i++]);
  const rawContacts = (res[i++] as unknown[]) ?? [];
  const contactsTotal = toNum(res[i++]);

  const since = new Date(`${days[0]}T00:00:00+03:00`).getTime();
  const contacts = rawContacts
    .map(parseContact)
    .filter((c): c is ContactRecord => !!c)
    .filter((c) => new Date(c.createdAt).getTime() >= since);

  const totals = daily.reduce(
    (t, d) => ({
      pageviews: t.pageviews + d.pageviews,
      visitors: t.visitors,
      instagramClicks: t.instagramClicks + d.instagramClicks,
      emailClicks: t.emailClicks + d.emailClicks,
      demoCtaClicks: t.demoCtaClicks + d.demoCtaClicks,
      contactSubmissions: t.contactSubmissions + d.contactSubmissions,
    }),
    { ...empty, visitors: uniqueVisitors }
  );

  return {
    configured: true,
    rangeDays,
    totals,
    daily,
    referrers: sumHashes(refs),
    devices: sumHashes(devs),
    instagramPlacements: sumHashes(igp),
    contacts,
    contactsTotal,
  };
}
