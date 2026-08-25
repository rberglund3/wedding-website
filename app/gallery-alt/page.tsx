'use client';

import { useState } from 'react';
import Image from 'next/image';
import PhotoLightbox, { type LightboxMedia } from '@/components/photo-lightbox';
import { type GalleryImage, galleryPhotos } from '@/lib/gallery-images';

type TimelineMoment = {
  key: string;
  time: string;
  title: string;
  sort: string;
  photos: TimelineMedia[];
};

type TimelineVideo = {
  kind: 'video';
  src: string;
  alt: string;
  ratio: string;
  takenAt: string;
  rotate: number;
};

type TimelineMedia = (GalleryImage & { kind?: 'image' }) | TimelineVideo;

const titleByYear: Record<string, string> = {
  '1997': 'Baby Wes',
  '1998': 'Baby Rita',
  '2017': 'First Adventures',
  '2018': 'Junior Year',
  '2019': 'Senior Year',
  '2020': 'Year of the Chunk',
  '2021': 'Covid times',
  '2022': 'Traveling around',
  '2023': 'Traveling around some more',
  '2024': 'Year of the Kuma',
  '2025': 'Proposal in Hakone 😊 🇯🇵',
};

const getMomentInfo = (photo: TimelineMedia) => {
  if (!photo.takenAt) {
    return {
      key: 'date-tbd',
      time: 'Date TBD',
      title: 'Scanned Favorites',
      sort: '9999',
    };
  }

  const year = photo.takenAt.slice(0, 4);

  if (photo.takenAt.startsWith('2026-01-27')) {
    return {
      key: '2026-01-27',
      time: '2026',
      title: 'Japan Pre Wedding Shoot',
      sort: '2026-01-27',
    };
  }

  return {
    key: year,
    time: year,
    title: titleByYear[year] ?? year,
    sort: year,
  };
};

const proposalVideo: TimelineVideo = {
  kind: 'video',
  src: '/images/proposal-video.mp4',
  alt: 'Proposal video',
  ratio: '848 / 480',
  takenAt: '2025-03-30T16:19:38',
  rotate: 3,
};

const timelineOnlyPhotos: GalleryImage[] = [
  {
    src: '/images/chunk.png',
    alt: 'Chunk',
    ratio: '1179 / 1561',
    takenAt: '2020-06-27T00:00:00',
    dateSource: 'embedded',
    browserSafe: true,
    displayInGallery: false,
    rotate: 2,
  },
];
const featuredPhotoOrder = ['/images/top-wes-portrait.jpg', '/images/top-rita.png'];
const featuredPhotos = featuredPhotoOrder
  .map((src) => galleryPhotos.find((photo) => photo.src === src))
  .filter((photo): photo is GalleryImage => Boolean(photo));
const featuredPhotoSrcs = new Set(featuredPhotoOrder);
const timelineExcludedPhotoSrcs = new Set([
  ...featuredPhotoSrcs,
  '/images/00379808-FA8B-4D0F-807F-577972775DED_1_201_a.jpeg',
  '/images/IMG_5365.jpg',
]);
const isSpringFavoritesPhoto = (photo: GalleryImage) =>
  photo.takenAt?.startsWith('2026-') && !photo.takenAt.startsWith('2026-01-27');
const timelinePhotos: TimelineMedia[] = [
  ...galleryPhotos.filter(
    (photo) => !timelineExcludedPhotoSrcs.has(photo.src) && !isSpringFavoritesPhoto(photo),
  ),
  ...timelineOnlyPhotos,
  proposalVideo,
];

const timeline = timelinePhotos
  .reduce<Map<string, TimelineMoment>>((moments, photo) => {
    const info = getMomentInfo(photo);
    const existing = moments.get(info.key);

    if (existing) {
      existing.photos.push(photo);
      return moments;
    }

    moments.set(info.key, {
      key: info.key,
      time: info.time,
      title: info.title,
      sort: info.sort,
      photos: [photo],
    });

    return moments;
  }, new Map<string, TimelineMoment>());

const compareTimelineMedia = (a: TimelineMedia, b: TimelineMedia) => {
  const takenAtComparison = (a.takenAt ?? '9999').localeCompare(b.takenAt ?? '9999');
  return takenAtComparison || a.src.localeCompare(b.src);
};

const timelineMoments = Array.from(timeline.values())
  .map((moment) => ({
    ...moment,
    photos: [...moment.photos].sort(compareTimelineMedia),
  }))
  .sort((a, b) => a.sort.localeCompare(b.sort));

const isTimelineVideo = (photo: TimelineMedia): photo is TimelineVideo =>
  photo.kind === 'video';

const timelineLightboxPhotos: LightboxMedia[] = [
  ...featuredPhotos,
  ...timelineMoments.flatMap((moment) => moment.photos),
];

const sakuraPetals = [
  'left-[6%] top-36 h-14 w-9 -rotate-[28deg] opacity-55',
  'right-[8%] top-44 h-16 w-10 rotate-[24deg] opacity-45',
  'left-[18%] top-[32rem] h-10 w-7 rotate-[18deg] opacity-35',
  'right-[20%] top-[41rem] h-12 w-8 -rotate-[14deg] opacity-40',
  'left-[3%] top-[58rem] h-16 w-10 rotate-[34deg] opacity-35',
  'right-[4%] top-[72rem] h-11 w-7 -rotate-[24deg] opacity-45',
  'left-[13%] top-[92rem] h-12 w-8 rotate-[16deg] opacity-30',
  'right-[15%] top-[110rem] h-14 w-9 -rotate-[30deg] opacity-35',
  'left-[8%] bottom-80 h-10 w-7 rotate-[26deg] opacity-40',
  'right-[9%] bottom-44 h-16 w-10 -rotate-[18deg] opacity-35',
];

function SakuraBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#fff7f8_0%,#fffaf5_46%,#f7fff9_100%)]" />
      <div className="absolute inset-x-0 top-0 h-80 bg-[linear-gradient(180deg,rgba(251,207,232,0.42),rgba(255,247,248,0))]" />
      <div className="absolute -left-28 top-28 h-px w-[32rem] origin-left rotate-[19deg] bg-rose-900/10" />
      <div className="absolute -right-32 top-[38rem] h-px w-[36rem] origin-right -rotate-[17deg] bg-rose-900/10" />
      <div className="absolute -left-36 bottom-72 h-px w-[34rem] origin-left rotate-[15deg] bg-rose-900/10" />
      {sakuraPetals.map((className) => (
        <span key={className} className={`sakura-petal absolute ${className}`} />
      ))}
    </div>
  );
}

function Polaroid({
  photo,
  index,
  size = 'standard',
  onOpen,
}: {
  photo: TimelineMedia;
  index: number;
  size?: 'standard' | 'feature' | 'mini';
  onOpen: () => void;
}) {
  const offset = index % 2 === 0 ? 'translate-y-0' : 'translate-y-3';
  const isVideo = isTimelineVideo(photo);
  const frameClass =
    size === 'feature'
      ? 'bg-[#FDFBF7] p-3 pb-12 shadow-[0_18px_44px_rgba(0,0,0,0.18)] border border-stone-200/70 sm:p-4 sm:pb-14'
      : size === 'mini'
        ? 'bg-[#FDFBF7] p-1.5 pb-5 shadow-[0_8px_18px_rgba(0,0,0,0.13)] border border-stone-200/70 sm:p-2 sm:pb-7'
      : 'bg-[#FDFBF7] p-2 pb-8 shadow-[0_10px_24px_rgba(0,0,0,0.14)] border border-stone-200/70 sm:p-2.5 sm:pb-10';
  const imageSizes =
    size === 'feature'
      ? '(max-width: 768px) 86vw, (max-width: 1024px) 46vw, 520px'
      : size === 'mini'
        ? '(max-width: 768px) 32vw, (max-width: 1024px) 15vw, 120px'
      : '(max-width: 768px) 42vw, (max-width: 1024px) 22vw, 180px';
  const hoverScale =
    size === 'feature'
      ? 'hover:scale-[1.06]'
      : size === 'mini'
        ? 'hover:scale-[1.1]'
        : 'hover:scale-[1.14]';
  const frame = (
    <div
      className={frameClass}
      style={{ transform: `rotate(${photo.rotate}deg)` }}
    >
      <div
        className="relative overflow-hidden bg-stone-100 p-1.5"
        style={{ aspectRatio: photo.ratio }}
      >
        <div className="relative h-full w-full">
          {isVideo ? (
            <video
              src={photo.src}
              aria-label={photo.alt}
              controls
              playsInline
              preload="metadata"
              className="h-full w-full object-contain object-center"
            />
          ) : (
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes={imageSizes}
              className="object-contain object-center"
            />
          )}
        </div>
      </div>
    </div>
  );

  if (isVideo) {
    return (
      <div className={`min-w-0 ${offset}`}>
        <div className={`relative block w-full transition-transform duration-300 ease-out hover:z-30 ${hoverScale}`}>
          {frame}
        </div>
      </div>
    );
  }

  return (
    <div className={`min-w-0 ${offset}`}>
      <button
        type="button"
        aria-label={`Open ${photo.alt}`}
        onClick={onOpen}
        className={`relative block w-full transition-transform duration-300 ease-out hover:z-30 ${hoverScale} focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-800 focus-visible:ring-offset-4 focus-visible:ring-offset-stone-50`}
      >
        {frame}
      </button>
    </div>
  );
}

function MomentMediaGrid({
  photos,
  photosFirst,
  onOpenPhoto,
}: {
  photos: TimelineMedia[];
  photosFirst: boolean;
  onOpenPhoto: (photo: GalleryImage) => void;
}) {
  const video = photos.find(isTimelineVideo);

  if (video) {
    const surroundingPhotos = photos.filter((photo) => !isTimelineVideo(photo));
    const leftPhotos = surroundingPhotos.filter((_, index) => index % 2 === 0);
    const rightPhotos = surroundingPhotos.filter((_, index) => index % 2 === 1);

    return (
      <div
        className={`grid gap-5 ${
          photosFirst ? 'md:col-start-1' : 'md:col-start-3'
        } md:row-start-1`}
      >
        <div className="grid gap-4 md:grid-cols-[minmax(0,0.58fr)_minmax(210px,1.7fr)_minmax(0,0.58fr)] md:items-center md:gap-4">
          <div className="grid grid-cols-2 gap-x-3 gap-y-5 md:grid-cols-1">
            {leftPhotos.map((photo, photoIndex) => (
              <Polaroid
                key={photo.src}
                photo={photo}
                index={photoIndex}
                size="mini"
                onOpen={() => onOpenPhoto(photo)}
              />
            ))}
          </div>

          <div className="mx-auto w-full max-w-lg">
            <Polaroid
              photo={video}
              index={0}
              size="feature"
              onOpen={() => undefined}
            />
          </div>

          <div className="grid grid-cols-2 gap-x-3 gap-y-5 md:grid-cols-1">
            {rightPhotos.map((photo, photoIndex) => (
              <Polaroid
                key={photo.src}
                photo={photo}
                index={photoIndex + leftPhotos.length}
                size="mini"
                onOpen={() => onOpenPhoto(photo)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 ${
        photosFirst ? 'md:col-start-1' : 'md:col-start-3'
      } md:row-start-1`}
    >
      {photos.map((photo, photoIndex) => (
        <Polaroid
          key={photo.src}
          photo={photo}
          index={photoIndex}
          onOpen={() => {
            if (!isTimelineVideo(photo)) onOpenPhoto(photo);
          }}
        />
      ))}
    </div>
  );
}

function FeaturedPolaroid({
  photo,
  index,
  onOpen,
}: {
  photo: GalleryImage;
  index: number;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={`Open ${photo.alt}`}
      onClick={onOpen}
      className="relative block min-w-0 transition-transform duration-300 ease-out hover:z-30 hover:scale-[1.08] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-800 focus-visible:ring-offset-4 focus-visible:ring-offset-stone-50"
    >
      <div
        className="bg-[#FDFBF7] p-3 pb-12 shadow-[0_16px_36px_rgba(0,0,0,0.16)] border border-stone-200/70 sm:p-4 sm:pb-14"
        style={{ transform: `rotate(${index === 0 ? -2.5 : 2.5}deg)` }}
      >
        <div
          className="relative overflow-hidden bg-stone-100 p-2"
          style={{ aspectRatio: photo.ratio }}
        >
          <div className="relative h-full w-full">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 768px) 82vw, 360px"
              className="object-contain object-center"
              priority
            />
          </div>
        </div>
      </div>
    </button>
  );
}

export default function GalleryAltPage() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const openPhoto = (photo: GalleryImage) => {
    const index = timelineLightboxPhotos.findIndex((galleryPhoto) => galleryPhoto.src === photo.src);
    if (index >= 0) setSelectedPhotoIndex(index);
  };

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#fff7f8] px-6 pb-24 pt-32 text-stone-800">
      <SakuraBackground />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <header className="mb-16 text-center">
          <h1 className="mx-auto mb-6 max-w-3xl font-serif text-4xl leading-tight text-stone-900 md:text-6xl">
            Us throughout the years
          </h1>

          <div className="mb-6 flex justify-center text-rose-300 opacity-80">
            <svg width="60" height="15" viewBox="0 0 60 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="15" cy="7.5" r="2" fill="currentColor" />
              <circle cx="30" cy="7.5" r="3.5" fill="#fda4af" />
              <circle cx="45" cy="7.5" r="2" fill="currentColor" />
            </svg>
          </div>

        </header>

        <div className="mx-auto mb-20 grid max-w-3xl grid-cols-1 gap-8 sm:grid-cols-2 sm:items-start">
          {featuredPhotos.map((photo, index) => (
            <FeaturedPolaroid
              key={photo.src}
              photo={photo}
              index={index}
              onOpen={() => openPhoto(photo)}
            />
          ))}
        </div>

        <div className="relative">
          <div className="absolute bottom-8 left-4 top-8 w-px bg-emerald-900/20 md:left-1/2 md:-translate-x-1/2" />

          <ol className="relative space-y-20 md:space-y-24">
            {timelineMoments.map((moment, index) => {
              const photosFirst = moment.key === '2025' ? false : index % 2 === 0;

              return (
                <li
                  key={moment.key}
                  className="relative grid gap-8 pl-12 md:grid-cols-[minmax(0,1fr)_86px_minmax(0,1fr)] md:items-start md:gap-10 md:pl-0"
                >
                  <div className="md:col-start-2 md:row-start-1 md:text-center">
                    <p className="font-serif text-3xl text-emerald-900 md:text-4xl">
                      {moment.time}
                    </p>
                  </div>

                  <div
                    className={`md:row-start-1 ${
                      photosFirst ? 'md:col-start-3' : 'md:col-start-1 md:text-right'
                    }`}
                  >
                    <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.35em] text-rose-400">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <h2 className="mb-4 font-serif text-3xl text-stone-900 md:text-4xl">
                      {moment.title}
                    </h2>
                  </div>

                  <MomentMediaGrid
                    photos={moment.photos}
                    photosFirst={photosFirst}
                    onOpenPhoto={openPhoto}
                  />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
      <PhotoLightbox
        photos={timelineLightboxPhotos}
        currentIndex={selectedPhotoIndex}
        onClose={() => setSelectedPhotoIndex(null)}
        onSelectIndex={setSelectedPhotoIndex}
      />
    </main>
  );
}
