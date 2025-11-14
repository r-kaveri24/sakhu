import Button from '../components/Button.jsx'
import hero from '../assets/about/hero.png'
import ribbon from '../assets/about/ribbon.png'
import aboutSakhu from '../assets/about-sakhu.png'
import supporters1 from '../assets/about/supporters1.png'
import suppoerters2 from '../assets/about/suppoerters2.png'
import suppoerters3 from '../assets/about/suppoerters3.png'
import suppoerters4 from '../assets/about/suppoerters4.png'
import ourteam from '../assets/about/ourteam.png'
import ImageCarousel from '../components/ImageCarousel.jsx'
import { API_BASE } from '../lib/adminApi.js'
import { useEffect, useMemo, useRef, useState } from "react";
import testimonialBg from "../assets/testimonial-bg.jpg";
import obj1 from "../assets/obj1.png";
import obj2 from "../assets/obj2.png";
import obj3 from "../assets/obj3.png";
import obj4 from "../assets/obj4.png";
import obj5 from "../assets/obj5.png";
import obj6 from "../assets/obj6.png";
import obj7 from "../assets/obj7.png";
import obj8 from "../assets/obj8.png";
import hope1 from "../assets/hope1.png";
import hope2 from "../assets/hope2.png";
import hope3 from "../assets/hope3.png";
import hope4 from "../assets/hope4.png";
import need1 from "../assets/need1.png";
import need2 from "../assets/need2.png";
import need3 from "../assets/need3.png";
import need4 from "../assets/need4.png";

export default function About() {

  const avatarPool = [
    obj1,
    obj2,
    obj3,
    obj4,
    obj5,
    obj6,
    obj7,
    obj8,
    hope1,
    hope2,
    hope3,
    hope4,
    need1,
    need2,
    need3,
    need4,
  ];

  // Local testimonials data with avatars; removes undefined state usage
  const withAvatars = (items = []) =>
    items.map((t, i) => ({
      ...t,
      avatar: t.avatar || avatarPool[i % avatarPool.length],
    }));

  // De-duplicate testimonials by name (case-insensitive)
  const uniqueByName = (arr = []) => {
    const map = new Map();
    arr.forEach((t) => {
      const key = (t.name || "").trim().toLowerCase();
      if (!map.has(key)) map.set(key, t);
    });
    return Array.from(map.values());
  };

  const subtitle = "Family Members Of Patient's";
  const [items, setItems] = useState(withAvatars([
    { name: 'Harshwardhan Sawant', relation: 'Father of patient', quote: '"आमच्यावर आलेल्या संकटाच्या काळात सखू कॅन्सर फाउंडेशनकडून मिळालेला आधार खूप मोठा होता. त्यांच्यामदतीने आम्हाला खंबीरपणे पुढे जाण्याची ताकद मिळाली.फाउंडेशनचे आभार व्यक्त करण्यासाठी शब्द अपुरे आहेत."', rating: 5, avatar: null },
    { name: 'Arhan Shaikh', relation: 'Family Member', quote: '"आमचा मुलगा हर्षवर्धन कॅन्सरशी लढतोय. उपचाराचा खर्च मोठा होता, पण डॉ. मंगला विधाटे यांच्याकडून मिळालेल्या मदतीने आम्हाला खूप आधार मिळाला. आम्ही मनापासूनआभारी आहोत."', rating: 4, avatar: null },
    { name: 'Bhushan Raut', relation: 'Patient Relative', quote: '"आमचा मुलगा अरहान गंभीर आजाराशी संघर्ष करतोय, आणि उपचाराचा खर्च आमच्यासाठी खूप मोठा होता. सखूकॅन्सर फाउंडेशनच्या मदतीमुळे आम्हाला आधार मिळाला.आम्ही मनापासून आभारी आहोत."', rating: 5, avatar: null },
    { name: 'Neha Patil', relation: 'Sister of patient', quote: '"माझ्या पत्नीला कॅन्सर असल्याचं समजल्यावर आम्ही पूर्णपणे खचून गेलो होतो.सखू कॅन्सर फाउंडेशनने आम्हाला केवळ आर्थिकच नाही, तर मानसिक आधारही दिला.त्यांच्या मदतीशिवाय उपचार सुरू करणे शक्यच नव्हते. आम्ही सदैव ऋणी राहू."', rating: 5, avatar: null },
    { name: 'Ramesh Deshmukh', relation: 'Guardian', quote: '"माझ्या वडिलांच्या उपचारासाठी आम्ही अनेक ठिकाणी मदत मागितली,पण खरी मदत सखू कॅन्सर फाउंडेशनकडूनच मिळाली.त्यांच्या सहकार्यामुळे आमच्या घरात पुन्हा आशेचा किरण आला आहे."', rating: 4, avatar: null },
    { name: 'Sana Khan', relation: 'Mother', quote: '"आमच्या लहान मुलीच्या उपचाराचा खर्च खूप मोठा होता, आणि आम्ही हतबल झालो होतो.सखू कॅन्सर फाउंडेशनने योग्य वेळी मदत करून आम्हाला दिलासा दिला.त्यांच्या या माणुसकीच्या भावनेमुळे आम्ही पुन्हा हसणं शिकलो."', rating: 4, avatar: null },
    { name: 'Vikas Jadhav', relation: 'Uncle', quote: '"माझ्या आईच्या कॅन्सरच्या उपचारासाठी आम्ही खूप प्रयत्न करत होतो,पण खर्च परवडत नव्हता. सखू कॅन्सर फाउंडेशनने पुढाकार घेतमदत केली आणि आम्हाला आशेचा नवा किरण दिला.त्यांच्या मदतीमुळे आईचं उपचार सुरू राहू शकले — आम्ही मनापासून आभारी आहोत."', rating: 4.5, avatar: null },
  ]));

  // Load testimonials from admin API, fallback to local items
  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const res = await fetch(`${API_BASE}/api/testimonials`, { mode: 'cors' });
        if (!res.ok) throw new Error('Failed to load testimonials');
        const data = await res.json();
        const apiItems = (data.items || []).map((t) => ({
          name: t.name,
          relation: t.role || '',
          quote: t.quote,
          avatar: t.avatar || null,
          rating: 5,
        }));
        if (!ignore) {
          // Merge API items with existing local items and de-duplicate
          setItems((prev) => uniqueByName(withAvatars([...apiItems, ...prev])));
        }
      } catch (e) {
        // keep local fallback
      }
    }
    load();
    return () => { ignore = true; };
  }, []);

  // Missing refs/state for scrolling controls
  const listRef = useRef(null);
  const segmentRef = useRef(0);
  const [testimonialIndex, setTestimonialIndex] = useState(() => {
    try { return Number(localStorage.getItem('testimonialIndex')) || 0; } catch { return 0; }
  });

  const scrollUp = () => {
    if (listRef.current) listRef.current.scrollBy({ left: -360, behavior: 'smooth' });
  };
  const scrollDown = () => {
    if (listRef.current) listRef.current.scrollBy({ left: 360, behavior: 'smooth' });
  };

  const loopedItems = useMemo(() => [...items, ...items, ...items], [items]);



  // Allow native vertical scrolling; buttons handle horizontal movement
  // Removed touch/wheel/pointer blocking to restore page scroll on mobile

  const handleInfiniteScroll = () => {
    const el = listRef.current;
    if (!el) return;
    const seg = segmentRef.current;
    if (!seg) return;
    // Keep scrollLeft inside the middle segment [seg, 2*seg)
    if (el.scrollLeft < seg) {
      el.scrollLeft += seg;
    } else if (el.scrollLeft >= seg * 2) {
      el.scrollLeft -= seg;
    }
  };

  const scrollByOneCard = (dir = 1) => {
    const el = listRef.current;
    if (!el) return;
    const n = items.length || 1;
    const seg = segmentRef.current;
    const fallbackStep = 420; // 340 card + 80 gap matches current styles
    const step = seg ? seg / n : fallbackStep;
    let pos = el.scrollLeft;
    const threshold = step * 0.5; // preempt wrap slightly before boundary

    if (seg) {
      if (dir > 0 && pos + step >= seg * 2 - threshold) {
        // approaching right boundary: shift left by one segment before scrolling
        pos -= seg;
        el.scrollLeft = pos;
      } else if (dir < 0 && pos - step <= seg + threshold) {
        // approaching left boundary: shift right by one segment before scrolling
        pos += seg;
        el.scrollLeft = pos;
      }
    }

    el.scrollTo({ left: pos + dir * step, behavior: 'smooth' });
    // Update and persist last-viewed card index
    setTestimonialIndex((i) => {
      const next = (i + dir + n) % n;
      try { localStorage.setItem('testimonialIndex', String(next)); } catch {}
      return next;
    });
  };
  const scrollLeft = () => scrollByOneCard(-1);
  const scrollRight = () => scrollByOneCard(1);

  // Measure segment width using card offsets and initialize using persisted index
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const cards = el.querySelectorAll('[data-testimonial-card]');
    const n = items.length;
    if (!n || cards.length < n * 2) return; // need at least two segments to measure
    const first = cards[0];
    const secondSegmentFirst = cards[n];
    const seg = (secondSegmentFirst.offsetLeft - first.offsetLeft) || 0;
    segmentRef.current = seg;
    // Initialize scroll to middle segment offset by saved index
    const id = setTimeout(() => {
      const idx = ((testimonialIndex % n) + n) % n;
      const step = seg ? seg / n : 0;
      el.scrollLeft = seg + idx * step;
    }, 0);
    return () => clearTimeout(id);
  }, [items.length, testimonialIndex]);

  // Clamp persisted index when items length changes
  useEffect(() => {
    const n = items.length || 0;
    setTestimonialIndex((i) => {
      const clamped = n ? ((i % n) + n) % n : 0;
      try { localStorage.setItem('testimonialIndex', String(clamped)); } catch {}
      return clamped;
    });
  }, [items.length]);

  
  const supportersLogos = [supporters1, suppoerters2, suppoerters3, suppoerters4]
  
  // Demo image sets for carousels (replace with real team/volunteer photos as available)
  const teamImages = [
    { src: obj1, name: 'Team Member 1', role: 'Coordinator' },
    { src: obj2, name: 'Team Member 2', role: 'Support Lead' },
    { src: obj3, name: 'Team Member 3', role: 'Outreach' },
    { src: obj4, name: 'Team Member 4', role: 'Operations' },
  ];
  const volunteerImages = [
    { src: hope1, name: 'Volunteer 1' },
    { src: hope2, name: 'Volunteer 2' },
    { src: hope3, name: 'Volunteer 3' },
    { src: hope4, name: 'Volunteer 4' },
  ];
  
  // Live API-backed data (default to local fallbacks)
  const [teamImagesLive, setTeamImagesLive] = useState(teamImages);
  const [volunteerImagesLive, setVolunteerImagesLive] = useState(volunteerImages);

  // Load Team members from admin API (connected to DB & AWS S3)
  useEffect(() => {
    let cancelled = false;
    async function fetchTeam() {
      if (!API_BASE) return;
      try {
        const res = await fetch(`${API_BASE}/api/team`, { mode: 'cors' });
        if (!res.ok) return;
        const data = await res.json();
        const items = Array.isArray(data?.items) ? data.items : [];
        const mapped = items
          .map((it) => ({
            src: it?.avatarUrl || '',
            name: it?.name || '',
            role: it?.designation || undefined,
          }))
          .filter((m) => m.src && m.name);
        if (!cancelled && mapped.length) setTeamImagesLive(mapped);
      } catch (_) {
        // Keep fallbacks on error
      }
    }
    fetchTeam();
    return () => {
      cancelled = true;
    };
  }, []);

  // Load Volunteer members from admin API
  useEffect(() => {
    let cancelled = false;
    async function fetchVolunteer() {
      if (!API_BASE) return;
      try {
        const res = await fetch(`${API_BASE}/api/volunteer`, { mode: 'cors' });
        if (!res.ok) return;
        const data = await res.json();
        const items = Array.isArray(data?.items) ? data.items : [];
        const mapped = items
          .map((it) => ({
            src: it?.avatarUrl || '',
            name: it?.name || '',
          }))
          .filter((m) => m.src && m.name);
        if (!cancelled && mapped.length) setVolunteerImagesLive(mapped);
      } catch (_) {
        // Keep fallbacks on error
      }
    }
    fetchVolunteer();
    return () => {
      cancelled = true;
    };
  }, []);
  
  // Our Team background: use provided image via public path, fallback to testimonialBg
  const [teamBgSrc, setTeamBgSrc] = useState(ourteam);
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
            <p className="text-[12px]  font-thin tracking-wide">Your support can make a difference.</p>
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
        <div className="max-w-7xl mx-auto px-4 grid  md:grid-cols-2 lg:grid-cols-3 gap-10 items-start">
          {/* Left: heading + acronym list */}
          <div className=''>
            <h2 className="text-2xl md:text-3xl font-thin">
              <span className="text-blue-800 font-bold">“SAKHU”</span> Means
            </h2>
            <div className="mt-4 space-y-3 text-sm">
              <p className='text-[#EC1F7C]'><span className="text-purple-700 font-semibold">S :</span> Supporting</p>
              <p className='text-[#EC1F7C]'><span className="text-purple-700 font-semibold">A :</span> Actively As</p>
              <p className='text-[#EC1F7C]'><span className="text-purple-700 font-semibold">K :</span> Key For</p>
              <p className='text-[#EC1F7C]'><span className="text-purple-700 font-semibold">H :</span> Hope &</p>
              <p className='text-[#EC1F7C]'><span className="text-purple-700 font-semibold">U :</span> Upliftment Of Cancer Patients</p>
            </div>
          </div>

          {/* Center: Ribbon image */}
          <div className="flex items-start justify-center h-60 w-64 ">
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
           <div className="flex justify-center w-full items-center md:hidden mb-10">
              <img src={aboutSakhu} alt="Sakhu" className="w-[220px] h-[270px] object-cover rounded-lg shadow" />
            </div>
          <h2 className="text-2xl md:text-3xl font-thin text-center">Our <span className="font-bold">Story</span></h2>
          <p className="mt-2 text-sm md:text-lg text-purple-700 text-start">"We help patients and caregivers in Sakhu with cancer."</p>

          <div className="mt-6 flex justify-between w-full gap-8 items-start">
            {/* Left: Sakhu photo from assets */}
            <div className=" justify-center md:flex hidden md:justify-start w-[220px] h-[270px]">
              <img src={aboutSakhu} alt="Sakhu" className="w-full h-full object-cover rounded-lg shadow" />
            </div>

            {/* Right: story paragraphs */}
            <div className="text-gray-800 w-[785px]">
              <p className="text-sm md:text-[14px] leading-relaxed">
                The <span className="font-semibold">SAKHU Cancer Foundation </span> is a Registered Medical NGO and Non-Profit organization established by
                Cancer Warrior/survivor <span className="font-semibold"> Ms. Sakhubai Jare (Staff Nurse), </span> along with her like-minded colleagues, friends and family. <span className="font-semibold">SAKHU Cancer Foundation </span> 
                is the only NGO that provides promotive, preventive, rehabilitative and palliative support to all types of cancer patients to fight against
                the cancer. The <span className="font-semibold">SAKHU Cancer Foundation </span>  is registered under the Section 8 of the Companies Act, 2013.
              </p>
              <p className="mt-2 text-sm md:text-[14px] leading-relaxed">
                Friends and family, <span className="font-semibold">SAKHU Cancer Foundation </span> is the only NGO that provides promotive, preventive, rehabilitative and palliative support to the
                all type of cancer patients to fight against the cancer. The <span className="font-semibold">SAKHU Cancer Foundation </span> is registered under the Section 8 of the Companies Act, 2013.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission section (after Our Story) */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-thin text-center">Our <span className="font-bold">Mission</span></h2>
          <div className="mt-6">
            <h3 className="text-sm md:text-lg font-semibold">We are committed to:</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-700 list-disc pl-5">
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

      {/* Our Team and Our Volunteer stacked in one column, matching reference spacing */}
      <section className="py-12 w-full ">
        <div className="w-full mx-auto px-4 relative z-10 flex flex-col items-center">
          <div className="absolute inset-0 z-0 w-full h-full">
              <img
                src={teamBgSrc}
                onError={() => setTeamBgSrc(testimonialBg)}
                alt="Our Team background"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-white/40" aria-hidden="true" />
            </div>
          {/* Our Team on top */}
          <h2 className=" relative text-2xl md:text-3xl font-thin text-center">
            Our <span className="font-bold">Team</span>
          </h2>
          <p className=" relative mt-2 text-sm md:text-base text-gray-700 text-center">Meet our core team</p>
          {/* Team carousel over background image */}
          <div className="relative  mt-6 rounded-lg overflow-hidden">
            {/* Background */}
            
            {/* Foreground content */}
            <div className="relative px-2 md:px-4 py-6 max-w-5xl">
              <ImageCarousel title={null} images={teamImagesLive} />
            </div>
          </div>

          {/* Our Volunteer below, visually distinct via subtitle and spacing */}
          <h2 className="relative  text-2xl md:text-3xl font-thin text-center">
            Our <span className="font-bold">Volunteer</span>
          </h2>
          <p className=" relative  mt-2 text-sm md:text-base text-gray-700 text-center">Community members who support our mission</p>
           <div className="relative  mt-6 rounded-lg overflow-hidden">
          <div className="relative px-2 md:px-4 py-6 max-w-5xl">
            <ImageCarousel title={null} images={volunteerImagesLive}  roleFallback="Volunteer" />
          </div>
          </div>
        </div>
      </section>

      {/* Our Supporters - seamless continuous marquee */}
      <section className="py-10">
        <div className="max-w-[1200px] mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-thin text-center mb-10">Our <span className="font-bold">Supporters</span></h2>
          <div className="mt-6 relative overflow-hidden">
            {/* Two equal inner groups, each long enough to cover wide screens */}
            <div className="marquee-track flex items-center whitespace-nowrap" style={{ willChange: 'transform' }}>
              <div className="marquee-inner flex items-center gap-12">
                {[...supportersLogos, ...supportersLogos, ...supportersLogos].map((src, i) => (
                  <img key={`logo-a-${i}`} src={src} alt={`Supporter ${(i%supportersLogos.length)+1}`} className="h-12 md:h-16 object-contain" />
                ))}
              </div>
              <div className="marquee-inner flex items-center gap-12" aria-hidden="true">
                {[...supportersLogos, ...supportersLogos, ...supportersLogos].map((src, i) => (
                  <img key={`logo-b-${i}`} src={src} alt="" className="h-12 md:h-16 object-contain" />
                ))}
              </div>
            </div>
          </div>
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-50%, 0, 0); }
          }
          .marquee-track { 
            animation: marquee 20s linear infinite;
            backface-visibility: hidden;
            transform: translateZ(0);
          }
          .marquee-inner { flex: 0 0 auto; }
          .marquee-inner + .marquee-inner { margin-left: 3rem; }
          @media (prefers-reduced-motion: reduce) {
            .marquee-track { animation: none; }
          }
        `}</style>
      </section>

      {/* How We Make a Difference */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-thin text-center">How We <span className="font-bold">Make a Difference</span></h2>
          <p className="mt-6 text-sm text-gray-600 text-start">We want you to know exactly how your donations are used to bring comfort and care to those who need it most. Here's what happens when you give</p>

          <div className="mt-6 max-w-7xl mx-auto">
            <div className="py-10">
              <h4 className="text-sm md:text-base font-semibold">From Your Heart to Their Hands :</h4>
              <p className="mt-1 text-sm text-gray-700">When you donate, your contributions go directly to those who need it. We ensure that funds are used for treatments, medications, and essential patient support, providing immediate relief and assistance.</p>
            </div>
            <hr className="border-gray-300" />
            <div className="py-10">
              <h4 className="text-sm md:text-base font-semibold">Meet Our Compassionate Team :</h4>
              <p className="mt-1 text-sm text-gray-700">Our volunteers and staff are dedicated to bringing your donations to their best work. From verifying patient needs to distributing funds, every step is handled with care and compassion.</p>
            </div>
            <hr className="border-gray-300" />
            <div className="py-10">
              <h4 className="text-sm md:text-base font-semibold">Transparency and Trust :</h4>
              <p className="mt-1 text-sm text-gray-700">We believe in openness. Regular updates and thorough reporting keep you informed about how your donations are making a difference, helping to build a strong, trust-filled community.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - reused component with identical styling/behavior */}
      <section id="testimonials">
        {/* Heading OUTSIDE the bg image */}
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold text-center text-black mb-2">Testimonials</h2>
              <p className="text-center text-xs md:text-sm text-black">{subtitle}</p>
            </div>

        {/* Image-backed area that only wraps cards + controls */}
          <div className="relative mt-2 h-[600px] flex items-center justify-center">
            {/* Background image */}
            <div className="absolute inset-0 z-0">
              <img
                src={testimonialBg}
                alt="Testimonials background"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Content over the image */}
            <div className="relative max-w-[80%] mx-auto px-4 py-8">
            {/* Horizontal scroll row */}
            <div>
              <div
                ref={listRef}
                onScroll={handleInfiniteScroll}
                className="overflow-x-hidden scroll-smooth no-scrollbar w-[280px] sm:w-[300px] md:w-full mx-auto"
                style={{ touchAction: 'pan-y', userSelect: 'auto' }}
              >
                <div className="flex gap-6 md:gap-20 py-2">
                  {loopedItems.map((t, i) => (
                    <div
                      key={i}
                      data-testimonial-card
                      className="w-[260px] sm:w-[300px] md:w-[340px] h-[308px] shrink-0 rounded-lg bg-white shadow p-6 flex items-start"
                    >
                      <div className="flex-1 space-y-2">
                        <div className="w-[78px] h-[78px] rounded-full bg-gray-200 overflow-hidden shrink-0">
                          {t.avatar ? (
                            <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                          ) : null}
                        </div>
                        <h3 className="text-sm md:text-base font-semibold text-black">{t.name}</h3>
                        <p className="text-xs text-gray-500">{t.relation}</p>
                        <p className="mt-2 text-sm text-gray-700 h-20 overflow-hidden text-ellipsis line-clamp-4">
                          {t.quote}
                        </p>
                        <div className="mt-2 flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, s) => {
                            const rating = t.rating || 0;
                            const full = Math.floor(rating);
                            const hasHalf = (rating - full) >= 0.5;
                            const isFull = s < full;
                            const isHalf = s === full && hasHalf;
                            return (
                              <span key={s} className="relative inline-block w-4 h-4">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill={isFull ? '#f59e0b' : '#e5e7eb'}
                                  className="w-4 h-4"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.803 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.803-2.036a1 1 0 00-1.176 0l-2.803 2.036c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.88 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                {isHalf ? (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="#f59e0b"
                                    className="w-4 h-4 absolute top-0 left-0"
                                    style={{ clipPath: 'inset(0 50% 0 0)' }}
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.803 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.803-2.036a1 1 0 00-1.176 0l-2.803 2.036c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.88 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ) : null}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Controls */}
              <div className="mt-6 flex justify-center gap-3">
                <button
                  onClick={scrollLeft}
                  aria-label="Scroll left"
                  className="bg-[#2E3192] text-white w-8 h-8 rounded hover:bg-black flex items-center justify-center"
                >
                  ←
                </button>
                <button
                  onClick={scrollRight}
                  aria-label="Scroll right"
                  className="bg-[#2E3192] text-white w-8 h-8 rounded hover:bg-black flex items-center justify-center"
                >
                  →
                </button>
              </div>
            </div>
          </div>

          </div>
        </section>
    </main>
  )
}