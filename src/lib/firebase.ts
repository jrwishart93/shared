import { getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "shared-e617d.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "shared-e617d",
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ??
    "shared-e617d.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
    firebaseConfig.projectId &&
    firebaseConfig.appId &&
    firebaseConfig.messagingSenderId,
);

function getFirebaseApp(): FirebaseApp {
  if (!isFirebaseConfigured) {
    throw new Error(
      "Firebase is not configured. Add NEXT_PUBLIC_FIREBASE_* values to .env.local.",
    );
  }

  return getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
}

export const auth = isFirebaseConfigured ? getAuth(getFirebaseApp()) : null;
export const db = isFirebaseConfigured ? getFirestore(getFirebaseApp()) : null;

let analyticsPromise: Promise<Analytics | null> | null = null;

export function getClientAnalytics() {
  if (!isFirebaseConfigured || typeof window === "undefined") {
    return Promise.resolve(null);
  }

  analyticsPromise ??= isSupported().then((supported) =>
    supported ? getAnalytics(getFirebaseApp()) : null,
  );

  return analyticsPromise;
}
