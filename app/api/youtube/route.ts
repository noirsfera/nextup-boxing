import { NextResponse } from "next/server"

import { fetchYoutubeFeed } from "@/lib/youtube"

// Default to the event's Strong Island Fight Night channel
const DEFAULT_CHANNEL_URL = "https://www.youtube.com/channel/UCo1IceoT57YLFphnf3Iqj5A"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const payload = await fetchYoutubeFeed()
    return NextResponse.json(payload)
  } catch (error) {
    console.error("Failed to load YouTube feed:", error)

    const channelUrl = process.env.YOUTUBE_CHANNEL_URL?.trim() || DEFAULT_CHANNEL_URL
    const channelId = process.env.YOUTUBE_CHANNEL_ID?.trim() || null

    return NextResponse.json(
      {
        channelUrl,
        channelId,
        playlistId: channelId?.startsWith("UC") ? `UU${channelId.slice(2)}` : null,
        videos: [],
        error: "We couldn't load the latest uploads right now.",
      },
      { status: 503 }
    )
  }
}
