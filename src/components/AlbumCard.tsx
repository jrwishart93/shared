"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { CalendarDays, Images, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import type { Album } from "@/lib/albums";

export function AlbumCard({ album }: { album: Album }) {
  const slideshowImages = useMemo(
    () =>
      album.photos && album.photos.length > 0
        ? album.photos
        : [album.coverImage || album.fallbackCoverImage || "/window.svg"],
    [album.coverImage, album.fallbackCoverImage, album.photos],
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const imageSrc = slideshowImages[activeImageIndex] || "/window.svg";
  const cardHref = album.openInNewTab ? album.icloudUrl : `/albums/${album.slug}`;

  useEffect(() => {
    if (slideshowImages.length < 2) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveImageIndex((currentIndex) =>
        currentIndex === slideshowImages.length - 1 ? 0 : currentIndex + 1,
      );
    }, 3800);

    return () => window.clearInterval(interval);
  }, [slideshowImages]);

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="liquid-panel relative overflow-hidden rounded-3xl"
    >
      {album.openInNewTab ? (
        <Link
          href={cardHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${album.title} album in iCloud`}
          className="absolute inset-0 z-10"
        />
      ) : null}
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={imageSrc}
          alt={album.title}
          width={1200}
          height={720}
          className="ken-burns-slide h-56 w-full object-cover"
        />
      </div>
      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap gap-2">
          {album.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-app-warm px-3 py-1 text-xs font-semibold text-app-warm-text"
            >
              {tag}
            </span>
          ))}
        </div>
        <h2 className="mt-4 text-2xl font-semibold text-app-text">
          {album.title}
        </h2>
        <div className="mt-3 flex flex-col gap-2 text-sm text-app-muted sm:flex-row sm:gap-5">
          <span className="inline-flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            {album.date}
          </span>
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {album.location}
          </span>
        </div>
        <p className="mt-4 line-clamp-3 text-base leading-7 text-app-muted">
          {album.description}
        </p>
        <Link
          href={cardHref}
          target={album.openInNewTab ? "_blank" : undefined}
          rel={album.openInNewTab ? "noopener noreferrer" : undefined}
          className="liquid-button relative z-20 mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 font-semibold transition hover:-translate-y-0.5"
        >
          <Images className="h-5 w-5" />
          {album.openInNewTab ? "Open album" : "View album"}
        </Link>
        {album.openInNewTab ? (
          <Link
            href={cardHref}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-20 mt-3 inline-flex w-full items-center justify-center text-sm font-semibold text-app-accent transition hover:underline"
          >
            View all images
          </Link>
        ) : null}
      </div>
    </motion.article>
  );
}
