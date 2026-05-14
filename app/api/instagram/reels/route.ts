import { NextResponse } from "next/server"

import {
  fetchInstagramReels,
  getInstagramPublicConfig,
} from "@/lib/instagram"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const payload = await fetchInstagramReels()
    return NextResponse.json(payload)
  } catch (error) {
    console.error("Failed to load Instagram reels:", error)

    const { handle, profileUrl } = getInstagramPublicConfig()
    const isMissingConfig =
      error instanceof Error &&
      error.message.includes("Instagram is not configured")

    return NextResponse.json(
      {
        handle,
        profileUrl,
        reels: [],
        error: isMissingConfig
          ? "Instagram live reels are not configured yet. Add INSTAGRAM_ACCESS_TOKEN and INSTAGRAM_BUSINESS_ACCOUNT_ID to enable them."
          : "We couldn't load the latest Instagram reels right now.",
      },
      { status: isMissingConfig ? 503 : 500 }
    )
  }
}
