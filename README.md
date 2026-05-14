This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Environment Setup

Create a `.env.local` file from `.env.example` and set:

- `DATABASE_URL` to your Neon connection string.
- `YOUTUBE_CHANNEL_URL` to the public channel URL you want to surface.
- `YOUTUBE_CHANNEL_ID` optionally, if you want to skip channel ID detection and use a fixed YouTube channel ID.
- `INSTAGRAM_HANDLE` to the public Instagram username you want to display.
- `INSTAGRAM_BUSINESS_ACCOUNT_ID` to the connected Instagram Business/Creator account ID.
- `INSTAGRAM_ACCESS_TOKEN` to a valid Instagram Graph API access token with permission to read that account's media.
- `RESEND_API_KEY` to your Resend API key.
- `RESEND_FROM_EMAIL` to a verified sender on your Resend domain.
- `SITE_URL` to your production site URL so reminder emails link back correctly.
- `CRON_SECRET` to protect the scheduled reminder route.

The email signup flow automatically creates an `email_subscribers` table on the first successful request and stores each email once.

If you prefer to create the table manually in Neon, copy the SQL from [scripts/001_create_email_subscribers.sql](/C:/Users/gamerrdotcom/Desktop/nextup-boxing/scripts/001_create_email_subscribers.sql:1) into the Neon SQL editor first.

## Event Reminders

The reminder system uses:

- `Neon` to store subscribers and reminder timestamps
- `Resend` to send reminder emails
- `Vercel Cron` to trigger the reminder route once per day

Setup checklist:

- Verify a sending domain in Resend and set `RESEND_FROM_EMAIL`
- Add `RESEND_API_KEY`, `SITE_URL`, and `CRON_SECRET` to your deployment environment
- If the `email_subscribers` table already exists, run [scripts/002_add_event_reminder_columns.sql](/C:/Users/gamerrdotcom/Desktop/nextup-boxing/scripts/002_add_event_reminder_columns.sql:1)
- Deploy with [vercel.json](/C:/Users/gamerrdotcom/Desktop/nextup-boxing/vercel.json:1) so the cron schedule is active

The current setup sends up to two reminder emails per subscriber:

- an upcoming-event reminder during the final week
- a final reminder during the last 24 hours before the event

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
