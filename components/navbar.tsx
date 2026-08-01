'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Details', href: '/details' },
  { name: 'Travel', href: '/travel' },
  { name: 'Gallery', href: '/photos' },
  { name: 'Registry', href: '/registry' },
  { name: 'RSVP', href: '/rsvp' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isHome = pathname === '/';

  // Registry's hero photo runs dark, so its nav needs light text like Home does.
  const darkTopRoutes = ['/registry'];
  const isDarkTop = darkTopRoutes.includes(pathname);

  const mobileButtonColor = isHome || isDarkTop ? 'text-white' : 'text-stone-800';

  return (
    <>
      <nav className="absolute top-0 w-full z-50 flex justify-center py-8">
        <ul className="hidden md:flex gap-10 text-xs uppercase tracking-[0.2em]">
          {navLinks.map((link, index) => {

            // Home splits the nav over a photo on the left and cream background on the right,
            // so the first 3 links need white text and the rest need dark text.
            const isLeftHalf = index < 3;

            const linkColor = isHome
              ? (isLeftHalf ? 'text-white hover:text-white/70' : 'text-stone-800 hover:text-emerald-800')
              : isDarkTop
                ? 'text-white hover:text-white/70 drop-shadow-md'
                : 'text-stone-800 hover:text-emerald-800';

            const activeClass = pathname === link.href ? 'font-bold' : 'opacity-70';

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`transition-colors ${linkColor} ${activeClass}`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          className={`md:hidden absolute right-6 top-6 p-2 ${mobileButtonColor}`}
          onClick={() => setIsOpen(true)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-stone-50/95 backdrop-blur-xl flex flex-col items-center justify-center animate-in fade-in duration-300">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-8 right-8 text-stone-900 p-2"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <nav className="flex flex-col items-center gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-2xl font-serif tracking-[0.2em] uppercase transition-colors ${
                  pathname === link.href ? 'text-emerald-800 font-bold' : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
