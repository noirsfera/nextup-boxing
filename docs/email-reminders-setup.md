# Email Reminder Setup

This project uses:

- `Neon` for subscriber storage
- `Resend` for email delivery
- `Vercel Cron` for scheduled reminder runs

## Required Environment Variables

Set these in your deployment environment:

- `DATABASE_URL`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `SITE_URL`
- `CRON_SECRET`

## Database Setup

For a fresh database, run:

- [scripts/001_create_email_subscribers.sql](/C:/Users/gamerrdotcom/Desktop/nextup-boxing/scripts/001_create_email_subscribers.sql:1)

If the `email_subscribers` table already exists, also run:

- [scripts/002_add_event_reminder_columns.sql](/C:/Users/gamerrdotcom/Desktop/nextup-boxing/scripts/002_add_event_reminder_columns.sql:1)

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
