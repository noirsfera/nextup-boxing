export const EVENT_CONFIG = {
  name: "Next Up Boxing League Fight Night",
  venue: "Madison Square Garden",
  city: "New York, NY",
  startIso: "2026-06-06T19:00:00-04:00",
  displayDate: "June 6, 2026",
  displayTime: "7:00 PM ET",
  homepagePath: "/",
} as const

export const EVENT_DATE = new Date(EVENT_CONFIG.startIso)

export const REMINDER_WINDOWS = {
  sevenDay: {
    key: "seven_day_reminder_sent_at",
    minimumMsUntilEvent: 24 * 60 * 60 * 1000,
    maximumMsUntilEvent: 7 * 24 * 60 * 60 * 1000,
  },
  oneDay: {
    key: "one_day_reminder_sent_at",
    minimumMsUntilEvent: 0,
    maximumMsUntilEvent: 24 * 60 * 60 * 1000,
  },
} as const

export type ReminderWindowKey = keyof typeof REMINDER_WINDOWS
export type ReminderColumnName =
  (typeof REMINDER_WINDOWS)[ReminderWindowKey]["key"]
