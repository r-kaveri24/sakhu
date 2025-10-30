import { useState } from 'react'
import HeroBanner from '../components/HeroBanner.jsx'
import v1 from '../assets/volunteer/1.png'
import v2 from '../assets/volunteer/2.png'
import v3 from '../assets/volunteer/3.png'

export default function Volunteer() {
  const [form, setForm] = useState({
    name: '', email: '', mobile: '', address: '', occupation: '',
    workAreas: [],
    availability: 'daily',
    days: [],
    fromTime: '', fromPeriod: 'AM',
    toTime: '', toPeriod: 'AM',
    hoursPerDay: '', city: 'Sambhajinagar'
  })

  const areas = [
    'In Hospital Counseling of patients',
    'In Hospital Counseling of families',
    'Providing temporary home stay for patient and families',
    'Community affairs',
    'Designing communications',
    'Conducting awareness meetings',
    'Resource mobilization',
  ]

  const weekDays = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const toggleArea = (area) => {
    setForm((f) => ({
      ...f,
      workAreas: f.workAreas.includes(area)
        ? f.workAreas.filter((a) => a !== area)
        : [...f.workAreas, area],
    }))
  }

  const toggleDay = (day) => {
    setForm((f) => ({
      ...f,
      days: f.days.includes(day)
        ? f.days.filter((d) => d !== day)
        : [...f.days, day],
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    alert('Thank you! Your volunteer form has been submitted.')
  }

  return (
    <main>
      {/* Hero */}
      <HeroBanner title="Volunteer" />

      {/* Form + images */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:flex md:justify-between md:gap-10 items-start">
          {/* Left: form */}
          <form className="md:w-[750px] space-y-6" onSubmit={onSubmit}>
            <h2 className="text-xl md:text-2xl font-semibold">Fill The Form</h2>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={onChange}
              placeholder="Your Name"
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="Email"
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />
            <input
              type="text"
              name="mobile"
              value={form.mobile}
              onChange={onChange}
              placeholder="Mobile No"
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />
            <textarea
              name="address"
              value={form.address}
              onChange={onChange}
              placeholder="Address"
              className="w-full rounded-md border border-gray-300 px-3 py-2 h-24"
            />
            <input
              type="text"
              name="occupation"
              value={form.occupation}
              onChange={onChange}
              placeholder="Current Occupation"
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />

            {/* Areas to work in */}
            <div>
              <p className="font-semibold">Area you would like to work in</p>
              <div className="mt-3 space-y-3 text-sm">
                {areas.map((area) => (
                  <label key={area} className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      checked={form.workAreas.includes(area)}
                      onChange={() => toggleArea(area)}
                      className="mt-1"
                    />
                    <span>{area}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div>
              <p className="font-semibold">Time you can put in a week</p>
              <div className="mt-2 flex items-center gap-6 text-sm">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    name="availability"
                    value="daily"
                    checked={form.availability === 'daily'}
                    onChange={onChange}
                  />
                  <span>Daily</span>
                </label>
                <label className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    name="availability"
                    value="select"
                    checked={form.availability === 'select'}
                    onChange={onChange}
                  />
                  <span>Select Day</span>
                </label>
              </div>
              {form.availability === 'select' && (
                <div className="mt-3 flex flex-wrap gap-4 text-sm">
                  {weekDays.map((d) => (
                    <label key={d} className="inline-flex items-center gap-2">
                      <input type="checkbox" checked={form.days.includes(d)} onChange={() => toggleDay(d)} />
                      <span>{d}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Time range (text input + AM/PM select) */}
            <div className="grid grid-cols-2 ">
              <div>
                <label className="text-sm font-bold">From</label>
                <div className="mt-1 flex items-center gap-3">
                  <input
                    type="text"
                    name="fromTime"
                    value={form.fromTime}
                    onChange={onChange}
                    placeholder=""
                    className="w-24 rounded-md border border-gray-300 px-3 py-2"
                  />
                  <select
                    name="fromPeriod"
                    value={form.fromPeriod}
                    onChange={onChange}
                    className="w-20 rounded-md border border-gray-300 px-3 py-2"
                  >
                    <option value="AM">Am</option>
                    <option value="PM">Pm</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-bold">To</label>
                <div className="mt-1 flex items-center gap-3">
                  <input
                    type="text"
                    name="toTime"
                    value={form.toTime}
                    onChange={onChange}
                    placeholder=""
                    className="w-24 rounded-md border border-gray-300 px-3 py-2"
                  />
                  <select
                    name="toPeriod"
                    value={form.toPeriod}
                    onChange={onChange}
                    className="w-20 rounded-md border border-gray-300 px-3 py-2"
                  >
                    <option value="AM">Am</option>
                    <option value="PM">Pm</option>
                  </select>
                </div>
              </div>
            </div>

            <input
              type="number"
              name="hoursPerDay"
              value={form.hoursPerDay}
              onChange={onChange}
              placeholder="Numbers Of Hours In Day"
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />

            {/* City select */}
            <div>
              <label className="text-sm mr-10 font-bold">City would you like</label>
              <select
                name="city"
                value={form.city}
                onChange={onChange}
                className="mt-1 w-[220px] rounded-md border border-gray-300 px-3 py-2"
              >
                <option value="Sambhajinagar">Sambhajinagar</option>
                <option value="Aurangabad">Aurangabad</option>
                <option value="Mumbai">Mumbai</option>
              </select>
            </div>

            <button type="submit" className="px-5 py-2 rounded-md bg-[#2E3192] text-white hover:bg-purple-700 w-fit">Send</button>
          </form>

          {/* Right: images */}
          <aside className="md:w-[360px] space-y-6 mt-8 md:mt-0">
            <img src={v1} alt="Volunteer 1" className="w-full rounded-md border border-gray-200" />
            <img src={v2} alt="Volunteer 2" className="w-full rounded-md border border-gray-200" />
            <img src={v3} alt="Volunteer 3" className="w-full rounded-md border border-gray-200" />
          </aside>
        </div>
      </section>
    </main>
  )
}