export type GalleryImage = {
  src: string;
  alt: string;
  ratio: string;
  takenAt: string | null;
  dateSource: 'embedded' | 'missing';
  browserSafe: boolean;
  displayInGallery: boolean;
  rotate: number;
};

type GalleryImageInput = readonly [
  file: string,
  takenAt: string | null,
  ratio: string,
  alt: string,
];

const rotations = [-3, 2, -2, 3, -4, 2.5, -3.5, 4, -1.5, 3.5];

const imageData: GalleryImageInput[] = [
  ['baby-wes.jpg', '1997-01-01T00:00:00', '3024 / 4032', 'A baby photo of Wesley'],
  ['baby-wes-2.jpg', '1997-01-02T00:00:00', '4032 / 3024', 'A baby photo of Wesley'],
  ['top-wes-portrait.jpg', '1997-01-03T00:00:00', '2250 / 3000', 'A childhood portrait of Wesley'],
  ['baby.png', '1998-01-01T00:00:00', '2062 / 1546', 'A baby photo of Rita with family'],
  ['baby-rita-2.png', '1998-01-02T00:00:00', '630 / 945', 'A baby photo of Rita'],
  ['top-rita.png', '1999-01-02T00:00:00', '720 / 963', 'A childhood portrait of Rita'],
  ['IMG_0550.JPG', '2018-06-24T16:35:13', '1080 / 1155', 'Rita and Wesley together'],
  ['IMG_0659.JPG', '2018-06-27T23:42:24', '1080 / 1296', 'Rita and Wesley together'],
  ['IMG_0897.JPG', '2018-07-01T23:43:39', '1278 / 958', 'Rita and Wesley together'],
  ['IMG_0960.JPG', '2018-09-12T23:44:42', '960 / 1280', 'Rita and Wesley together'],
  ['IMG_0949.JPG', '2018-10-12T23:44:20', '640 / 852', 'Rita and Wesley together'],
  ['IMG_1585.JPG', '2018-12-08T23:47:40', '1242 / 2208', 'Rita and Wesley together'],
  ['IMG_1551.JPG', '2019-03-16T14:42:45', '3088 / 2320', 'Rita and Wesley together'],
  ['IMG_1655.JPG', '2019-04-12T23:48:20', '1472 / 2208', 'Rita and Wesley together'],
  ['IMG_2262.jpg', '2019-11-16T16:47:17', '2320 / 3088', 'Rita and Wesley together'],
  ['IMG_0154.JPG', '2020-06-26T10:35:51', '3088 / 2320', 'Rita and Wesley by the gorge'],
  ['IMG_4749.jpg', '2021-07-03T16:35:21', '3088 / 2320', 'Rita and Wesley together'],
  ['IMG_5192.jpg', '2021-11-20T22:15:50', '3088 / 2320', 'Rita and Wesley together'],
  ['IMG_5606.jpg', '2022-08-01T16:07:13', '4032 / 3024', 'Rita and Wesley together'],
  ['IMG_6355.jpg', '2022-08-27T14:54:42', '2320 / 3088', 'Rita and Wesley together'],
  ['IMG_7361.jpg', '2023-03-19T14:11:00', '4032 / 3024', 'Rita and Wesley together'],
  ['IMG_1324.jpg', '2023-12-02T17:23:47', '3024 / 4032', 'Rita and Wesley together'],
  ['IMG_1533.jpg', '2023-12-29T14:17:06', '4032 / 3024', 'Rita and Wesley together'],
  ['IMG_1725.jpg', '2024-02-23T17:27:33', '4032 / 3024', 'Rita and Wesley together'],
  ['IMG_1848.jpg', '2024-03-23T12:24:08', '4032 / 3024', 'Rita and Wesley together'],
  ['IMG_1851.jpg', '2024-03-23T13:43:42', '3024 / 4032', 'Rita and Wesley together'],
  ['IMG_1989.jpg', '2024-04-20T22:49:38', '3024 / 4032', 'Rita and Wesley together'],
  ['IMG_2756.jpg', '2024-09-27T23:24:00', '4032 / 3024', 'Rita and Wesley together'],
  ['IMG_0779.jpg', '2024-11-24T01:04:44', '3024 / 4032', 'Rita and Wesley together'],
  ['IMG_1525.jpg', '2025-03-30T16:19:37', '4032 / 3024', 'Rita and Wesley together'],
  ['IMG_4718.jpg', '2025-06-14T10:07:53', '2316 / 3088', 'Rita and Wesley together'],
  ['IMG_4763.jpg', '2025-06-16T09:42:37', '3024 / 4032', 'Rita and Wesley together'],
  ['IMG_4764.jpg', '2025-06-16T09:42:58', '3024 / 4032', 'Rita and Wesley together'],
  ['IMG_5365.jpg', '2025-08-30T19:35:25', '4032 / 3024', 'Rita and Wesley together'],
  ['363545_KW_030.jpg', '2026-01-27T14:19:08', '4672 / 7008', 'Rita and Wesley in sunshine'],
  ['363545_KW_113.jpg', '2026-01-27T14:47:39', '7008 / 4672', 'Rita and Wesley near Asakusa'],
  ['363545_KW_196.jpg', '2026-01-27T15:09:37', '4672 / 7008', 'Rita and Wesley walking together'],
  ['363545_KW_203.jpg', '2026-01-27T15:18:40', '7008 / 4672', 'Rita and Wesley by Kaminarimon'],
  ['363545_KW_221.jpg', '2026-01-27T15:23:34', '7008 / 4672', 'Rita and Wesley together in Tokyo'],
  ['363545_KW_260.jpg', '2026-01-27T17:36:25', '4672 / 7008', 'Rita and Wesley in Ginza'],
  ['00379808-FA8B-4D0F-807F-577972775DED_1_201_a.jpeg', '2026-01-27T17:40:04', '7008 / 4672', 'Rita and Wesley together'],
  ['363545_KW_263.jpg', '2026-01-27T17:40:04', '7008 / 4672', 'Rita and Wesley together in the city'],
  ['363545_KW_266.jpg', '2026-01-27T17:40:17', '4672 / 7008', 'Rita and Wesley together in Tokyo'],
  ['363545_KW_306.jpg', '2026-01-27T18:14:17', '7008 / 4664', 'Rita and Wesley under the Tokyo arch'],
  ['363545_KW_346.jpg', '2026-01-27T18:31:14', '7008 / 4672', 'Rita and Wesley at Tokyo Station'],
  ['363545_KW_437.jpg', '2026-01-27T19:14:14', '7008 / 4672', 'Rita and Wesley in coats'],
  ['363545_KW_438.jpg', '2026-01-27T19:14:19', '7008 / 4672', 'Rita and Wesley in coats'],
  ['363545_KW_458.jpg', '2026-01-27T19:24:17', '7008 / 4672', 'Rita and Wesley at Tokyo Station'],
  ['IMG_4291.jpg', '2026-05-05T12:50:07', '5712 / 4284', 'Rita and Wesley together'],
  ['IMG_4449.jpg', '2026-05-08T17:03:22', '4896 / 3672', 'Rita and Wesley together'],
];

export const orderedImages: GalleryImage[] = imageData.map(
  ([file, takenAt, ratio, alt], index) => ({
    src: `/images/${file}`,
    alt,
    ratio,
    takenAt,
    dateSource: takenAt ? 'embedded' : 'missing',
    browserSafe: true,
    displayInGallery: true,
    rotate: rotations[index % rotations.length],
  }),
);

export const galleryPhotos = orderedImages.filter(
  (image) => image.browserSafe && image.displayInGallery,
);
