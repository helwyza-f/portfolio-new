import React, { useState, useRef, useEffect, useCallback, memo } from "react";
import commentsData from "../data/comments"; // Impor data komentar dari file yang di-hardcode
import {
  X,
  Loader2,
  Send,
  MessageCircle,
  AlertCircle,
  UserCircle2,
} from "lucide-react";

const Comment = ({ comment, formatDate }) => (
  <div className="flex items-start gap-4">
    <div className="flex-shrink-0">
      <UserCircle2 className="w-7 h-7 text-indigo-400" />
    </div>
    <div className="flex-grow min-w-0">
      <div className="flex items-center justify-between gap-4 mb-2">
        <h4 className="font-medium text-white truncate">{comment.userName}</h4>
        <span className="text-xs text-gray-400 whitespace-nowrap">
          {formatDate(comment.createdAt)}
        </span>
      </div>
      <p className="text-gray-300 text-sm break-words leading-relaxed relative bottom-2">
        {comment.content}
      </p>
    </div>
  </div>
);

const CommentForm = memo(({ onSubmit, isSubmitting, error }) => {
  const [newComment, setNewComment] = useState("");
  const [userName, setUserName] = useState("");
  const textareaRef = useRef(null);

  const handleTextareaChange = useCallback((e) => {
    setNewComment(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!newComment.trim() || !userName.trim()) return;

      onSubmit({ newComment, userName });
      setNewComment("");
      setUserName("");
      if (textareaRef.current) textareaRef.current.style.height = "auto";
    },
    [newComment, userName, onSubmit]
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-white">
          Name <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter your name"
          className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-white">
          Message <span className="text-red-400">*</span>
        </label>
        <textarea
          ref={textareaRef}
          value={newComment}
          onChange={handleTextareaChange}
          placeholder="Write your message here..."
          className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none min-h-[120px]"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="relative w-full h-12 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl font-medium text-white overflow-hidden group transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
      >
        <div className="relative flex items-center justify-center gap-2">
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Posting...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Post Comment</span>
            </>
          )}
        </div>
      </button>
    </form>
  );
});

const Komentar = () => {
  const [comments, setComments] = useState(commentsData); // Gunakan data yang di-hardcode
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleCommentSubmit = useCallback(({ newComment, userName }) => {
    setError("");
    setIsSubmitting(true);

    try {
      const newCommentData = {
        id: Date.now().toString(),
        userName,
        content: newComment,
        createdAt: new Date(),
      };
      setComments((prev) => [newCommentData, ...prev]);
    } catch (error) {
      setError("Failed to post comment. Please try again.");
      console.error("Error adding comment: ", error);
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const formatDate = useCallback((timestamp) => {
    if (!timestamp) return "";
    const now = new Date();
    const diffMinutes = Math.floor((now - timestamp) / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(timestamp);
  }, []);

  return (
    <div className="w-full bg-gradient-to-b from-slate-900/90 to-slate-800/90 rounded-2xl overflow-hidden backdrop-blur-xl shadow-xl">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-500/20">
            <MessageCircle className="w-6 h-6 text-indigo-400" />
          </div>
          <h3 className="text-xl font-semibold text-white">
            Comments{" "}
            <span className="text-indigo-400">({comments.length})</span>
          </h3>
        </div>
      </div>
      <div className="p-6 space-y-6">
        {error && (
          <div className="flex items-center gap-2 p-4 text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <CommentForm
          onSubmit={handleCommentSubmit}
          isSubmitting={isSubmitting}
          error={error}
        />

        <div className="space-y-4 h-[300px] overflow-y-auto custom-scrollbar">
          {comments.length === 0 ? (
            <div className="text-center py-8">
              <UserCircle2 className="w-12 h-12 text-indigo-400 mx-auto mb-3 opacity-50" />
              <p className="text-gray-400">
                No comments yet. Start the conversation!
              </p>
            </div>
          ) : (
            comments.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                formatDate={formatDate}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Komentar;
