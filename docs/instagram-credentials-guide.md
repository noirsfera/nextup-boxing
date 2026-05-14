# Instagram Credentials Guide

This guide explains how the client can collect the Instagram credentials needed for the live reels integration.

As of May 13, 2026, the app needs these values:

- `INSTAGRAM_HANDLE`
- `INSTAGRAM_BUSINESS_ACCOUNT_ID`
- `INSTAGRAM_ACCESS_TOKEN`

Please ask the client to send these through a secure channel, not in plain email if possible.

## What The Client Needs To Do

1. Confirm the Instagram profile is a `Business` or `Creator` account.
Official Meta guide: [Instagram Graph API Getting Started](https://developers.facebook.com/docs/instagram-platform/instagram-graph-api/get-started)

2. Confirm that Instagram account is connected to a Facebook Page they manage.

3. Confirm they have admin or full control access to that Facebook Page.

4. Log in to [Meta for Developers](https://developers.facebook.com/) and open the Meta app that will be used for the integration.

5. Open [Graph API Explorer](https://developers.facebook.com/tools/explorer/).

6. Generate a `User Access Token` for their app and grant these permissions:
- `instagram_basic`
- `pages_show_list`
- `pages_read_engagement`
- `business_management`

7. In Graph API Explorer, get the Facebook Page ID by running:

```text
GET /me/accounts
```

Copy the correct Page `id`.

8. Use the Page ID to get the Instagram Business Account ID by running:

```text
GET /{PAGE_ID}?fields=instagram_business_account{id,username}
```

Copy the returned Instagram account `id`.
That is the value for `INSTAGRAM_BUSINESS_ACCOUNT_ID`.

9. Create a long-lived token.
Official Meta guide: [Long-Lived Access Tokens](https://developers.facebook.com/docs/facebook-login/guides/access-tokens/get-long-lived)

10. If they are using the browser URL directly, they can exchange the short-lived token with:

```text
https://graph.facebook.com/v23.0/oauth/access_token?grant_type=fb_exchange_token&client_id=APP_ID&client_secret=APP_SECRET&fb_exchange_token=SHORT_LIVED_TOKEN
```

The returned `access_token` is the value for `INSTAGRAM_ACCESS_TOKEN`.

11. Optional but recommended: verify the token in [Access Token Debugger](https://developers.facebook.com/tools/debug/accesstoken/).

## What The Client Should Send Back

- Instagram handle
- Instagram Business Account ID
- Long-lived access token

## Important Notes

- Personal Instagram accounts will not work for this setup.
- The Instagram account must be linked to a Facebook Page.
- If `instagram_business_account` comes back empty, the Instagram account is usually not linked correctly to the Page, or the user does not have enough access.
- The access token is sensitive and should be sent through a secure channel.
