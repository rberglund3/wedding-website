import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-stone-50 overflow-hidden">

      <div className="w-full md:w-1/2 relative h-[50vh] md:h-screen">
         <Image
           src="/images/363545_KW_306.jpg"
           alt="Rita and Wesley in Tokyo"
           fill
           className="object-cover object-center"
           priority
         />
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start p-12 md:p-24 lg:p-32 text-stone-800">

        <p className="text-xs uppercase tracking-[0.4em] text-emerald-800 font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards duration-700">
          The Wedding Of
        </p>

        <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif text-stone-900 tracking-tight leading-none mb-8 text-center md:text-left animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards duration-700 delay-150">
          Rita <br className="hidden md:block"/>
          <span className="italic font-light text-stone-400">&</span> Wesley
        </h1>

        <div className="w-16 h-[1px] bg-rose-200 mb-8 animate-in fade-in fill-mode-backwards duration-700 delay-300"></div>

        <p className="text-sm tracking-[0.2em] text-stone-500 uppercase mb-12 text-center md:text-left animate-in fade-in fill-mode-backwards duration-700 delay-500">
          May 29, 2027 <br className="md:hidden" />
          <span className="hidden md:inline mx-2 text-rose-300">•</span>
          St. James, NY
        </p>

        <div className="animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards duration-700 delay-700">
          <Link
            href="/details"
            className="inline-block px-10 py-4 bg-emerald-900 text-white uppercase tracking-[0.2em] text-xs hover:bg-emerald-800 transition-colors shadow-md"
          >
            Enter Site
          </Link>
        </div>

      </div>

    </main>
  );
}
