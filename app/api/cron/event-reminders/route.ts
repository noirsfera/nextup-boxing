import { NextResponse } from "next/server"

import {
  EVENT_DATE,
  REMINDER_WINDOWS,
  type ReminderWindowKey,
} from "@/lib/event"
import {
  getSubscribersPendingReminder,
  markReminderSent,
} from "@/lib/subscribers"
import { sendReminderEmail } from "@/lib/resend"
import { env } from "@/lib/env"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function isAuthorized(request: Request) {
  const cronSecret = env.cronSecret

  if (!cronSecret) {
    return process.env.NODE_ENV !== "production"
  }

  return request.headers.get("authorization") === `Bearer ${cronSecret}`
}

function getDueReminderTypes(now: Date): ReminderWindowKey[] {
  const msUntilEvent = EVENT_DATE.getTime() - now.getTime()

  if (msUntilEvent <= 0) {
    return []
  }

  return (Object.keys(REMINDER_WINDOWS) as ReminderWindowKey[]).filter(
    (reminderType) => {
      const reminderWindow = REMINDER_WINDOWS[reminderType]

      return (
        msUntilEvent <= reminderWindow.maximumMsUntilEvent &&
        msUntilEvent > reminderWindow.minimumMsUntilEvent
      )
    }
  )
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const now = new Date()
  const dueReminderTypes = getDueReminderTypes(now)

  if (dueReminderTypes.length === 0) {
    return NextResponse.json({
      sent: 0,
      dueReminderTypes: [],
      message: "No reminder window is currently due.",
    })
  }

  let sent = 0
  const failures: Array<{
    email: string
    reminderType: ReminderWindowKey
    error: string
  }> = []

  for (const reminderType of dueReminderTypes) {
    const subscribers = await getSubscribersPendingReminder(
      REMINDER_WINDOWS[reminderType].key
    )

    for (const subscriber of subscribers) {
      try {
        await sendReminderEmail({
          email: subscriber.email,
          reminderType,
        })
        await markReminderSent(
          subscriber.email,
          REMINDER_WINDOWS[reminderType].key
        )
        sent += 1
      } catch (error) {
        failures.push({
          email: subscriber.email,
          reminderType,
          error: error instanceof Error ? error.message : "Unknown error",
        })
      }
    }
  }

  return NextResponse.json(
    {
      sent,
      dueReminderTypes,
      failures,
    },
    { status: failures.length > 0 ? 207 : 200 }
  )
}
