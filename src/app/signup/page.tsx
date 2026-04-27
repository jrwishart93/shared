"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Apple,
  ArrowRight,
  CheckCircle2,
  Globe2,
  ShieldQuestion,
  UserPlus,
} from "lucide-react";
import { MotionSection } from "@/components/MotionSection";
import { useAuth } from "@/context/AuthContext";

const questions = [
  {
    question: "Where did Jamie & Tin get married?",
    options: ["Barbados", "Antarctica", "Italy", "New Zealand", "Mongolia"],
    answer: "New Zealand",
  },
  {
    question: "Where did Tin grow up?",
    options: [
      "On a farm near Wyrallah",
      "In a high rise city apartment in Japan",
      "On a remote jungle island off the coast of Papua New Guinea",
      "Deep in the Amazon rainforest",
      "Hollywood Hills near Los Angeles",
    ],
    answer: "On a farm near Wyrallah",
  },
  {
    question: "How many children do Tin & Jamie have?",
    options: ["6", "4", "2", "None"],
    answer: "2",
  },
];

function shuffleItems<T>(items: T[]) {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [
      shuffled[swapIndex],
      shuffled[index],
    ];
  }

  return shuffled;
}

export default function SignupPage() {
  const router = useRouter();
  const { signup, signupWithApple, signupWithGoogle, firebaseReady } = useAuth();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [verified, setVerified] = useState(false);
  const [gateError, setGateError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [displayQuestions, setDisplayQuestions] = useState<typeof questions>(
    [],
  );

  useEffect(() => {
    const shuffleTimer = window.setTimeout(() => {
      setDisplayQuestions(
        shuffleItems(questions).map((question) => ({
          ...question,
          options: shuffleItems(question.options),
        })),
      );
    }, 0);

    return () => window.clearTimeout(shuffleTimer);
  }, []);

  const allAnswered = useMemo(
    () => questions.every((question) => Boolean(answers[question.question])),
    [answers],
  );

  function checkAnswers() {
    const passed = questions.every(
      (question) => answers[question.question] === question.answer,
    );

    if (!passed) {
      setGateError("One or more answers did not match. Please try again.");
      return;
    }

    setGateError("");
    setVerified(true);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await signup(form.name, form.email, form.password);
      router.push("/albums");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create account.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSocialSignup(provider: "apple" | "google") {
    setError("");
    setSubmitting(true);

    try {
      if (provider === "apple") {
        await signupWithApple();
      } else {
        await signupWithGoogle();
      }

      router.push("/albums");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to create account.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-[calc(100vh-73px)] bg-app-bg px-5 py-10 sm:px-8">
      <MotionSection className="liquid-panel mx-auto max-w-3xl rounded-3xl p-6 sm:p-8">
        <div className="mb-8">
          <div className="liquid-button mb-4 grid h-12 w-12 place-items-center rounded-full">
            {verified ? (
              <CheckCircle2 className="h-6 w-6" />
            ) : (
              <ShieldQuestion className="h-6 w-6" />
            )}
          </div>
          <h1 className="text-3xl font-semibold text-app-text">
            Create family account
          </h1>
          <p className="mt-2 leading-7 text-app-muted">
            Answer the family questions first. This is a simple privacy gate
            before account creation.
          </p>
          <p className="mt-3 rounded-2xl bg-app-warm p-4 text-sm leading-6 text-app-warm-text">
            Security note: these answers are checked in the browser for version
            one. A later version should move this check to a server action or
            API route.
          </p>
        </div>

        {!verified ? (
          <div className="space-y-6">
            {displayQuestions.map((question, index) => (
              <fieldset key={question.question}>
                <legend className="text-lg font-semibold text-app-text">
                  {question.question}
                </legend>
                <div className="mt-3 grid gap-3">
                  {question.options.map((option) => (
                    <label
                      key={option}
                      className="liquid-glass flex cursor-pointer items-center gap-3 rounded-2xl p-4 transition hover:-translate-y-0.5"
                    >
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={option}
                        checked={answers[question.question] === option}
                        onChange={() =>
                          setAnswers((current) => ({
                            ...current,
                            [question.question]: option,
                          }))
                        }
                        className="h-5 w-5 accent-app-accent"
                      />
                      <span className="text-app-muted">{option}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
            {gateError ? <p className="text-sm text-red-700">{gateError}</p> : null}
            <button
              type="button"
              onClick={checkAnswers}
              disabled={!allAnswered}
              className="liquid-button inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 font-semibold transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <ArrowRight className="h-5 w-5" />
              Continue to account creation
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {!firebaseReady ? (
              <div className="rounded-2xl bg-app-warm p-4 text-sm text-app-warm-text">
                Firebase env vars are not configured yet.
              </div>
            ) : null}

            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => handleSocialSignup("google")}
                disabled={submitting || !firebaseReady}
                className="liquid-glass inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 font-semibold text-app-text transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Globe2 className="h-5 w-5" />
                Continue with Google
              </button>
              <button
                type="button"
                onClick={() => handleSocialSignup("apple")}
                disabled={submitting || !firebaseReady}
                className="liquid-glass inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 font-semibold text-app-text transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Apple className="h-5 w-5" />
                Continue with Apple
              </button>
            </div>

            <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-app-subtle">
              <span className="h-px flex-1 bg-app-border" />
              Or use email
              <span className="h-px flex-1 bg-app-border" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block">
                <span className="text-sm font-semibold text-app-muted">
                  Name
                </span>
                <input
                  value={form.name}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                  required
                  className="mt-2 w-full rounded-2xl border border-app-border bg-app-card-strong px-4 py-3 outline-none transition focus:border-app-accent focus:ring-4 focus:ring-app-accent/15"
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-app-muted">
                  Email
                </span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      email: event.target.value,
                    }))
                  }
                  required
                  className="mt-2 w-full rounded-2xl border border-app-border bg-app-card-strong px-4 py-3 outline-none transition focus:border-app-accent focus:ring-4 focus:ring-app-accent/15"
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-app-muted">
                  Password
                </span>
                <input
                  type="password"
                  value={form.password}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      password: event.target.value,
                    }))
                  }
                  minLength={6}
                  required
                  className="mt-2 w-full rounded-2xl border border-app-border bg-app-card-strong px-4 py-3 outline-none transition focus:border-app-accent focus:ring-4 focus:ring-app-accent/15"
                />
              </label>
              {error ? <p className="text-sm text-red-700">{error}</p> : null}
              <button
                type="submit"
                disabled={submitting || !firebaseReady}
                className="liquid-button inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 font-semibold transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <UserPlus className="h-5 w-5" />
                {submitting ? "Creating account..." : "Create account"}
              </button>
            </form>
          </div>
        )}
      </MotionSection>
    </main>
  );
}
