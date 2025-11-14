export async function fetchChannelUploads({ apiKey, channelId, maxPages = 10 }) {
  if (!apiKey || !channelId) return []
  const base = 'https://www.googleapis.com/youtube/v3'
  try {
    const chanRes = await fetch(`${base}/channels?part=contentDetails&id=${channelId}&key=${apiKey}`)
    if (!chanRes.ok) return []
    const chanData = await chanRes.json()
    const uploads = chanData?.items?.[0]?.contentDetails?.relatedPlaylists?.uploads
    if (!uploads) return []

    let items = []
    let pageToken
    let pageCount = 0
    do {
      const url = new URL(`${base}/playlistItems`)
      url.searchParams.set('part', 'snippet,contentDetails')
      url.searchParams.set('maxResults', '50')
      url.searchParams.set('playlistId', uploads)
      url.searchParams.set('key', apiKey)
      if (pageToken) url.searchParams.set('pageToken', pageToken)

      const res = await fetch(url)
      if (!res.ok) break
      const data = await res.json()
      const batch = (data.items || [])
        .map((it) => ({
          id: it.contentDetails?.videoId || it.snippet?.resourceId?.videoId,
          title: it.snippet?.title || '',
          thumbnail:
            it.snippet?.thumbnails?.medium?.url || it.snippet?.thumbnails?.high?.url || '',
          publishedAt: it.contentDetails?.videoPublishedAt || it.snippet?.publishedAt,
        }))
        .filter((v) => v.id)
      items = items.concat(batch)
      pageToken = data.nextPageToken
      pageCount += 1
    } while (pageToken && pageCount < maxPages)

    return items
  } catch (e) {
    return []
  }
}

export async function getYouTubeUploadsFromEnv() {
  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY
  const channelId = import.meta.env.VITE_YOUTUBE_CHANNEL_ID
  return fetchChannelUploads({ apiKey, channelId })
}

export function makeYouTubeThumb(videoId) {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
}