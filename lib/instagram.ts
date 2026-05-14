import "server-only"

export type InstagramReel = {
  id: string
  caption: string
  permalink: string
  mediaType: string
  mediaUrl: string | null
  thumbnailUrl: string | null
  timestamp: string
  likeCount: number | null
  commentsCount: number | null
}

export type InstagramFeedPayload = {
  handle: string
  profileUrl: string
  reels: InstagramReel[]
}

type InstagramMediaResponse = {
  data?: Array<{
    id: string
    caption?: string
    permalink?: string
    media_type?: string
    media_product_type?: string
    media_url?: string
    thumbnail_url?: string
    timestamp?: string
    like_count?: number
    comments_count?: number
  }>
}

const DEFAULT_HANDLE = "nextupboxingleague"
const GRAPH_API_VERSION = "v23.0"

function getInstagramConfig() {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN?.trim() || ""
  const businessAccountId =
    process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID?.trim() || ""
  const handle = process.env.INSTAGRAM_HANDLE?.trim() || DEFAULT_HANDLE

  return {
    accessToken,
    businessAccountId,
    handle,
    profileUrl: `https://www.instagram.com/${handle}/`,
  }
}

export function getInstagramPublicConfig() {
  const { handle, profileUrl } = getInstagramConfig()
  return { handle, profileUrl }
}

export async function fetchInstagramReels(limit = 12): Promise<InstagramFeedPayload> {
  const { accessToken, businessAccountId, handle, profileUrl } =
    getInstagramConfig()

  if (!accessToken || !businessAccountId) {
    throw new Error(
      "Instagram is not configured. Add INSTAGRAM_ACCESS_TOKEN and INSTAGRAM_BUSINESS_ACCOUNT_ID."
    )
  }

  const params = new URLSearchParams({
    fields:
      "id,caption,permalink,media_type,media_product_type,media_url,thumbnail_url,timestamp,like_count,comments_count",
    limit: String(limit),
    access_token: accessToken,
  })

  const response = await fetch(
    `https://graph.facebook.com/${GRAPH_API_VERSION}/${businessAccountId}/media?${params.toString()}`,
    {
      next: { revalidate: 300 },
    }
  )

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(
      `Failed to load Instagram media (${response.status}): ${errorText}`
    )
  }

  const payload = (await response.json()) as InstagramMediaResponse

  const reels = (payload.data || [])
    .filter((item) => {
      if (item.media_product_type === "REELS") {
        return true
      }

      if (item.permalink?.includes("/reel/")) {
        return true
      }

      return false
    })
    .map((item) => ({
      id: item.id,
      caption: item.caption || "",
      permalink: item.permalink || profileUrl,
      mediaType: item.media_type || "VIDEO",
      mediaUrl: item.media_url || null,
      thumbnailUrl: item.thumbnail_url || item.media_url || null,
      timestamp: item.timestamp || "",
      likeCount:
        typeof item.like_count === "number" ? item.like_count : null,
      commentsCount:
        typeof item.comments_count === "number" ? item.comments_count : null,
    }))

  return {
    handle,
    profileUrl,
    reels,
  }
}
