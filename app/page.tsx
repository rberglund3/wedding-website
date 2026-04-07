'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <main className="relative min-h-screen w-full text-white overflow-hidden flex flex-col items-center justify-between font-serif">
      
      {/* --- Custom Smart Gradient Scrim --- 
         We use environmental framing. This gradient is darker top-left 
         to make the text absolutely pop, then fades to lighter twilight 
         over the rest, beautifully defining the couple. Clear faces!
      */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/363545_KW_306.jpg" // The cinematic Tokyo night arch shot
          alt="Rita & Wesley"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Customized gradient for on-screen success on glass (clears couple, strengthens behind text/panels) */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-black/20 pointer-events-none"></div>
      </div>

      {/* Central focus area (the couple) is now clear. 
         We use the surrounding structure as the 'canvas'.
      */}

      {/* Content Layer (z-10) with Z-Pattern framing */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-10 md:px-24 py-20 flex flex-col justify-between h-full">
        
        {/* Z-PATTERN: TOP LEFT (Announcement and names) */}
        <div className="text-left animate-in fade-in slide-in-from-left-8 duration-1000">
          
          <p className="text-[10px] md:text-xs font-sans uppercase tracking-[0.5em] mb-4 text-white/70">
            The Wedding of
          </p>
          <h1 className="text-5xl md:text-8xl font-light uppercase tracking-[0.2em] mb-6 drop-shadow-2xl">
            Rita & Wesley
          </h1>
          <div className="w-16 h-[1px] bg-white/40 mt-6 md:w-32"></div>

          {/* Subtext Detail with New York location */}
          <div className="mt-10 space-y-4">
            <p className="text-sm md:text-lg italic tracking-[0.15em] opacity-90">
              October 24, 2026 — New York City
            </p>
          </div>

          {/* Frosted Glass CTA Button in the top-left area */}
          <Link 
            href="/rsvp"
            className="mt-12 inline-block px-12 py-4 border border-white/20 rounded-full text-[10px] uppercase tracking-[0.3em] font-sans backdrop-blur-md hover:bg-white hover:text-black transition-all duration-500 shadow-xl"
          >
            Enter Site
          </Link>
        </div>
      </div>
    </main>
  );
}