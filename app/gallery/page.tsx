'use client';
import Image from 'next/image';

const photos = [
  { src: '/images/363545_KW_306.jpg', alt: 'Tokyo Night Arch', aspect: 'aspect-[3/2]' },
  { src: '/images/363545_KW_030.jpg', alt: 'Sunshine', aspect: 'aspect-[2/3]' },
  { src: '/images/363545_KW_113.jpg', alt: 'Asakusa', aspect: 'aspect-[3/2]'},
  { src: '/images/363545_KW_196.jpg', alt: 'Walking', aspect: 'aspect-[2/3'},
  { src: '/images/363545_KW_203.jpg', alt: 'Kaminarimon', aspect: 'aspect-[3/2]'},
  { src: '/images/363545_KW_260.jpg', alt: 'Ginza', aspect: 'aspect=[2/3]'},
  { src: '/images/363545_KW_346.jpg', alt: 'Tokyo Station', aspect: 'aspect=[3/2]'},
  { src: '/images/363545_KW_437.jpg', alt: 'Coats', aspect: 'aspect=[3/2]'},
  { src: '/images/363545_KW_458.jpg', alt: 'Tokyo Station 2', aspect: 'aspect=[3/2'}
  // Add more as you get them!
];

export default function GalleryPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-4 md:px-10">
      <header className="max-w-2xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-serif uppercase tracking-[0.3em] mb-4">Gallery</h1>
        <p className="text-sm italic opacity-60">A few of our favorite moments.</p>
      </header>

      {/* The Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {photos.map((photo, index) => (
          <div key={index} className="break-inside-avoid overflow-hidden rounded-sm bg-neutral-100 dark:bg-neutral-900">
            <Image
              src={photo.src}
              alt={photo.alt}
              width={800}
              height={1200}
              className="hover:scale-105 transition-transform duration-700 ease-in-out cursor-pointer"
            />
          </div>
        ))}
      </div>
    </main>
  );
}