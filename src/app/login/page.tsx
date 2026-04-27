"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useCallback, useEffect, useState } from "react";
import { Apple, Globe2, LogIn } from "lucide-react";
import { MotionSection } from "@/components/MotionSection";
import { WelcomeAnimation } from "@/components/WelcomeAnimation";
import { useAuth } from "@/context/AuthContext";

const WELCOME_DELAY_MS = 1300;

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    authError,
    clearAuthError,
    currentUser,
    firebaseReady,
    loading,
    login,
    loginWithApple,
    loginWithGoogle,
    userProfile,
  } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(() => {
    if (typeof window === "undefined") {
      return "";
    }

    const redirectError = window.sessionStorage.getItem(
      "firebase-auth-redirect-error",
    );

    if (redirectError) {
      window.sessionStorage.removeItem("firebase-auth-redirect-error");
    }

    return redirectError ?? "";
  });
  const [submitting, setSubmitting] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const visibleError = error || authError;

  const routeAfterWelcome = useCallback((destination: string) => {
    setShowWelcome(true);
    window.setTimeout(() => {
      router.replace(destination);
    }, WELCOME_DELAY_MS);
  }, [router]);

  useEffect(() => {
    if (!loading && currentUser && userProfile) {
      const welcomeTimer = window.setTimeout(() => {
        routeAfterWelcome(searchParams.get("next") ?? "/albums");
      }, 0);

      return () => window.clearTimeout(welcomeTimer);
    }
  }, [currentUser, loading, routeAfterWelcome, searchParams, userProfile]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    clearAuthError();
      setError("");
      setSubmitting(true);

    try {
      await login(email, password);
      routeAfterWelcome(searchParams.get("next") ?? "/albums");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSocialLogin(provider: "apple" | "google") {
    clearAuthError();
    setError("");
    setSubmitting(true);

    try {
      if (provider === "apple") {
        await loginWithApple();
      } else {
        await loginWithGoogle();
      }

      routeAfterWelcome(searchParams.get("next") ?? "/albums");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="grid min-h-[calc(100vh-73px)] place-items-center bg-app-bg px-5 py-12">
      {showWelcome ? <WelcomeAnimation /> : null}
      <MotionSection className="liquid-panel w-full max-w-md rounded-3xl p-6 sm:p-8">
        <div className="mb-6">
          <div className="liquid-button mb-4 grid h-12 w-12 place-items-center rounded-full">
            <LogIn className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-semibold text-app-text">Sign in</h1>
          <p className="mt-2 text-app-muted">
            Sign in with your family account to view private albums.
          </p>
        </div>

        {!firebaseReady ? (
          <div className="mb-5 rounded-2xl bg-app-warm p-4 text-sm text-app-warm-text">
            Firebase env vars are not configured yet.
          </div>
        ) : null}

        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => handleSocialLogin("google")}
            disabled={submitting || !firebaseReady}
            className="liquid-glass inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 font-semibold text-app-text transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Globe2 className="h-5 w-5" />
            Google
          </button>
          <button
            type="button"
            onClick={() => handleSocialLogin("apple")}
            disabled={submitting || !firebaseReady}
            className="liquid-glass inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 font-semibold text-app-text transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Apple className="h-5 w-5" />
            Apple
          </button>
        </div>

        <div className="my-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-app-subtle">
          <span className="h-px flex-1 bg-app-border" />
          Or use email
          <span className="h-px flex-1 bg-app-border" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm font-semibold text-app-muted">Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="mt-2 w-full rounded-2xl border border-app-border bg-app-card-strong px-4 py-3 text-app-text outline-none transition focus:border-app-accent focus:ring-4 focus:ring-app-accent/15"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-app-muted">
              Password
            </span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="mt-2 w-full rounded-2xl border border-app-border bg-app-card-strong px-4 py-3 text-app-text outline-none transition focus:border-app-accent focus:ring-4 focus:ring-app-accent/15"
            />
          </label>
          {visibleError ? (
            <p className="text-sm text-red-700">{visibleError}</p>
          ) : null}
          <button
            type="submit"
            disabled={submitting || !firebaseReady}
            className="liquid-button inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 font-semibold transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <LogIn className="h-5 w-5" />
            {submitting ? "Signing in..." : "Sign in to view albums"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-app-muted">
          Need an account?{" "}
          <Link href="/signup" className="font-semibold text-app-accent">
            Create family account
          </Link>
        </p>
      </MotionSection>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="grid min-h-[calc(100vh-73px)] place-items-center bg-app-bg px-5 py-12">
          <div className="liquid-glass rounded-3xl px-6 py-5 text-app-muted">
            Loading sign in...
          </div>
        </main>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
