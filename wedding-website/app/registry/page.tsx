import Image from 'next/image';

export default function RegistryPage() {
  const venmoHandle = "Rita-Berglund"; // Replace with yours!

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Nighttime Ginza Hero */}
      <div className="relative h-[50vh] w-full">
        <Image 
          src="/images/363545_KW_266.jpg" 
          alt="Tokyo Station at Night"
          fill
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-6xl font-serif tracking-widest uppercase">Registry</h1>
        </div>
      </div>

      <section className="max-w-xl mx-auto py-20 px-8 text-center">
        <h2 className="text-2xl font-light mb-8 italic">A Modern Tradition</h2>
        <p className="text-gray-300 leading-relaxed mb-12">
          Your presence is the only gift we require. However, if you would like to 
          contribute to our honeymoon and future together, we’ve set up a 
          digital fund for your convenience.
        </p>

        {/* Venmo Integration Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-10 backdrop-blur-sm">
          <div className="mb-6 inline-block bg-white p-4 rounded-xl">
             {/*  */}
             <Image 
                src="/images/venmo-qr.png" 
                alt="Venmo QR Code" 
                width={200} 
                height={200} 
                className="mx-auto"
             />
          </div>
          
          <p className="text-sm text-gray-400 mb-6 uppercase tracking-widest">
            Scan to contribute via Venmo
          </p>

          <a 
            href={`https://venmo.com/u/${venmoHandle}`}
            target="_blank"
            className="block w-full bg-[#008CFF] hover:bg-[#0074d4] text-white py-4 rounded-xl font-bold transition-all"
          >
            Open Venmo @{venmoHandle}
          </a>
        </div>
      </section>
    </main>
  );
}