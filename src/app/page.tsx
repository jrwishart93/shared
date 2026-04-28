import Link from "next/link";
import { Images } from "lucide-react";
import { HomeSlideshow, type HomeSlide } from "@/components/HomeSlideshow";
import { MotionSection } from "@/components/MotionSection";
import { HeroContent } from "@/components/HeroContent";
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
        <HeroContent />

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
            className="liquid-button btn-interactive inline-flex max-w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-center font-semibold transition sm:px-6"
          >
            <Images className="h-5 w-5" />
            Browse family albums
          </Link>
        </div>
      </MotionSection>
    </main>
  );
}
