import "server-only"

export type YoutubeFeedVideo = {
  id: string
  title: string
  publishedAt: string
  url: string
}

export type YoutubeLiveStream = {
  id: string
  title: string
  isLive: boolean
  url: string
  thumbnailUrl: string
}

export type YoutubeFeedPayload = {
  channelUrl: string
  channelId: string | null
  playlistId: string | null
  videos: YoutubeFeedVideo[]
  liveStream: YoutubeLiveStream | null
  blockedBySignInGate?: boolean
}

// Use Strong Island Fight Night YouTube channel by default for this event
const DEFAULT_CHANNEL_URL = "https://www.youtube.com/channel/UCo1IceoT57YLFphnf3Iqj5A"

function decodeXml(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim()
}

function extractFirstMatch(source: string, patterns: RegExp[]) {
  for (const pattern of patterns) {
    const match = source.match(pattern)

    if (match?.[1]) {
      return match[1]
    }
  }

  return null
}

function getTagValue(source: string, tagName: string) {
  const pattern = new RegExp(`<${tagName}>([\\s\\S]*?)<\\/${tagName}>`)
  const match = source.match(pattern)

  return match?.[1] ? decodeXml(match[1]) : null
}

function getLinkValue(source: string) {
  const match = source.match(/<link[^>]+href="([^"]+)"/)
  return match?.[1] ?? null
}

function toUploadsPlaylistId(channelId: string | null) {
  if (!channelId?.startsWith("UC")) {
    return null
  }

  return `UU${channelId.slice(2)}`
}

async function resolveChannelId(channelUrl: string) {
  if (process.env.YOUTUBE_CHANNEL_ID) {
    return process.env.YOUTUBE_CHANNEL_ID
  }

  const response = await fetch(channelUrl, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36",
    },
    next: { revalidate: 900 },
  })

  if (!response.ok) {
    throw new Error(`Failed to load YouTube channel page (${response.status}).`)
  }

  const html = await response.text()

  return extractFirstMatch(html, [
    /"channelId":"(UC[\w-]+)"/,
    /https:\/\/www\.youtube\.com\/channel\/(UC[\w-]+)/,
    /itemprop="identifier"\s+content="(UC[\w-]+)"/,
  ])
}

function parseFeed(xml: string) {
  const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)]

  return entries
    .map((entryMatch) => {
      const entry = entryMatch[1]
      const id = getTagValue(entry, "yt:videoId")
      const title = getTagValue(entry, "title")
      const publishedAt = getTagValue(entry, "published")
      const url = getLinkValue(entry)

      if (!id || !title || !publishedAt || !url) {
        return null
      }

      return {
        id,
        title,
        publishedAt,
        url,
      }
    })
    .filter((video): video is YoutubeFeedVideo => Boolean(video))
}

export async function fetchYoutubeFeed(limit = 5): Promise<YoutubeFeedPayload> {
  const channelUrl = process.env.YOUTUBE_CHANNEL_URL?.trim() || DEFAULT_CHANNEL_URL
  const channelId = await resolveChannelId(channelUrl)
  const playlistId = toUploadsPlaylistId(channelId)

  if (!channelId) {
    throw new Error("Unable to resolve the YouTube channel ID.")
  }

  const feedResponse = await fetch(
    `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
    {
      next: { revalidate: 900 },
    }
  )

  if (!feedResponse.ok) {
    throw new Error(`Failed to load the YouTube feed (${feedResponse.status}).`)
  }

  const feedXml = await feedResponse.text()
  
  // Check for live stream
  const liveResult = await fetchLiveStream(channelId)

  return {
    channelUrl,
    channelId,
    playlistId,
    videos: parseFeed(feedXml).slice(0, limit),
    liveStream: liveResult.liveStream,
    blockedBySignInGate: liveResult.blockedBySignInGate,
  }
}
async function fetchLiveStream(channelId: string): Promise<{ liveStream: YoutubeLiveStream | null; blockedBySignInGate?: boolean }> {
  try {
    // Fetch the channel's live page to check for active streams
    const livePageUrl = `https://www.youtube.com/channel/${channelId}/live`
    const response = await fetch(livePageUrl, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36",
      },
      next: { revalidate: 60 }, // Check more frequently for live content
    })

    if (!response.ok) {
      return null
    }

    const html = await response.text()
    // Detect YouTube sign-in / bot-check gate which sometimes replaces the channel page.
    const signInGatePatterns = [
      /Sign in to confirm you're not a bot/i,
      /to confirm you're not a bot/i,
      /sign in to continue/i,
      /verify you are human/i,
    ]

    const blockedBySignInGate = signInGatePatterns.some((p) => p.test(html))
    if (blockedBySignInGate) {
      return { liveStream: null, blockedBySignInGate: true }
    }

    // More robust live detection: check several indicators that a stream exists.
    const isLive = /"isLive(?:Now)?"\s*:\s*true/.test(html) || /"liveBroadcastContent"\s*:\s*"live"/.test(html) || html.includes('LIVE_STREAMING')

    if (!isLive) {
      return { liveStream: null }
    }

    // Extract video ID from multiple possible patterns (JSON or hrefs)
    const videoIdMatch = html.match(/"videoId":"([A-Za-z0-9_-]{11})"/) || html.match(/\/watch\?v=([A-Za-z0-9_-]{11})/) || html.match(/"externalVideoId":"([A-Za-z0-9_-]{11})"/)

    if (!videoIdMatch?.[1]) {
      return { liveStream: null }
    }

    const videoId = videoIdMatch[1]

    // Try multiple ways to get a human-friendly title
    const titleMatch = html.match(/"title"\s*:\s*\{\s*"runs"\s*:\s*\[\s*\{\s*"text"\s*:\s*"([^"]+)"/) || html.match(/<meta\s+property="og:title"\s+content="([^"]+)"/i) || html.match(/"title"\s*:\s*"([^"]+)"/)

    const title = titleMatch?.[1] ? decodeXml(titleMatch[1]) : "Live Stream"

    return {
      liveStream: {
        id: videoId,
        title,
        isLive: true,
        url: `https://www.youtube.com/watch?v=${videoId}`,
        thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
      },
    }
  } catch (error) {
    console.error("Failed to fetch live stream:", error)
    return { liveStream: null }
  }
}
