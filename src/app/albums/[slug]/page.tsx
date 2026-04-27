import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, Camera, ExternalLink, MapPin } from "lucide-react";
import { CampingTripStoryRoute } from "@/components/CampingTripStoryRoute";
import { MotionSection } from "@/components/MotionSection";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { getAlbumBySlug } from "@/lib/albums";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  if (slug === "camping-trip-april-2026") {
    return {
      title: "Camping Trip, April 2026 | Online Family Album",
      description:
        "A family camping trip through Moffat, Southerness, Mabie Farm Park, Logan Botanic Garden and Loch Doon in April 2026.",
    };
  }

  const album = getAlbumBySlug(slug);

  return {
    title: album
      ? `${album.title} | Online Family Album`
      : "Album | Online Family Album",
    description: album?.description,
  };
}

export default async function AlbumPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const album = getAlbumBySlug(slug);

  if (!album) {
    notFound();
  }

  if (album.slug === "camping-trip-april-2026") {
    return <CampingTripStoryRoute album={album} />;
  }

  const imageSrc = album.coverImage || album.fallbackCoverImage || "/window.svg";

  return (
    <ProtectedRoute>
      <main className="min-h-[calc(100vh-73px)] bg-app-bg px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <MotionSection className="liquid-panel mx-auto max-w-5xl overflow-hidden rounded-3xl">
          <Image
            src={imageSrc}
            alt={album.title}
            width={1200}
            height={800}
            priority
            className="h-72 w-full object-cover sm:h-[28rem]"
          />
          <div className="p-5 sm:p-8">
            <Link
              href="/albums"
              className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-app-border px-4 py-2 text-sm font-semibold text-app-muted transition hover:bg-app-warm"
            >
              <ArrowLeft className="h-4 w-4 flex-none" />
              <span>Back to all albums</span>
            </Link>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-app-warm-text sm:text-sm sm:tracking-[0.18em]">
                  {album.year}
                </p>
                <h1 className="mt-2 text-4xl font-semibold text-app-text">
                  {album.title}
                </h1>
                <p className="mt-3 inline-flex max-w-full items-start gap-2 text-app-muted">
                  <MapPin className="mt-0.5 h-5 w-5 flex-none" />
                  <span>
                    {album.location} · {album.date}
                  </span>
                </p>
              </div>
              <a
                href={album.icloudUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="liquid-button inline-flex max-w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-center font-semibold transition hover:-translate-y-0.5 sm:px-6"
              >
                <Camera className="h-5 w-5 flex-none" />
                <span>Open full album in iCloud</span>
                <ExternalLink className="h-5 w-5 flex-none" />
              </a>
            </div>
            <p className="mt-6 max-w-3xl text-base leading-7 text-app-muted md:text-lg md:leading-8">
              {album.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {album.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-app-warm px-3 py-1 text-xs font-semibold text-app-warm-text"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="mt-6 rounded-2xl bg-app-warm p-4 text-sm text-app-warm-text">
              This opens the shared iCloud album in a new tab.
            </p>
          </div>
        </MotionSection>
      </main>
    </ProtectedRoute>
  );
}
