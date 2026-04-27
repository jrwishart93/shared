"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { Lock, LogIn } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { currentUser, loading, firebaseReady } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && firebaseReady && !currentUser) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [currentUser, firebaseReady, loading, pathname, router]);

  if (loading) {
    return (
      <main className="grid min-h-[70vh] place-items-center bg-app-bg px-5">
        <div className="liquid-glass rounded-3xl px-6 py-5 text-app-muted">
          Loading family albums...
        </div>
      </main>
    );
  }

  if (!firebaseReady) {
    return (
      <main className="grid min-h-[70vh] place-items-center bg-app-bg px-5">
        <div className="liquid-panel max-w-xl rounded-3xl p-8 text-center">
          <Lock className="mx-auto h-10 w-10 text-app-warm-text" />
          <h1 className="mt-4 text-2xl font-semibold text-app-text">
            Firebase setup needed
          </h1>
          <p className="mt-3 text-app-muted">
            Add the public Firebase web config values to `.env.local` before
            signing in or creating accounts.
          </p>
        </div>
      </main>
    );
  }

  if (!currentUser) {
    return (
      <main className="grid min-h-[70vh] place-items-center bg-app-bg px-5">
        <div className="liquid-panel max-w-xl rounded-3xl p-8 text-center">
          <Lock className="mx-auto h-10 w-10 text-app-warm-text" />
          <h1 className="mt-4 text-2xl font-semibold text-app-text">
            Sign in required
          </h1>
          <p className="mt-3 text-app-muted">
            Full family albums are private for family and close friends.
          </p>
          <Link
            href="/login"
            className="liquid-button mt-6 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold"
          >
            <LogIn className="h-5 w-5" />
            Sign in
          </Link>
        </div>
      </main>
    );
  }

  return children;
}
