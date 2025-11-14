import React, { useRef, useState, useEffect } from 'react';

function clamp(n, min, max) {
  return Math.max(min, Math.min(n, max));
}

export default function ImageCarousel({ title, images = [], roleFallback, cardsPerView = null, breakpoints = null }) {
  const trackRef = useRef(null);
  const trackId = useRef(`carousel-track-${Math.random().toString(36).slice(2)}`);
  const [index, setIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(210);
  const [vw, setVw] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const GAP = 16; // horizontal space between cards

  // Fixed card width
  useEffect(() => {
    setCardWidth(210);
  }, []);

  // Re-render on viewport resize so visible item count and buttons stay correct
  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const visibleCount = () => {
    // If explicit cardsPerView provided, it wins
    if (cardsPerView && Number(cardsPerView) > 0) return Number(cardsPerView);
    // If breakpoints provided, compute based on viewport
    if (breakpoints && typeof breakpoints === 'object') {
      const entries = Object.entries(breakpoints)
        .map(([k, v]) => [Number(k), Number(v)])
        .filter(([k, v]) => !Number.isNaN(k) && v > 0)
        .sort((a, b) => a[0] - b[0]);
      let countFromBp = null;
      for (const [minW, cnt] of entries) {
        if (vw >= minW) countFromBp = cnt;
      }
      if (countFromBp) return countFromBp;
    }
    // Default responsive behavior
    const w = vw;
    if (w >= 1280) return 4;
    if (w >= 1024) return 3;
    if (w >= 768) return 2;
    return 1;
  };

  const maxIndex = Math.max(0, images.length - visibleCount());
  const pageCount = maxIndex + 1;
  const containerWidthPx = visibleCount() * (cardWidth + GAP) - GAP;

  const goNext = () => setIndex((i) => clamp(i + 1, 0, maxIndex));
  const goPrev = () => setIndex((i) => clamp(i - 1, 0, maxIndex));
  const goTo = (p) => setIndex(clamp(p, 0, maxIndex));

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transform = `translateX(-${index * (cardWidth + GAP)}px)`; // keep transform in sync with gap
  }, [index, cardWidth]);

  // Ensure index stays within bounds if visible count changes
  useEffect(() => {
    const newMax = Math.max(0, images.length - visibleCount());
    setIndex((i) => clamp(i, 0, newMax));
  }, [vw, cardsPerView, images.length]);

  // Keyboard accessibility: left/right arrows and Home/End
  useEffect(() => {
    const onKey = (e) => {
      if (!trackRef.current) return;
      const active = document.activeElement;
      const container = trackRef.current.parentElement;
      if (!container.contains(active)) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); goNext(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); goPrev(); }
      else if (e.key === 'Home') { e.preventDefault(); goTo(0); }
      else if (e.key === 'End') { e.preventDefault(); goTo(maxIndex); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [maxIndex]);

  return (
    <div className="w-full">
      {title && (
        <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
          {title}
        </h3>
      )}
      <div className="w-full flex justify-center">
        <div className="relative overflow-hidden" style={{ width: containerWidthPx }}>
          <div
            ref={trackRef}
            id={trackId.current}
            className="flex transition-transform duration-300 ease-in-out h-[290px] items-stretch justify-start"
            style={{ gap: GAP, willChange: 'transform' }}
          >
            {images.map((img, idx) => (
              <figure
                key={idx}
                className="shrink-0 bg-white flex flex-col items-center justify-center rounded-lg shadow hover:shadow-md transition border border-gray-100"
                style={{ width: cardWidth }}
              >
                <img
                  src={img.src}
                  alt={img.alt || img.name || 'Member photo'}
                  className="w-40 h-44 md:h-56 object-cover pt-4"
                  loading="lazy"
                />
                {(img.name || img.role || roleFallback) && (
                  <figcaption className="px-3 py-3 text-sm text-gray-700 text-center">
                    {img.name && <div className="font-semibold text-gray-900">{img.name}</div>}
                    {img.role ? (
                      <div className="text-gray-600 text-xs">{img.role}</div>
                    ) : roleFallback ? (
                      <div className="text-gray-600 text-xs">{roleFallback}</div>
                    ) : null}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
          {/* Arrows inside container so they never get clipped */}
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-30 rounded-full bg-white/90 shadow ring-1 ring-gray-300 hover:bg-white transition p-2"
            aria-controls={trackId.current}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M15.78 4.22a.75.75 0 010 1.06L9.06 12l6.72 6.72a.75.75 0 11-1.06 1.06l-7.25-7.25a.75.75 0 010-1.06l7.25-7.25a.75.75 0 011.06 0z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-30 rounded-full bg-white/90 shadow ring-1 ring-gray-300 hover:bg-white transition p-2"
            aria-controls={trackId.current}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M8.22 4.22a.75.75 0 000 1.06L14.94 12l-6.72 6.72a.75.75 0 101.06 1.06l7.25-7.25a.75.75 0 000-1.06L9.28 4.22a.75.75 0 00-1.06 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        {/* Bottom indicators */}
        {/* <div className="mt-4 flex items-center justify-center gap-2" role="tablist" aria-label={`${title || 'Carousel'} pages`}>
          {Array.from({ length: pageCount }).map((_, p) => (
            <button
              key={p}
              type="button"
              onClick={() => goTo(p)}
              role="tab"
              aria-selected={p === index}
              aria-controls={trackId.current}
              aria-label={`Go to slide ${p + 1}`}
              className={`h-2.5 w-2.5 rounded-full ${p === index ? 'bg-[#2E3192]' : 'bg-gray-300 hover:bg-gray-400'} transition`}
            />
          ))}
        </div> */}
      </div>
    </div>
  );
}