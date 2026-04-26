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
    <main className="min-h-screen overflow-hidden bg-app-bg">
      <section className="mx-auto grid w-full max-w-7xl gap-7 px-4 pb-10 pt-6 sm:gap-10 sm:px-6 sm:pb-14 sm:pt-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:px-8 lg:pb-20 lg:pt-16">
        <MotionSection className="min-w-0 max-w-2xl">
          <div className="liquid-glass mb-5 inline-flex max-w-full items-start gap-2 rounded-full px-3.5 py-2 text-sm font-medium leading-6 text-app-muted sm:items-center sm:px-4">
            <Lock className="mt-0.5 h-4 w-4 flex-none sm:mt-0" />
            <span className="min-w-0">
              Private albums for family and close friends
            </span>
          </div>
          <h1 className="max-w-full text-4xl font-semibold leading-[1.08] text-app-text md:text-5xl lg:text-6xl">
            Family photos, stories and moments in one private place.
          </h1>
          <p className="mt-5 text-base leading-7 text-app-muted md:mt-6 md:text-xl md:leading-8">
            A quiet home for the photos we want to keep close: holidays,
            birthdays, trips away, family visits and the ordinary days that
            become favourites later.
          </p>
          <p className="mt-4 text-sm leading-7 text-app-muted md:text-lg">
            Full albums are kept private for family and close friends. Once
            signed in, you can browse albums, open shared photo collections and
            revisit the stories behind them.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
            <Link
              href="/login"
              className="liquid-glass inline-flex max-w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-center text-base font-semibold text-app-text transition hover:-translate-y-0.5 sm:px-6"
            >
              <Camera className="h-5 w-5" />
              Sign in
            </Link>
            <Link
              href="/signup"
              className="liquid-glass inline-flex max-w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-center text-base font-semibold text-app-text transition hover:-translate-y-0.5 sm:px-6"
            >
              <Sparkles className="h-5 w-5" />
              Request family access
            </Link>
          </div>
          <p className="mt-5 text-sm leading-6 text-app-subtle">
            Preview moments are shown here. The full albums stay behind the
            family sign-in.
          </p>
        </MotionSection>

        <MotionSection delay={0.12}>
          <HomeSlideshow slides={previewImages} />
        </MotionSection>
      </section>

      <MotionSection className="liquid-glass mx-4 rounded-[1.75rem] px-5 py-7 sm:mx-6 sm:rounded-[2rem] sm:px-8 sm:py-10 lg:mx-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-app-warm-text sm:text-sm sm:tracking-[0.18em]">
              Latest shared album
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
            className="inline-flex max-w-full items-center justify-center gap-2 rounded-full bg-app-text px-5 py-3 text-center font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:opacity-90 dark:text-black sm:px-6"
          >
            <Images className="h-5 w-5" />
            Browse family albums
          </Link>
        </div>
      </MotionSection>
    </main>
  );
}
