"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Album, Home, LogIn, LogOut, UserPlus, UserRound } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export function SiteNav() {
  const router = useRouter();
  const { currentUser, userProfile, logout } = useAuth();

  async function handleLogout() {
    await logout();
    router.push("/");
  }

  return (
    <header className="sticky top-0 z-30 border-b border-app-border bg-app-glass backdrop-blur-2xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="liquid-button grid h-10 w-10 place-items-center rounded-full shadow-sm">
            <Album className="h-5 w-5" />
          </span>
          <span className="font-semibold text-app-text">
            Online Family Album
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-app-muted transition hover:bg-app-card sm:inline-flex"
          >
            <Home className="h-4 w-4" />
            Home
          </Link>

          {currentUser ? (
            <>
              <Link
                href="/albums"
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-app-muted transition hover:bg-app-card"
              >
                <Album className="h-4 w-4" />
                Albums
              </Link>
              <Link
                href="/profile"
                className="hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-app-muted transition hover:bg-app-card sm:inline-flex"
              >
                <UserRound className="h-4 w-4" />
                Profile
              </Link>
              {userProfile?.role === "admin" ? (
                <Link
                  href="/admin"
                  className="hidden rounded-full px-4 py-2 text-sm font-medium text-app-muted transition hover:bg-app-card sm:inline-flex"
                >
                  Admin
                </Link>
              ) : null}
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-full bg-app-text px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 dark:text-black"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sign out</span>
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-app-muted transition hover:bg-app-card"
              >
                <LogIn className="h-4 w-4" />
                Sign in
              </Link>
              <Link
                href="/signup"
                className="liquid-button inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5"
              >
                <UserPlus className="h-4 w-4" />
                Create account
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
