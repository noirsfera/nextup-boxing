import "server-only"

export type YoutubeFeedVideo = {
  id: string
  title: string
  publishedAt: string
  url: string
}

export type YoutubeFeedPayload = {
  channelUrl: string
  channelId: string | null
  playlistId: string | null
  videos: YoutubeFeedVideo[]
}

const DEFAULT_CHANNEL_URL = "https://www.youtube.com/@NextUpBoxing"

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

  return {
    channelUrl,
    channelId,
    playlistId,
    videos: parseFeed(feedXml).slice(0, limit),
  }
}
