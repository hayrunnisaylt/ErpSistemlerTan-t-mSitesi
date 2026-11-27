import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { recordContactSubmission } from "@/lib/analytics-store";
import { siteConfig } from "@/lib/site-config";

interface ContactPayload {
  fullName?: string;
  sector?: string;
  phone?: string;
  message?: string;
  /** Spam botlarını yakalamak için gizli honeypot alanı */
  website?: string;
}

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 dakika
const RATE_LIMIT_MAX = 5;
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count += 1;
  return true;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildEmailContent(data: {
  fullName: string;
  sector: string;
  phone: string;
  message: string;
}) {
  const submittedAt = new Intl.DateTimeFormat("tr-TR", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Europe/Istanbul",
  }).format(new Date());

  const subject = `Yeni Demo Talebi: ${data.fullName} (${data.sector})`;

  const text = [
    `${siteConfig.brandName} — Yeni Demo / İletişim Talebi`,
    `--------------------------------------------------`,
    `Ad Soyad : ${data.fullName}`,
    `Sektör   : ${data.sector}`,
    `Telefon  : ${data.phone}`,
    `Mesaj    : ${data.message || "(Mesaj bırakılmadı)"}`,
    `Tarih    : ${submittedAt}`,
  ].join("\n");

  const html = `
    <div style="background-color:#eeede9;padding:32px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#1b1b1b;">
      <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid rgba(27,27,27,0.12);border-radius:16px;overflow:hidden;">
        <div style="background:#1b1b1b;color:#eeede9;padding:20px 24px;">
          <p style="margin:0;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#34d399;font-weight:700;">
            Yeni Canlı Demo Talebi
          </p>
          <h1 style="margin:6px 0 0;font-size:20px;font-weight:700;color:#ffffff;">
            ${escapeHtml(siteConfig.brandName)}
          </h1>
        </div>
        <div style="padding:24px;">
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #eeede9;color:#666;width:130px;">Ad Soyad</td>
              <td style="padding:10px 0;border-bottom:1px solid #eeede9;font-weight:600;color:#1b1b1b;">${escapeHtml(data.fullName)}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #eeede9;color:#666;">Sektör</td>
              <td style="padding:10px 0;border-bottom:1px solid #eeede9;font-weight:600;color:#047857;">${escapeHtml(data.sector)}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #eeede9;color:#666;">Telefon</td>
              <td style="padding:10px 0;border-bottom:1px solid #eeede9;font-weight:600;color:#1b1b1b;">
                <a href="tel:${escapeHtml(data.phone.replace(/\s+/g, ""))}" style="color:#1b1b1b;text-decoration:none;">
                  ${escapeHtml(data.phone)}
                </a>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 0;color:#666;vertical-align:top;">Not / Mesaj</td>
              <td style="padding:10px 0;color:#1b1b1b;line-height:1.5;white-space:pre-line;">
                ${data.message ? escapeHtml(data.message) : "<span style='color:#888;'>Mesaj bırakılmadı.</span>"}
              </td>
            </tr>
          </table>
          <p style="margin:20px 0 0;padding-top:14px;border-top:1px solid #eeede9;font-size:12px;color:#777;">
            Gönderim zamanı: ${escapeHtml(submittedAt)} (TR)
          </p>
        </div>
      </div>
    </div>
  `;

  return { subject, text, html };
}

async function sendWithResend(params: {
  apiKey: string;
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
}) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${params.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: params.from,
      to: [params.to],
      subject: params.subject,
      text: params.text,
      html: params.html,
    }),
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => "");
    throw new Error(`Resend API error (${response.status}): ${errText}`);
  }
}

async function sendWithSmtp(params: {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
}) {
  const transporter = nodemailer.createTransport({
    host: params.host,
    port: params.port,
    secure: params.port === 465,
    auth: {
      user: params.user,
      pass: params.pass,
    },
  });

  await transporter.sendMail({
    from: params.from,
    to: params.to,
    subject: params.subject,
    text: params.text,
    html: params.html,
  });
}

async function sendNotificationEmail(params: {
  toEmail: string;
  subject: string;
  text: string;
  html: string;
}): Promise<"resend" | "smtp" | null> {
  const { toEmail, subject, text, html } = params;
  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  const smtpHost = process.env.SMTP_HOST?.trim();
  const smtpUser = process.env.SMTP_USER?.trim();
  const smtpPass = process.env.SMTP_PASS?.trim();

  if (resendApiKey) {
    const fromEmail =
      process.env.CONTACT_FROM_EMAIL?.trim() ||
      `${siteConfig.brandName} <onboarding@resend.dev>`;
    await sendWithResend({
      apiKey: resendApiKey,
      from: fromEmail,
      to: toEmail,
      subject,
      text,
      html,
    });
    return "resend";
  }

  if (smtpHost && smtpUser && smtpPass) {
    const smtpPort = Number(process.env.SMTP_PORT || "465");
    const fromEmail =
      process.env.CONTACT_FROM_EMAIL?.trim() ||
      `"${siteConfig.brandName}" <${smtpUser}>`;
    await sendWithSmtp({
      host: smtpHost,
      port: Number.isNaN(smtpPort) ? 465 : smtpPort,
      user: smtpUser,
      pass: smtpPass,
      from: fromEmail,
      to: toEmail,
      subject,
      text,
      html,
    });
    return "smtp";
  }

  return null;
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Çok fazla talep gönderdiniz. Lütfen birkaç dakika sonra tekrar deneyin.",
        },
        { status: 429 }
      );
    }

    const body = (await request.json().catch(() => null)) as ContactPayload | null;
    if (!body) {
      return NextResponse.json(
        { ok: false, error: "Geçersiz istek formatı." },
        { status: 400 }
      );
    }

    // Honeypot doluysa spam bottur: sessizce başarılı dön, e-posta gönderme
    if (body.website && body.website.trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    const fullName = (body.fullName ?? "").trim();
    const sector = (body.sector ?? "").trim();
    const phone = (body.phone ?? "").trim();
    const message = (body.message ?? "").trim();

    if (fullName.length < 2 || fullName.length > 120) {
      return NextResponse.json(
        { ok: false, error: "Lütfen geçerli bir ad ve soyad girin." },
        { status: 400 }
      );
    }

    if (sector.length < 2 || sector.length > 120) {
      return NextResponse.json(
        { ok: false, error: "Lütfen işletme sektörünüzü seçin." },
        { status: 400 }
      );
    }

    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      return NextResponse.json(
        { ok: false, error: "Lütfen geçerli bir telefon numarası girin." },
        { status: 400 }
      );
    }

    if (message.length > 2000) {
      return NextResponse.json(
        { ok: false, error: "Mesajınız en fazla 2000 karakter olabilir." },
        { status: 400 }
      );
    }

    const toEmail = process.env.CONTACT_TO_EMAIL || siteConfig.contact.email;
    const { subject, text, html } = buildEmailContent({
      fullName,
      sector,
      phone,
      message,
    });

    let provider: "resend" | "smtp" | null = null;
    let sendError: unknown = null;
    try {
      provider = await sendNotificationEmail({ toEmail, subject, text, html });
    } catch (err) {
      sendError = err;
    }

    // Admin paneli için başvuruyu kaydet (e-posta gitmese bile kaybolmasın)
    try {
      await recordContactSubmission({
        fullName,
        sector,
        phone,
        message,
        emailDelivered: provider !== null,
      });
    } catch (err) {
      console.error("[POST /api/contact] Başvuru kaydedilemedi:", err);
    }

    if (sendError) throw sendError;
    if (provider) return NextResponse.json({ ok: true, provider });

    console.error(
      "[POST /api/contact] E-posta sağlayıcısı yapılandırılmamış. RESEND_API_KEY veya SMTP_* ortam değişkenlerini ekleyin."
    );
    return NextResponse.json(
      {
        ok: false,
        error:
          "E-posta servisi henüz yapılandırılmamış. Lütfen doğrudan ynsoftwaresolution@gmail.com adresinden bize ulaşın.",
      },
      { status: 503 }
    );
  } catch (err) {
    console.error("[POST /api/contact] Gönderim hatası:", err);
    return NextResponse.json(
      {
        ok: false,
        error:
          "Talebiniz gönderilirken bir sorun oluştu. Lütfen tekrar deneyin.",
      },
      { status: 500 }
    );
  }
}
