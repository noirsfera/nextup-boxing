import { NextResponse } from "next/server"

import { addEmailSubscriber } from "@/lib/subscribers"
import { isValidEmail } from "@/lib/validation"

export const runtime = "nodejs"

export async function POST(request: Request) {
  let payload: unknown

  try {
    payload = await request.json()
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    )
  }

  const email =
    typeof payload === "object" &&
    payload !== null &&
    "email" in payload &&
    typeof payload.email === "string"
      ? payload.email
      : ""

  if (!email.trim()) {
    return NextResponse.json(
      { error: "Email is required." },
      { status: 400 }
    )
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    )
  }

  try {
    await addEmailSubscriber(email)

    return NextResponse.json(
      { message: "You're on the list. We'll notify you first." },
      { status: 201 }
    )
  } catch (error) {
    console.error("Failed to subscribe email:", error)

    const isMissingDatabaseUrl =
      error instanceof Error && error.message === "DATABASE_URL is not configured."

    return NextResponse.json(
      {
        error: isMissingDatabaseUrl
          ? "Newsletter signups are not configured yet. Add DATABASE_URL to enable them."
          : "We couldn't save your email right now. Please try again.",
      },
      { status: isMissingDatabaseUrl ? 503 : 500 }
    )
  }
}
