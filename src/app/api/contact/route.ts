import { NextResponse } from "next/server";

/**
 * ENDPOINT SERVER-SIDE FORM DISPATCH (/api/contact)
 * Tanpa kredensial/secret di frontend.
 * Memvalidasi input di sisi server dan mengembalikan respons JSON deterministik.
 */

interface ContactPayload {
  name?: string;
  email?: string;
  scope?: string;
  message?: string;
  simulateError?: boolean;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;

    if (body.simulateError) {
      return NextResponse.json(
        {
          ok: false,
          code: "ERR_DISPATCH_GATEWAY",
          error:
            "Simulasi kegagalan gateway dispatch aktif. Gunakan saluran langsung mailto:owner@seaavey.com.",
        },
        { status: 503 }
      );
    }

    const name = (body.name ?? "").trim();
    const email = (body.email ?? "").trim();
    const scope = (body.scope ?? "WEB_OR_GATEWAY").trim();
    const message = (body.message ?? "").trim();

    if (!name || name.length < 2) {
      return NextResponse.json(
        { ok: false, code: "ERR_INVALID_NAME", error: "Nama pengirim minimal 2 karakter." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { ok: false, code: "ERR_INVALID_EMAIL", error: "Format alamat email tidak valid." },
        { status: 400 }
      );
    }

    if (!message || message.length < 10) {
      return NextResponse.json(
        {
          ok: false,
          code: "ERR_SHORT_PAYLOAD",
          error: "Pesan spesifikasi proyek minimal 10 karakter.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        ok: true,
        dispatchId: `DSPX-${Date.now().toString(36).toUpperCase()}`,
        timestamp: new Date().toISOString(),
        recipient: "owner@seaavey.com",
        scope,
        message: "Transmisi diterima oleh endpoint server. Estimasi waktu respons: 24–48 jam (UTC+7).",
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        ok: false,
        code: "ERR_PARSE_FAILURE",
        error: "Payload JSON tidak dapat diproses. Silakan hubungi langsung melalui owner@seaavey.com.",
      },
      { status: 400 }
    );
  }
}
