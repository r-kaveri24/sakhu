import { useState, useEffect, useMemo } from 'react'
import HeroBanner from '../components/HeroBanner.jsx'
import logo from '../assets/logoNaav.png'
import { getYouTubeUploadsFromEnv, makeYouTubeThumb } from '../lib/youtube.js'

export default function Videos() {
  // Fallback links in case YouTube API key/channel is not set.
  const videoLinks = [
    'https://youtu.be/BQWVOShOsis?si=HkqSeXF72D9uSU5m',
    'https://youtu.be/AexAwM_TI9M?si=btJDesrlWrHO0Ope',
  ]

  const extractYouTubeId = (url) => {
    try {
      const u = new URL(url)
      if (u.hostname === 'youtu.be') return u.pathname.replace('/', '')
      if (u.hostname.includes('youtube.com')) {
        const v = u.searchParams.get('v')
        if (v) return v
        const parts = u.pathname.split('/')
        const idx = parts.findIndex((p) => ['embed', 'shorts', 'v'].includes(p))
        if (idx >= 0 && parts[idx + 1]) return parts[idx + 1]
      }
      const m = url.match(/(?:youtu\.be\/|v=|\/embed\/|shorts\/)([\w-]{11})/)
      return m ? m[1] : null
    } catch {
      const m = url.match(/(?:youtu\.be\/|v=|\/embed\/|shorts\/)([\w-]{11})/)
      return m ? m[1] : null
    }
  }

  const fallbackVideos = useMemo(
    () =>
      videoLinks
        .map((l) => extractYouTubeId(l))
        .filter(Boolean)
        .map((id) => ({ id, title: 'YouTube Video', thumbnail: makeYouTubeThumb(id) })),
    [videoLinks]
  )

  const [videos, setVideos] = useState([])
  const [openVideoId, setOpenVideoId] = useState(null)
  useEffect(() => {
    (async () => {
      const items = await getYouTubeUploadsFromEnv()
      setVideos(items && items.length ? items : fallbackVideos)
    })()
  }, [fallbackVideos])

  // Close modal on Escape key
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpenVideoId(null)
    }
    if (openVideoId) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openVideoId])

  return (
    <main>
      <HeroBanner title="Video Gallery" />

      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-bold">All Videos</h2>
        <p className="text-sm text-gray-700 mt-2">Browse our video gallery.</p>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
          {videos.map((v, idx) => (
            <button
              key={v.id || idx}
              onClick={() => setOpenVideoId(v.id)}
              className="group relative rounded-md overflow-hidden border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              <img
                src={v.thumbnail}
                alt={v.title || 'Video thumbnail'}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 z-0" />
              <div className="absolute top-2 left-2 z-10 flex items-center gap-2 bg-black/60 text-white px-2 py-1 rounded-md">
                <img src={logo} alt="Sakhu Logo" className="w-6 h-6 rounded-full ring-1 ring-white/40" />
                <span className="text-xs font-semibold">SAKHU Cancer Foundation</span>
              </div>
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/90 shadow flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-purple-700">
                    <path d="M8 5v14l11-7-11-7z" />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {openVideoId && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setOpenVideoId(null)}
        >
          <div
            className="relative w-[90vw] max-w-4xl h-[50vh] sm:h-[60vh] bg-black rounded-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={logo} alt="Sakhu Logo" className="absolute top-3 left-3 w-12 h-12 rounded-full ring-2 ring-white/40 pointer-events-none" />
            <button
              onClick={() => setOpenVideoId(null)}
              className="absolute top-3 right-3 px-3 py-2 rounded-md bg-white/10 text-white hover:bg-white/20"
              aria-label="Close video"
            >
              ✕
            </button>
            <iframe
              className="w-full h-full block"
              src={`https://www.youtube.com/embed/${openVideoId}?playsinline=1&controls=1&modestbranding=1&fs=1&rel=0`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </main>
  )
}