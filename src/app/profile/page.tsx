"use client";

import { Mail, ShieldCheck, UserRound } from "lucide-react";
import { MotionSection } from "@/components/MotionSection";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const { currentUser, userProfile } = useAuth();

  return (
    <ProtectedRoute>
      <main className="min-h-[calc(100vh-73px)] bg-app-bg px-5 py-10 sm:px-8">
        <MotionSection className="liquid-panel mx-auto max-w-2xl rounded-3xl p-6 sm:p-8">
          <div className="liquid-button mb-6 grid h-14 w-14 place-items-center rounded-full">
            <UserRound className="h-7 w-7" />
          </div>
          <h1 className="text-3xl font-semibold text-app-text">Profile</h1>
          <div className="mt-8 space-y-4">
            <div className="liquid-glass rounded-2xl p-5">
              <p className="text-sm font-semibold text-app-warm-text">Name</p>
              <p className="mt-1 text-lg text-app-text">
                {userProfile?.name ?? currentUser?.displayName ?? "Family member"}
              </p>
            </div>
            <div className="liquid-glass rounded-2xl p-5">
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-app-warm-text">
                <Mail className="h-4 w-4" />
                Email
              </p>
              <p className="mt-1 text-lg text-app-text">
                {userProfile?.email ?? currentUser?.email}
              </p>
            </div>
            <div className="liquid-glass rounded-2xl p-5">
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-app-warm-text">
                <ShieldCheck className="h-4 w-4" />
                Approval status
              </p>
              <p className="mt-1 text-lg text-app-text">
                {userProfile?.approved ? "Approved family account" : "Pending"}
              </p>
            </div>
          </div>
        </MotionSection>
      </main>
    </ProtectedRoute>
  );
}
