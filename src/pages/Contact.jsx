import { useState, useRef, useEffect } from 'react'
import locationIcon from '../assets/contact/location.png'
import mobileIcon from '../assets/contact/mobile.png'
import emailIcon from '../assets/contact/email.png'
import linkIcon from '../assets/contact/link.png'
import HeroBanner from '../components/HeroBanner.jsx'

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    note: '',
  })

  const addressText = 'Karmafal, Plot No 72, Shakti Nagar, Waluj, Chh. Sambhajinagar'
  // Coordinates for SAKHU CANCER FOUNDATION
  const LAT = 19.8003468
  const LNG = 75.2324577
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
  const mapRef = useRef(null)
  // Fallback embed (no API key): centers and pins the provided coordinates
  const fallbackEmbedSrc = `https://maps.google.com/maps?q=${LAT}%2C${LNG}&z=16&output=embed`

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    alert('Thanks! Your message has been submitted.')
    setForm({ name: '', email: '', mobile: '', address: '', note: '' })
  }

  const InfoRow = ({ icon, title, children }) => (
    <div className="flex items-start gap-3">
      <span className="w-8 h-8 inline-flex items-center justify-center rounded-md bg-purple-600">
        <img src={icon} alt="" className="w-5 h-5" />
      </span>
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs text-gray-600">{children}</p>
      </div>
    </div>
  )

  return (
    <main className="bg-white">
      {/* Initialize map when API key is present */}
      {GOOGLE_MAPS_API_KEY && (
        <MapInitializer mapRef={mapRef} apiKey={GOOGLE_MAPS_API_KEY} lat={LAT} lng={LNG} />
      )}

      {/* Page hero */}
      <HeroBanner title="Contact Us" />
      {/* Top section: info + form */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10">
          {/* Left: contact info */}
          <div>
            <h2 className="text-2xl font-bold">Our Contacts</h2>
            <p className="mt-2 text-xs md:text-sm text-gray-700 max-w-xl">
              We’d love to hear from you! Whether you have a question, feedback, or partnership inquiry our team is here to help.
            </p>

            <div className="mt-6 space-y-5">
              <InfoRow icon={locationIcon} title="Our Location">
                {addressText}
              </InfoRow>
              <InfoRow icon={mobileIcon} title="Phone">
                9307674533
              </InfoRow>
              <InfoRow icon={emailIcon} title="Email">
                sakhucancerf@1234gmail.com
              </InfoRow>
              <InfoRow icon={linkIcon} title="Link">
                <a href="https://www.sakhucancerfoundation.org" target="_blank" rel="noopener noreferrer" className="underline text-black hover:text-[#2E3192]">
                  www.sakhucancerfoundation.org
                </a>
              </InfoRow>
            </div>
          </div>

          {/* Right: contact form */}
          <div>
            <h3 className="text-xl font-semibold">Contact Form</h3>
            <form className="mt-4 space-y-4" onSubmit={onSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  required
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  placeholder="Name"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="Email"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  required
                  type="text"
                  name="mobile"
                  value={form.mobile}
                  onChange={onChange}
                  placeholder="Mobile No"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
                <input
                  required
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={onChange}
                  placeholder="Address"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <textarea
                required
                name="note"
                value={form.note}
                onChange={onChange}
                placeholder="Note"
                className="w-full rounded-md border border-gray-300 px-3 py-2 h-28"
              />
              <div>
                <button type="submit" className="px-5 py-2 rounded-md bg-[#2E3192] text-white hover:bg-purple-700">Submit Now</button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Map section */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="w-full h-[420px] rounded-md overflow-hidden border border-gray-200">
            {GOOGLE_MAPS_API_KEY ? (
              <div ref={mapRef} className="w-full h-full" />
            ) : (
              <iframe
                title="Sakhu Foundation Location"
                src={fallbackEmbedSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

function MapInitializer({ mapRef, apiKey, lat, lng }) {
  useEffect(() => {
    if (!apiKey || !mapRef?.current) return

    const loadMaps = () => new Promise((resolve, reject) => {
      if (window.google && window.google.maps) return resolve(window.google.maps)
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`
      script.async = true
      script.defer = true
      script.onload = () => resolve(window.google.maps)
      script.onerror = (e) => reject(e)
      document.head.appendChild(script)
    })

    let active = true
    loadMaps()
      .then((maps) => {
        if (!active) return
        const map = new maps.Map(mapRef.current, {
          center: { lat, lng },
          zoom: 16,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
        })
        new maps.Marker({ position: { lat, lng }, map, title: 'SAKHU CANCER FOUNDATION' })
      })
      .catch(() => {
        // Fail quietly; fallback iframe is already rendered when apiKey is missing
      })

    return () => { active = false }
  }, [apiKey, mapRef, lat, lng])

  return null
}