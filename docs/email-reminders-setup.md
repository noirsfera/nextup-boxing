# Email Reminder Setup

This project uses:

- `Supabase` for subscriber storage
- `Resend` for email delivery
- `Vercel Cron` for scheduled reminder runs

## Required Environment Variables

Set these in your deployment environment:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `SITE_URL`
- `CRON_SECRET`

## Database Setup

In your Supabase SQL editor, run:

- [scripts/003_supabase_setup.sql](/C:/Users/gamerrdotcom/Desktop/nextup-boxing/scripts/003_supabase_setup.sql:1)

The script creates `email_subscribers`, adds reminder columns, enables RLS, and allows backend requests that use the service-role key.

If you already ran an older schema, the script is safe to run again because it uses `IF NOT EXISTS`.

## Resend Setup

1. Create a Resend account
2. Verify a sending domain
3. Create an API key
4. Set `RESEND_FROM_EMAIL` to a verified sender on that domain

Example:

```text
RESEND_FROM_EMAIL="Next Up Boxing <ringside@updates.yourdomain.com>"
```

## Cron Setup

The project includes [vercel.json](/C:/Users/gamerrdotcom/Desktop/nextup-boxing/vercel.json:1) with a daily cron job:

- `0 8 * * *` -> `/api/cron/event-reminders`

The cron route is protected with `CRON_SECRET`.

## Current Reminder Behavior

The system sends up to two emails per subscriber:

- one reminder during the final week before the event
- one reminder during the final 24 hours before the event

The reminder route is:

- `/api/cron/event-reminders`

In local development, it can be called manually while `NODE_ENV` is not `production`.
