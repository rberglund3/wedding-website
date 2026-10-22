import Image from 'next/image';

export default function RegistryPage() {
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
          &ldquo;Our registry is still being put together — check back closer to the big day!&rdquo;
        </p>
      </div>

    </main>
  );
}
