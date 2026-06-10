"use client";

import { useState, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@maingame/utils";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { SectionHeading } from "../ui/section-heading";

export interface CommentData {
  id: string;
  userName: string;
  content: string;
  gameRating: number;
  streamerRating: number;
  streamerId: string;
  streamerName: string;
  createdAt: string;
}

export type CommentsSectionProps = HTMLAttributes<HTMLDivElement> & {
  gameId: string;
  comments?: CommentData[];
  streamers: { id: string; name: string }[];
  heading?: ReactNode;
};

const MOCK_COMMENTS: CommentData[] = [
  {
    id: "1",
    userName: "StreamFan42",
    content:
      "Wayward Warriors is fantastic! The streamer did an amazing job showcasing the boss fights and secrets.",
    gameRating: 5,
    streamerRating: 4,
    streamerId: "s1",
    streamerName: "PixelPioneer",
    createdAt: "2026-06-10T10:30:00Z",
  },
  {
    id: "2",
    userName: "GameDevWatcher",
    content:
      "Solid gameplay. Streamer was entertaining but could explain combat mechanics better for new players.",
    gameRating: 4,
    streamerRating: 3,
    streamerId: "s2",
    streamerName: "StreamQueen",
    createdAt: "2026-06-10T08:15:00Z",
  },
  {
    id: "3",
    userName: "PixelPioneer",
    content:
      "Absolutely loving the art direction. The streamer's commentary made every secret feel like a real discovery.",
    gameRating: 5,
    streamerRating: 5,
    streamerId: "s3",
    streamerName: "GameMaster99",
    createdAt: "2026-06-09T22:00:00Z",
  },
];

function StarButton({
  filled,
  onClick,
}: {
  filled: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "transition-colors",
        onClick ? "cursor-pointer hover:scale-110" : "cursor-default",
      )}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill={filled ? "var(--color-brand)" : "none"}
        stroke={filled ? "var(--color-brand)" : "var(--color-muted-foreground)"}
        strokeWidth="1.5"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01z" />
      </svg>
    </button>
  );
}

function StarRatingDisplay({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <StarButton key={star} filled={star <= value} />
      ))}
    </span>
  );
}

export { StarRatingDisplay };

function timeAgo(dateStr: string): string {
  const now = Date.now();
  const diff = now - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function CommentsSection({
  gameId: _gameId,
  comments: initialComments,
  streamers,
  heading,
  className,
  ...props
}: CommentsSectionProps) {
  const [comments, setComments] = useState<CommentData[]>(
    initialComments ?? MOCK_COMMENTS,
  );
  const [content, setContent] = useState("");
  const [selectedStreamerId, setSelectedStreamerId] = useState("");
  const [gameRating, setGameRating] = useState(0);
  const [streamerRating, setStreamerRating] = useState(0);

  const selectedStreamer = streamers.find(
    (s) => s.id === selectedStreamerId,
  );
  const canSubmit =
    content.trim().length > 0 &&
    selectedStreamerId !== "" &&
    gameRating > 0 &&
    streamerRating > 0;

  const handleSubmit = () => {
    if (!canSubmit || !selectedStreamer) return;
    const newComment: CommentData = {
      id: String(Date.now()),
      userName: "You",
      content: content.trim(),
      gameRating,
      streamerRating,
      streamerId: selectedStreamer.id,
      streamerName: selectedStreamer.name,
      createdAt: new Date().toISOString(),
    };
    setComments((prev) => [newComment, ...prev]);
    setContent("");
    setSelectedStreamerId("");
    setGameRating(0);
    setStreamerRating(0);
  };

  return (
    <div className={cn("space-y-6", className)} {...props}>
      {heading ?? <SectionHeading text1="Comments" text2="" />}

      {/* Write a Comment */}
      <div className="space-y-3">
        <select
          value={selectedStreamerId}
          onChange={(e) => {
            setSelectedStreamerId(e.target.value);
            setStreamerRating(0);
          }}
          className="h-9 rounded-md border border-[var(--color-border-light)] bg-transparent px-3 text-sm text-[var(--color-foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brand)]"
        >
          <option value="" disabled>
            Choose a streamer to rate...
          </option>
          {streamers.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <span className="inline-flex items-center gap-1.5 text-xs text-[var(--color-muted-foreground)]">
            Rate the game
            {[1, 2, 3, 4, 5].map((star) => (
              <StarButton
                key={star}
                filled={star <= gameRating}
                onClick={() => setGameRating(star)}
              />
            ))}
          </span>
          {selectedStreamer && (
            <span className="inline-flex items-center gap-1.5 text-xs text-[var(--color-muted-foreground)]">
              Rate {selectedStreamer.name}
              {[1, 2, 3, 4, 5].map((star) => (
                <StarButton
                  key={star}
                  filled={star <= streamerRating}
                  onClick={() => setStreamerRating(star)}
                />
              ))}
            </span>
          )}
        </div>

        <Textarea
          placeholder="Share your thoughts..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[72px]"
        />

        <div className="flex justify-end">
          <Button onClick={handleSubmit} disabled={!canSubmit}>
            Submit
          </Button>
        </div>
      </div>

      {/* Existing Comments */}
      {comments.length > 0 && (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <div className="mt-0.5 h-8 w-8 shrink-0 rounded-full bg-[var(--color-brand)] flex items-center justify-center text-xs font-semibold text-[var(--color-brand-foreground)]">
                {comment.userName.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1 mb-0.5">
                  <span className="text-sm font-medium text-[var(--color-foreground)]">
                    {comment.userName}
                  </span>
                  <span className="text-xs text-[var(--color-muted-foreground)]">
                    &middot; {timeAgo(comment.createdAt)}
                  </span>
                </div>

                <p className="text-xs text-[var(--color-muted-foreground)] mb-2">
                  Streamer: {comment.streamerName}
                </p>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-0.5 mb-2">
                  <span className="inline-flex items-center gap-1 text-xs text-[var(--color-muted-foreground)]">
                    Game
                    <StarRatingDisplay value={comment.gameRating} />
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-[var(--color-muted-foreground)]">
                    Streamer
                    <StarRatingDisplay value={comment.streamerRating} />
                  </span>
                </div>

                <p className="text-sm text-[var(--color-foreground)] leading-relaxed break-words">
                  {comment.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
