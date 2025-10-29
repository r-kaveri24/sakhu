import { useState } from 'react';
import logo from '../assets/logoNaav.png';
import Button from './Button.jsx';

export default function Header() {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((v) => !v);

  return (
    <header>
      {/* Brand bar (sticky), shows logo + hamburger on tablet/mobile */}
      <div className="bg-purple-600 sticky top-0 z-50">
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
          className="lg:hidden fixed left-0 right-0 top-14 bottom-0 z-40 bg-black/30"
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
            <a href="#home" className="px-4 py-2 rounded-md bg-purple-700 text-yellow">Home</a>
            <a href="#about" className="px-4 py-2 rounded-md hover:bg-purple-700 hover:text-yellow">About Us</a>
            <a href="#services" className="px-4 py-2 rounded-md hover:bg-purple-700 hover:text-yellow">News & Events</a>
            <a href="#work" className="px-4 py-2 rounded-md hover:bg-purple-700 hover:text-yellow">Volunteer</a>
            <a href="#news" className="px-4 py-2 rounded-md hover:bg-purple-700 hover:text-yellow">Resources</a>
            <a href="#blog" className="px-4 py-2 rounded-md hover:bg-purple-700 hover:text-yellow">Blog</a>
            <a href="#contact" className="px-4 py-2 rounded-md hover:bg-purple-700 hover:text-yellow">Contact</a>
            <Button href="#donate" className="bg-white text-black">Donate</Button>
          </nav>
        </div>
      </div>

      {/* Desktop navigation bar (black) only on large screens */}
      <div className="hidden lg:block bg-black sticky top-14 z-40">
        <div className="max-w-7xl mx-auto px-4 h-12 flex items-center justify-between">
          <nav className="flex justify-center items-center gap-12 text-sm text-gray-200">
            <a href="#home" className="px-4 py-2 rounded-md bg-purple-700 text-yellow">Home</a>
            <a href="#about" className="px-4 py-2 rounded-md hover:bg-purple-700 hover:text-yellow">About Us</a>
            <a href="#services" className="px-4 py-2 rounded-md hover:bg-purple-700 hover:text-yellow">News & Events</a>
            <a href="#work" className="px-4 py-2 rounded-md hover:bg-purple-700 hover:text-yellow">Volunteer</a>
            <a href="#news" className="px-4 py-2 rounded-md hover:bg-purple-700 hover:text-yellow">Resources</a>
            <a href="#blog" className="px-4 py-2 rounded-md hover:bg-purple-700 hover:text-yellow">Blog</a>
            <a href="#contact" className="px-4 py-2 rounded-md hover:bg-purple-700 hover:text-yellow">Contact</a>
            <Button href="#donate" className="bg-white text-black">Donate</Button>
          </nav>
        </div>
      </div>
    </header>
  );
}