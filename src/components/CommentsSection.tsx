"use client";

import { useEffect, useRef, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
  type Timestamp,
} from "firebase/firestore";
import { MessageCircle, Reply, Send, Trash2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";

type Comment = {
  id: string;
  albumSlug: string;
  text: string;
  authorId: string;
  authorName: string;
  createdAt: Timestamp | null;
  parentId: string | null;
};

function formatRelativeTime(date: Date): string {
  const now = Date.now();
  const diff = now - date.getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
}

function CommentItem({
  comment,
  replies,
  currentUserId,
  isAdmin,
  onDelete,
  onReply,
}: {
  comment: Comment;
  replies: Comment[];
  currentUserId: string | undefined;
  isAdmin: boolean;
  onDelete: (id: string) => void;
  onReply: (parentId: string, text: string) => Promise<void>;
}) {
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const canDelete = isAdmin || currentUserId === comment.authorId;
  const timestamp = comment.createdAt?.toDate();

  function openReply() {
    setReplyOpen(true);
    setTimeout(() => textareaRef.current?.focus(), 0);
  }

  async function submitReply() {
    if (!replyText.trim()) return;
    setSubmitting(true);
    try {
      await onReply(comment.id, replyText.trim());
      setReplyText("");
      setReplyOpen(false);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="font-semibold text-sm text-app-text">
              {comment.authorName}
            </span>
            {timestamp && (
              <span className="text-xs text-app-subtle">
                {formatRelativeTime(timestamp)}
              </span>
            )}
          </div>
          <p className="mt-1 text-sm leading-6 text-app-muted whitespace-pre-wrap break-words">
            {comment.text}
          </p>
          <div className="mt-2 flex items-center gap-3">
            <button
              onClick={openReply}
              className="inline-flex items-center gap-1 text-xs text-app-subtle hover:text-app-accent transition-colors"
            >
              <Reply className="h-3.5 w-3.5" />
              Reply
            </button>
            {canDelete && (
              <button
                onClick={() => onDelete(comment.id)}
                className="inline-flex items-center gap-1 text-xs text-app-subtle hover:text-red-500 transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete
              </button>
            )}
          </div>
        </div>
      </div>

      {replyOpen && (
        <div className="mt-3 ml-4 pl-4 border-l-2 border-app-border">
          <textarea
            ref={textareaRef}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply…"
            rows={2}
            className="w-full rounded-xl border border-app-border bg-app-card px-3 py-2 text-sm text-app-text placeholder:text-app-subtle focus:outline-none focus:ring-2 focus:ring-app-accent resize-none"
          />
          <div className="mt-2 flex gap-2">
            <button
              onClick={submitReply}
              disabled={submitting || !replyText.trim()}
              className="liquid-button inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold disabled:opacity-50"
            >
              <Send className="h-3.5 w-3.5" />
              Reply
            </button>
            <button
              onClick={() => {
                setReplyOpen(false);
                setReplyText("");
              }}
              className="rounded-full border border-app-border px-4 py-1.5 text-sm font-semibold text-app-muted hover:bg-app-warm transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {replies.length > 0 && (
        <div className="mt-3 ml-4 pl-4 border-l-2 border-app-border space-y-4">
          {replies.map((reply) => (
            <div key={reply.id} className="flex items-start gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="font-semibold text-sm text-app-text">
                    {reply.authorName}
                  </span>
                  {reply.createdAt?.toDate() && (
                    <span className="text-xs text-app-subtle">
                      {formatRelativeTime(reply.createdAt.toDate())}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm leading-6 text-app-muted whitespace-pre-wrap break-words">
                  {reply.text}
                </p>
                {(isAdmin || currentUserId === reply.authorId) && (
                  <button
                    onClick={() => onDelete(reply.id)}
                    className="mt-2 inline-flex items-center gap-1 text-xs text-app-subtle hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function CommentsSection({ albumSlug }: { albumSlug: string }) {
  const { currentUser, userProfile } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newText, setNewText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const isAdmin = userProfile?.role === "admin";

  useEffect(() => {
    if (!db) return;

    const q = query(
      collection(db, "comments"),
      where("albumSlug", "==", albumSlug),
      orderBy("createdAt", "asc"),
    );

    return onSnapshot(q, (snap) => {
      setComments(
        snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Comment, "id">) })),
      );
    });
  }, [albumSlug]);

  const topLevel = comments.filter((c) => c.parentId === null);
  const repliesFor = (parentId: string) =>
    comments.filter((c) => c.parentId === parentId);

  async function postComment(text: string, parentId: string | null = null) {
    if (!db || !currentUser || !userProfile) return;
    await addDoc(collection(db, "comments"), {
      albumSlug,
      text,
      authorId: currentUser.uid,
      authorName: userProfile.name,
      createdAt: serverTimestamp(),
      parentId,
    });
  }

  async function deleteComment(id: string) {
    if (!db) return;
    await deleteDoc(doc(db, "comments", id));
    // Also delete any replies to this comment
    const childIds = comments
      .filter((c) => c.parentId === id)
      .map((c) => c.id);
    await Promise.all(childIds.map((cid) => deleteDoc(doc(db, "comments", cid))));
  }

  async function submitNewComment() {
    if (!newText.trim()) return;
    setSubmitting(true);
    try {
      await postComment(newText.trim());
      setNewText("");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="liquid-panel rounded-3xl p-5 sm:p-8">
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle className="h-5 w-5 text-app-accent" />
        <h2 className="text-lg font-semibold text-app-text">
          Comments
          {topLevel.length > 0 && (
            <span className="ml-2 text-sm font-normal text-app-subtle">
              ({topLevel.length})
            </span>
          )}
        </h2>
      </div>

      {topLevel.length === 0 ? (
        <p className="text-sm text-app-subtle mb-6">
          Be the first to leave a comment.
        </p>
      ) : (
        <div className="space-y-6 mb-8">
          {topLevel.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              replies={repliesFor(comment.id)}
              currentUserId={currentUser?.uid}
              isAdmin={isAdmin}
              onDelete={deleteComment}
              onReply={(parentId, text) => postComment(text, parentId)}
            />
          ))}
        </div>
      )}

      {currentUser ? (
        <div className="border-t border-app-border pt-6">
          <p className="text-sm font-semibold text-app-text mb-3">
            Leave a comment
          </p>
          <textarea
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="Share a memory or thought…"
            rows={3}
            className="w-full rounded-xl border border-app-border bg-app-card px-3 py-2 text-sm text-app-text placeholder:text-app-subtle focus:outline-none focus:ring-2 focus:ring-app-accent resize-none"
          />
          <div className="mt-3">
            <button
              onClick={submitNewComment}
              disabled={submitting || !newText.trim()}
              className="liquid-button inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
              Post comment
            </button>
          </div>
        </div>
      ) : (
        <div className="border-t border-app-border pt-6">
          <p className="text-sm text-app-subtle">
            <a href="/login" className="text-app-accent hover:underline font-semibold">
              Sign in
            </a>{" "}
            to leave a comment.
          </p>
        </div>
      )}
    </div>
  );
}
