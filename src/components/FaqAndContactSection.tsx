"use client";

import { useRef, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  Clock,
  Loader2,
  Mail,
  MapPin,
  Send,
} from "lucide-react";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { siteConfig } from "@/lib/site-config";

export const sectorOptions = [
  "Toptancı & Gıda / İçecek Dağıtım",
  "Veteriner Kliniği & Ecza / Petshop",
  "Fizyoterapi & Klinik Pilates",
  "Atölye & Küçük İşletme ERP",
  ...siteConfig.sectorsData.map((s) => s.name),
  "Diğer Sektör / Özel Proje",
];

interface FaqAndContactSectionProps {
  sector: string;
  onSectorChange: (value: string) => void;
}

export function FaqAndContactSection({
  sector,
  onSectorChange,
}: FaqAndContactSectionProps) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // Honeypot spam koruması
  const [errors, setErrors] = useState<{ fullName?: string; phone?: string }>(
    {}
  );
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const validateField = (field: "fullName" | "phone", value: string) => {
    const trimmed = value.trim();
    if (field === "fullName") {
      return trimmed.length < 2
        ? "Lütfen adınızı ve soyadınızı girin."
        : undefined;
    }
    const digits = trimmed.replace(/\D/g, "");
    return digits.length < 10
      ? "Lütfen geçerli bir telefon numarası girin (örn: 0532 123 45 67)."
      : undefined;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);

    const nameErr = validateField("fullName", fullName);
    const phoneErr = validateField("phone", phone);

    if (nameErr || phoneErr) {
      setErrors({ fullName: nameErr, phone: phoneErr });
      if (nameErr) nameRef.current?.focus();
      else if (phoneErr) phoneRef.current?.focus();
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          sector,
          phone: phone.trim(),
          message: message.trim(),
          website,
        }),
      });

      const result = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };

      if (!response.ok || !result.ok) {
        setSubmitError(
          result.error ||
            "Talebiniz gönderilirken bir hata oluştu. Lütfen tekrar deneyin."
        );
        return;
      }

      setSubmitted(true);
    } catch {
      setSubmitError(
        "Bağlantı hatası oluştu. Lütfen internet bağlantınızı kontrol edip tekrar deneyin."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* FAQ SECTION */}
      <section
        id="sss"
        aria-labelledby="faq-heading"
        className="faq-accordion relative scroll-mt-20 border-b border-[#1b1b1b]/10 bg-[#eeede9] py-20 sm:py-28"
      >
        <div className="scroll-reveal mx-auto max-w-5xl px-4 sm:px-6 lg:px-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-800">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-emerald-700/60" aria-hidden="true" />
              <span>Merak Edilenler</span>
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-emerald-700/60" aria-hidden="true" />
            </div>
            <h2
              id="faq-heading"
              className="mt-4 text-3xl font-bold tracking-tight text-[#1b1b1b] sm:text-4xl"
            >
              Sıkça Sorulan Sorular
            </h2>
            <p className="mt-3 text-base text-[#1b1b1b]/70">
              Kurulum, güvenlik, mobil kullanım ve fiyatlandırma hakkında en
              çok sorulan soruların net yanıtları.
            </p>
          </div>

          <div className="mt-10 space-y-3">
            {siteConfig.faqItems.map((item, idx) => (
              <details
                key={item.q}
                open={idx === 0}
                className="group rounded-2xl border border-[#1b1b1b]/12 bg-white/80 shadow-sm transition-colors open:border-emerald-700/35 open:bg-white"
              >
                <summary className="flex items-center gap-3 px-5 py-4 text-left text-base font-semibold text-[#1b1b1b] sm:px-6 sm:py-5">
                  <ChevronDown
                    className="faq-chevron h-5 w-5 shrink-0 text-emerald-700"
                    aria-hidden="true"
                  />
                  <span>{item.q}</span>
                </summary>
                <div className="px-5 pb-5 pl-13 text-sm leading-relaxed text-[#1b1b1b]/75 sm:px-6 sm:pb-6 sm:pl-14 sm:text-base">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT & DEMO REQUEST SECTION */}
      <section
        id="iletisim"
        aria-labelledby="contact-heading"
        className="relative scroll-mt-20 overflow-hidden bg-[#eeede9] py-20 sm:py-28"
      >
        <div className="scroll-reveal relative mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
            {/* Left: Quick Contact Info & WhatsApp Card */}
            <div className="space-y-6 lg:col-span-5">
              <div>
                <div className="inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-800">
                  <span className="h-[2px] w-6 rounded-full bg-emerald-700" aria-hidden="true" />
                  <span>Ücretsiz 15 Dk Canlı Demo</span>
                </div>
                <h2
                  id="contact-heading"
                  className="mt-4 text-3xl font-bold tracking-tight text-[#1b1b1b] sm:text-4xl"
                >
                  İşletmenizi Birlikte Dijitalleştirelim
                </h2>
                <p className="mt-3 text-base leading-relaxed text-[#1b1b1b]/70">
                  Formu doldurun, talebiniz anında e-posta ile ekibimize
                  ulaşsın; aynı gün içinde sektörünüze özel canlı ekran
                  sunumunuzu planlayalım.
                </p>
              </div>

              {/* Direct Email Card */}
              <div className="rounded-3xl border border-[#1b1b1b]/15 bg-[#1b1b1b] p-6 text-stone-100 shadow-xl">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-stone-950 shadow-lg shadow-emerald-500/25">
                    <Mail className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-base font-bold text-white">
                      E-Posta ile Doğrudan Ulaşın
                    </p>
                    <p className="text-xs text-emerald-300">
                      Aynı gün içinde hızlı dönüş
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-stone-300">
                  Projeniz, sektörünüz veya canlı demo talebiniz için bize
                  doğrudan e-posta gönderebilirsiniz.
                </p>
                <a
                  href={`mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
                    `${siteConfig.brandName} — Canlı Demo Talebi`
                  )}`}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3.5 text-sm font-bold text-stone-950 shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-400"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  <span>{siteConfig.contact.email}</span>
                </a>
              </div>

              {/* Direct Contact Info */}
              <div className="space-y-3 rounded-3xl border border-[#1b1b1b]/12 bg-white/80 p-6 text-sm text-[#1b1b1b]/80 shadow-sm">
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center gap-3 font-medium transition-colors hover:text-[#1b1b1b]"
                >
                  <Mail
                    className="h-4 w-4 text-emerald-700"
                    aria-hidden="true"
                  />
                  <span>{siteConfig.contact.email}</span>
                </a>
                <a
                  href={siteConfig.social.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track-placement="İletişim Bölümü"
                  className="flex items-center gap-3 font-medium transition-colors hover:text-pink-700"
                >
                  <InstagramIcon className="h-4 w-4 text-pink-600" />
                  <span>{siteConfig.social.instagram.handle}</span>
                </a>
                <div className="flex items-center gap-3 text-[#1b1b1b]/70">
                  <MapPin
                    className="h-4 w-4 text-amber-600"
                    aria-hidden="true"
                  />
                  <span>{siteConfig.contact.location}</span>
                </div>
                <div className="flex items-center gap-3 text-[#1b1b1b]/70">
                  <Clock className="h-4 w-4 text-[#1b1b1b]/55" aria-hidden="true" />
                  <span>{siteConfig.contact.workingHours}</span>
                </div>
              </div>
            </div>

            {/* Right: Demo / Quote Request Form (Email API) */}
            <div className="rounded-3xl border border-[#1b1b1b]/12 bg-white/90 p-6 shadow-xl shadow-[#1b1b1b]/5 sm:p-8 lg:col-span-7">
              <h3
                id="demo-form-title"
                className="text-xl font-bold text-[#1b1b1b]"
              >
                Demo &amp; Teklif Talep Formu
              </h3>
              <p className="mt-1 text-sm text-[#1b1b1b]/65">
                Bilgilerinizi bırakın; talebiniz anında ekibimize iletilsin ve
                sizi arayalım.
              </p>

              {submitted ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="mt-6 rounded-2xl border border-emerald-700/25 bg-emerald-600/10 p-6"
                >
                  <div className="flex items-center gap-2.5 text-emerald-800">
                    <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
                    <p className="text-lg font-bold text-[#1b1b1b]">
                      Talebiniz Bize Ulaştı, {fullName}!
                    </p>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-[#1b1b1b]/80">
                    <strong>{sector}</strong> sektörü için canlı demo talebiniz
                    ekibimize e-posta olarak iletildi. En kısa sürede{" "}
                    <strong>{phone}</strong> numarasından sizinle iletişime
                    geçeceğiz.
                  </p>
                  <div className="mt-5">
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFullName("");
                        setPhone("");
                        setMessage("");
                        setSubmitError(null);
                      }}
                      className="rounded-2xl border border-[#1b1b1b]/15 bg-white px-4 py-3 text-sm font-semibold text-[#1b1b1b] transition-colors hover:bg-[#eeede9]"
                    >
                      Yeni Talep Oluştur
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  action="/api/contact"
                  method="POST"
                  onSubmit={handleSubmit}
                  aria-labelledby="demo-form-title"
                  noValidate
                  className="mt-6 space-y-5"
                >
                  {/* Invisible Honeypot Field for Spam Protection */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="demo-website">Website</label>
                    <input
                      id="demo-website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </div>

                  {/* Full Name */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="demo-fullname"
                      className="text-sm font-semibold text-[#1b1b1b]"
                    >
                      Ad Soyad{" "}
                      <span aria-hidden="true" className="text-emerald-700">
                        *
                      </span>
                    </label>
                    <input
                      ref={nameRef}
                      id="demo-fullname"
                      name="fullName"
                      type="text"
                      required
                      autoComplete="name"
                      enterKeyHint="next"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (errors.fullName) {
                          setErrors((prev) => ({
                            ...prev,
                            fullName: undefined,
                          }));
                        }
                      }}
                      onBlur={(e) => {
                        if (e.target.value.trim()) {
                          setErrors((prev) => ({
                            ...prev,
                            fullName: validateField("fullName", e.target.value),
                          }));
                        }
                      }}
                      aria-invalid={Boolean(errors.fullName)}
                      aria-describedby={
                        errors.fullName ? "fullname-error" : undefined
                      }
                      placeholder="Örn: Ahmet Yılmaz"
                      className="nova-input w-full rounded-2xl border border-[#1b1b1b]/20 bg-[#eeede9]/50 px-4 py-3 text-[#1b1b1b] placeholder:text-[#1b1b1b]/45 transition-colors focus:border-emerald-700 focus:bg-white"
                    />
                    {errors.fullName && (
                      <p
                        id="fullname-error"
                        className="text-xs font-medium text-rose-600"
                      >
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Sector Select */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="demo-sector"
                      className="text-sm font-semibold text-[#1b1b1b]"
                    >
                      İşletme Sektörünüz{" "}
                      <span aria-hidden="true" className="text-emerald-700">
                        *
                      </span>
                    </label>
                    <select
                      id="demo-sector"
                      name="sector"
                      required
                      value={sector}
                      onChange={(e) => onSectorChange(e.target.value)}
                      className="nova-input w-full rounded-2xl border border-[#1b1b1b]/20 bg-[#eeede9]/50 px-4 py-3 text-[#1b1b1b] transition-colors focus:border-emerald-700 focus:bg-white"
                    >
                      {sectorOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="demo-phone"
                      className="text-sm font-semibold text-[#1b1b1b]"
                    >
                      Telefon Numaranız{" "}
                      <span aria-hidden="true" className="text-emerald-700">
                        *
                      </span>
                    </label>
                    <input
                      ref={phoneRef}
                      id="demo-phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      enterKeyHint="next"
                      required
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) {
                          setErrors((prev) => ({ ...prev, phone: undefined }));
                        }
                      }}
                      onBlur={(e) => {
                        if (e.target.value.trim()) {
                          setErrors((prev) => ({
                            ...prev,
                            phone: validateField("phone", e.target.value),
                          }));
                        }
                      }}
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={
                        errors.phone ? "phone-error" : "phone-help"
                      }
                      placeholder="05XX XXX XX XX"
                      className="nova-input w-full rounded-2xl border border-[#1b1b1b]/20 bg-[#eeede9]/50 px-4 py-3 text-[#1b1b1b] placeholder:text-[#1b1b1b]/45 transition-colors focus:border-emerald-700 focus:bg-white"
                    />
                    {errors.phone ? (
                      <p
                        id="phone-error"
                        className="text-xs font-medium text-rose-600"
                      >
                        {errors.phone}
                      </p>
                    ) : (
                      <p id="phone-help" className="text-xs text-[#1b1b1b]/55">
                        Sadece canlı demo randevusu için arıyoruz; spam yapmayız.
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="demo-message"
                      className="text-sm font-semibold text-[#1b1b1b]"
                    >
                      Kısaca İhtiyacınız (İsteğe bağlı)
                    </label>
                    <textarea
                      id="demo-message"
                      name="message"
                      rows={3}
                      enterKeyHint="done"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Örn: Günde 15 alış faturamız geliyor, stok ve veresiye takibi yapmak istiyoruz..."
                      className="w-full rounded-2xl border border-[#1b1b1b]/20 bg-[#eeede9]/50 px-4 py-3 text-base text-[#1b1b1b] placeholder:text-[#1b1b1b]/45 transition-colors focus:border-emerald-700 focus:bg-white"
                    />
                  </div>

                  {/* Server Error Alert */}
                  {submitError && (
                    <div
                      role="alert"
                      className="flex items-start gap-2.5 rounded-2xl border border-rose-600/25 bg-rose-600/10 px-4 py-3 text-sm text-rose-800"
                    >
                      <AlertCircle
                        className="mt-0.5 h-4 w-4 shrink-0 text-rose-600"
                        aria-hidden="true"
                      />
                      <span>{submitError}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-2xl bg-[#1b1b1b] px-6 py-3.5 text-sm font-bold text-[#eeede9] shadow-lg shadow-[#1b1b1b]/15 transition-all hover:bg-emerald-700 hover:text-white disabled:cursor-wait disabled:opacity-75"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2
                            className="h-4 w-4 animate-spin"
                            aria-hidden="true"
                          />
                          <span>Talebiniz Gönderiliyor...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" aria-hidden="true" />
                          <span>Ücretsiz Canlı Demo Talep Et</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
