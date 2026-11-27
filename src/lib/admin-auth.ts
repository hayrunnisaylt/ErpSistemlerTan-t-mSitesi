/**
 * Basit, tek şifreli admin oturumu.
 *
 * Ortam değişkenleri:
 *   ADMIN_PASSWORD        → /admin giriş şifresi (zorunlu)
 *   ADMIN_SESSION_SECRET  → oturum imzası için gizli anahtar (önerilir;
 *                           yoksa ADMIN_PASSWORD kullanılır)
 *
 * Yalnızca sunucuda (route handler'larda) kullanılır.
 */
import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE = "yn_admin";
export const ADMIN_SESSION_SECONDS = 60 * 60 * 24 * 7; // 7 gün

function secret(): string | null {
  return (
    process.env.ADMIN_SESSION_SECRET?.trim() ||
    process.env.ADMIN_PASSWORD?.trim() ||
    null
  );
}

function sign(payload: string, key: string): string {
  return createHmac("sha256", key).update(payload).digest("base64url");
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

export function isAdminConfigured(): boolean {
  return !!process.env.ADMIN_PASSWORD?.trim();
}

export function checkPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD?.trim();
  if (!expected) return false;
  // Uzunluk sızdırmamak için iki tarafı da özetleyip karşılaştır
  const h = (v: string) => createHmac("sha256", "pw").update(v).digest("hex");
  return safeEqual(h(input), h(expected));
}

export function createSessionToken(): string | null {
  const key = secret();
  if (!key) return null;
  const exp = String(Math.floor(Date.now() / 1000) + ADMIN_SESSION_SECONDS);
  return `${exp}.${sign(exp, key)}`;
}

export function isValidSessionToken(token: string | undefined | null): boolean {
  const key = secret();
  if (!key || !token) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig) return false;
  if (Number(exp) * 1000 < Date.now()) return false;
  return safeEqual(sig, sign(exp, key));
}
