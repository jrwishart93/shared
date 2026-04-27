"use client";

import { useEffect, useRef, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Edit2, X, Check } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";

type Props = {
  albumSlug: string;
  defaultDescription: string;
};

export function AdminEditableDescription({ albumSlug, defaultDescription }: Props) {
  const { userProfile } = useAuth();
  const isAdmin = userProfile?.role === "admin";

  const [displayText, setDisplayText] = useState(defaultDescription);
  const [editing, setEditing] = useState(false);
  const [draftText, setDraftText] = useState(defaultDescription);
  const [saving, setSaving] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!db || !isAdmin) return;
    void getDoc(doc(db, "albumEdits", albumSlug)).then((snap) => {
      if (snap.exists()) {
        const data = snap.data() as { description?: string };
        if (data.description) {
          setDisplayText(data.description);
          setDraftText(data.description);
        }
      }
    });
  }, [albumSlug, isAdmin]);

  function startEdit() {
    setDraftText(displayText);
    setEditing(true);
    setTimeout(() => textareaRef.current?.focus(), 0);
  }

  function cancelEdit() {
    setEditing(false);
    setDraftText(displayText);
  }

  async function saveEdit() {
    if (!db) return;
    setSaving(true);
    try {
      await setDoc(
        doc(db, "albumEdits", albumSlug),
        { description: draftText },
        { merge: true },
      );
      setDisplayText(draftText);
      setEditing(false);
    } finally {
      setSaving(false);
    }
  }

  const textClass =
    "mt-6 max-w-3xl text-base leading-7 text-app-muted md:text-lg md:leading-8";

  if (!isAdmin) {
    return <p className={textClass}>{displayText}</p>;
  }

  if (editing) {
    return (
      <div className="mt-6 max-w-3xl">
        <textarea
          ref={textareaRef}
          value={draftText}
          onChange={(e) => setDraftText(e.target.value)}
          rows={6}
          className="w-full rounded-xl border border-app-border bg-app-card px-3 py-2 text-base leading-7 text-app-text focus:outline-none focus:ring-2 focus:ring-app-accent resize-y"
        />
        <div className="mt-2 flex gap-2">
          <button
            onClick={saveEdit}
            disabled={saving}
            className="liquid-button inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold disabled:opacity-50"
          >
            <Check className="h-4 w-4" />
            Save
          </button>
          <button
            onClick={cancelEdit}
            className="inline-flex items-center gap-1.5 rounded-full border border-app-border px-4 py-2 text-sm font-semibold text-app-muted hover:bg-app-warm transition-colors"
          >
            <X className="h-4 w-4" />
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative mt-6 max-w-3xl">
      <p className={textClass}>{displayText}</p>
      <button
        onClick={startEdit}
        title="Edit description"
        className="absolute -right-8 top-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-app-warm text-app-subtle hover:text-app-warm-text"
      >
        <Edit2 className="h-4 w-4" />
      </button>
    </div>
  );
}
