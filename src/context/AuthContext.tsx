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
  onAuthStateChanged,
  signInWithEmailAndPassword,
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
        await setDoc(doc(firebase.db, "users", credential.user.uid), {
          name,
          email,
          createdAt: serverTimestamp(),
          approved: true,
          role: "member",
        });
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
