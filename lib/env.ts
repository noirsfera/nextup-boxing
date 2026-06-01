import "server-only"

export const env = {
  supabaseUrl: process.env.SUPABASE_URL?.trim() || "",
  supabaseServiceRoleKey:
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() || "",
  resendApiKey: process.env.RESEND_API_KEY?.trim() || "",
  resendFromEmail: process.env.RESEND_FROM_EMAIL?.trim() || "",
  siteUrl: process.env.SITE_URL?.trim() || "http://localhost:3000",
  cronSecret: process.env.CRON_SECRET?.trim() || "",
} as const

export function assertSupabaseEnv() {
  if (!env.supabaseUrl || !env.supabaseServiceRoleKey) {
    throw new Error(
      "Supabase is not configured. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
    )
  }

  return {
    supabaseUrl: env.supabaseUrl.replace(/\/+$/, ""),
    supabaseServiceRoleKey: env.supabaseServiceRoleKey,
  }
}

