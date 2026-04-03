import Image from 'next/image';

export default function RegistryPage() {
  const venmoHandle = "Rita-Berglund"; // Make sure this matches your actual handle!

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero Section */}
      <div className="relative h-[75vh] md:h-screen w-full overflow-hidden bg-black">
        <Image 
          src="/images/00379808-FA8B-4D0F-807F-577972775DED_1_201_a.jpeg" 
          alt="Us in Ginza"
          fill
          priority
          className="object-cover object-center opacity-60"
        />

        {/* Text Overlay: Top-Left alignment with the "Joy" style font size */}
        <div className="absolute inset-0 flex flex-col justify-between p-10 md:p-24 z-20">
          
          {/* Title: Back to the elegant, moderate size */}
          <div className="text-left">
            <h1 className="text-4xl md:text-6xl font-serif tracking-[0.1em] uppercase drop-shadow-2xl">
              Registry
            </h1>
            {/* Subtle, thin accent line */}
            <div className="w-12 h-[1px] bg-white/40 mt-4 md:w-24"></div>
          </div>

          {/* Description: Tucked in the bottom right to stay away from your faces */}
          <div className="flex justify-end">
            <p className="max-w-[260px] md:max-w-md text-right text-gray-300 font-light italic text-sm md:text-lg leading-relaxed drop-shadow-md">
              "Your presence is the only gift we require. However, if you would like to 
              contribute to our future, we’ve set up a digital fund."
            </p>
          </div>
        </div>

        {/* Deep cinematic vignette to make the white text pop */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 pointer-events-none"></div>
      </div>

      {/* Content Section */}
      <section className="max-w-xl mx-auto py-20 px-8 text-center">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-10 backdrop-blur-sm">
          <div className="mb-6 inline-block bg-white p-4 rounded-xl">
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
            rel="noopener noreferrer"
            className="block w-full bg-[#008CFF] hover:bg-[#0074d4] text-white py-4 rounded-xl font-bold transition-all text-center"
          >
            Open Venmo @{venmoHandle}
          </a>
        </div>
      </section>
    </main>
  );
}