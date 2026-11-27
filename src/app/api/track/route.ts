import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, isValidSessionToken } from "@/lib/admin-auth";
import {
  TRACKABLE_EVENTS,
  deviceFromUserAgent,
  isBot,
  recordEvent,
  referrerLabel,
  visitorHash,
  type TrackableEvent,
} from "@/lib/analytics-store";

interface TrackPayload {
  event?: string;
  referrer?: string;
  placement?: string;
}

export async function POST(request: NextRequest) {
  try {
    const ua = request.headers.get("user-agent");
    // Botları ve admin'in kendi ziyaretlerini sayma
    if (
      isBot(ua) ||
      isValidSessionToken(request.cookies.get(ADMIN_COOKIE)?.value)
    ) {
      return new NextResponse(null, { status: 204 });
    }

    // sendBeacon text/plain gönderir; JSON olarak çözüyoruz
    const body = (await request
      .text()
      .then((t) => JSON.parse(t))
      .catch(() => null)) as TrackPayload | null;
    const event = body?.event as TrackableEvent | undefined;
    if (!event || !TRACKABLE_EVENTS.includes(event)) {
      return new NextResponse(null, { status: 204 });
    }

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    await recordEvent({
      event,
      visitorId: visitorHash(ip, ua ?? ""),
      device: deviceFromUserAgent(ua ?? ""),
      referrer: referrerLabel(
        String(body?.referrer ?? "").slice(0, 500),
        request.nextUrl.hostname
      ),
      placement: String(body?.placement ?? "").slice(0, 40) || undefined,
    });
  } catch (err) {
    console.error("[POST /api/track]", err);
  }
  return new NextResponse(null, { status: 204 });
}
