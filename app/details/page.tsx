import Image from 'next/image';
import Link from 'next/link';

export default function DetailsPage() {
  return (
    <main className="min-h-screen bg-stone-50 flex flex-col items-center pb-32">

      <section className="relative w-full h-[60vh] md:h-[80vh]">
        <Image
          src="/images/363545_KW_113.jpg"
          alt="Rita and Wesley in Tokyo"
          fill
          sizes="100vw"
          className="object-cover object-[center_65%]"
          priority
        />

        {/* fade the bottom of the photo into the page background */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-stone-50"></div>
      </section>

      <div className="relative z-10 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000 -mt-6 md:-mt-10">
        <h1 className="text-4xl md:text-6xl font-serif uppercase tracking-[0.2em] text-stone-900 mb-6">
          Details
        </h1>
        <p className="text-xs md:text-sm uppercase tracking-[0.4em] text-emerald-800 font-bold">
          Rita & Wesley
        </p>
      </div>

      <div className="flex flex-col items-center w-full max-w-xl text-center space-y-16 mt-20 px-6">

        <section className="w-full relative group">
          <span className="block text-[10px] uppercase tracking-[0.3em] text-stone-400 mb-6">
            01 — When
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-stone-900 transition-colors group-hover:text-emerald-800 duration-500">
            May 29, 2027
          </h2>
          <p className="mt-6 text-xs uppercase tracking-[0.2em] text-stone-500">
            Saturday Evening
          </p>
        </section>

        <div className="h-24 w-[1px] bg-rose-200 my-8"></div>

        <section className="w-full relative group">
          <span className="block text-[10px] uppercase tracking-[0.3em] text-stone-400 mb-6">
            02 — Where
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-stone-900 transition-colors group-hover:text-emerald-800 duration-500">
            Flowerfield
          </h2>
          <p className="mt-6 text-xs uppercase tracking-[0.2em] text-stone-500 leading-relaxed">
            199 Mills Pond Road
            <br />
            St. James, NY 11780
          </p>
        </section>

        <div className="h-24 w-[1px] bg-rose-200 my-8"></div>

        <section className="w-full relative group">
          <span className="block text-[10px] uppercase tracking-[0.3em] text-stone-400 mb-6">
            03 — Attire
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-stone-900 transition-colors group-hover:text-emerald-800 duration-500">
            Formal
          </h2>
          <p className="mt-6 text-xs uppercase tracking-[0.2em] text-stone-500">
            Floor or ankle-length silhouettes, tuxedos, or formal suits. Prints and colors are warmly welcomed.
          </p>
        </section>

      </div>

      <div className="mt-32 pt-12 border-t border-rose-100 w-full max-w-md text-center px-6">
        <Link
          href="/travel"
          className="text-xs uppercase tracking-[0.2em] text-stone-900 hover:text-emerald-800 transition-colors pb-1 border-b border-transparent hover:border-emerald-800"
        >
          View Travel & Stay Options
        </Link>
      </div>

    </main>
  );
}
