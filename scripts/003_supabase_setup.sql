-- Supabase Migration / Database Setup Script
-- Location: /scripts/003_supabase_setup.sql
-- This script sets up the database schema for collecting subscriber info (including premium form details) in Supabase.

-- 1. Create the table if it does not exist
CREATE TABLE IF NOT EXISTS email_subscribers (
    id BIGSERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    name TEXT,
    first_name TEXT,
    last_name TEXT,
    cell_number TEXT,
    location TEXT,
    source TEXT NOT NULL DEFAULT 'hero-section',
    seven_day_reminder_sent_at TIMESTAMPTZ,
    one_day_reminder_sent_at TIMESTAMPTZ,
    last_notified_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. If the table already exists, ensure the 'name' column and other reminder columns are present
ALTER TABLE email_subscribers 
    ADD COLUMN IF NOT EXISTS name TEXT,
    ADD COLUMN IF NOT EXISTS first_name TEXT,
    ADD COLUMN IF NOT EXISTS last_name TEXT,
    ADD COLUMN IF NOT EXISTS cell_number TEXT,
    ADD COLUMN IF NOT EXISTS location TEXT,
    ADD COLUMN IF NOT EXISTS seven_day_reminder_sent_at TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS one_day_reminder_sent_at TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS last_notified_at TIMESTAMPTZ;

-- 3. Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_email_subscribers_email ON email_subscribers(email);

-- 4. Enable Row Level Security (RLS) if desired in Supabase (recommended)
-- By default, we keep it simple or allow service-role/admin access.
ALTER TABLE email_subscribers ENABLE ROW LEVEL SECURITY;

-- Create policy to allow the service role (backend API) full access
CREATE POLICY "Allow service role full access" 
    ON email_subscribers 
    FOR ALL 
    TO service_role 
    USING (true) 
    WITH CHECK (true);

-- Create comments for documentation
COMMENT ON TABLE email_subscribers IS 'Stores premium fight-night signups and email notification subscribers.';
COMMENT ON COLUMN email_subscribers.name IS 'Subscriber full name (legacy/backward compatible).';
COMMENT ON COLUMN email_subscribers.first_name IS 'Subscriber first name from premium signup form.';
COMMENT ON COLUMN email_subscribers.last_name IS 'Subscriber last name from premium signup form.';
COMMENT ON COLUMN email_subscribers.cell_number IS 'Subscriber cell number from premium signup form.';
COMMENT ON COLUMN email_subscribers.location IS 'Subscriber location from premium signup form.';
COMMENT ON COLUMN email_subscribers.email IS 'Subscriber email address, sanitized, validated, and normalized to lowercase.';
COMMENT ON COLUMN email_subscribers.source IS 'The signup source (e.g., hero-section, navbar-premium).';
COMMENT ON COLUMN email_subscribers.seven_day_reminder_sent_at IS 'Timestamp for when the 7-day reminder was sent.';
COMMENT ON COLUMN email_subscribers.one_day_reminder_sent_at IS 'Timestamp for when the 1-day reminder was sent.';
COMMENT ON COLUMN email_subscribers.last_notified_at IS 'Timestamp of the most recent email notification.';
