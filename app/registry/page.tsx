'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function RegistryPage() {
  const [showQrCode, setShowQrCode] = useState(false);
  const venmoHandle = "Rita-Berglund";
  // Use the recipient link encoded in IMG_7838.png.
  const zelleUrl = "https://enroll.zellepay.com/qr-codes?data=eyJuYW1lIjoiV0VTTEVZIiwiYWN0aW9uIjoicGF5bWVudCIsInRva2VuIjoiNjMxODk2ODUxMiJ9";

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

      <section className="w-full max-w-4xl mx-auto mt-16 px-4 text-center sm:px-6">
        <p className="text-xs uppercase tracking-[0.3em] text-emerald-800 font-bold">
          The Newlywed Fund
        </p>

        {!showQrCode && (
          <button
            type="button"
            aria-controls="honeymoon-qr-code"
            aria-expanded={showQrCode}
            onClick={() => setShowQrCode(true)}
            className="mx-auto mt-8 block min-h-12 w-full max-w-md bg-emerald-900 px-6 py-4 text-xs font-medium uppercase text-white transition-colors hover:bg-emerald-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-800 focus-visible:ring-offset-4 focus-visible:ring-offset-stone-50"
          >
            Contribute to the Honeymoon
          </button>
        )}

        <div id="honeymoon-qr-code" hidden={!showQrCode}>
          {showQrCode && (
            <div className="mt-8 grid grid-cols-1 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500 md:grid-cols-2">
              <article className="flex min-w-0 flex-col items-center border border-stone-200 bg-white p-5 shadow-sm sm:p-8">
                <h2 className="font-serif text-2xl text-stone-900">Rita Berglund</h2>
                <p className="mt-2 text-sm text-stone-500">@{venmoHandle}</p>

                <div className="relative mx-auto my-6 h-80 w-full max-w-[280px]">
                  <Image
                    src="/images/venmo-qr.png"
                    alt="Venmo QR code for Rita Berglund"
                    fill
                    sizes="280px"
                    className="object-contain"
                  />
                </div>

                <p className="mb-6 text-xs uppercase leading-6 text-stone-500">
                  Scan to contribute via Venmo
                </p>

                <a
                  href={`https://venmo.com/u/${venmoHandle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open Venmo @${venmoHandle} (opens in a new tab)`}
                  className="mt-auto flex min-h-12 w-full items-center justify-center bg-emerald-900 px-4 py-4 text-xs font-medium uppercase text-white transition-colors hover:bg-emerald-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-800 focus-visible:ring-offset-4"
                >
                  Open Venmo @{venmoHandle}
                </a>
              </article>

              <article className="flex min-w-0 flex-col items-center border border-stone-200 bg-white p-5 shadow-sm sm:p-8">
                <h2 className="font-serif text-2xl text-stone-900">Wesley Ogata</h2>
                <p className="mt-2 select-all text-sm text-stone-500">631-896-8512</p>

                <div className="relative mx-auto my-6 h-80 w-full max-w-[280px]">
                  <Image
                    src="/images/IMG_7838.png"
                    alt="Zelle QR code for Wesley Ogata"
                    fill
                    sizes="280px"
                    className="object-contain"
                  />
                </div>

                <p className="mb-6 text-xs uppercase leading-6 text-stone-500">
                  Scan to contribute via Zelle
                </p>

                <a
                  href={zelleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contribute via Zelle to Wesley Ogata (opens in a new tab)"
                  className="mt-auto flex min-h-12 w-full items-center justify-center bg-emerald-900 px-4 py-4 text-xs font-medium uppercase text-white transition-colors hover:bg-emerald-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-800 focus-visible:ring-offset-4"
                >
                  Contribute via Zelle
                </a>
              </article>
            </div>
          )}
        </div>
      </section>

    </main>
  );
}
