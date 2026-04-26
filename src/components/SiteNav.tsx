"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Album, Home, LogIn, LogOut, UserPlus, UserRound } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export function SiteNav() {
  const router = useRouter();
  const pathname = usePathname();
  const { currentUser, userProfile, logout } = useAuth();

  async function handleLogout() {
    await logout();
    router.push("/");
  }

  const navLinkClass = (href: string) => {
    const isActive =
      href === "/" ? pathname === href : pathname.startsWith(href);

    return `inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
      isActive
        ? "bg-app-card text-app-text"
        : "text-app-muted hover:bg-app-card hover:text-app-text"
    }`;
  };

  const mobileTabClass = (href: string) => {
    const isActive =
      href === "/" ? pathname === href : pathname.startsWith(href);

    return `flex min-h-14 flex-1 flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-semibold transition ${
      isActive
        ? "bg-app-card text-app-text shadow-sm"
        : "text-app-muted hover:bg-app-card hover:text-app-text"
    }`;
  };

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-app-border bg-app-glass backdrop-blur-2xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-8 sm:py-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="group relative grid h-14 w-14 place-items-center sm:h-20 sm:w-20">
              <span className="absolute inset-2 rounded-full bg-app-accent/20 blur-xl transition duration-500 group-hover:scale-125 group-hover:bg-app-accent/30" />
              <Image
                src="/images/albums/logo-image/family-adventures-logo.png"
                alt="Online Family Album logo"
                width={80}
                height={80}
                priority
                className="animated-logo relative h-full w-full object-contain drop-shadow-xl transition duration-500 group-hover:scale-110 group-hover:rotate-3"
              />
            </span>
            <span className="block">
              <span className="block text-sm font-semibold leading-5 text-app-text sm:text-base">
                Online Family Album
              </span>
              <span className="block text-[11px] font-medium text-app-subtle sm:text-xs">
                Private family memories
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-2 sm:flex">
            <Link href="/" className={navLinkClass("/")}>
              <Home className="h-4 w-4" />
              Welcome
            </Link>

            {currentUser ? (
              <>
                <Link href="/albums" className={navLinkClass("/albums")}>
                  <Album className="h-4 w-4" />
                  Family albums
                </Link>
                <Link href="/profile" className={navLinkClass("/profile")}>
                  <UserRound className="h-4 w-4" />
                  My profile
                </Link>
                {userProfile?.role === "admin" ? (
                  <Link href="/admin" className={navLinkClass("/admin")}>
                    Manage
                  </Link>
                ) : null}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 rounded-full bg-app-text px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 dark:text-black"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign out</span>
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className={navLinkClass("/login")}>
                  <LogIn className="h-4 w-4" />
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 rounded-full border border-app-border bg-app-card/45 px-4 py-2 text-sm font-semibold text-app-muted shadow-sm backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-app-card hover:text-app-text"
                >
                  <UserPlus className="h-4 w-4" />
                  Request access
                </Link>
              </>
            )}
          </div>

          {currentUser ? (
            <button
              type="button"
              onClick={handleLogout}
              className="grid h-11 w-11 place-items-center rounded-full bg-app-card text-app-muted shadow-sm sm:hidden"
              aria-label="Sign out"
            >
              <LogOut className="h-5 w-5" />
            </button>
          ) : null}
        </nav>
      </header>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-app-border bg-app-glass px-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-2 backdrop-blur-2xl sm:hidden">
        <div className="mx-auto flex max-w-md gap-2 rounded-[1.75rem] border border-app-border bg-app-card/55 p-2 shadow-2xl shadow-black/10">
          <Link href="/" className={mobileTabClass("/")}>
            <Home className="h-5 w-5" />
            Home
          </Link>
          {currentUser ? (
            <>
              <Link href="/albums" className={mobileTabClass("/albums")}>
                <Album className="h-5 w-5" />
                Albums
              </Link>
              <Link href="/profile" className={mobileTabClass("/profile")}>
                <UserRound className="h-5 w-5" />
                Profile
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className={mobileTabClass("/login")}>
                <LogIn className="h-5 w-5" />
                Sign in
              </Link>
              <Link href="/signup" className={mobileTabClass("/signup")}>
                <UserPlus className="h-5 w-5" />
                Access
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
}
