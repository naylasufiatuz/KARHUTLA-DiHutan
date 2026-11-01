/**
 * Auth Callback Route Handler
 *
 * Digunakan untuk menyelesaikan alur OAuth (Google, GitHub, dll.)
 * dan Magic Link setelah Supabase redirect kembali ke aplikasi.
 *
 * Supabase mengirim kode sementara (code) via query param.
 * Route ini menukarnya dengan session cookies yang sesungguhnya.
 *
 * URL Callback yang perlu didaftarkan di Supabase Dashboard:
 * - Development : http://localhost:3000/auth/callback
 * - Production  : https://yourdomain.com/auth/callback
 */
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // Jika ada param 'next', gunakan sebagai tujuan redirect setelah login
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";

      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // Jika gagal, redirect ke beranda dengan error param
  const errorUrl = new URL("/", origin);
  errorUrl.searchParams.set("auth_error", "callback_failed");
  return NextResponse.redirect(errorUrl);
}

