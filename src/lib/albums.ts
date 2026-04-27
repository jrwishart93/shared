export type Album = {
  title: string;
  slug: string;
  year: string;
  date: string;
  location: string;
  locationDetail?: string;
  description: string;
  coverImage: string;
  fallbackCoverImage?: string;
  icloudUrl: string;
  visibility: "private" | "public";
  tags: string[];
  createdAt: string;
  featured: boolean;
  protected?: boolean;
  people?: string[];
  photos?: string[];
  storageProvider?: "icloud" | "firebase" | "cloudinary";
  openInNewTab?: boolean;
};

export const albums: Album[] = [
  {
    title: "Camping Trip",
    slug: "camping-trip-april-2026",
    year: "2026",
    date: "April 2026",
    location: "Scotland",
    locationDetail:
      "Moffat, Southerness, Mabie Farm Park, Logan Botanic Garden, Galloway Forest Park and Loch Doon",
    description:
      "A family camping trip through Dumfries and Galloway, starting with a stop at Moffat Park, two nights at Southerness, a visit to Mabie Farm Park, and a final wander through Logan Botanic Garden, Galloway Forest Park and Loch Doon.",
    coverImage:
      "/images/albums/Camping Trip - April 2026/family_at_bell_tent.jpeg",
    fallbackCoverImage:
      "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1400&q=80",
    icloudUrl: "https://www.icloud.com/sharedalbum/#B2VGrhkPxJPlDkb",
    visibility: "private",
    tags: ["Camping", "Family", "Scotland", "April 2026", "Southerness"],
    createdAt: "2026-04-26",
    featured: true,
    protected: true,
    people: ["Jamie", "Tin", "Dunedin", "Caledonia"],
    photos: [
      "/images/albums/Camping Trip - April 2026/family_at_bell_tent.jpeg",
      "/images/albums/Camping Trip - April 2026/camp-sunset-criffel.jpeg",
      "/images/albums/Camping Trip - April 2026/dunedin_standing_tent_door.jpeg",
      "/images/albums/Camping Trip - April 2026/girls-loch-doon.jpeg",
      "/images/albums/Camping Trip - April 2026/family_selfie.jpeg",
      "/images/albums/Camping Trip - April 2026/tin-callie.jpeg",
      "/images/albums/Camping Trip - April 2026/jamie-dunedin-fish.jpeg",
      "/images/albums/Camping Trip - April 2026/dunedin-hill.jpeg",
      "/images/albums/Camping Trip - April 2026/callie-vegemite.jpeg",
    ],
    storageProvider: "icloud",
  },
  {
    title: "Canada — August 2025",
    slug: "canada-august-2025",
    year: "2025",
    date: "August 2025",
    location: "Calgary & Banff National Park",
    description:
      "In August 2025, we headed across to Calgary to visit our friends Trevor and Madi. Trevor picked us up from the airport, then we rented a 4x4 with a tent box on the roof and set off into Banff National Park for a few days of camping, exploring and taking in the incredible scenery. After Banff, we were welcomed into Trevor and Madi’s new home, where they had everything set up for us. We felt so comfortable and at home that we really didn’t want to leave. As luck would have it, Air Canada went on strike, meaning we were able to extend the trip, spend more time with our friends, and enjoy a few extra days covered by travel insurance. It was a brilliant trip, with golf, a visit to the Open, plenty of exploring, and most importantly, proper quality time with good friends.",
    coverImage: "/images/albums/home-page-images/Banff-family-photo.JPG",
    icloudUrl: "https://www.icloud.com/sharedalbum/#B2VG4VTwGGZLaXY",
    visibility: "private",
    tags: ["Canada", "Banff", "Camping", "Friends", "August 2025"],
    createdAt: "2026-04-27",
    featured: false,
    storageProvider: "icloud",
    openInNewTab: true,
    photos: [
      "/images/albums/home-page-images/Banff-family-photo.JPG",
      "/images/albums/home-page-images/National-park.JPG",
      "/images/albums/home-page-images/Walk-gorge.JPG",
      "/images/albums/home-page-images/Canada-tent-box.JPG",
      "/images/albums/home-page-images/Canada-fam-Trevor-Madi.JPG",
    ],
  },
  {
    title: "Dunedin’s 1st Birthday",
    slug: "dunedins-1st-birthday",
    year: "2026",
    date: "2026",
    location: "Family celebration",
    description:
      "A special shared collection celebrating Dunedin’s first birthday with family.",
    coverImage: "/images/albums/home-page-images/Dunedins_1st_birthday.JPG",
    icloudUrl: "https://www.icloud.com/sharedalbum/#B2V5BydzF9comu",
    visibility: "private",
    tags: ["Birthday", "Family", "Dunedin"],
    createdAt: "2026-04-27",
    featured: false,
    storageProvider: "icloud",
    openInNewTab: true,
  },
];

export function getAlbumBySlug(slug: string) {
  return albums.find((album) => album.slug === slug);
}
