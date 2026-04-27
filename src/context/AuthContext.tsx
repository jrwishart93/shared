"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  createUserWithEmailAndPassword,
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged,
  OAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db, isFirebaseConfigured } from "@/lib/firebase";

type UserProfile = {
  name: string;
  email: string;
  approved: boolean;
  role: "member" | "admin";
};

type AuthContextValue = {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  authError: string | null;
  firebaseReady: boolean;
  clearAuthError: () => void;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithApple: () => Promise<void>;
  signupWithGoogle: () => Promise<void>;
  signupWithApple: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const authorizedDomainHints = [
  "localhost",
  "shared-xi-seven.vercel.app",
  "shared-james-projects-bf21025b.vercel.app",
  "shared-jrwishart93-james-projects-bf21025b.vercel.app",
];
const REDIRECT_INTENT_KEY = "firebase-auth-redirect-intent";
const REDIRECT_ERROR_KEY = "firebase-auth-redirect-error";

function requireFirebase() {
  if (!auth || !db) {
    throw new Error(
      "Firebase is not configured. Add NEXT_PUBLIC_FIREBASE_* values to .env.local.",
    );
  }

  return { auth, db };
}

function getNameFromUser(user: User) {
  return user.displayName ?? user.email?.split("@")[0] ?? "Family member";
}

async function writeMemberProfile(user: User, name = getNameFromUser(user)) {
  const firebase = requireFirebase();
  const profile: UserProfile = {
    name,
    email: user.email ?? "",
    approved: true,
    role: "member",
  };

  await setDoc(doc(firebase.db, "users", user.uid), {
    ...profile,
    createdAt: serverTimestamp(),
  });

  return profile;
}

async function requireServerVerification() {
  const response = await fetch("/api/family-verification", {
    method: "GET",
    credentials: "same-origin",
  });

  if (!response.ok) {
    throw new Error("Unable to verify family access right now.");
  }

  const result = (await response.json()) as { verified?: boolean };

  if (!result.verified) {
    throw new Error(
      "Please answer the family questions before creating an account.",
    );
  }
}

async function clearServerVerification() {
  await fetch("/api/family-verification", {
    method: "DELETE",
    credentials: "same-origin",
  });
}

function mapAuthError(error: unknown) {
  if (
    error &&
    typeof error === "object" &&
    "code" in error &&
    typeof error.code === "string"
  ) {
    if (error.code === "auth/unauthorized-domain") {
      return new Error(
        `This site domain is not yet authorised in Firebase Auth. Add these domains in Firebase Console -> Authentication -> Settings -> Authorised domains: ${authorizedDomainHints.join(", ")}.`,
      );
    }

    if (error.code === "auth/popup-blocked") {
      return new Error(
        "The sign-in popup was blocked by the browser. Allow popups for this site and try again.",
      );
    }

    if (error.code === "auth/popup-closed-by-user") {
      return new Error("The sign-in popup was closed before completion.");
    }

    if (error.code === "auth/operation-not-allowed") {
      return new Error(
        "This Apple sign-in attempt could not start. Check that Apple is enabled in Firebase Authentication and that the Firebase auth handler URL is configured on the Apple provider.",
      );
    }
  }

  return error instanceof Error ? error : new Error("Authentication failed.");
}

function prefersRedirectFlow(provider: "apple" | "google") {
  if (typeof window === "undefined") {
    return false;
  }

  if (provider === "google") {
    return false;
  }

  const userAgent = window.navigator.userAgent;
  return /iPhone|iPad|iPod|Android|Mobile|CriOS|FxiOS/i.test(userAgent);
}

function setRedirectIntent(intent: "login:apple" | "signup:apple") {
  if (typeof window !== "undefined") {
    window.sessionStorage.setItem(REDIRECT_INTENT_KEY, intent);
    window.sessionStorage.removeItem(REDIRECT_ERROR_KEY);
  }
}

function getRedirectIntent() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.sessionStorage.getItem(REDIRECT_INTENT_KEY);
}

function clearRedirectIntent() {
  if (typeof window !== "undefined") {
    window.sessionStorage.removeItem(REDIRECT_INTENT_KEY);
  }
}

function setRedirectError(message: string) {
  if (typeof window !== "undefined") {
    window.sessionStorage.setItem(REDIRECT_ERROR_KEY, message);
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [loading, setLoading] = useState(isFirebaseConfigured);

  useEffect(() => {
    if (!auth || !db) {
      return;
    }

    const activeDb = db;

    void (async () => {
      try {
        const redirectResult = await getRedirectResult(auth);

        if (!redirectResult?.user) {
          return;
        }

        const redirectIntent = getRedirectIntent();

        if (!redirectIntent) {
          return;
        }

        const profileRef = doc(activeDb, "users", redirectResult.user.uid);
        const profileSnap = await getDoc(profileRef);

        if (redirectIntent === "signup:apple") {
          const profile = profileSnap.exists()
            ? (profileSnap.data() as UserProfile)
            : await writeMemberProfile(redirectResult.user);
          setUserProfile(profile);
          setAuthError(null);
          await clearServerVerification();
          clearRedirectIntent();
          return;
        }

        if (!profileSnap.exists()) {
          await signOut(auth);
          const message =
            "Please create a family account first by answering the family questions.";
          setAuthError(message);
          setRedirectError(message);
          clearRedirectIntent();
          return;
        }

        setUserProfile(profileSnap.data() as UserProfile);
        setAuthError(null);
        clearRedirectIntent();
      } catch (error) {
        const mappedError = mapAuthError(error);
        setAuthError(mappedError.message);
        setRedirectError(mappedError.message);
        clearRedirectIntent();
      }
    })();

    return onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (!user) {
        setUserProfile(null);
        setLoading(false);
        return;
      }

      const profileRef = doc(activeDb, "users", user.uid);
      const profileSnap = await getDoc(profileRef);
      setUserProfile(
        profileSnap.exists() ? (profileSnap.data() as UserProfile) : null,
      );
      setLoading(false);
    });
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      currentUser,
      userProfile,
      loading,
      authError,
      firebaseReady: isFirebaseConfigured,
      clearAuthError() {
        setAuthError(null);
      },
      async login(email, password) {
        const firebase = requireFirebase();
        try {
          await signInWithEmailAndPassword(firebase.auth, email, password);
        } catch (error) {
          throw mapAuthError(error);
        }
      },
      async signup(name, email, password) {
        const firebase = requireFirebase();
        try {
          await requireServerVerification();
          const credential = await createUserWithEmailAndPassword(
            firebase.auth,
            email,
            password,
          );

          await updateProfile(credential.user, { displayName: name });
          const profile = await writeMemberProfile(credential.user, name);
          setUserProfile(profile);
          await clearServerVerification();
        } catch (error) {
          throw mapAuthError(error);
        }
      },
      async loginWithGoogle() {
        const firebase = requireFirebase();
        try {
          const provider = new GoogleAuthProvider();
          provider.addScope("email");
          provider.addScope("profile");
          const credential = await signInWithPopup(firebase.auth, provider);
          const profileSnap = await getDoc(
            doc(firebase.db, "users", credential.user.uid),
          );

          if (!profileSnap.exists()) {
            await signOut(firebase.auth);
            throw new Error(
              "Please create a family account first by answering the family questions.",
            );
          }

          setUserProfile(profileSnap.data() as UserProfile);
        } catch (error) {
          throw mapAuthError(error);
        }
      },
      async loginWithApple() {
        const firebase = requireFirebase();
        try {
          const provider = new OAuthProvider("apple.com");
          provider.addScope("email");
          provider.addScope("name");
          if (prefersRedirectFlow("apple")) {
            setRedirectIntent("login:apple");
            await signInWithRedirect(firebase.auth, provider);
            return;
          }

          const credential = await signInWithPopup(firebase.auth, provider);
          const profileSnap = await getDoc(
            doc(firebase.db, "users", credential.user.uid),
          );

          if (!profileSnap.exists()) {
            await signOut(firebase.auth);
            throw new Error(
              "Please create a family account first by answering the family questions.",
            );
          }

          setUserProfile(profileSnap.data() as UserProfile);
        } catch (error) {
          throw mapAuthError(error);
        }
      },
      async signupWithGoogle() {
        const firebase = requireFirebase();
        try {
          await requireServerVerification();
          const provider = new GoogleAuthProvider();
          provider.addScope("email");
          provider.addScope("profile");
          const credential = await signInWithPopup(firebase.auth, provider);
          const profile = await writeMemberProfile(credential.user);
          setUserProfile(profile);
          await clearServerVerification();
        } catch (error) {
          throw mapAuthError(error);
        }
      },
      async signupWithApple() {
        const firebase = requireFirebase();
        try {
          await requireServerVerification();
          const provider = new OAuthProvider("apple.com");
          provider.addScope("email");
          provider.addScope("name");
          if (prefersRedirectFlow("apple")) {
            setRedirectIntent("signup:apple");
            await signInWithRedirect(firebase.auth, provider);
            return;
          }

          const credential = await signInWithPopup(firebase.auth, provider);
          const profile = await writeMemberProfile(credential.user);
          setUserProfile(profile);
          await clearServerVerification();
        } catch (error) {
          throw mapAuthError(error);
        }
      },
      async logout() {
        const firebase = requireFirebase();
        await signOut(firebase.auth);
      },
    }),
    [authError, currentUser, loading, userProfile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
