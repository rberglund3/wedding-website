'use client';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import PhotoLightbox from '@/components/photo-lightbox';
import { type GalleryImage, galleryPhotos } from '@/lib/gallery-images';

const isGalleryImage = (photo: GalleryImage | undefined): photo is GalleryImage =>
  Boolean(photo);

const featuredStartingIndex = 29;
const featuredGalleryPhotoSrcs = [
  '/images/IMG_4291.jpg',
  '/images/IMG_4449.jpg',
  '/images/IMG_5365.jpg',
];
const featuredGalleryPhotos = featuredGalleryPhotoSrcs
  .map((src) => galleryPhotos.find((photo) => photo.src === src))
  .filter(isGalleryImage);
const featuredGallerySrcs = new Set(featuredGalleryPhotos.map((photo) => photo.src));
const photos = [
  ...galleryPhotos.slice(0, featuredStartingIndex),
  ...featuredGalleryPhotos,
  ...galleryPhotos
    .slice(featuredStartingIndex)
    .filter((photo) => !featuredGallerySrcs.has(photo.src)),
];

// fixed per-card rotation so the stack looks hand-placed instead of random
const tilt = (i: number) => {
  const seq = [-3, 2.5, -1.5, 3.5, -2, 1.5, -3.5, 2, -1, 4, -2.5, 3, -4, 1, -1.5, 2];
  return seq[i % seq.length];
};

export default function PhotosPage() {
  const [current, setCurrent] = useState(0);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const total = photos.length;

  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (selectedPhotoIndex !== null) return;
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, selectedPhotoIndex]);

  return (
    <main className="min-h-screen bg-stone-50 flex flex-col items-center pt-32 pb-24 px-6 relative overflow-hidden">

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-rose-200/20 blur-[100px]"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[30vw] h-[30vw] rounded-full bg-emerald-800/10 blur-[100px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">

        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-serif uppercase tracking-[0.2em] text-stone-900 mb-6">
            Gallery
          </h1>

          <div className="flex justify-center text-rose-300 opacity-80 mb-6">
            <svg width="60" height="15" viewBox="0 0 60 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="15" cy="7.5" r="2" fill="currentColor" />
              <circle cx="30" cy="7.5" r="3.5" fill="#fda4af" />
              <circle cx="45" cy="7.5" r="2" fill="currentColor" />
            </svg>
          </div>

          <p className="text-xs uppercase tracking-[0.3em] text-stone-500 leading-relaxed">
            Some of our favorite moments
            <br />
            In chronological order
          </p>
        </header>

        {/* every card is centered with translate(-50%, -50%) so varying widths stay balanced */}
        <div
          className="relative w-full max-w-[760px] h-[clamp(520px,78vh,700px)] flex items-center justify-center"
          role="region"
          aria-label="Photo stack"
        >
          {photos.map((photo, i) => {
            // pos is this card's distance from the top card in the circular deck
            const pos = (i - current + total) % total;
            const isTop = pos === 0;
            const visible = pos <= 3;

            let transform = `translate(-50%, -50%) rotate(${tilt(i)}deg) scale(1)`;
            let opacity = 1;
            let zIndex = total - pos;

            if (isTop) {
              transform = `translate(-50%, -50%) rotate(${tilt(i)}deg) scale(1)`;
            } else if (pos === total - 1) {
              // the card just flipped past flies off to the left
              transform = `translate(-200%, -58%) rotate(-22deg) scale(0.95)`;
              opacity = 0;
              zIndex = total + 1; // stay above the deck while flying off
            } else if (visible) {
              const d = pos;
              transform = `translate(calc(-50% + ${d * 7}px), calc(-50% + ${d * 9}px)) rotate(${tilt(i)}deg) scale(${1 - d * 0.035})`;
            } else {
              transform = `translate(calc(-50% + 21px), calc(-50% + 27px)) rotate(${tilt(i)}deg) scale(0.89)`;
              opacity = 0;
            }

            return (
              <button
                type="button"
                key={photo.src}
                aria-label={`Open ${photo.alt}`}
                onClick={isTop ? () => setSelectedPhotoIndex(i) : undefined}
                className={`absolute left-1/2 top-1/2 transition-all duration-500 ease-out ${
                  isTop ? 'cursor-pointer' : 'pointer-events-none'
                }`}
                style={{ transform, opacity, zIndex }}
              >
                <div className="bg-[#FDFBF7] p-3 pb-14 shadow-[0_12px_30px_rgba(0,0,0,0.18)] border border-stone-200/70">
                  <div
                    className="relative h-[clamp(280px,56vh,480px)] bg-stone-100 overflow-hidden p-2"
                    style={{ aspectRatio: photo.ratio }}
                  >
                    <div className="relative h-full w-full">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(max-width: 768px) 80vw, 400px"
                        className="object-contain object-center"
                        priority={pos <= 1}
                      />
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-10 mt-16">
          <button
            onClick={prev}
            aria-label="Previous photo"
            className="text-xs uppercase tracking-[0.2em] text-stone-800 hover:text-emerald-800 transition-colors flex items-center gap-2"
          >
            <span>&larr;</span> Prev
          </button>

          <div className="text-[10px] uppercase tracking-[0.4em] text-stone-400 font-bold tabular-nums">
            {current + 1} / {total}
          </div>

          <button
            onClick={next}
            aria-label="Next photo"
            className="text-xs uppercase tracking-[0.2em] text-stone-800 hover:text-emerald-800 transition-colors flex items-center gap-2"
          >
            Next <span>&rarr;</span>
          </button>
        </div>

      </div>
      <PhotoLightbox
        photos={photos}
        currentIndex={selectedPhotoIndex}
        onClose={() => setSelectedPhotoIndex(null)}
        onSelectIndex={setSelectedPhotoIndex}
      />
    </main>
  );
}
