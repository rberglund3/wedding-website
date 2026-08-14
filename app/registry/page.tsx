'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function RegistryPage() {
  const [showQrCode, setShowQrCode] = useState(false);
  const venmoHandle = "Rita-Berglund";

  return (
    <main className="min-h-screen bg-stone-50 text-stone-800 flex flex-col items-center pb-32">

      <section className="relative w-full h-[60vh] md:h-[80vh]">
        <Image
          src="/images/00379808-FA8B-4D0F-807F-577972775DED_1_201_a.jpeg"
          alt="Rita and Wesley in Ginza"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />

        {/* fade the bottom of the photo into the page background */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-stone-50"></div>
      </section>

      <div className="relative z-10 text-center px-6 -mt-6 md:-mt-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <h1 className="text-4xl md:text-6xl font-serif uppercase tracking-[0.2em] text-stone-900 mb-6">
          Registry
        </h1>

        {/* floral divider, matches the Gallery page */}
        <div className="flex justify-center text-rose-300 opacity-80 mb-8">
          <svg width="60" height="15" viewBox="0 0 60 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="15" cy="7.5" r="2" fill="currentColor" />
            <circle cx="30" cy="7.5" r="3.5" fill="#fda4af" />
            <circle cx="45" cy="7.5" r="2" fill="currentColor" />
          </svg>
        </div>

        <p className="max-w-xl mx-auto text-sm md:text-base italic text-stone-500 leading-relaxed">
          &ldquo;Your presence at our wedding is the greatest gift of all. But if you&rsquo;d
          like to help us with our future adventures together, we&rsquo;ve set up a digital fund.&rdquo;
        </p>
      </div>

      <section className="w-full max-w-md mx-auto mt-16 px-6">
        <div className="bg-white border border-stone-200 shadow-sm p-10 text-center">

          <span className="text-xs uppercase tracking-[0.3em] text-emerald-800 font-bold">
            The Newlywed Fund
          </span>

          {!showQrCode ? (
            <button
              type="button"
              aria-controls="honeymoon-qr-code"
              aria-expanded={showQrCode}
              onClick={() => setShowQrCode(true)}
              className="mt-8 block w-full bg-emerald-900 py-4 text-xs font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-emerald-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-800 focus-visible:ring-offset-4 focus-visible:ring-offset-white"
            >
              Contribute to the Honeymoon
            </button>
          ) : (
            <div id="honeymoon-qr-code" className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="mt-8 mb-6 inline-block bg-white p-3 border border-stone-100 shadow-sm">
                <Image
                  src="/images/venmo-qr.png"
                  alt="Venmo QR Code"
                  width={200}
                  height={200}
                  className="mx-auto"
                />
              </div>

              <p className="text-xs uppercase tracking-[0.2em] text-stone-400 mb-8">
                Scan to contribute via Venmo
              </p>

              <a
                href={`https://venmo.com/u/${venmoHandle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-emerald-900 hover:bg-emerald-800 text-white py-4 uppercase tracking-[0.2em] text-xs font-medium transition-colors"
              >
                Open Venmo @{venmoHandle}
              </a>
            </div>
          )}
        </div>
      </section>

    </main>
  );
}
