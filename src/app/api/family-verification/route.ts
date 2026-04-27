import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { familyQuestions } from "@/lib/familyQuestions";

const COOKIE_NAME = "family_signup_verified";
const COOKIE_TTL_SECONDS = 60 * 30;

const answersByQuestion = new Map<string, string>([
  ["Where did Jamie & Tin get married?", "New Zealand"],
  ["Where did Tin grow up?", "On a farm near Wyrallah"],
  ["How many children do Tin & Jamie have?", "2"],
]);

function getVerificationSecret() {
  const secret =
    process.env.FAMILY_VERIFICATION_SECRET ??
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID ??
    "online-family-album-verification";

  return secret;
}

function createVerificationValue(expiresAt: number) {
  const payload = `verified:${expiresAt}`;
  const signature = createHmac("sha256", getVerificationSecret())
    .update(payload)
    .digest("hex");

  return `${payload}.${signature}`;
}

function isVerificationCookieValid(value?: string) {
  if (!value) {
    return false;
  }

  const [payload, signature] = value.split(".");

  if (!payload || !signature) {
    return false;
  }

  const expectedSignature = createHmac("sha256", getVerificationSecret())
    .update(payload)
    .digest("hex");

  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (signatureBuffer.length !== expectedBuffer.length) {
    return false;
  }

  if (!timingSafeEqual(signatureBuffer, expectedBuffer)) {
    return false;
  }

  const [, expiresAtValue] = payload.split(":");
  const expiresAt = Number(expiresAtValue);

  return Number.isFinite(expiresAt) && Date.now() < expiresAt;
}

export async function GET() {
  const cookieStore = await cookies();
  const verified = isVerificationCookieValid(
    cookieStore.get(COOKIE_NAME)?.value,
  );

  return NextResponse.json({ verified });
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    answers?: Record<string, string>;
  };
  const submittedAnswers = body.answers ?? {};

  const passed = familyQuestions.every(
    (question) =>
      submittedAnswers[question.question] ===
      answersByQuestion.get(question.question),
  );

  if (!passed) {
    return NextResponse.json(
      { verified: false, error: "One or more answers did not match." },
      { status: 400 },
    );
  }

  const expiresAt = Date.now() + COOKIE_TTL_SECONDS * 1000;
  const response = NextResponse.json({ verified: true });

  response.cookies.set({
    name: COOKIE_NAME,
    value: createVerificationValue(expiresAt),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: COOKIE_TTL_SECONDS,
  });

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ verified: false });
  response.cookies.set({
    name: COOKIE_NAME,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return response;
}
