import "server-only"

import { REMINDER_WINDOWS, type ReminderColumnName } from "@/lib/event"
import { getSupabaseAdmin } from "@/lib/supabase"
import { normalizeEmail } from "@/lib/validation"

type SubscriberRow = {
  email: string
  created_at: string
  updated_at: string
}

type ReminderSubscriberRow = {
  email: string
}
type PremiumSubscriberProfile = {
  firstName?: string
  lastName?: string
  cellNumber?: string
  location?: string
}

function getReminderColumnName(columnName: ReminderColumnName) {
  switch (columnName) {
    case REMINDER_WINDOWS.sevenDay.key:
      return "seven_day_reminder_sent_at"
    case REMINDER_WINDOWS.oneDay.key:
      return "one_day_reminder_sent_at"
    default:
      throw new Error(`Unsupported reminder column: ${columnName}`)
  }
}

export async function addEmailSubscriber(
  email: string,
  nameOrProfile?: string | PremiumSubscriberProfile,
  source: string = "hero-section"
) {
  const supabase = getSupabaseAdmin()
  const normalizedEmail = normalizeEmail(email)
  const now = new Date().toISOString()
  const subscriberPayload: Record<string, unknown> = {
    email: normalizedEmail,
    source,
    updated_at: now,
  }

  if (typeof nameOrProfile === "string") {
    if (nameOrProfile.trim()) {
      subscriberPayload.name = nameOrProfile.trim()
    }
  } else if (nameOrProfile) {
    const firstName = nameOrProfile.firstName?.trim()
    const lastName = nameOrProfile.lastName?.trim()
    const fullName = [firstName, lastName].filter(Boolean).join(" ")

    if (firstName) {
      subscriberPayload.first_name = firstName
    }

    if (lastName) {
      subscriberPayload.last_name = lastName
    }

    if (fullName) {
      subscriberPayload.name = fullName
    }

    if (nameOrProfile.cellNumber?.trim()) {
      subscriberPayload.cell_number = nameOrProfile.cellNumber.trim()
    }

    if (nameOrProfile.location?.trim()) {
      subscriberPayload.location = nameOrProfile.location.trim()
    }
  }

  const { data, error } = await supabase
    .from("email_subscribers")
    .upsert(subscriberPayload, {
      onConflict: "email",
      ignoreDuplicates: false,
    })
    .select("email, created_at, updated_at")
    .single<SubscriberRow>()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function getSubscribersPendingReminder(columnName: ReminderColumnName) {
  const supabase = getSupabaseAdmin()
  const reminderColumn = getReminderColumnName(columnName)

  const { data, error } = await supabase
    .from("email_subscribers")
    .select("email")
    .is(reminderColumn, null)
    .order("created_at", { ascending: true })
    .returns<ReminderSubscriberRow[]>()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function markReminderSent(
  email: string,
  columnName: ReminderColumnName
) {
  const supabase = getSupabaseAdmin()
  const reminderColumn = getReminderColumnName(columnName)
  const normalizedEmail = normalizeEmail(email)
  const now = new Date().toISOString()

  const { error } = await supabase
    .from("email_subscribers")
    .update({
      [reminderColumn]: now,
      last_notified_at: now,
      updated_at: now,
    })
    .eq("email", normalizedEmail)

  if (error) {
    throw new Error(error.message)
  }
}
