"use client";

import Link from "next/link";
import Image from "next/image";
import { CalendarDays, Images, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import type { Album } from "@/lib/albums";

export function AlbumCard({ album }: { album: Album }) {
  const imageSrc = album.coverImage || album.fallbackCoverImage || "/window.svg";

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="liquid-panel overflow-hidden rounded-3xl"
    >
      <Image
        src={imageSrc}
        alt={album.title}
        width={1200}
        height={720}
        className="h-56 w-full object-cover"
      />
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
          href={`/albums/${album.slug}`}
          className="liquid-button mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 font-semibold transition hover:-translate-y-0.5"
        >
          <Images className="h-5 w-5" />
          View album
        </Link>
      </div>
    </motion.article>
  );
}
