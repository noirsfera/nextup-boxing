-- Legacy helper. Prefer scripts/003_supabase_setup.sql in the Supabase SQL editor.

ALTER TABLE email_subscribers
  ADD COLUMN IF NOT EXISTS name TEXT,
  ADD COLUMN IF NOT EXISTS first_name TEXT,
  ADD COLUMN IF NOT EXISTS last_name TEXT,
  ADD COLUMN IF NOT EXISTS cell_number TEXT,
  ADD COLUMN IF NOT EXISTS location TEXT,
  ADD COLUMN IF NOT EXISTS seven_day_reminder_sent_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS one_day_reminder_sent_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS last_notified_at TIMESTAMPTZ;
COMMENT ON COLUMN email_subscribers.first_name IS 'Subscriber first name from premium signup form.';
COMMENT ON COLUMN email_subscribers.last_name IS 'Subscriber last name from premium signup form.';
COMMENT ON COLUMN email_subscribers.cell_number IS 'Subscriber cell number from premium signup form.';
COMMENT ON COLUMN email_subscribers.location IS 'Subscriber location from premium signup form.';

COMMENT ON COLUMN email_subscribers.seven_day_reminder_sent_at IS 'Timestamp for the first pre-event reminder email.';
COMMENT ON COLUMN email_subscribers.one_day_reminder_sent_at IS 'Timestamp for the final day-before reminder email.';
COMMENT ON COLUMN email_subscribers.last_notified_at IS 'Timestamp of the most recent reminder email sent.';
