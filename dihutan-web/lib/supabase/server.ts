/**
 * Supabase SERVER client — gunakan di Server Components, Server Actions, dan Route Handlers.
 *
 * Client ini membaca & menulis cookies lewat next/headers agar sesi auth
 * bisa diakses di server-side dengan aman.
 *
 * JANGAN gunakan di Client Components ('use client') — gunakan lib/supabase/client.ts.
 */
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    // Mendukung kedua nama env: standar Supabase (ANON_KEY) dan nama kustom project (PUBLISHABLE_KEY)
    (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // setAll dipanggil dari Server Component (read-only).
            // Bisa diabaikan selama middleware menangani refresh sesi.
          }
        },
      },
    }
  );
}

