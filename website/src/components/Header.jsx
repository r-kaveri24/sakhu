import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logoNaav.png';
import Button from './Button.jsx';

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const [isFixed, setIsFixed] = useState(false);
  const sentinelRef = useRef(null);
  const navRef = useRef(null);
  const spacerRef = useRef(null);

  const isActive = (to) => {
    if (to === '/') return pathname === '/';
    return pathname.startsWith(to);
  };
  const navClass = (to) => (
    isActive(to)
      ? 'px-4 py-2 rounded-md bg-purple-700 text-yellow'
      : 'px-4 py-2 rounded-md hover:bg-purple-700 hover:text-yellow'
  );

  const toggle = () => setOpen((v) => !v);

  // Lock page scroll and interactions when mobile sidebar is open
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    if (open) {
      html.style.overflow = 'hidden';
      body.style.overflow = 'hidden';
      const preventTouch = (e) => e.preventDefault();
      body.addEventListener('touchmove', preventTouch, { passive: false });
      return () => {
        body.removeEventListener('touchmove', preventTouch);
        html.style.overflow = '';
        body.style.overflow = '';
      };
    } else {
      html.style.overflow = '';
      body.style.overflow = '';
    }
  }, [open]);

  // Allow closing the sidebar with Escape
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  // Observe when the black navbar reaches the viewport top, then fix it
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      const atTop = !entry.isIntersecting;
      setIsFixed(atTop);

      // Maintain layout without jumps by adding a spacer with the same height
      const navEl = navRef.current;
      const spacerEl = spacerRef.current;
      if (navEl && spacerEl) {
        if (atTop) {
          spacerEl.style.height = `${navEl.offsetHeight}px`;
        } else {
          spacerEl.style.height = '0px';
        }
      }
    }, { threshold: 0 });

    observer.observe(sentinel);

    // Recompute spacer height on resize (throttled via rAF)
    let rafId = null;
    const onResize = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const navEl = navRef.current;
        const spacerEl = spacerRef.current;
        if (navEl && spacerEl && isFixed) {
          spacerEl.style.height = `${navEl.offsetHeight}px`;
        }
      });
    };
    window.addEventListener('resize', onResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', onResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isFixed]);

  return (
    <header>
      {/* Brand bar (sticky), shows logo + hamburger on tablet/mobile */}
      <div className="bg-purple-600">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Sakhu Logo" className="w-10 h-10 rounded-full" />
            <h1 className="text-white text-lg md:text-2xl font-semibold tracking-wide hidden md:inline-block">SAKHU Cancer Foundation</h1>
          </div>
          {/* Hamburger only below desktop */}
          <button
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-white/40 text-white hover:bg-white/10"
            aria-label="Toggle navigation"
            aria-expanded={open ? 'true' : 'false'}
            onClick={toggle}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Left-side drawer for tablet/mobile with backdrop; closes on outside click */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40"
          onClick={toggle}
          aria-hidden="true"
        />
      )}
      <div
        className={`lg:hidden fixed top-14 left-0 bottom-0 z-50 transform transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'}`}
        aria-hidden={open ? 'false' : 'true'}
      >
        <div className="bg-black h-full w-fit min-w-[240px] max-w-[80vw] px-4 py-4 overflow-y-auto">
          <nav className="flex flex-col items-start gap-8 text-sm text-gray-200">
            <Button onClick={() => setOpen(false)} className="bg-white text-black">Back</Button>
            <Link to="/" className={navClass('/')} onClick={() => setOpen(false)}>Home</Link>
            <Link to="/about" className={navClass('/about')} onClick={() => setOpen(false)}>About Us</Link>
            <Link to="/news" className={navClass('/news')} onClick={() => setOpen(false)}>News & Events</Link>
            <Link to="/volunteer" className={navClass('/volunteer')} onClick={() => setOpen(false)}>Volunteer</Link>
            <Link to="/resources" className={navClass('/resources')} onClick={() => setOpen(false)}>Resources</Link>
            <span
              aria-disabled="true"
              title="Coming Soon"
              className="px-4 py-2 rounded-md text-gray-400 bg-white/5 cursor-not-allowed"
            >
              Blog 
            </span>
            <Link to="/contact" className={navClass('/contact')} onClick={() => setOpen(false)}>Contact</Link>
            <Button href="/donation" className="bg-white text-black">Donate</Button>
          </nav>
        </div>
      </div>

      {/* Sentinel just above the black navbar; when it leaves the viewport top, navbar fixes */}
      <div ref={sentinelRef} className="hidden lg:block h-px" aria-hidden="true" />
      {/* Desktop navigation bar (black) only on large screens */}
      <div
        ref={navRef}
        className={`hidden lg:block bg-black z-40 transition-shadow duration-200 ${isFixed ? 'fixed top-0 left-0 right-0 w-full shadow-md' : ''}`}
      >
        <div className="max-w-7xl mx-auto px-4 h-12 flex items-center justify-between">
          <nav className="flex justify-center items-center gap-12 text-sm text-gray-200">
            <Link to="/" className={navClass('/')}>Home</Link>
            <Link to="/about" className={navClass('/about')}>About Us</Link>
            <Link to="/news" className={navClass('/news')}>News & Events</Link>
            <Link to="/volunteer" className={navClass('/volunteer')}>Volunteer</Link>
            <Link to="/resources" className={navClass('/resources')}>Resources</Link>
            <span
              aria-disabled="true"
              title="Coming Soon"
              className="px-4 py-2 rounded-md text-gray-400 bg-white/5 cursor-not-allowed"
            >
              Blog 
            </span>
            <Link to="/contact" className={navClass('/contact')}>Contact</Link>
            <Button href="/donation" className="bg-white text-black">Donate</Button>
          </nav>
        </div>
      </div>
      {/* Spacer to avoid layout shift when navbar becomes fixed */}
      <div ref={spacerRef} className="hidden lg:block" aria-hidden="true" />
    </header>
  );
}