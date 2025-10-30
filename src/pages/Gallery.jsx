import HeroBanner from '../components/HeroBanner.jsx'

export default function Gallery() {
  const images = Object.values(
    import.meta.glob('../assets/resources/*.{png,jpg,jpeg,webp}', { eager: true, as: 'url' })
  )

  return (
    <main>
      <HeroBanner title="Photo Gallery" />

      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-bold">All Photos</h2>
        <p className="text-sm text-gray-700 mt-2">Browse our gallery of ongoing work and events.</p>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((src, idx) => (
            <div key={idx} className="rounded-md overflow-hidden border border-gray-300 bg-white">
              <img src={src} alt={`Photo ${idx + 1}`} className="w-full h-48 object-cover" loading="lazy" />
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}