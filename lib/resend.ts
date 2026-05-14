import "server-only"

import { EVENT_CONFIG } from "@/lib/event"

type SendReminderEmailParams = {
  email: string
  reminderType: "sevenDay" | "oneDay"
}

type ResendSendResponse = {
  id?: string
  error?: {
    message?: string
  }
}

function getResendConfig() {
  const apiKey = process.env.RESEND_API_KEY?.trim() || ""
  const fromEmail = process.env.RESEND_FROM_EMAIL?.trim() || ""
  const siteUrl = process.env.SITE_URL?.trim() || "http://localhost:3000"

  if (!apiKey || !fromEmail) {
    throw new Error(
      "Resend is not configured. Add RESEND_API_KEY and RESEND_FROM_EMAIL."
    )
  }

  return { apiKey, fromEmail, siteUrl }
}

function buildEmailCopy(reminderType: "sevenDay" | "oneDay") {
  if (reminderType === "oneDay") {
    return {
      subject: "Fight Night is tomorrow",
      eyebrow: "Tomorrow Night",
      intro:
        "You asked to be notified, and the event is almost here. Here are the details for fight night.",
    }
  }

  return {
    subject: "Fight Night is getting closer",
    eyebrow: "Event Reminder",
    intro:
      "You joined the notification list, and fight night is now close. Here are the key event details.",
  }
}

export async function sendReminderEmail({
  email,
  reminderType,
}: SendReminderEmailParams) {
  const { apiKey, fromEmail, siteUrl } = getResendConfig()
  const copy = buildEmailCopy(reminderType)
  const eventUrl = new URL(EVENT_CONFIG.homepagePath, siteUrl).toString()

  const html = `
    <div style="background:#f5efe4;padding:32px 16px;font-family:Inter,Arial,sans-serif;color:#0d1124;">
      <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid rgba(13,17,36,0.08);border-radius:20px;overflow:hidden;">
        <div style="height:4px;background:#c5203a;"></div>
        <div style="padding:32px 28px;">
          <p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:0.28em;text-transform:uppercase;color:#c5203a;">
            ${copy.eyebrow}
          </p>
          <h1 style="margin:0 0 16px;font-size:34px;line-height:0.95;font-family:Impact,'Arial Narrow Bold',sans-serif;text-transform:uppercase;color:#0d1124;">
            ${EVENT_CONFIG.name}
          </h1>
          <p style="margin:0 0 24px;font-size:16px;line-height:1.7;color:rgba(13,17,36,0.72);">
            ${copy.intro}
          </p>
          <div style="border:1px solid rgba(13,17,36,0.1);border-radius:16px;padding:20px 18px;background:#faf8f3;">
            <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:#b8962e;">
              Event Details
            </p>
            <p style="margin:0 0 8px;font-size:16px;font-weight:700;color:#0d1124;">
              ${EVENT_CONFIG.displayDate}
            </p>
            <p style="margin:0 0 8px;font-size:15px;color:rgba(13,17,36,0.72);">
              ${EVENT_CONFIG.displayTime}
            </p>
            <p style="margin:0;font-size:15px;color:rgba(13,17,36,0.72);">
              ${EVENT_CONFIG.venue}, ${EVENT_CONFIG.city}
            </p>
          </div>
          <div style="margin-top:28px;">
            <a href="${eventUrl}" style="display:inline-block;background:#0d1124;color:#ffffff;text-decoration:none;padding:14px 22px;border-radius:999px;font-size:13px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;">
              View Event
            </a>
          </div>
        </div>
      </div>
    </div>
  `

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [email],
      subject: copy.subject,
      html,
    }),
  })

  const data = (await response.json()) as ResendSendResponse

  if (!response.ok || data.error) {
    throw new Error(
      data.error?.message || `Resend failed with status ${response.status}.`
    )
  }

  return data.id
}
