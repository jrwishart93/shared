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
      <main className="min-h-[calc(100vh-73px)] bg-app-bg px-5 py-10 sm:px-8">
        <MotionSection className="liquid-panel mx-auto max-w-5xl overflow-hidden rounded-3xl">
          <Image
            src={imageSrc}
            alt={album.title}
            width={1200}
            height={800}
            priority
            className="h-72 w-full object-cover sm:h-[28rem]"
          />
          <div className="p-6 sm:p-8">
            <Link
              href="/albums"
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-app-border px-4 py-2 text-sm font-semibold text-app-muted transition hover:bg-app-warm"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to all albums
            </Link>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-app-warm-text">
                  {album.year}
                </p>
                <h1 className="mt-2 text-4xl font-semibold text-app-text">
                  {album.title}
                </h1>
                <p className="mt-3 inline-flex items-center gap-2 text-app-muted">
                  <MapPin className="h-5 w-5" />
                  {album.location} · {album.date}
                </p>
              </div>
              <a
                href={album.icloudUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="liquid-button inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold transition hover:-translate-y-0.5"
              >
                <Camera className="h-5 w-5" />
                Open full album in iCloud
                <ExternalLink className="h-5 w-5" />
              </a>
            </div>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-app-muted">
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
