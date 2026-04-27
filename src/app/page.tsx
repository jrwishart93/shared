import Link from "next/link";
import { Camera, Images, Lock, Sparkles } from "lucide-react";
import { HomeSlideshow, type HomeSlide } from "@/components/HomeSlideshow";
import { MotionSection } from "@/components/MotionSection";
import { albums } from "@/lib/albums";

const previewImages: HomeSlide[] = [
  {
    src: "/images/albums/home-page-images/01-w-loung-sunset-seat.jpeg",
    alt: "Family relaxing at sunset",
  },
  {
    src: "/images/albums/home-page-images/02-family walks.jpeg",
    alt: "Family walk together",
  },
  {
    src: "/images/albums/home-page-images/04-jamie-tin-dunedin-banff.jpeg",
    alt: "Jamie, Tin and Dunedin in Banff",
  },
  {
    src: "/images/albums/home-page-images/05-family-christmas-2025.jpeg",
    alt: "Family Christmas 2025",
  },
  {
    src: "/images/albums/home-page-images/06-jamie-and-his-girls.jpeg",
    alt: "Jamie with the girls",
  },
  {
    src: "/images/albums/home-page-images/07-snow-tin-dunedin.jpeg",
    alt: "Tin and Dunedin in the snow",
  },
  {
    src: "/images/albums/home-page-images/08-jamie-tin-dunedin-westlothian.jpeg",
    alt: "Jamie, Tin and Dunedin in West Lothian",
  },
  {
    src: "/images/albums/home-page-images/09-selfie-snow.jpeg",
    alt: "Family selfie in the snow",
  },
  {
    src: "/images/albums/home-page-images/10-Dunedin-Edi-castle-sunset.jpeg",
    alt: "Dunedin at Edinburgh Castle at sunset",
  },
  {
    src: "/images/albums/home-page-images/11-family-at-zoo.jpeg",
    alt: "Family day at the zoo",
  },
  {
    src: "/images/albums/home-page-images/12-edinburgh-royal-mile.jpeg",
    alt: "Family time on the Royal Mile",
  },
  {
    src: "/images/albums/home-page-images/13-calgary-park-picnic.jpeg",
    alt: "Family picnic in Calgary",
  },
  {
    src: "/images/albums/home-page-images/14-Dunedin-johnny-walker.jpeg",
    alt: "Dunedin out for the day",
  },
  {
    src: "/images/albums/home-page-images/15-dunedin-banff-national-park.jpeg",
    alt: "Dunedin in Banff National Park",
  },
  {
    src: "/images/albums/home-page-images/16-snow-fam-pentlands-belerno.jpeg",
    alt: "Family snow day in the Pentlands",
  },
  {
    src: "/images/albums/home-page-images/17-highland-cow.jpeg",
    alt: "Highland cow on a family outing",
  },
  {
    src: "/images/albums/home-page-images/18-dunedin-on-shoulders-canada.jpeg",
    alt: "Dunedin on shoulders in Canada",
  },
  {
    src: "/images/albums/home-page-images/19-dunedin-meets-callie.jpeg",
    alt: "Dunedin meeting Callie",
  },
  {
    src: "/images/albums/home-page-images/20-dunedin-snow.jpeg",
    alt: "Dunedin playing in the snow",
  },
  {
    src: "/images/albums/home-page-images/21-dunedin-tin-south-queensferry.jpeg",
    alt: "Tin and Dunedin in South Queensferry",
  },
  {
    src: "/images/albums/home-page-images/22-bear-dunedin-jayme.jpeg",
    alt: "Dunedin and Jayme with a teddy bear",
  },
  {
    src: "/images/albums/home-page-images/23-canadian-fam-house.jpeg",
    alt: "Family time at the house in Canada",
  },
  {
    src: "/images/albums/home-page-images/24-jamie-dunedin-sunset.jpeg",
    alt: "Jamie and Dunedin at sunset",
  },
  {
    src: "/images/albums/home-page-images/25-golf-buggy-tin-dunedin.jpeg",
    alt: "Tin and Dunedin on a golf buggy",
  },
  {
    src: "/images/albums/home-page-images/26-w-lounge-sunset.jpeg",
    alt: "Evening family moment at sunset",
  },
];

export default function Home() {
  const featuredAlbum = albums.find((album) => album.featured) ?? albums[0];

  return (
    <main className="min-h-screen overflow-hidden bg-app-bg">
      <section className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-5 overflow-hidden px-4 pb-8 pt-4 sm:gap-10 sm:px-6 sm:pb-14 sm:pt-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:items-center lg:px-8 lg:pb-20 lg:pt-16">
        <MotionSection className="min-w-0 w-full max-w-2xl">
          <div className="liquid-glass mb-4 inline-flex max-w-full items-start gap-2 rounded-full px-3 py-1.5 text-[0.8rem] font-medium leading-5 text-app-muted sm:mb-5 sm:px-4 sm:py-2 sm:text-sm sm:leading-6 sm:items-center">
            <Lock className="mt-0.5 h-4 w-4 flex-none sm:mt-0" />
            <span className="min-w-0">
              Private albums for family and close friends
            </span>
          </div>
          <h1 className="max-w-full break-words text-[2.25rem] font-semibold leading-[1.02] text-app-text sm:text-4xl md:text-5xl lg:text-6xl">
            Family photos, stories and moments in one private place.
          </h1>
          <p className="mt-4 max-w-full text-[0.96rem] leading-7 text-app-muted md:mt-6 md:text-xl md:leading-8">
            A quiet home for the photos we want to keep close: holidays,
            birthdays, trips away, family visits and the ordinary days that
            become favourites later.
          </p>
          <p className="mt-3 max-w-full text-sm leading-6 text-app-muted md:mt-4 md:text-lg md:leading-7">
            Full albums are kept private for family and close friends. Once
            signed in, you can browse albums, open shared photo collections and
            revisit the stories behind them.
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:mt-8 sm:flex sm:flex-row sm:flex-wrap">
            <Link
              href="/login"
              className="liquid-glass inline-flex max-w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-center text-[0.96rem] font-semibold text-app-text transition hover:-translate-y-0.5 sm:px-6 sm:text-base"
            >
              <Camera className="h-5 w-5" />
              Sign in
            </Link>
            <Link
              href="/signup"
              className="liquid-glass inline-flex max-w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-center text-[0.96rem] font-semibold text-app-text transition hover:-translate-y-0.5 sm:px-6 sm:text-base"
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

        <MotionSection delay={0.12} className="min-w-0">
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
