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
      <div className={`fixed inset-0 bg-black backdrop-blur-2xl z-[110] flex flex-col items-center justify-center gap-8 transition-transform duration-700 ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <button 
          className="absolute top-10 right-10 text-4xl font-light"
          onClick={() => setIsOpen(false)}
        >
          ×
        </button>
        {navLinks.map((link) => (
          <Link 
            key={link.name} 
            href={link.href}
            onClick={() => setIsOpen(false)}
            className="text-2xl font-serif uppercase tracking-[0.4em] hover:text-gray-400"
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}