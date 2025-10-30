import { Link } from 'react-router-dom'
import HeroBanner from '../components/HeroBanner.jsx'
import { newsItems } from '../data/news.js'

export default function News() {
  return (
    <main>
      <HeroBanner title="News & Events" />

      {/* Overview */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-bold">Overview</h2>
        <p className="mt-3 text-sm text-gray-700 max-w-4xl">
          Welcome to the News and Events page, where you’ll find the latest updates from <span className='font-semibold'>Sakhu Cancer Foundation,</span>  including important announcements, upcoming events, and milestones in our mission to support cancer patients through financial aid. Scroll through or search for past updates to stay informed about our work and impact.
        </p>

        {/* Latest Updates */}
        <div className="mt-10">
          <h3 className="text-lg font-thin">Latest <span className="font-bold">Updates</span></h3>
          <p className="mt-2 text-sm text-gray-600">
            This section showcases all news and events in one continuous feed, starting with the most recent. Older news and events can be easily accessed by scrolling down or using the search/filter option.
          </p>

          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-20">
            {newsItems.map((n) => (
              <Link
                key={n.id}
                to={`/news/${n.id}`}
                className="block rounded-lg bg-purple-600 border-l-4 border-purple-600 shadow hover:shadow-md p-4 group"
              >
                {(n.images?.[0] || n.image) && (
                  <img src={n.images?.[0] || n.image} alt={n.title} className="w-full h-32 object-cover rounded-t-lg" />
                )}
                <div className="p-4">
                  <h4 className="text-sm md:text-base font-semibold">{n.title}</h4>
                  <p className="mt-1 text-[11px] text-gray-600">Date: {n.date}</p>
                  <p className="mt-3 text-sm text-white h-[80px] overflow-hidden text-ellipsis line-clamp-3 md:line-clamp-6">
                    {n.summary}
                  </p>
                  <span className="mt-3 inline-block text-xs text-purple-700 underline group-hover:text-purple-500">Read more</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTAs */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-6 items-start">
          <div className="rounded-md bg-[#2E3192] text-white p-6 shadow">
            <h3 className="font-semibold">Help Us Fight Cancer</h3>
            <p className="mt-2 text-xs opacity-90">All donations are welcome. All donations are welcome.</p>
            <Link to="/donation" className="mt-4 inline-block px-4 py-2 rounded-md bg-white text-black hover:bg-white/90">Donate</Link>
          </div>
          <div className="rounded-md bg-black text-white p-6 shadow">
            <h3 className="font-semibold">How can we help you ?</h3>
            <p className="mt-2 text-xs opacity-90">If you have any questions, please ask our counselors.</p>
            <Link to="/contact" className="mt-4 inline-block px-4 py-2 rounded-md bg-white text-black hover:bg-white/90">Contact Us</Link>
          </div>
        </div>
      </section>
    </main>
  )
}