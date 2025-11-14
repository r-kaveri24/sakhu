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

export default function Testimonials({ subtitle = "Family Members Of Patient's", items: providedItems = [] }) {
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

  const fallbackItems = [
    {
      quote:
        "After my father's surgery, Sakhu was there for us with essentials and kindness. It made recovery smoother and gave us hope.",
      name: "Ramesh Patil",
      relation: "Son of Patient",
    },
    {
      quote:
        "Sakhu helped us when we couldn't afford medicines. Their support brought dignity to our situation during a very difficult time.",
      name: "Meera Deshmukh",
      relation: "Daughter of Patient",
    },
    {
      quote:
        "We were struggling with basic needs after hospitalization. Sakhu stepped in with practical help—I'll never forget their compassion.",
      name: "Suresh Pawar",
      relation: "Brother of Patient",
    },
    {
      quote:
        "My mother needed special care items that were too expensive for us. Sakhu provided everything with respect and warmth.",
      name: "Anita Kulkarni",
      relation: "Daughter of Patient",
    },
    {
      quote:
        "Their team understands the emotional and financial strain of illness. Sakhu helped us focus on recovery, not survival.",
      name: "Vikas Jadhav",
      relation: "Son of Patient",
    },
    {
      quote:
        "Sakhu brought comfort items that made my father's hospital stay easier. It's the small things that mean so much.",
      name: "Priya Shinde",
      relation: "Daughter of Patient",
    },
    {
      quote:
        "I saw hope in my mother's eyes when Sakhu arrived. Their kindness reminded us we're not alone.",
      name: "Nikhil More",
      relation: "Son of Patient",
    },
    {
      quote:
        "They treat everyone with respect. Sakhu restored our confidence at a time we felt helpless.",
      name: "Kiran Salunkhe",
      relation: "Sibling of Patient",
    },
  ];

  const items = (providedItems && providedItems.length ? providedItems : fallbackItems).map((t, i) => ({
    ...t,
    avatar: t.avatar || avatarPool[i % avatarPool.length],
  }));

  const loopedItems = useMemo(() => [...items, ...items, ...items], [items]);

  const listRef = useRef(null);
  const segmentRef = useRef(0);
  const [testimonialIndex, setTestimonialIndex] = useState(() => {
    try {
      const raw = localStorage.getItem("testimonialIndex");
      const v = raw ? parseInt(raw, 10) : 0;
      return Number.isFinite(v) ? v : 0;
    } catch {
      return 0;
    }
  });

  const blockWheel = (e) => {
    // Prevent vertical wheel from triggering page scroll inside the carousel
    if (!listRef.current) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      e.stopPropagation();
      const dir = e.deltaY > 0 ? 1 : -1;
      scrollByOneCard(dir);
    }
  };

  const blockTouch = (e) => {
    if (!listRef.current) return;
    // Block touch scrolling to keep horizontal scroll smooth and controlled
    e.stopPropagation();
  };

  const blockPointer = (e) => {
    if (!listRef.current) return;
    // Prevent pointer gestures from interfering with controlled scroll
    e.stopPropagation();
  };

  const handleInfiniteScroll = () => {
    const el = listRef.current;
    if (!el) return;
    const max = segmentRef.current * 2; // total width of two extra segments to allow wrapping
    const x = el.scrollLeft;
    if (x <= 0) {
      el.scrollLeft = segmentRef.current + x;
    } else if (x >= max) {
      el.scrollLeft = x - segmentRef.current;
    }
  };

  const scrollByOneCard = (dir = 1) => {
    const el = listRef.current;
    if (!el) return;
    const next = testimonialIndex + dir;
    const normalized = ((next % items.length) + items.length) % items.length;
    setTestimonialIndex(normalized);
    localStorage.setItem("testimonialIndex", String(normalized));
    const target = segmentRef.current + normalized * (segmentRef.current / items.length);
    el.scrollTo({ left: target, behavior: "smooth" });
  };

  const scrollLeft = () => scrollByOneCard(-1);
  const scrollRight = () => scrollByOneCard(1);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    // Measure one segment width (the width of a single set of items)
    const firstCard = el.querySelector("[data-testimonial-card]");
    if (!firstCard) return;
    const totalCardsInSegment = items.length;
    const cardWidth = firstCard.getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(el.querySelector(".flex")).gap || "0");
    const segmentWidth = totalCardsInSegment * cardWidth + (totalCardsInSegment - 1) * gap;
    segmentRef.current = segmentWidth;

    // Initialize to middle segment for seamless left/right wrap
    const start = segmentRef.current + testimonialIndex * (segmentRef.current / items.length);
    el.scrollLeft = start;
  }, [items.length, testimonialIndex]);

  useEffect(() => {
    // Guard persisted index from exceeding current items length
    if (testimonialIndex >= items.length) {
      const fixed = items.length ? items.length - 1 : 0;
      setTestimonialIndex(fixed);
      localStorage.setItem("testimonialIndex", String(fixed));
    }
  }, [items.length, testimonialIndex]);

  return (
    <section id="testimonials">
        {/* Heading OUTSIDE the bg image */}
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold text-center text-black mb-2">Testimonials</h2>
              <p className="text-center text-xs md:text-sm text-black">{subtitle}</p>
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
                        <p className="text-xs text-gray-500">{t.relation || t.role || ''}</p>
                        <p
                          className="mt-2 text-sm text-gray-700 overflow-hidden"
                          style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 4,
                            WebkitBoxOrient: 'vertical',
                            minHeight: '5rem', // ~80px to reserve space for up to 4 lines
                          }}
                        >
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
  )
}