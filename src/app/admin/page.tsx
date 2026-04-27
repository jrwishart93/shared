"use client";

import Link from "next/link";
import { Edit2, LockKeyhole, MessageCircle, ShieldAlert } from "lucide-react";
import { MotionSection } from "@/components/MotionSection";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { albums } from "@/lib/albums";

function AdminGuard({ children }: { children: React.ReactNode }) {
  const { userProfile, loading } = useAuth();

  if (loading) return null;

  if (userProfile?.role !== "admin") {
    return (
      <main className="grid min-h-[70vh] place-items-center bg-app-bg px-5">
        <div className="liquid-panel max-w-xl rounded-3xl p-8 text-center">
          <ShieldAlert className="mx-auto h-10 w-10 text-app-warm-text" />
          <h1 className="mt-4 text-2xl font-semibold text-app-text">
            Access restricted
          </h1>
          <p className="mt-3 text-app-muted">
            This page is only available to admins.
          </p>
          <Link
            href="/albums"
            className="liquid-button mt-6 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold"
          >
            Back to albums
          </Link>
        </div>
      </main>
    );
  }

  return <>{children}</>;
}

export default function AdminPage() {
  return (
    <ProtectedRoute>
      <AdminGuard>
        <main className="min-h-[calc(100vh-73px)] bg-app-bg px-5 py-10 sm:px-8">
          <div className="mx-auto max-w-3xl space-y-6">
            <MotionSection className="liquid-panel rounded-3xl p-6 sm:p-8">
              <div className="liquid-button mb-5 grid h-14 w-14 place-items-center rounded-full">
                <LockKeyhole className="h-7 w-7" />
              </div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-app-warm-text">
                Admin tools
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-app-text">
                Welcome, admin
              </h1>
              <p className="mt-4 text-lg leading-8 text-app-muted">
                Editing tools are available inline on each album page. Navigate to
                an album and look for the pencil icon to edit descriptions or story
                sections.
              </p>
            </MotionSection>

            <MotionSection className="liquid-panel rounded-3xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-5">
                <Edit2 className="h-5 w-5 text-app-accent" />
                <h2 className="text-xl font-semibold text-app-text">
                  Inline editing
                </h2>
              </div>
              <p className="text-app-muted mb-5">
                Hover over any album description or story section to reveal the
                edit pencil. Changes are saved to Firestore and override the
                default text for all visitors.
              </p>
              <div className="space-y-2">
                {albums.map((album) => (
                  <Link
                    key={album.slug}
                    href={`/albums/${album.slug}`}
                    className="flex items-center justify-between rounded-2xl border border-app-border px-4 py-3 hover:bg-app-warm transition-colors"
                  >
                    <span className="font-semibold text-app-text">{album.title}</span>
                    <span className="text-xs text-app-subtle">{album.date}</span>
                  </Link>
                ))}
              </div>
            </MotionSection>

            <MotionSection className="liquid-panel rounded-3xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-5">
                <MessageCircle className="h-5 w-5 text-app-accent" />
                <h2 className="text-xl font-semibold text-app-text">
                  Comments
                </h2>
              </div>
              <p className="text-app-muted">
                Comments appear at the bottom of every album page. As admin, you
                can delete any comment by clicking the trash icon next to it.
                Family members can only delete their own comments.
              </p>
            </MotionSection>
          </div>
        </main>
      </AdminGuard>
    </ProtectedRoute>
  );
}
