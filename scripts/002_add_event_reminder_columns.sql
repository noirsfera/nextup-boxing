-- Run this in the Neon SQL Editor if your email_subscribers table already exists.

ALTER TABLE email_subscribers
  ADD COLUMN IF NOT EXISTS seven_day_reminder_sent_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS one_day_reminder_sent_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS last_notified_at TIMESTAMPTZ;

COMMENT ON COLUMN email_subscribers.seven_day_reminder_sent_at IS 'Timestamp for the first pre-event reminder email.';
COMMENT ON COLUMN email_subscribers.one_day_reminder_sent_at IS 'Timestamp for the final day-before reminder email.';
COMMENT ON COLUMN email_subscribers.last_notified_at IS 'Timestamp of the most recent reminder email sent.';
