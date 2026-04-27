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
  GoogleAuthProvider,
  onAuthStateChanged,
  OAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
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
  firebaseReady: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithApple: () => Promise<void>;
  signupWithGoogle: () => Promise<void>;
  signupWithApple: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(isFirebaseConfigured);

  useEffect(() => {
    if (!auth || !db) {
      return;
    }

    const activeDb = db;

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
      firebaseReady: isFirebaseConfigured,
      async login(email, password) {
        const firebase = requireFirebase();
        await signInWithEmailAndPassword(firebase.auth, email, password);
      },
      async signup(name, email, password) {
        const firebase = requireFirebase();
        const credential = await createUserWithEmailAndPassword(
          firebase.auth,
          email,
          password,
        );

        await updateProfile(credential.user, { displayName: name });
        const profile = await writeMemberProfile(credential.user, name);
        setUserProfile(profile);
      },
      async loginWithGoogle() {
        const firebase = requireFirebase();
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
      },
      async loginWithApple() {
        const firebase = requireFirebase();
        const provider = new OAuthProvider("apple.com");
        provider.addScope("email");
        provider.addScope("name");
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
      },
      async signupWithGoogle() {
        const firebase = requireFirebase();
        const provider = new GoogleAuthProvider();
        provider.addScope("email");
        provider.addScope("profile");
        const credential = await signInWithPopup(firebase.auth, provider);
        const profile = await writeMemberProfile(credential.user);
        setUserProfile(profile);
      },
      async signupWithApple() {
        const firebase = requireFirebase();
        const provider = new OAuthProvider("apple.com");
        provider.addScope("email");
        provider.addScope("name");
        const credential = await signInWithPopup(firebase.auth, provider);
        const profile = await writeMemberProfile(credential.user);
        setUserProfile(profile);
      },
      async logout() {
        const firebase = requireFirebase();
        await signOut(firebase.auth);
      },
    }),
    [currentUser, loading, userProfile],
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
