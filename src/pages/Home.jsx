import Button from '../components/Button.jsx';
// Removed unused banner imports to prevent build errors
import donateIcon from '../assets/donate-icon.png';
import volunteerIcon from '../assets/volunteer-icon 1.png';
import sponsorIcon from '../assets/sponsor-icon.png';
import obj1 from '../assets/obj1.png';
import obj2 from '../assets/obj2.png';
import obj3 from '../assets/obj3.png';
import obj4 from '../assets/obj4.png';
import obj5 from '../assets/obj5.png';
import obj6 from '../assets/obj6.png';
import obj7 from '../assets/obj7.png';
import obj8 from '../assets/obj8.png';
import need1 from '../assets/need1.png';
import need2 from '../assets/need2.png';
import need3 from '../assets/need3.png';
import need4 from '../assets/need4.png';
import hope1 from '../assets/hope1.png';
import hope2 from '../assets/hope2.png';
import hope3 from '../assets/hope3.png';
import hope4 from '../assets/hope4.png';
import eligibility1 from '../assets/eligibility1.png';
import eligibility2 from '../assets/eligibility2.png';
import news1 from '../assets/home-latest1.png';
import news2 from '../assets/home-latest2.png';
import sakhu from '../assets/about-sakhu.png'

import { useEffect, useState, useRef, useMemo } from 'react';
import testimonialBg from '../assets/testimonial-bg.jpg';

export default function Home() {
  const slides = [null, null, null];
  const [current, setCurrent] = useState(0);
  const [news, setNews] = useState({ title: 'Latest News', items: [] });
  const [testimonials, setTestimonials] = useState({ title: 'Testimonials', subtitle: "Family Members Of Patient's", items: [] });
  // Persist the last-viewed testimonial index across refreshes
  const [testimonialIndex, setTestimonialIndex] = useState(() => {
    try {
      const v = parseInt(localStorage.getItem('testimonialIndex') ?? '0', 10);
      return Number.isNaN(v) ? 0 : v;
    } catch {
      return 0;
    }
  });
  const listRef = useRef(null);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((i) => (i + 1) % slides.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  // Load Latest News dynamically from API, fallback to local content
  useEffect(() => {
    const fallback = {
      title: 'Latest News',
      items: [
        {
          heading: 'Inauguration of SAKHU cancer foundation',
          body:
            'On October 17, 2024, the inauguration ceremony of the SAKHU Cancer Foundation took place at KEM Hospital, Pune. The SAKHU Cancer Foundation provides financial assistance for the treatment of cancer patients and their overall development. It also conducts awareness programs about cancer, offers counseling to patients, provides free education to patients and their children, as well as free food, accommodation, and ambulance services to all cancer patients.',
          image: news1,
        },
        {
          heading:
            'Donation to Master Harshwardhan Sawant for the treatment of Blood Cancer',
          body:
            "In a separate, deeply moving ceremony during the same event, Dr. Mangala Vidhate, a distinguished pediatric oncologist, had the honor of presenting a vital donation to the guardians of 12-year-old Master Harshwardhan Sawant, who is currently undergoing treatment for T-Cell Acute Lymphoblastic Leukemia (ALL). Harshwardhan's diagnosis has been a devastating blow to his family, but his strength and determination to fight cancer have been nothing short of inspiring. The road to recovery for Harshwardhan has been long and difficult, and the financial strain of ongoing treatment posed an additional challenge for his family.",
          image: news2,
        },
      ],
    };

    async function loadNews() {
      try {
        const res = await fetch('/api/news');
        if (res.ok) {
          const data = await res.json();
          setNews(data);
        } else {
          setNews(fallback);
        }
      } catch (e) {
        setNews(fallback);
      }
    }

    loadNews();
  }, []);

  // Load Testimonials dynamically from API, fallback to local content (6-7 items)
  useEffect(() => {
    const avatarPool = [
      obj1, obj2, obj3, obj4, obj5, obj6, obj7, obj8,
      hope1, hope2, hope3, hope4,
      need1, need2, need3, need4,
    ];

    const withAvatars = (items = []) =>
      items.map((t, i) => ({
        ...t,
        avatar: t.avatar || avatarPool[i % avatarPool.length],
      }));

    const fallback = {
      title: 'Testimonials',
      subtitle: "Family Members Of Patient's",
      items: [
        { name: 'Harshwardhan Sawant', relation: 'Father of patient', quote: '"आमच्यावर आलेल्या संकटाच्या काळात सखू कॅन्सर फाउंडेशनकडून मिळालेला आधार खूप मोठा होता. त्यांच्यामदतीने आम्हाला खंबीरपणे पुढे जाण्याची ताकद मिळाली.फाउंडेशनचे आभार व्यक्त करण्यासाठी शब्द अपुरे आहेत."', rating: 5, avatar: null },
        { name: 'Arhan Shaikh', relation: 'Family Member', quote: '"आमचा मुलगा हर्षवर्धन कॅन्सरशी लढतोय. उपचाराचा खर्च मोठा होता, पण डॉ. मंगला विधाटे यांच्याकडून मिळालेल्या मदतीने आम्हाला खूप आधार मिळाला. आम्ही मनापासूनआभारी आहोत."', rating: 4, avatar: null },
        { name: 'Bhushan Raut', relation: 'Patient Relative', quote: '"आमचा मुलगा अरहान गंभीर आजाराशी संघर्ष करतोय, आणि उपचाराचा खर्च आमच्यासाठी खूप मोठा होता. सखूकॅन्सर फाउंडेशनच्या मदतीमुळे आम्हाला आधार मिळाला.आम्ही मनापासून आभारी आहोत."', rating: 5, avatar: null },
        { name: 'Neha Patil', relation: 'Sister of patient', quote: '"माझ्या पत्नीला कॅन्सर असल्याचं समजल्यावर आम्ही पूर्णपणे खचून गेलो होतो.सखू कॅन्सर फाउंडेशनने आम्हाला केवळ आर्थिकच नाही, तर मानसिक आधारही दिला.त्यांच्या मदतीशिवाय उपचार सुरू करणे शक्यच नव्हते. आम्ही सदैव ऋणी राहू."', rating: 5, avatar: null },
        { name: 'Ramesh Deshmukh', relation: 'Guardian', quote: '"माझ्या वडिलांच्या उपचारासाठी आम्ही अनेक ठिकाणी मदत मागितली,पण खरी मदत सखू कॅन्सर फाउंडेशनकडूनच मिळाली.त्यांच्या सहकार्यामुळे आमच्या घरात पुन्हा आशेचा किरण आला आहे."', rating: 4, avatar: null },
        { name: 'Sana Khan', relation: 'Mother', quote: '"आमच्या लहान मुलीच्या उपचाराचा खर्च खूप मोठा होता, आणि आम्ही हतबल झालो होतो.सखू कॅन्सर फाउंडेशनने योग्य वेळी मदत करून आम्हाला दिलासा दिला.त्यांच्या या माणुसकीच्या भावनेमुळे आम्ही पुन्हा हसणं शिकलो."', rating: 4, avatar: null },
        { name: 'Vikas Jadhav', relation: 'Uncle', quote: '"माझ्या आईच्या कॅन्सरच्या उपचारासाठी आम्ही खूप प्रयत्न करत होतो,पण खर्च परवडत नव्हता. सखू कॅन्सर फाउंडेशनने पुढाकार घेतमदत केली आणि आम्हाला आशेचा नवा किरण दिला.त्यांच्या मदतीमुळे आईचं उपचार सुरू राहू शकले — आम्ही मनापासून आभारी आहोत."', rating: 4.5, avatar: null },
      ],
    };

    async function loadTestimonials() {
      try {
        const res = await fetch('/api/testimonials');
        if (res.ok) {
          const data = await res.json();
          const items = withAvatars(data.items || []);
          setTestimonials({ ...data, items });
        } else {
          setTestimonials({ ...fallback, items: withAvatars(fallback.items) });
        }
      } catch (e) {
        setTestimonials({ ...fallback, items: withAvatars(fallback.items) });
      }
    }

    loadTestimonials();
  }, []);

  const scrollUp = () => {
    if (listRef.current) listRef.current.scrollBy({ left: -360, behavior: 'smooth' });
  };
  const scrollDown = () => {
    if (listRef.current) listRef.current.scrollBy({ left: 360, behavior: 'smooth' });
  };

  const items = testimonials.items || [];
  const loopedItems = useMemo(() => [...items, ...items, ...items], [items]);
  const segmentRef = useRef(0);

  const onTestimonialsWheel = (e) => {
    const el = listRef.current;
    if (!el) return;
    // Translate vertical wheel into horizontal scroll when vertical is dominant
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      el.scrollBy({ left: e.deltaY, behavior: 'smooth' });
    }
  };

  // Block wheel scrolling to enforce button-only manual scroll inside testimonials
  const blockWheel = (e) => {
    e.preventDefault();
  };

  // Block touch gestures (swipes/pans) to enforce button-only manual scroll
  const blockTouch = (e) => {
    e.preventDefault();
  };

  // Block pointer-based panning (e.g., touch/pen) while keeping mouse clicks
  const blockPointer = (e) => {
    // Prevent drag/pan for all pointer types (mouse, touch, pen)
    e.preventDefault();
  };

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



  // Support cards content used for positioning only
  const supportCards = [
    {
      img: hope1,
      title: "Patients We've Helped",
      body:
        "Thanks to your support, we've been able to assist numerous individuals in receiving crucial cancer treatments. Each person represents a life touched and a story changed for the better.",
    },
    {
      img: hope2,
      title: 'Health and Healing',
      body:
        'Our focus is on the well-being of each patient. With the help of your donations, we have seen countless individuals improve their health, regain strength, and find renewed hope.',
    },
    {
      img: hope3,
      title: 'Funds That Make a Difference',
      body:
        'Your donation has the power to transform lives in ways that count. At Sakhu Cancer Foundation, we ensure every rupee you contribute makes a meaningful impact, reaching communities that need it the most.',
    },
    {
      img: hope4,
      title: 'A Caring Community',
      body:
        'Over 500 donors and volunteers have joined us in this mission, forming a compassionate community that stands with cancer patients every step of the way.',
    },
  ];

  return (
    <main>
      {/* Hero */}
      <section id="home" className="relative">
        <div className="relative h-[380px] sm:h-[450px] md:h-[600px] overflow-hidden">
          {/* Background slideshow */}
          <div className="absolute inset-0">
            {slides.map((src, i) => (
              <img
                key={i}
                src={src ?? null}
                alt="Hero slide"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 md:scale-100 scale-125 ${i === current ? 'opacity-100' : 'opacity-0'}`}
              />
            ))}
            <div className="absolute inset-0 bg-black/20" />
          </div>

          {/* Text overlay */}
          <div className="relative z-10 h-full max-w-7xl mx-auto px-4">
            <div className="h-full flex ">
              <div className="p-6 flex flex-col justify-center text-start md:text-left md:max-w-2xl">
                <p className="text-[12px] max-w-[150px] md:max-w-full sm:text-xl md:text-2xl uppercase tracking-wide text-[#EC1F7C] font-bold">Welcome To SAKHU Cancer Foundation</p>
                <h1 className="text-base sm:text-3xl md:text-5xl font-bold text-purple-600">We Creat Bridge <br /> Towards Empowerment <br /> Of Cancer Patients</h1>
                <div className="mt-6 flex gap-3 justify-start md:justify-start">
                  <Button href="#contact">Contact Us</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section id="intro" className="py-10 sm:py-12 flex items-center justify-center">
        <div className="max-w-7xl mx-auto  px-4 flex flex-col md:flex-row gap-8 md:gap-20 items-start">
            <img src={sakhu} alt="Sakhu" className="w-full max-w-[340px] h-[260px] sm:h-[340px] md:h-[390px] object-cover rounded-3xl shadow" />
          <div className="md:flex-1">
            <h2 className="text-2xl md:text-3xl font-thin">Introduction To The <b>Founder !</b></h2>
            <p className="mt-4 text-gray-600 text-sm"> <b>SAKHU HARIDAS JARE,</b>  A passionate reader, A worshipper, A Registered Nurse & A Cancer Warrior-incredibly bold and brave. <br />
              One morning in 2010, a thirteen-year-old girl from Ahmednagar woke up in bed with extreme stomach ache, fever, and weakness which persisted for the next 15 days. <br />
              Something had been terribly wrong for nearly a month, and the sentence that flickered in her mind was, <b>"SAKHU JARE”</b>  a new patient with Pre B Cell Acute Lymphoblastic Leukemia, i.e., Blood Cancer." That was 'ME'. It was terribly shocking for me and my family. We approached a hospital for treatment, but the cost was not affordable for us. So, my father borrowed money from family and friends. Still, it was lacking until none other than the social work department of a hospital raised funds from donations and NGOs for my treatment and education, as if angels sent from above.  <br />
              During ongoing treatment, I was inspired by the passionate nursing care,and then I decided to pursue a nursing career. As it is said, "It can't be roses and unicorns all the time." I had cancer relapse two times, in 2018 and 2020,and underwent a stem-cell transplant. But this couldn't stop me from being a warrior. I then worked in the same hospital as a Registered Nurse where my treatment was going on, and today, I proudly serve cancer patients in a government hospital.  The weight of this realization of sufferings pierced me in a way that no bullet ever had, and I decided to do something for other cancer battlers as the Founder of "SAKHU Cancer Foundation," with the support of family and friends. We aim to provide financial and educational support because people helped me like angels, and I would like to become one and servethe battlers (cancer patients).</p>
            <p className='mt-4 text-black font-bold text-sm '>"Your Just one Small Donation Can make Someone's living better."</p>
            <div className="mt-6">
              <a href="#services" className="inline-block px-5 py-3 rounded-md bg-purple-600 text-white">Donate</a>
            </div>
          </div>
        </div>
      </section>

      {/* How Can You Help */}
      <section id="help" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl text-center">How Can You <span className="font-bold">Help ?</span></h2>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Donate */}
            <div className="rounded-lg bg-purple-600 text-white p-8 text-center shadow space-y-4 w-full hover:bg-black">
              <div className="mx-auto w-20 h-20 rounded-full bg-white flex items-center justify-center">
                <img src={donateIcon} alt="Donate"  />
              </div>
              <h3 className="mt-4 text-3xl font-semibold">Donate</h3>
              <p className="mt-3 text-sm opacity-90 font-thin">Your donation will go a long way in helping the SAKHU cancer foundation to carry out its activities for awareness, detection, treatment, rehabilitation and welfare of the cancer survivors.</p>
              <Button href="#donate" className="mt-4">Read More</Button>
            </div>

            {/* Volunteer */}
            <div className="rounded-lg bg-purple-600 text-white p-8 text-center shadow space-y-4 w-full hover:bg-black">
              <div className="mx-auto w-20 h-20 rounded-full bg-white flex items-center justify-center">
                <img src={volunteerIcon} alt="Volunteer"  />
              </div>
              <h3 className="mt-4 text-3xl font-semibold">Volunteer</h3>
              <p className="mt-3 text-sm opacity-90 font-thin">We are happy to extend volunteering opportunities! Driven candidates across the world can apply their skills to help Sakhu Cancer Foundation work stronger, faster and better.</p>
              <Button href="#volunteer" className="mt-4">Read More</Button>
            </div>

            {/* Collaborate */}
            <div className="rounded-lg bg-purple-600 text-white p-8 text-center shadow space-y-4 w-full hover:bg-black" >
              <div className="mx-auto w-20 h-20 rounded-full bg-white flex items-center justify-center">
                <img src={sponsorIcon} alt="Collaborate"  />
              </div>
              <h3 className="mt-4 text-3xl font-semibold">Collaborate</h3>
              <p className="mt-3 text-sm opacity-90 font-thin">SAKHU Cancer Foundation cannot work for the cause of cancer without the support of partners and sponsors. Help us create greater impact and reach people across the country.</p>
              <Button href="#collaborate" className="mt-4">Read More</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives & Services */}
      <section id="services" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className='w-full flex justify-center items-center'>

          <h2 className="text-2xl md:text-3xl font-thin text-center md:text-left">Objectives & <span className='font-bold'>Services</span></h2>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { img: obj1, text: 'Financial Assistance For Treatment Chemotherapy' },
              { img: obj2, text: 'Financial Assistance For Radiationtherapy' },
              { img: obj3, text: 'Organizing Cancer Awareness Program' },
              { img: obj4, text: "Organizing Recreational & Counselling session for patient's" },
              { img: obj5, text: "Free education for Cancer patient's" },
              { img: obj6, text: "Free food & water for Cancer patient's" },
              { img: obj7, text: "Free recidential facility for Cancer patient's & Relatives" },
              { img: obj8, text: "Free Ambulance facility for Cancer patient's" },
            ].map(({ img, text }, idx) => (
              <div key={idx} className="flex items-center bg-white rounded-xl border border-gray-300 shadow-sm  gap-5">
                <img src={img} alt="Objective" className="w-32 h-full md:w-36  object-cover rounded-tl-xl rounded-bl-xl" />
                <p className="text-sm md:text-base text-gray-800 font-medium p-5">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Help Those in Need */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-thin">How We Help <span className='font-bold'>Those in Need</span></h2>
          <p className="mt-2 text-sm text-gray-600">At Sakhu Cancer Foundation, we are dedicated to ensuring that every donation brings hope to cancer patients in desperate need. Here's how we make it happen:</p>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-9">
            {[
              {
                img: need1,
                title: 'Personalized Care :',
                body:
                  "We carefully review each request for support to understand the patient's unique needs and circumstances, making sure our help reaches those who truly need it most.",
              },
              {
                img: need2,
                title: 'Direct Support :',
                body:
                  'Your donations go straight to covering essential medical expenses like treatments, surgeries, and medications. We work directly with hospitals and clinics to make sure funds are used effectively.',
              },
              {
                img: need3,
                title: 'Complete Transparency :',
                body:
                  'We keep you informed every step of the way. Regular updates and patient stories show exactly how your support is making a difference in real lives.',
              },
              {
                img: need4,
                title: 'Ongoing Compassion :',
                body:
                  'Beyond financial help, we stay connected with our patients, offering emotional support and ensuring they feel cared for throughout their journey.',
              },
            ].map(({ img, title, body }, i) => (
              <div key={i} className="h-80 rounded-xl border border-neutral-800 bg-neutral-900 text-white p-6">
                <img src={img} alt={title} className="w-24 h-24" />
                <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-xs md:text-sm text-gray-200">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Your Support, Their Hope */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-thin text-center">Your Support, <span className='font-bold'>Their Hope</span></h2>
          <p className="mt-2 text-sm text-gray-600 text-start">At Sakhu Cancer Foundation, every donation is a lifeline. We are deeply committed to helping cancer patients who have no other means to afford the treatments they need. Here's how your generosity brings hope and healing:</p>

          <div className="mt-10 space-y-6 sm:space-y-8 md:space-y-10">
            {/* Top row aligned left */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:ml-20 md:w-[800px]">
              {supportCards.slice(0, 2).map(({ img, title, body }, i) => (
                <article key={i} className="rounded-xl bg-white border border-gray-200 shadow p-3 w-[350px]">
                  <h3 className="font-semibold text-lg">{title}</h3>
                  <p className="mt-2 text-sm text-start text-gray-600">{body}</p>
                  <img src={img} alt={title} className="mt-4 object-contain"/>
                </article>
              ))}
            </div>
            {/* Bottom row aligned right */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6  md:ml-auto md:mr-20 md:w-[800px]">
              {supportCards.slice(2).map(({ img, title, body }, i) => (
                <article key={i} className="rounded-xl bg-white border border-gray-200 shadow p-3 w-[350px]">
                  <h3 className="font-semibold text-lg">{title}</h3>
                  <p className="mt-2 text-sm text-start text-gray-600">{body}</p>
                  <img src={img} alt={title} className="mt-4 object-contain" />
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How We Work - timeline */}
      <section id="work" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-thin text-center">How We <span className='font-bold'>Work</span></h2>

          <div className="mt-10 relative">
            {/* Vertical line: on mobile aligned left, centered on md+ */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-black md:-translate-x-1/2" />
            {/* Top fade */}
            <div className="absolute left-4 md:left-1/2 top-0 w-[2px] h-12 md:-translate-x-1/2 bg-gradient-to-b from-transparent to-black" />
            {/* Bottom fade */}
            <div className="absolute left-4 md:left-1/2 bottom-0 w-[2px] h-12 md:-translate-x-1/2 bg-gradient-to-t from-transparent to-black" />

            {[
              { number: 1, side: 'left', title: 'Application Review', desc: 'We receive and carefully review applications from patients seeking financial assistance for cancer treatment.' },
              { number: 2, side: 'right', title: 'Eligibility Assessment', desc: 'Our team conducts a thorough assessment to ensure that each applicant meets our eligibility criteria for support.' },
              { number: 3, side: 'left', title: 'Approval and Allocation', desc: 'Once approved, we allocate funds directly to cover essential medical expenses such as treatments, surgeries, and medications.' },
              { number: 4, side: 'right', title: 'Partnering with Hospitals', desc: 'We work closely with hospitals and healthcare providers to ensure that funds are used effectively and reach the right patients.' },
              { number: 5, side: 'left', title: 'Ongoing Support', desc: 'We provide continuous support to patients throughout their treatment journey, including emotional and logistical assistance.' },
              { number: 6, side: 'right', title: 'Transparency and Reporting', desc: 'We maintain transparency by regularly updating donors and stakeholders on how funds are being utilized to make a real impact.' },
            ].map((step, idx) => (
              <div key={step.number} className="grid grid-cols-[24px_1fr] md:grid-cols-3 gap-6 items-start mb-12 md:mb-16">
                {/* Left column (text on md+, hidden on mobile) */}
                <div className="hidden md:block">
                  {step.side === 'left' && (
                    <div className="text-left max-w-xs">
                      <div className="text-4xl md:text-5xl font-bold text-[#EC1F7C]">{step.number}</div>
                      <h3 className="mt-2 font-semibold">{step.title}</h3>
                      <p className="text-sm text-gray-600">{step.desc}</p>
                    </div>
                  )}
                </div>

                {/* Middle column: node + connector (left-aligned on mobile, centered on md+) */}
                <div className="flex justify-start md:justify-center items-center">
                  <div className="relative">
                    {/* Hide spine behind the square to create a gap */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] h-5 bg-white z-0" />
                    {/* Square node on line */}
                    <div className="relative z-10 w-3 h-3 bg-black border border-gray-400" />
                    {/* Connector lines */}
                    {/* Mobile: always connect to right to keep single-sided layout */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-[14px] w-[90px] h-[2px] md:hidden bg-gradient-to-r from-black via-gray-700 to-transparent z-10" />
                    {/* md+: alternate connectors based on side */}
                    {step.side === 'left' ? (
                      <div className="hidden md:block absolute top-1/2 -translate-y-1/2 left-[-116px] w-[116px] h-[2px] bg-gradient-to-l from-black via-gray-700 to-transparent z-10" />
                    ) : (
                      <div className="hidden md:block absolute top-1/2 -translate-y-1/2 left-[14px] w-[116px] h-[2px] bg-gradient-to-r from-black via-gray-700 to-transparent z-10" />
                    )}
                  </div>
                </div>

                {/* Right column: show content on mobile for all steps; on md+ only right steps */}
                <div>
                  {/* Mobile content (always on the right) */}
                  <div className="block md:hidden text-left">
                    <div className="max-w-xs">
                      <div className="text-3xl font-bold text-[#EC1F7C]">{step.number}</div>
                      <h3 className="mt-2 font-semibold">{step.title}</h3>
                      <p className="text-sm text-gray-600">{step.desc}</p>
                    </div>
                  </div>
                  {/* md+ right-side content */}
                  {step.side === 'right' && (
                    <div className="hidden md:block text-left max-w-xs ml-auto">
                      <div className="text-4xl md:text-5xl font-bold text-[#EC1F7C]">{step.number}</div>
                      <h3 className="mt-2 font-semibold">{step.title}</h3>
                      <p className="text-sm text-gray-600">{step.desc}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility Criteria */}
      <section id="eligibility" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 rounded-md p-6">
          <h2 className="text-2xl md:text-3xl text-center font-thin">Eligibility <span className="font-bold">Criteria</span></h2>
          <div className="mt-8 grid md:grid-cols-[340px_1fr] gap-8 items-start">
            {/* Left: stacked photos */}
            <div className="space-y-6">
              <img src={eligibility1} alt="Eligibility photo 1" className="w-full h-[220px] object-cover rounded shadow" />
              <img src={eligibility2} alt="Eligibility photo 2" className="w-full h-[220px] object-cover rounded shadow" />
            </div>

            {/* Right: checklist cards */}
            <div>
              <ul className="space-y-3">
                {[
                  'Indian citizens only are eligible for the process.',
                  'Patients should be registered under foundation-empanelled hospitals.',
                  'Family income should not exceed Rs. 4 lakhs per year.',
                  'Patients who are not eligible for any government scheme (i.e., MJPJAY, PMJAY, etc.).',
                  'Projected survival rate: 50% for adults (<16 years) and 60% for pediatrics (up to 16 years).',
                  'Whole HLA (Human Leukocyte Antigen) Typing match with donors will be 8–10%. Then patients are eligible for benefits.',
                  'All necessary documents for the types of cancer and disease need to be submitted.',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-4 bg-[#F4F4F4] shadow-sm px-4 py-3 ">
                    <span className="flex items-center justify-center w-6 h-6 bg-green-500">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" className="w-4 h-4">
                        <path fillRule="evenodd" d="M16.704 5.296a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L9 11.586l6.296-6.29a1 1 0 011.408 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-sm text-gray-800">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 ">
                <button href="#services" className='bg-purple-600 px-4 py-2 text-white rounded-md hover:bg-black'>Donate</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News - dynamic */}
      <section id="news" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-[1fr_380px] gap-10 items-start">
          {/* Left: text content */}
          <div>
            <h2 className="text-2xl md:text-3xl font-thin">Latest <span className="font-bold">News</span></h2>
            <div className="mt-6 space-y-8">
              {(news.items || []).slice(0,2).map((n, i) => (
                <article key={i}>
                  <h3 className="font-semibold text-lg text-black">{n.heading}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-700">{n.body}</p>
                </article>
              ))}
            </div>
            <div className="mt-6">
              <button className="bg-purple-600 px-4 py-2 text-white rounded-md hover:bg-black">All Events</button>
            </div>
          </div>

          {/* Right: stacked photos */}
          <div className="space-y-6">
            {(news.items || []).slice(0,2).map((n, i) => (
              <img
                key={i}
                src={n?.image || (i === 0 ? eligibility1 : eligibility2)}
                alt={n?.heading || `News ${i+1}`}
                className="w-full h-[180px] object-cover shadow"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - dynamic, horizontal scroll with controls */}
      <section id="testimonials">
        {/* Heading OUTSIDE the bg image */}
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold text-center text-black mb-2">Testimonials</h2>
              <p className="text-center text-xs md:text-sm text-black">{testimonials.subtitle}</p>
            </div>

        {/* Image-backed area that only wraps cards + controls */}
          <div className="relative mt-2 h-[600px] flex items-center justify-center">
            {/* Background image */}
            <div className="absolute inset-0 -z-10">
              <img
                src={testimonialBg}
                alt="Testimonials background"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Content over the image */}
            <div className="relative max-w-7xl mx-auto px-4 py-8">
            {/* Horizontal scroll row */}
            <div>
              <div
                ref={listRef}
                onWheel={blockWheel}
                onScroll={handleInfiniteScroll}
                onTouchStart={blockTouch}
                onTouchMove={blockTouch}
                onPointerDown={blockPointer}
                onPointerMove={blockPointer}
                className="overflow-x-hidden scroll-smooth no-scrollbar w-[280px] sm:w-[300px] md:w-full mx-auto"
                style={{ touchAction: 'none', userSelect: 'none' }}
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