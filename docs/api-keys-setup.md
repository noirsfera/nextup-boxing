# API Keys & Credentials — Quick Setup Guide

This guide walks through obtaining the credentials used by the site for Instagram and YouTube feed syncs. Follow the steps carefully and provide the values securely to the developer or deploy them into your environment.

**Values required**

- Instagram:
  - `INSTAGRAM_HANDLE` (e.g. `nextupboxingleague`)
  - `INSTAGRAM_BUSINESS_ACCOUNT_ID`
  - `INSTAGRAM_ACCESS_TOKEN` (long-lived)

- YouTube (optional; site attempts to auto-resolve from channel URL but providing a channel ID helps):
  - `YOUTUBE_CHANNEL_URL` (default: `https://www.youtube.com/@NextUpBoxing`)
  - `YOUTUBE_CHANNEL_ID` (optional)


---

## Instagram (Meta) — Business / Creator account

1. Confirm account type
   - Ensure the Instagram profile is a Business or Creator account (not Personal).
   - Link it to a Facebook Page that you manage.

2. Create or use an existing Meta App
   - Open: https://developers.facebook.com/
   - Create a new App ("For Everything Else") or use an existing one.

3. Permissions & Token (Graph API Explorer)
   - Visit Graph API Explorer: https://developers.facebook.com/tools/explorer/
   - Select your app in the top-right App selector.
   - Under "User or Page token" choose "Get User Access Token" and grant these permissions:
     - `instagram_basic`
     - `pages_show_list`
     - `pages_read_engagement`
     - `business_management`

4. Obtain the Facebook Page ID
   - In Graph API Explorer run: `GET /me/accounts`
   - Copy the `id` value for the Page linked to your Instagram account.

5. Obtain the Instagram Business Account ID
   - Run: `GET /{PAGE_ID}?fields=instagram_business_account{id,username}`
   - Copy the nested `instagram_business_account.id` value — this is `INSTAGRAM_BUSINESS_ACCOUNT_ID`.

6. Create a Long-Lived Access Token
   - Exchange the short-lived user token for a long-lived token:

```
https://graph.facebook.com/v23.0/oauth/access_token?grant_type=fb_exchange_token&client_id=APP_ID&client_secret=APP_SECRET&fb_exchange_token=SHORT_LIVED_TOKEN
```

   - The returned `access_token` is `INSTAGRAM_ACCESS_TOKEN`.
   - Verify it in the Access Token Debugger: https://developers.facebook.com/tools/debug/accesstoken/

7. Provide values securely
   - Send or set the environment variables securely (do NOT paste tokens in public chat):
     - `INSTAGRAM_HANDLE`
     - `INSTAGRAM_BUSINESS_ACCOUNT_ID`
     - `INSTAGRAM_ACCESS_TOKEN`

8. Notes & troubleshooting
   - Personal accounts will not return the `instagram_business_account` field.
   - If `instagram_business_account` is empty, ensure the Page is linked and you have Page admin access.
   - If you see permission errors, confirm the token includes the required scopes and is long-lived.

---

## YouTube — Channel lookup (feed)

The project can auto-resolve a channel ID from a channel URL, but you may optionally provide `YOUTUBE_CHANNEL_ID`.

1. Preferred input: Channel URL
   - Example: `https://www.youtube.com/@NextUpBoxing`
   - Set `YOUTUBE_CHANNEL_URL` in your environment.

2. Optional: Channel ID
   - If you prefer to set a stable ID (helpful if auto-resolution fails), provide `YOUTUBE_CHANNEL_ID` (starts with `UC...`).

3. No API key required
   - This project uses the public RSS feed at `https://www.youtube.com/feeds/videos.xml?channel_id=...` and HTML scraping to resolve the channel ID — no YouTube API key is necessary.

---

## Deployment / Environment

Set the variables in your hosting provider (Vercel, Netlify, etc.) — example for Vercel:

- Go to Project Settings → Environment Variables
- Add the variables under `Production` (and `Preview` / `Development` as needed):

```
INSTAGRAM_HANDLE=nextupboxingleague
INSTAGRAM_BUSINESS_ACCOUNT_ID=123456789012345
INSTAGRAM_ACCESS_TOKEN=EAA...long_token_here...
YOUTUBE_CHANNEL_URL=https://www.youtube.com/@NextUpBoxing
YOUTUBE_CHANNEL_ID=UCxxxxxxxxxxxxxxxxx
```

Restart the deployment after adding variables.

---

## Security & Rotation

- Treat tokens as secrets. Use your platform's secret management.
- Rotate long-lived tokens periodically and regenerate if an account is compromised.
- Do not commit tokens to source control.

---

If you'd like, I can also add a small troubleshooting checklist or a script that validates the values from the server side — tell me which you'd prefer.