"use client";

import Image from "next/image";
import { CalendarDays, Camera, ExternalLink, MapPin } from "lucide-react";
import type { Album } from "@/lib/albums";
import { MotionSection } from "@/components/MotionSection";

function hasAlbumUrl(url: string) {
  return url.startsWith("https://");
}

export function AlbumHero({ album }: { album: Album }) {
  const imageSrc = album.coverImage || album.fallbackCoverImage || "/window.svg";
  const hasUrl = hasAlbumUrl(album.icloudUrl);

  return (
    <MotionSection className="liquid-panel overflow-hidden rounded-[2rem]">
      <div className="relative min-h-[32rem] overflow-hidden md:min-h-[34rem]">
        <Image
          src={imageSrc}
          alt={album.title}
          fill
          priority
          sizes="(min-width: 1024px) 1120px, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#241f1a]/85 via-[#241f1a]/35 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 lg:p-10">
          <div className="min-w-0 max-w-4xl text-white">
            <div className="mb-4 flex flex-wrap gap-2">
              {album.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-app-card/18 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="inline-flex max-w-full items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#f4d9a8] sm:text-sm sm:tracking-[0.18em]">
              <CalendarDays className="h-4 w-4 flex-none" />
              {album.date}
            </p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight md:text-6xl">
              {album.title}
            </h1>
            <p className="mt-4 flex max-w-3xl items-start gap-2 text-base leading-7 text-white/88 md:text-lg">
              <MapPin className="mt-1 h-5 w-5 flex-none" />
              <span className="min-w-0">
                {album.locationDetail ?? album.location}
              </span>
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              {hasUrl ? (
                <a
                  href={album.icloudUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex max-w-full items-center justify-center gap-2 rounded-full bg-white/85 px-5 py-3 text-center font-semibold text-black shadow-lg shadow-black/15 backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white sm:px-6"
                >
                  <Camera className="h-5 w-5 flex-none" />
                  <span>Open full photo album</span>
                  <ExternalLink className="h-5 w-5 flex-none" />
                </a>
              ) : (
                <span className="inline-flex max-w-full cursor-not-allowed items-center justify-center gap-2 rounded-full bg-app-card/35 px-5 py-3 text-center font-semibold text-white backdrop-blur-md sm:px-6">
                  <Camera className="h-5 w-5 flex-none" />
                  <span>Open full photo album</span>
                  <ExternalLink className="h-5 w-5 flex-none" />
                </span>
              )}
              <p className="text-sm leading-6 text-white/78">
                This opens the shared iCloud album in a new tab.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
