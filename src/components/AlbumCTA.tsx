"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

type AlbumCTAProps = {
  icloudUrl: string;
  className?: string;
};

function hasAlbumUrl(url: string) {
  return url.startsWith("https://");
}

export function AlbumCTA({ icloudUrl, className = "" }: AlbumCTAProps) {
  const hasUrl = hasAlbumUrl(icloudUrl);

  return (
    <div
      className={`liquid-panel flex flex-col gap-3 rounded-3xl p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6 ${className}`}
    >
      <Link
        href="/albums"
        className="inline-flex items-center justify-center gap-2 rounded-full border border-app-border px-5 py-3 text-sm font-semibold text-app-muted transition hover:bg-app-warm"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to all albums
      </Link>

      {hasUrl ? (
        <a
          href={icloudUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="liquid-button inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold transition hover:-translate-y-0.5"
        >
          Open full photo album
          <ExternalLink className="h-5 w-5" />
        </a>
      ) : (
        <span className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full bg-[#b8afa2] px-6 py-3 font-semibold text-white">
          Open full photo album
          <ExternalLink className="h-5 w-5" />
        </span>
      )}
    </div>
  );
}
