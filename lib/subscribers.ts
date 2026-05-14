import "server-only"

import { REMINDER_WINDOWS, type ReminderColumnName } from "@/lib/event"
import { getSql } from "@/lib/neon"
import { normalizeEmail } from "@/lib/validation"

const SUBSCRIBERS_TABLE_SQL = `
  CREATE TABLE IF NOT EXISTS email_subscribers (
    id BIGSERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    source TEXT NOT NULL DEFAULT 'hero-section',
    seven_day_reminder_sent_at TIMESTAMPTZ,
    one_day_reminder_sent_at TIMESTAMPTZ,
    last_notified_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );
`

const ENSURE_REMINDER_COLUMNS_SQL = `
  ALTER TABLE email_subscribers
    ADD COLUMN IF NOT EXISTS seven_day_reminder_sent_at TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS one_day_reminder_sent_at TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS last_notified_at TIMESTAMPTZ;
`

type SubscriberRow = {
  email: string
  created_at: string
  updated_at: string
}

type ReminderSubscriberRow = {
  email: string
}

async function ensureSubscribersSchema() {
  const sql = getSql()

  await sql.query(SUBSCRIBERS_TABLE_SQL)
  await sql.query(ENSURE_REMINDER_COLUMNS_SQL)
}

function getReminderColumnSql(columnName: ReminderColumnName) {
  switch (columnName) {
    case REMINDER_WINDOWS.sevenDay.key:
      return "seven_day_reminder_sent_at"
    case REMINDER_WINDOWS.oneDay.key:
      return "one_day_reminder_sent_at"
    default:
      throw new Error(`Unsupported reminder column: ${columnName}`)
  }
}

export async function addEmailSubscriber(email: string) {
  const sql = getSql()
  const normalizedEmail = normalizeEmail(email)

  await ensureSubscribersSchema()

  const subscriberRows = (await sql`
    INSERT INTO email_subscribers (email, source)
    VALUES (${normalizedEmail}, ${"hero-section"})
    ON CONFLICT (email)
    DO UPDATE SET
      source = EXCLUDED.source,
      updated_at = NOW()
    RETURNING email, created_at, updated_at
  `) as SubscriberRow[]

  return subscriberRows[0]
}

export async function getSubscribersPendingReminder(columnName: ReminderColumnName) {
  const sql = getSql()

  await ensureSubscribersSchema()

  const reminderColumn = sql.unsafe(getReminderColumnSql(columnName))

  const subscriberRows = (await sql`
    SELECT email
    FROM email_subscribers
    WHERE ${reminderColumn} IS NULL
    ORDER BY created_at ASC
  `) as ReminderSubscriberRow[]

  return subscriberRows
}

export async function markReminderSent(
  email: string,
  columnName: ReminderColumnName
) {
  const sql = getSql()
  const reminderColumn = sql.unsafe(getReminderColumnSql(columnName))
  const normalizedEmail = normalizeEmail(email)

  await ensureSubscribersSchema()

  await sql`
    UPDATE email_subscribers
    SET
      ${reminderColumn} = NOW(),
      last_notified_at = NOW(),
      updated_at = NOW()
    WHERE email = ${normalizedEmail}
  `
}
