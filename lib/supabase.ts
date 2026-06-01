import "server-only"

import { createClient, type SupabaseClient } from "@supabase/supabase-js"

import { assertSupabaseEnv } from "@/lib/env"

let supabaseAdminClient: SupabaseClient | null = null

export function getSupabaseAdmin() {
  const { supabaseUrl, supabaseServiceRoleKey } = assertSupabaseEnv()

  if (!supabaseAdminClient) {
    supabaseAdminClient = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
      global: {
        fetch: (input, init) =>
          fetch(input, {
            ...init,
            cache: "no-store",
          }),
      },
    })
  }

  return supabaseAdminClient
}
