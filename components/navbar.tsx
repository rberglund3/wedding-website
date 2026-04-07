'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    // change navbar background on scroll
    useEffect (() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Gallery', href: '/gallery' },
        { name: 'Travel', href: '/travel' },
        { name: 'Registry', href: '/registry' },
        { name: 'RSVP', href: '/rsvp' },
    ];

    return (
    <nav 
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
        scrolled ? 'bg-black/20 backdrop-blur-lg py-4' : 'bg-transparent py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">

        {/* Desktop Links */}
        <div className="hidden md:flex gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className={`text-[10px] uppercase tracking-[0.25em] transition-all hover:text-white/50 ${
                pathname === link.href ? 'text-white border-b border-white/40 pb-1' : 'text-white/80'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="w-6 h-px bg-white mb-1.5"></div>
          <div className="w-6 h-px bg-white"></div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center animate-in fade-in duration-300">
          
          {/* Close Button: Make sure this is white! */}
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-8 right-8 text-white p-2"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation Links */}
          <nav className="flex flex-col items-center gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)} // Close menu on click
                className={`text-2xl font-serif tracking-[0.2em] uppercase transition-colors ${
                  pathname === link.href ? 'text-white' : 'text-white/50 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Tiny Ghibli Detail at the bottom */}
          <div className="absolute bottom-12 opacity-20">
            <p className="text-[8px] tracking-[0.4em] uppercase text-white">R & W — 2026</p>
          </div>
      </div>
    )}
    </nav>
  );
}