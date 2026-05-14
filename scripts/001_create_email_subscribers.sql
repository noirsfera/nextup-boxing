-- Run this in the Neon SQL Editor to create the email signup table.

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

COMMENT ON TABLE email_subscribers IS 'Stores hero section email notification signups.';
COMMENT ON COLUMN email_subscribers.email IS 'Subscriber email address.';
COMMENT ON COLUMN email_subscribers.source IS 'Signup source identifier.';
COMMENT ON COLUMN email_subscribers.seven_day_reminder_sent_at IS 'Timestamp for the first pre-event reminder email.';
COMMENT ON COLUMN email_subscribers.one_day_reminder_sent_at IS 'Timestamp for the final day-before reminder email.';
COMMENT ON COLUMN email_subscribers.last_notified_at IS 'Timestamp of the most recent reminder email sent.';
