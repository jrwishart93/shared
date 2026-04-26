"use client";

import Image from "next/image";
import { Camera } from "lucide-react";
import { MotionSection } from "@/components/MotionSection";

type AlbumPhotoGridProps = {
  photos: string[];
};

export function AlbumPhotoGrid({ photos }: AlbumPhotoGridProps) {
  if (!photos.length) {
    return null;
  }

  return (
    <MotionSection className="liquid-panel rounded-3xl p-4 sm:p-5">
      <div className="mb-4 flex items-center gap-3 px-1">
        <span className="liquid-button grid h-10 w-10 place-items-center rounded-full">
          <Camera className="h-5 w-5" />
        </span>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-app-warm-text">
            From the album
          </p>
          <h2 className="text-2xl font-semibold text-app-text">
            Camping trip moments
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-6">
        {photos.map((photo, index) => (
          <div
            key={photo}
            className={`relative overflow-hidden rounded-3xl border border-app-border bg-app-card ${
              index === 0
                ? "col-span-2 h-72 sm:col-span-3 sm:h-96"
                : index === 1
                  ? "col-span-2 h-72 sm:col-span-3 sm:h-96"
                  : "h-44 sm:col-span-2 sm:h-56"
            }`}
          >
            <Image
              src={photo}
              alt="Camping trip family photo"
              fill
              sizes="(min-width: 1024px) 360px, 50vw"
              className="object-cover transition duration-500 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </MotionSection>
  );
}
