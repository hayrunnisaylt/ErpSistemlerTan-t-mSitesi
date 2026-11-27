"use client";

import { useEffect } from "react";

type ClientEvent =
  | "pageview"
  | "instagram_click"
  | "email_click"
  | "demo_cta_click";

export function trackEvent(event: ClientEvent, extra?: { placement?: string }) {
  try {
    const body = JSON.stringify({
      event,
      referrer: event === "pageview" ? document.referrer : undefined,
      placement: extra?.placement,
    });
    // sendBeacon sayfa kapanırken / dış linke giderken de gönderimi garanti eder
    if (navigator.sendBeacon?.(
      "/api/track",
      new Blob([body], { type: "text/plain" })
    )) {
      return;
    }
    void fetch("/api/track", { method: "POST", body, keepalive: true });
  } catch {
    // İstatistik hatası siteyi asla bozmasın
  }
}

let pageviewSent = false;

/**
 * Çerezsiz ziyaret sayacı + tıklama takibi.
 * - Sayfa açılışında 1 "pageview" gönderir.
 * - Instagram linkleri, mailto linkleri ve "#iletisim" (Demo talep) butonlarına
 *   yapılan tıklamaları otomatik yakalar. Instagram linklerine
 *   data-track-placement="..." verilirse panelde hangi butondan tıklandığı görünür.
 */
export function SiteAnalytics() {
  useEffect(() => {
    if (!pageviewSent) {
      pageviewSent = true;
      trackEvent("pageview");
    }

    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const link = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      if (/instagram\.com/i.test(href)) {
        trackEvent("instagram_click", {
          placement: link.dataset.trackPlacement || "Diğer",
        });
      } else if (href.startsWith("mailto:")) {
        trackEvent("email_click");
      } else if (href === "#iletisim") {
        trackEvent("demo_cta_click");
      }
    };

    document.addEventListener("click", onClick, { capture: true });
    return () =>
      document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
