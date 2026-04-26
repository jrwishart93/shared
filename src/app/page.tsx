import Link from "next/link";
import { Camera, Images, Lock, Sparkles } from "lucide-react";
import { HomeSlideshow, type HomeSlide } from "@/components/HomeSlideshow";
import { MotionSection } from "@/components/MotionSection";
import { albums } from "@/lib/albums";

const previewImages: HomeSlide[] = [
  {
    src: "/images/albums/home-page-images/jamie-and-his-girls.jpeg",
    alt: "Jamie with the girls",
  },
  {
    src: "/images/albums/home-page-images/dunedin-meets-callie.jpeg",
    alt: "Dunedin meeting Callie",
  },
  {
    src: "/images/albums/home-page-images/jamie-tin-dunedin-banff.jpeg",
    alt: "Jamie, Tin and Dunedin in Banff",
  },
  {
    src: "/images/albums/home-page-images/Dunedin-Edi-castle-sunset.jpeg",
    alt: "Dunedin at Edinburgh Castle at sunset",
  },
  {
    src: "/images/albums/home-page-images/calgary-park-picnic.jpeg",
    alt: "Family picnic in Calgary",
  },
  {
    src: "/images/albums/home-page-images/dunedin-banff-national-park.jpeg",
    alt: "Dunedin in Banff National Park",
  },
  {
    src: "/images/albums/home-page-images/dunedin-on-shoulders-canada.jpeg",
    alt: "Dunedin on shoulders in Canada",
  },
  {
    src: "/images/albums/home-page-images/family-at-zoo.jpeg",
    alt: "Family day at the zoo",
  },
  {
    src: "/images/albums/home-page-images/family-christmas-2025.jpeg",
    alt: "Family Christmas 2025",
  },
  {
    src: "/images/albums/home-page-images/jamie-dunedin-sunset.jpeg",
    alt: "Jamie and Dunedin at sunset",
  },
  {
    src: "/images/albums/home-page-images/snow-fam-pentlands-belerno.jpeg",
    alt: "Family snow day in the Pentlands",
  },
  {
    src: "/images/albums/home-page-images/snow-tin-dunedin.jpeg",
    alt: "Tin and Dunedin in the snow",
  },
];

export default function Home() {
  const featuredAlbum = albums.find((album) => album.featured) ?? albums[0];

  return (
    <main className="min-h-screen bg-app-bg">
      <section className="mx-auto grid w-full max-w-7xl gap-10 px-5 pb-14 pt-10 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:pb-20 lg:pt-16">
        <MotionSection className="max-w-2xl">
          <div className="liquid-glass mb-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-app-muted">
            <Lock className="h-4 w-4" />
            Private albums for family and close friends
          </div>
          <h1 className="text-4xl font-semibold leading-tight text-app-text sm:text-5xl lg:text-6xl">
            A private place for our family photos.
          </h1>
          <p className="mt-6 text-lg leading-8 text-app-muted sm:text-xl">
            We wanted somewhere simple and personal to keep our family albums
            together, away from adverts, feeds and social media noise.
          </p>
          <p className="mt-4 text-base leading-7 text-app-muted sm:text-lg">
            This is where we will collect photos from holidays, trips away,
            birthdays, family gatherings and the everyday moments worth keeping.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/login"
              className="liquid-button inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold transition hover:-translate-y-0.5"
            >
              <Camera className="h-5 w-5" />
              Sign in to view albums
            </Link>
            <Link
              href="/signup"
              className="liquid-glass inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold text-app-text transition hover:-translate-y-0.5"
            >
              <Sparkles className="h-5 w-5" />
              Create family account
            </Link>
          </div>
          <p className="mt-5 text-sm leading-6 text-app-subtle">
            Some preview photos are shown here, but the full albums are
            available to family and close friends after signing in.
          </p>
        </MotionSection>

        <MotionSection delay={0.12}>
          <HomeSlideshow slides={previewImages} />
        </MotionSection>
      </section>

      <MotionSection className="liquid-glass mx-5 rounded-[2rem] px-5 py-10 sm:mx-8 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-app-warm-text">
              Featured first album
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-app-text">
              {featuredAlbum.title}
            </h2>
            <p className="mt-2 max-w-2xl text-app-muted">
              {featuredAlbum.description}
            </p>
          </div>
          <Link
            href="/albums"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-app-text px-6 py-3 font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:opacity-90 dark:text-black"
          >
            <Images className="h-5 w-5" />
            View private albums
          </Link>
        </div>
      </MotionSection>
    </main>
  );
}
