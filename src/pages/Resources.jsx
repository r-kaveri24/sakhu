import { Link } from 'react-router-dom'
import { useState } from 'react'
import HeroBanner from '../components/HeroBanner.jsx'
import ongoing1 from '../assets/resources/ongoing1.png'
import ongoing2 from '../assets/resources/ongoing2.png'
import ongoing3 from '../assets/resources/ongoing3.png'
import ongoing4 from '../assets/resources/ongoing4.png'
import logo from '../assets/logoNaav.png'

export default function Resources() {
  const projects = [
    {
      img: ongoing1,
      title: 'Adopt a Patient',
      desc: 'An innovative scheme between a donor and patient to ensure committed financial aid to needy patients with excellent prognosis.',
    },
    {
      img: ongoing2,
      title: 'Awareness Programs',
      desc: 'Awareness lectures and Open Forum programs to spread awareness and reduce stigma related to cancer.',
    },
    {
      img: ongoing3,
      title: 'Eliminate Cervical Cancer in India',
      desc: 'Awareness lectures and Open Forum programs to spread awareness and reduce stigma related to cancer.',
    },
    {
      img: ongoing4,
      title: 'Adopt a Patient',
      desc: 'An innovative scheme between a donor and patient to ensure committed financial aid to needy patients with excellent prognosis.',
    },
  ]

  const galleryImages = Object.values(
    import.meta.glob('../assets/resources/*.{png,jpg,jpeg,webp}', { eager: true, as: 'url' })
  )
  // Provided YouTube links; extract their IDs for thumbnails and embedding
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
  const videoIds = videoLinks.map(extractYouTubeId).filter(Boolean)

  // Modal state for playing video in overlay
  const [openVideoId, setOpenVideoId] = useState(null)

  return (
    <main>
      {/* Hero */}
      <HeroBanner title="Resources" />

      {/* Intro content + side CTAs */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left: copy */}
          <div className="md:col-span-2">
            <h2 className="text-2xl md:text-3xl font-thin">
              What is <span className="font-bold">cancer</span>
            </h2>
            <div className="space-y-4 text-sm text-gray-800 mt-6">
              <p>
                Cancer is a broad group of various diseases, all involving unregulated cell growth. All cancers begin in cells,
                the body’s basic unit of life. To understand cancer, it’s helpful to know what happens when normal cells become cancer cells.
              </p>
              <p>
                The body is made up of many types of cells. These cells grow and divide in a controlled way to produce more cells as they are needed
                to keep the body healthy. When cells become old or damaged, they die and are replaced with new cells.
              </p>
              <p>
                Sometimes this orderly process goes wrong. The genetic material (DNA) of a cell can become damaged or changed, producing mutations
                that affect normal cell growth and division. When this happens, cells do not die when they should and new cells form when the body
                does not need them. The extra cells may form a mass of tissue called a tumour.
              </p>
              <p>
                Not all tumours are cancerous; tumours can be benign or malignant. Benign tumours aren’t cancerous. They can often be removed and,
                in most cases, they do not come back. Cells in benign tumours do not spread to other parts of the body. Malignant tumours are cancerous.
                Cells in these tumours can invade nearby tissues and spread to other parts of the body. The spread of cancer from one part of the body
                to another is called metastasis.
              </p>
              <p>
                Most cancers are named for the organ or type of cell in which they begin. For example, cancer that begins in the stomach is called
                stomach cancer. Some cancers do not form tumours. For example, leukaemia is a cancer of the bone marrow and blood.
              </p>
              <p>
                Cancer harms the body when damaged cells divide uncontrollably to form lumps or tumours (except in the case of leukaemia where cancer
                prohibits normal blood function by abnormal cell division in the blood stream). Tumours can grow and interfere with the digestive,
                nervous, and circulatory systems, and they can release hormones that alter bodily function.
              </p>
            </div>
          </div>

          {/* Right: CTAs */}
          <aside className="space-y-6  flex w-full  justify-between gap-2 flex-col sm:flex-row md:flex-col md:justify-center">
            <div className="rounded-md bg-[#2E3192] w-fit h-[180px] text-white p-6 shadow">
              <h3 className="font-semibold">Help Us Fight Cancer</h3>
              <p className="mt-2 text-xs opacity-90">All donations are welcome. All donations are welcome.</p>
              <Link
                to="/donation"
                className="mt-4 inline-block px-4 py-2 rounded-md bg-white text-black hover:bg-white/90"
              >
                Donate
              </Link>
            </div>
            <div className="rounded-md bg-black w-fit h-[180px] text-white p-6 shadow">
              <h3 className="font-semibold">How can we help you ?</h3>
              <p className="mt-2 text-xs opacity-90">If you have any questions, please ask our counselors.</p>
              <Link
                to="/contact"
                className="mt-4 inline-block px-4 py-2 rounded-md bg-white text-black hover:bg-white/90"
              >
                Contact Us
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* Ongoing Projects */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <h2 className="text-2xl md:text-3xl ">
          <span className="font-thin">Ongoing</span> <span className="font-bold">Projects</span>
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
          {projects.map((p, idx) => (
            <div key={idx} className="border rounded-sm shadow-lg border-gray-300 bg-white">
              <img src={p.img} alt={p.title} className="w-full h-36 object-cover rounded-tl-sm rounded-tr-sm" />
              <div className="mt-4 px-4 pb-4 ">
                <h3 className="font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-gray-700 h-20 overflow-hidden text-ellipsis line-clamp-4">{p.desc}</p>
                <div className="mt-4 flex items-center gap-3">
                  <Link to="/donation" className="px-4 py-2 rounded-xl bg-purple-600 text-white hover:bg-purple-700">Donate Now</Link>
                  <button className="px-4 py-2 rounded-xl border border-purple-600 text-purple-600 hover:bg-black hover:text-white">Read More</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <h2 className="text-2xl md:text-3xl ">
          <span className="font-thin">Photo</span> <span className="font-bold">Gallery</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {galleryImages.map((src, idx) => (
            <div key={idx} className="rounded-md overflow-hidden border border-gray-300 bg-white">
              <img src={src} alt={`Gallery ${idx + 1}`} className="w-full h-40 object-cover" loading="lazy" />
            </div>
          ))}
        </div>
        <div className="mt-8 ">
          <Link to="/gallery" className="px-5 py-2 rounded-xl border border-purple-600 text-purple-600 hover:bg-black hover:text-white">
            View More
          </Link>
        </div>
      </section>

      {/* Video Gallery */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <h2 className="text-2xl md:text-3xl ">
          <span className="font-thin">Video</span> <span className="font-bold">Gallery</span>
        </h2>
        <p className="text-sm text-gray-700 mt-2">The latest Videos on Youtube</p>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
          {videoIds.map((id) => (
            <button
              key={id}
              onClick={() => setOpenVideoId(id)}
              className="group relative rounded-md overflow-hidden border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              <img
                src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
                alt="Video thumbnail"
                className="w-full h-40 object-cover"
                loading="lazy"
              />
              {/* Persistent black overlay */}
              <div className="absolute inset-0 bg-black/50 z-0" />
              {/* Brand overlay with logo + name */}
              <div className="absolute top-2 left-2 z-10 flex items-center gap-2 bg-black/60 text-white px-2 py-1 rounded-md">
                <img src={logo} alt="Sakhu Logo" className="w-6 h-6 rounded-full ring-1 ring-white/40" />
                <span className="text-xs font-semibold">SAKHU Cancer Foundation</span>
              </div>
              {/* Center play button */}
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
        <div className="mt-6">
          <a href="https://youtube.com/@sakhucancerfoundation?si=hCqkUHTbvxwb9WhA" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700">All Videos</a>
        </div>
      </section>

      {/* Video Modal Overlay */}
      {openVideoId && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setOpenVideoId(null)}
        >
          <div className="relative w-full max-w-3xl aspect-video bg-black" onClick={(e) => e.stopPropagation()}>
            {/* Sakhu logo watermark on video */}
            <img src={logo} alt="Sakhu Logo" className="absolute top-3 left-3 w-12 h-12 rounded-full ring-2 ring-white/40" />
            {/* Close button */}
            <button
              onClick={() => setOpenVideoId(null)}
              className="absolute top-3 right-3 px-3 py-2 rounded-md bg-white/10 text-white hover:bg-white/20"
              aria-label="Close video"
            >
              ✕
            </button>
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${openVideoId}?autoplay=1&rel=0`}
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