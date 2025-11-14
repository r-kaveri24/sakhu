import { useEffect, useState } from 'react'
import HeroBanner from '../components/HeroBanner.jsx'
import { getGalleryPhotos } from '../lib/adminApi.js'

export default function Gallery() {
  const [photos, setPhotos] = useState([])
  useEffect(() => {
    (async () => {
      const items = await getGalleryPhotos()
      setPhotos(items)
    })()
  }, [])

  return (
    <main>
      <HeroBanner title="Photo Gallery" />

      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-bold">All Photos</h2>
        <p className="text-sm text-gray-700 mt-2">Browse our gallery of ongoing work and events.</p>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((p, idx) => (
            <div key={p.id || idx} className="rounded-md overflow-hidden border border-gray-300 bg-white">
              <img src={p.url} alt={p.caption || `Photo ${idx + 1}`} className="w-full h-48 object-cover" loading="lazy" />
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}