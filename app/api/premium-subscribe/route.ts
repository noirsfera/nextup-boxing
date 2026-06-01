import { NextResponse } from "next/server"
import { z } from "zod"

import { sendPremiumWelcomeEmail } from "@/lib/resend"
import { addEmailSubscriber } from "@/lib/subscribers"

export const runtime = "nodejs"

// Define validation and sanitization schema using Zod
const premiumSubscribeSchema = z.object({
  name: z
    .string({ message: "Name is required." })
    .trim()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(100, { message: "Name must be less than 100 characters." })
    // Basic sanitization: strip any HTML/script tags to prevent XSS injection
    .transform((val) => val.replace(/<\/?[^>]+(>|$)/g, "")),
  email: z
    .string({ message: "Email is required." })
    .trim()
    .email({ message: "Please enter a valid email address." })
    .toLowerCase(),
})

export async function POST(request: Request) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 }
    )
  }

  // Validate and sanitize the payload using Zod
  const result = premiumSubscribeSchema.safeParse(body)

  if (!result.success) {
    // Extract and format the Zod validation errors
    const errorMessages = result.error.issues.map((err) => err.message).join(" ")
    return NextResponse.json(
      { error: errorMessages },
      { status: 400 }
    )
  }

  const { name, email } = result.data

  try {
    // 1. Collect info in the database (with 'navbar-premium' source)
    await addEmailSubscriber(email, name, "navbar-premium")

    // 2. Send approaching event notification email via Resend
    let emailSent = false
    let emailErrorMsg = ""

    try {
      await sendPremiumWelcomeEmail({ email, name })
      emailSent = true
    } catch (resendError) {
      console.error("Resend notification failed:", resendError)
      emailErrorMsg = resendError instanceof Error ? resendError.message : String(resendError)
    }

    if (!emailSent) {
      // If db insert succeeded but email failed, we notify the client (e.g. if API keys are missing/incorrect)
      return NextResponse.json(
        {
          message: `Welcome, ${name}! You've been subscribed in our database, but we couldn't send the premium notification email. (Error: ${emailErrorMsg || "Resend not configured"})`,
          partialSuccess: true,
        },
        { status: 201 }
      )
    }

    return NextResponse.json(
      {
        message: `Welcome, ${name}! You are locked in for the June 6 event updates. Check your inbox for your premium invite!`,
        success: true,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Failed to process premium subscription:", error)

    const isMissingSupabaseConfig =
      error instanceof Error &&
      error.message ===
        "Supabase is not configured. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."

    return NextResponse.json(
      {
        error: isMissingSupabaseConfig
          ? "Database is not configured yet. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to enable subscriptions."
          : "We couldn't process your subscription at this moment. Please try again later.",
      },
      { status: isMissingSupabaseConfig ? 503 : 500 }
    )
  }
}
