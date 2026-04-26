import { LockKeyhole } from "lucide-react";
import { MotionSection } from "@/components/MotionSection";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function AdminPage() {
  return (
    <ProtectedRoute>
      <main className="min-h-[calc(100vh-73px)] bg-app-bg px-5 py-10 sm:px-8">
        <MotionSection className="liquid-panel mx-auto max-w-3xl rounded-3xl p-6 sm:p-8">
          <div className="liquid-button mb-5 grid h-14 w-14 place-items-center rounded-full">
            <LockKeyhole className="h-7 w-7" />
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-app-warm-text">
            Future admin
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-app-text">
            Admin tools
          </h1>
          <p className="mt-4 text-lg leading-8 text-app-muted">
            This page is reserved for Jamie to manage albums and users in a
            future version. Version one keeps albums in local structured data so
            they can move into Firestore later.
          </p>
        </MotionSection>
      </main>
    </ProtectedRoute>
  );
}
