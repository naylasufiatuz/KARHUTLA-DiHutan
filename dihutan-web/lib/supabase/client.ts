/**
 * Supabase BROWSER client — gunakan di Client Components ('use client').
 *
 * createBrowserClient dari @supabase/ssr mengelola sesi via cookies
 * sehingga konsisten dengan server client.
 *
 * JANGAN gunakan di Server Components — gunakan lib/supabase/server.ts.
 */
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    // Mendukung kedua nama env: standar Supabase (ANON_KEY) dan nama kustom project (PUBLISHABLE_KEY)
    (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)!
  );
}

