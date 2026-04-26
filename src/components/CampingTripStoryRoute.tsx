"use client";

import dynamic from "next/dynamic";
import type { Album } from "@/lib/albums";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const CampingTripStory = dynamic(
  () =>
    import("@/components/CampingTripStory").then(
      (module) => module.CampingTripStory,
    ),
  {
    ssr: false,
    loading: () => (
      <main className="grid min-h-[70vh] place-items-center bg-app-bg px-5">
        <div className="rounded-3xl bg-app-card px-6 py-5 text-app-muted shadow-sm">
          Loading camping trip...
        </div>
      </main>
    ),
  },
);

export function CampingTripStoryRoute({ album }: { album: Album }) {
  return (
    <ProtectedRoute>
      <CampingTripStory album={album} />
    </ProtectedRoute>
  );
}
