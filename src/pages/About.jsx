import Button from '../components/Button.jsx'
import hero from '../assets/about/hero.png'
import ribbon from '../assets/about/ribbon.png'
import aboutSakhu from '../assets/about-sakhu.png'
import supporters1 from '../assets/about/supporters1.png'
import suppoerters2 from '../assets/about/suppoerters2.png'
import suppoerters3 from '../assets/about/suppoerters3.png'
import suppoerters4 from '../assets/about/suppoerters4.png'
import Testimonials from '../components/Testimonials.jsx'

export default function About() {
  const supportersLogos = [supporters1, suppoerters2, suppoerters3, suppoerters4]
  return (
    <main className="bg-white">
      {/* Hero banner with placeholder image (will be replaced later) */}
      <section className="relative">
        <div className="relative h-100">
          {/* Placeholder photo container with slight zoom effect */}
          <div className="absolute inset-0 bg-gray-300 transform  origin-center" >
            <img src={hero} alt="Hero" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
            <p className="text-[12px] sm:text-xs font-thin tracking-wide">Your support can make a difference.</p>
            <h1 className="mt-1 text-xl sm:text-2xl md:text-3xl font-bold">Join Us in Our Mission!</h1>
            <div className="mt-4 flex items-center gap-3">
              <Button href="#donate">Donate Now</Button>
              <Button href="#volunteer">Volunteer</Button>
            </div>
          </div>
        </div>
      </section>

      {/* “SAKHU” Means section per provided view */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 grid  md:grid-col-2 lg:grid-cols-3 gap-10 items-start">
          {/* Left: heading + acronym list */}
          <div>
            <h2 className="text-2xl md:text-3xl font-thin">
              <span className="text-blue-800 font-bold">“SAKHU”</span> Means
            </h2>
            <div className="mt-4 space-y-3 text-xs md:text-sm">
              <p className='text-[#EC1F7C]'><span className="text-purple-700 font-semibold">S :</span> Supporting</p>
              <p className='text-[#EC1F7C]'><span className="text-purple-700 font-semibold">A :</span> Actively As</p>
              <p className='text-[#EC1F7C]'><span className="text-purple-700 font-semibold">K :</span> Key For</p>
              <p className='text-[#EC1F7C]'><span className="text-purple-700 font-semibold">H :</span> Hope &</p>
              <p className='text-[#EC1F7C]'><span className="text-purple-700 font-semibold">U :</span> Upliftment Of Cancer Patients</p>
            </div>
          </div>

          {/* Center: Ribbon image */}
          <div className="flex items-start justify-center h-60 w-64">
            <img src={ribbon} alt="Awareness Ribbon" />
          </div>

          {/* Right: Donate card (deep blue) */}
          <aside className="bg-indigo-900 text-white shadow p-5 md:p-9">
            <h4 className="text-base md:text-lg font-semibold">Help Us Fight Cancer</h4>
            <p className="mt-2 text-xs md:text-sm opacity-90">
             All donations are welcome. All donations are welcome. All donations are welcome.
            </p>
            <div className="mt-4">
              <button href="#donate" className="bg-white p-2 px-4 rounded-lg text-black hover:bg-none">Donate</button>
            </div>
          </aside>
        </div>
      </section>

      {/* Our Story section placed directly after SAKHU Means */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-thin text-center">Our <span className="font-bold">Story</span></h2>
          <p className="mt-2 text-sm md:text-lg text-purple-700 text-start">"We help patients and caregivers in Sakhu with cancer."</p>

          <div className="mt-6 flex justify-between w-full gap-8 items-start">
            {/* Left: Sakhu photo from assets */}
            <div className="flex justify-center md:justify-start w-[220px] h-[270px]">
              <img src={aboutSakhu} alt="Sakhu" className="w-full h-full object-cover rounded-lg shadow" />
            </div>

            {/* Right: story paragraphs */}
            <div className="text-gray-800 w-[785px]">
              <p className="text-sm md:text-lg leading-relaxed font-thin">
                The <span className="font-semibold">SAKHU Cancer Foundation </span> is a Registered Medical NGO and Non-Profit organization established by
                Cancer Warrior/survivor <span className="font-semibold"> Ms. Sakhubai Jare (Staff Nurse), </span> along with her like-minded colleagues, friends and family. <span className="font-semibold">SAKHU Cancer Foundation </span> 
                is the only NGO that provides promotive, preventive, rehabilitative and palliative support to all types of cancer patients to fight against
                the cancer. The <span className="font-semibold">SAKHU Cancer Foundation </span>  is registered under the Section 8 of the Companies Act, 2013.
              </p>
              <p className="mt-2 text-sm md:text-lg leading-relaxed font-thin">
                Friends and family, SAKHU Cancer Foundation is the only NGO that provides promotive, preventive, rehabilitative and palliative support to the
                all type of cancer patients to fight against the cancer. The SAKHU Cancer Foundation is registered under the Section 8 of the Companies Act, 2013.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission section (after Our Story) */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-thin text-center">Our <span className="font-bold">Mission</span></h2>
          <p className="mt-2 text-xs md:text-sm text-start">
            "Is To Promote the Health and Quality of Life of Cancer Patients by Giving Financial, Psychological, Emotional, Social & Rehabilitation Assistance to the Low-Income and Needy patients of Society"
          </p>

          <div className="mt-6">
            <h3 className="text-sm md:text-lg font-semibold">We are committed to:</h3>
            <ul className="mt-3 space-y-2 text-xs md:text-sm text-gray-700 list-disc pl-5">
              <li>
                <span className="font-medium">Financial Assistance:</span> Offering financial support to help cover the cost of cancer treatment, making healthcare accessible to those in need.
              </li>
              <li>
                <span className="font-medium">Educational Resources:</span> Providing information and guidance to patients and caregivers about cancer treatment options, healthcare navigation, and self-care.
              </li>
              <li>
                <span className="font-medium">Community Building:</span> Creating a network of support to connect cancer patients and their families with resources, support groups, and community services.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Our Team (card grid) */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-xl font-semibold">Our Team</h3>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1,2,3,4].map((i) => (
              <div key={i} className="rounded-md border border-gray-200 bg-white shadow p-3">
                <div className="w-full h-32 bg-gray-200 rounded" />
                <p className="mt-2 text-sm font-medium">Member {i}</p>
                <p className="text-xs text-gray-600">Role / Title</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Supporters - auto-scrolling marquee (after Our Team) */}
      <section className="py-10">
        <div className="max-w-[1200px] mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-thin text-center mb-10">Our <span className="font-bold">Supporters</span></h2>
          <div className="mt-6 relative overflow-hidden">
            <div className="flex items-center gap-12 whitespace-nowrap animate-marquee">
              {[...supportersLogos, ...supportersLogos, ...supportersLogos, ...supportersLogos].map((src, i) => (
                <img key={`logo-${i}`} src={src} alt={`Supporter ${(i%supportersLogos.length)+1}`} className="h-12 md:h-16 object-contain" />
              ))}
            </div>
          </div>
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-25%); }
          }
          .animate-marquee {
            animation: marquee 25s linear infinite;
          }
        `}</style>
      </section>

      {/* How We Make a Difference */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-thin text-center">How We <span className="font-bold">Make a Difference</span></h2>
          <p className="mt-6 text-xs md:text-sm text-gray-600 text-start">We want you to know exactly how your donations are used to bring comfort and care to those who need it most. Here's what happens when you give</p>

          <div className="mt-6 max-w-7xl mx-auto">
            <div className="py-10">
              <h4 className="text-sm md:text-base font-semibold">From Your Heart to Their Hands :</h4>
              <p className="mt-1 text-xs md:text-sm text-gray-700">When you donate, your contributions go directly to those who need it. We ensure that funds are used for treatments, medications, and essential patient support, providing immediate relief and assistance.</p>
            </div>
            <hr className="border-gray-300" />
            <div className="py-10">
              <h4 className="text-sm md:text-base font-semibold">Meet Our Compassionate Team :</h4>
              <p className="mt-1 text-xs md:text-sm text-gray-700">Our volunteers and staff are dedicated to bringing your donations to their best work. From verifying patient needs to distributing funds, every step is handled with care and compassion.</p>
            </div>
            <hr className="border-gray-300" />
            <div className="py-10">
              <h4 className="text-sm md:text-base font-semibold">Transparency and Trust :</h4>
              <p className="mt-1 text-xs md:text-sm text-gray-700">We believe in openness. Regular updates and thorough reporting keep you informed about how your donations are making a difference, helping to build a strong, trust-filled community.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - reused component with identical styling/behavior */}
      <Testimonials />
    </main>
  )
}