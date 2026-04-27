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
};

export const albums: Album[] = [
  {
    title: "Family Album",
    slug: "family-album",
    year: "2026",
    date: "2026",
    location: "Family photos",
    description: "A shared album for family memories and photos.",
    coverImage:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80",
    icloudUrl: "https://www.icloud.com/sharedalbum/#B2VGrhkPxJPlDkb",
    visibility: "private",
    tags: ["Family", "Memories"],
    createdAt: "2026-04-26",
    featured: true,
    photos: [],
    storageProvider: "icloud",
  },
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
];

export function getAlbumBySlug(slug: string) {
  return albums.find((album) => album.slug === slug);
}
