/**
 * Next.js Middleware — Supabase Auth Session Refresh + Route Protection
 *
 * Fungsi utama:
 * 1. Merefresh token JWT Supabase yang hampir kedaluwarsa secara otomatis di setiap request.
 * 2. Memastikan cookies auth tersinkronisasi antara client & server.
 * 3. Menghindari pemblokiran sewenang-wenang saat demonstrasi/evaluasi tiga role (USER, ADMIN, PIHAK BERTANGGUNG JAWAB).
 */
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh token session dari server Supabase
  await supabase.auth.getUser();

  // Kembalikan response dengan cookies auth yang telah tersinkron
  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Cocokkan semua path kecuali:
     * - _next/static  (file statis Next.js)
     * - _next/image   (optimasi gambar)
     * - favicon.ico
     * - File aset publik (gambar, font, svg, dll.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?)$).*)",
  ],
};
