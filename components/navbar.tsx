'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLayoutEffect, useRef, useState } from 'react';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Details', href: '/details' },
  { name: 'Timeline', href: '/gallery-alt' },
  { name: 'Travel', href: '/travel' },
  { name: 'Gallery', href: '/photos' },
  { name: 'Registry', href: '/registry' },
  { name: 'RSVP', href: '/rsvp' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Home splits the nav over a photo on the left and cream background on the right, and that
  // boundary shifts with viewport width, so rather than guessing which links land on which side
  // by index, measure each link's actual position and color it based on where it really lands.
  // A link can also straddle the boundary itself (part of the word on each side) — for that one,
  // split the word's own color at the exact pixel the boundary crosses it, so it stays flat
  // two-tone (matching the rest of the nav) instead of needing a shadow.
  type Zone = 'left' | 'right' | 'straddle';
  interface LinkPosition { zone: Zone; splitPercent: number; }
  const [linkPositions, setLinkPositions] = useState<LinkPosition[]>(
    navLinks.map((_, i) => ({ zone: i < 4 ? 'left' : 'right', splitPercent: 50 }))
  );

  const isHome = pathname === '/';

  // Registry's hero photo runs dark, so its nav needs light text like Home does.
  const darkTopRoutes = ['/registry'];
  const isDarkTop = darkTopRoutes.includes(pathname);

  useLayoutEffect(() => {
    if (!isHome) return;

    function measure() {
      const midpoint = window.innerWidth / 2;
      setLinkPositions(
        linkRefs.current.map((el): LinkPosition => {
          if (!el) return { zone: 'left', splitPercent: 100 };
          const rect = el.getBoundingClientRect();
          if (rect.right <= midpoint) return { zone: 'left', splitPercent: 100 };
          if (rect.left >= midpoint) return { zone: 'right', splitPercent: 0 };
          return { zone: 'straddle', splitPercent: ((midpoint - rect.left) / rect.width) * 100 };
        })
      );
    }

    measure();
    window.addEventListener('resize', measure);

    // Nav text renders in a fallback font first, then swaps to the loaded Google Font
    // (next/font's `display: swap`), which can shift link widths enough to move a link
    // across the boundary after the initial measurement — so re-measure once fonts settle.
    document.fonts.ready.then(measure);

    return () => window.removeEventListener('resize', measure);
  }, [isHome]);

  const mobileButtonColor = isHome || isDarkTop ? 'text-white' : 'text-stone-800';

  return (
    <>
      <nav className="absolute top-0 w-full z-50 flex justify-center py-8">
        <ul className="hidden md:flex gap-6 text-xs uppercase tracking-[0.2em] lg:gap-10">
          {navLinks.map((link, index) => {
            const position = linkPositions[index];
            const isSplit = isHome && position.zone === 'straddle';

            const linkColor = isHome
              ? isSplit
                ? ''
                : position.zone === 'left'
                  ? 'text-white hover:text-white/70'
                  : 'text-stone-800 hover:text-emerald-800'
              : isDarkTop
                ? 'text-white hover:text-white/70 drop-shadow-md'
                : 'text-stone-800 hover:text-emerald-800';

            const activeClass = pathname === link.href ? 'font-bold' : 'opacity-70';

            return (
              <li key={link.href}>
                <Link
                  ref={(el) => { linkRefs.current[index] = el; }}
                  href={link.href}
                  className={`transition-colors ${linkColor} ${activeClass} ${isSplit ? 'relative inline-block' : ''}`}
                >
                  {isSplit ? (
                    <>
                      <span className="text-white">{link.name}</span>
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 overflow-hidden text-stone-800"
                        style={{ clipPath: `inset(0 0 0 ${position.splitPercent}%)` }}
                      >
                        {link.name}
                      </span>
                    </>
                  ) : (
                    link.name
                  )}
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
