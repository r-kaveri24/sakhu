import { Link, useParams } from 'react-router-dom'
import HeroBanner from '../components/HeroBanner.jsx'
import { getNewsById } from '../data/news.js'

export default function NewsDetail() {
  const { id } = useParams()
  const item = getNewsById(id)

  if (!item) {
    return (
      <main>
        <HeroBanner title="News & Events" />
        <section className="max-w-7xl mx-auto px-4 py-10">
          <h2 className="text-xl font-semibold">News Not Found</h2>
          <p className="mt-2 text-sm text-gray-700">The requested news item could not be found.</p>
          <Link to="/news" className="mt-4 inline-block px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700">Back to News</Link>
        </section>
      </main>
    )
  }

  return (
    <main>
      <HeroBanner title="News & Events" />
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="mt-3 text-2xl md:text-3xl font-semibold">{item.title}</h1>
        <p className="mt-1 text-xs md:text-sm text-gray-600 mb-3">Date: {item.date}</p>
        {/* Structured sections */}
        <div className="mt-6 space-y-8">
          {item.sections?.map((sec, idx) => (
            <div key={idx}>
              {sec.heading && (
                <h2 className="text-lg md:text-xl font-semibold mt-6">{sec.heading}</h2>
              )}
              {sec.paragraphs && (
                <div className="mt-3 space-y-4 text-sm text-gray-800">
                  {sec.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              )}
              {sec.bullets && (
                <ul className="mt-4 list-disc list-inside text-sm text-gray-800 space-y-2">
                  {sec.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          {/* Fallback for legacy content */}
          {!item.sections && item.content && (
            <div className="space-y-4 text-sm text-gray-800">
              {item.content.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}
        </div>
        {/* Images after content: support multiple or none */}
        {item.images?.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {item.images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`${item.title} image ${i + 1}`}
                className="w-full max-h-[420px] object-contain rounded"
              />
            ))}
          </div>
        ) : (
          item.image && (
            <img
              src={item.image}
              alt={item.title}
              className="mt-8 w-full max-h-[420px] object-contain rounded"
            />
          )
        )}
      </section>
    </main>
  )
}