import "server-only"

import { getSql } from "@/lib/neon"
import { normalizeEmail } from "@/lib/validation"

const SUBSCRIBERS_TABLE_SQL = `
  CREATE TABLE IF NOT EXISTS email_subscribers (
    id BIGSERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    source TEXT NOT NULL DEFAULT 'hero-section',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );
`

export async function addEmailSubscriber(email: string) {
  const sql = getSql()
  const normalizedEmail = normalizeEmail(email)

  await sql.query(SUBSCRIBERS_TABLE_SQL)

  const subscriberRows = (await sql`
    INSERT INTO email_subscribers (email, source)
    VALUES (${normalizedEmail}, ${"hero-section"})
    ON CONFLICT (email)
    DO UPDATE SET
      source = EXCLUDED.source,
      updated_at = NOW()
    RETURNING email, created_at, updated_at
  `) as Array<{
    email: string
    created_at: string
    updated_at: string
  }>

  return subscriberRows[0]
}
