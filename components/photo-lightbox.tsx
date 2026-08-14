'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { type GalleryImage } from '@/lib/gallery-images';

type PhotoLightboxProps = {
  photos: GalleryImage[];
  currentIndex: number | null;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
};

export default function PhotoLightbox({
  photos,
  currentIndex,
  onClose,
  onSelectIndex,
}: PhotoLightboxProps) {
  const currentPhoto = currentIndex === null ? null : photos[currentIndex];
  const total = photos.length;

  useEffect(() => {
    if (currentIndex === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') onSelectIndex((currentIndex + 1) % total);
      if (event.key === 'ArrowLeft') onSelectIndex((currentIndex - 1 + total) % total);
    };

    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [currentIndex, onClose, onSelectIndex, total]);

  if (!currentPhoto || currentIndex === null) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-stone-950/80 px-4 py-8 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={currentPhoto.alt}
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Close photo"
        onClick={onClose}
        className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-stone-950/35 text-3xl leading-none text-white transition-colors hover:bg-white hover:text-stone-950"
      >
        &times;
      </button>

      <button
        type="button"
        aria-label="Previous photo"
        onClick={(event) => {
          event.stopPropagation();
          onSelectIndex((currentIndex - 1 + total) % total);
        }}
        className="absolute left-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-stone-950/35 text-3xl leading-none text-white transition-colors hover:bg-white hover:text-stone-950 md:flex"
      >
        &lsaquo;
      </button>

      <div
        className="w-full max-w-[min(92vw,980px)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mx-auto bg-[#FDFBF7] p-3 pb-12 shadow-[0_28px_80px_rgba(0,0,0,0.45)] sm:p-4 sm:pb-16">
          <div
            className="relative max-h-[76vh] w-full overflow-hidden bg-stone-100"
            style={{ aspectRatio: currentPhoto.ratio }}
          >
            <Image
              src={currentPhoto.src}
              alt={currentPhoto.alt}
              fill
              sizes="92vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>

      <button
        type="button"
        aria-label="Next photo"
        onClick={(event) => {
          event.stopPropagation();
          onSelectIndex((currentIndex + 1) % total);
        }}
        className="absolute right-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-stone-950/35 text-3xl leading-none text-white transition-colors hover:bg-white hover:text-stone-950 md:flex"
      >
        &rsaquo;
      </button>
    </div>
  );
}
