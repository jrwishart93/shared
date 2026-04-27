"use client";

import { useEffect, useRef, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Check, Edit2, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { MotionSection } from "@/components/MotionSection";

type Props = {
  albumSlug: string;
  sectionId: string;
  defaultTitle: string;
  defaultParagraphs: string[];
  className?: string;
};

export function EditableStorySection({
  albumSlug,
  sectionId,
  defaultTitle,
  defaultParagraphs,
  className,
}: Props) {
  const { userProfile } = useAuth();
  const isAdmin = userProfile?.role === "admin";

  const [paragraphs, setParagraphs] = useState<string[]>(defaultParagraphs);
  const [editing, setEditing] = useState(false);
  const [draftText, setDraftText] = useState(defaultParagraphs.join("\n\n"));
  const [saving, setSaving] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!db) return;
    void getDoc(doc(db, "albumEdits", albumSlug)).then((snap) => {
      if (!snap.exists()) return;
      const data = snap.data() as {
        storySections?: Record<string, { paragraphs: string[] }>;
      };
      const saved = data.storySections?.[sectionId];
      if (saved?.paragraphs) {
        setParagraphs(saved.paragraphs);
        setDraftText(saved.paragraphs.join("\n\n"));
      }
    });
  }, [albumSlug, sectionId]);

  function startEdit() {
    setDraftText(paragraphs.join("\n\n"));
    setEditing(true);
    setTimeout(() => textareaRef.current?.focus(), 0);
  }

  function cancelEdit() {
    setEditing(false);
    setDraftText(paragraphs.join("\n\n"));
  }

  async function saveEdit() {
    if (!db) return;
    setSaving(true);
    const newParagraphs = draftText
      .split(/\n\n+/)
      .map((p) => p.trim())
      .filter(Boolean);
    try {
      await setDoc(
        doc(db, "albumEdits", albumSlug),
        { storySections: { [sectionId]: { paragraphs: newParagraphs } } },
        { merge: true },
      );
      setParagraphs(newParagraphs);
      setEditing(false);
    } finally {
      setSaving(false);
    }
  }

  return (
    <MotionSection className={`liquid-panel rounded-3xl p-5 sm:p-8 ${className ?? ""}`}>
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-2xl font-semibold text-app-text">{defaultTitle}</h2>
        {isAdmin && !editing && (
          <button
            onClick={startEdit}
            title="Edit section"
            className="flex-none mt-0.5 p-1.5 rounded-full hover:bg-app-warm text-app-subtle hover:text-app-warm-text transition-colors"
          >
            <Edit2 className="h-4 w-4" />
          </button>
        )}
      </div>

      {editing ? (
        <div className="mt-4">
          <p className="text-xs text-app-subtle mb-2">
            Separate paragraphs with a blank line.
          </p>
          <textarea
            ref={textareaRef}
            value={draftText}
            onChange={(e) => setDraftText(e.target.value)}
            rows={10}
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
      ) : (
        <div className="mt-4 space-y-4 text-base leading-7 text-app-muted md:text-lg md:leading-8">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      )}
    </MotionSection>
  );
}
