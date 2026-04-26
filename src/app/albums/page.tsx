import { AlbumCard } from "@/components/AlbumCard";
import { MotionSection } from "@/components/MotionSection";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { albums } from "@/lib/albums";

export default function AlbumsPage() {
  return (
    <ProtectedRoute>
      <main className="min-h-[calc(100vh-73px)] bg-app-bg px-5 py-10 sm:px-8">
        <MotionSection className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-app-warm-text">
              Private albums
            </p>
            <h1 className="mt-2 text-4xl font-semibold text-app-text">
              Family albums
            </h1>
            <p className="mt-3 text-lg leading-8 text-app-muted">
              Holidays, trips away, birthdays, gatherings and family memories in
              one private place.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {albums.map((album) => (
              <AlbumCard key={album.slug} album={album} />
            ))}
          </div>
        </MotionSection>
      </main>
    </ProtectedRoute>
  );
}
