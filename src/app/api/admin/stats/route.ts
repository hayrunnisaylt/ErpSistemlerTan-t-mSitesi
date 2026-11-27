import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, isValidSessionToken } from "@/lib/admin-auth";
import { getStatsReport } from "@/lib/analytics-store";

const ALLOWED_RANGES = [1, 7, 30, 90, 365];

export async function GET(request: NextRequest) {
  if (!isValidSessionToken(request.cookies.get(ADMIN_COOKIE)?.value)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const requested = Number(request.nextUrl.searchParams.get("days") ?? 30);
  const days = ALLOWED_RANGES.includes(requested) ? requested : 30;

  try {
    const report = await getStatsReport(days);
    return NextResponse.json(
      { ok: true, report },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    console.error("[GET /api/admin/stats]", err);
    return NextResponse.json(
      { ok: false, error: "Veriler alınamadı. Redis bağlantısını kontrol edin." },
      { status: 500 }
    );
  }
}
