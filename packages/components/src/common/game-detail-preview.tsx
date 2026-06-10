"use client";

import type { ReactNode } from "react";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { GameDetailPreviewItem } from "./game-detail";

export interface GameDetailPreviewProps {
  items: GameDetailPreviewItem[];
  initialIndex?: number;
  autoPlay?: boolean;
  showThumbnails?: boolean;
  className?: string;
  htmlElement?: ReactNode;
  onIndexChange?: (i: number) => void;
}

const Chevron = ({ dir = "left" }: { dir?: "left" | "right" }) => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
    {dir === "left" ? (
      <path
        fill="currentColor"
        d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
      />
    ) : (
      <path
        fill="currentColor"
        d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L12.17 12z"
      />
    )}
  </svg>
);

function sanitize(items: GameDetailPreviewItem[]): GameDetailPreviewItem[] {
  const normalized: GameDetailPreviewItem[] = [];
  for (const it of items ?? []) {
    const src = (it.src ?? "").trim();
    if (!src) continue;
    if (it.kind === "image") {
      normalized.push({ kind: "image", src });
    } else {
      normalized.push({ kind: "video", src });
    }
  }
  return normalized;
}

export function GameDetailPreview({
  items,
  initialIndex = 0,
  autoPlay = true,
  showThumbnails = true,
  className,
  htmlElement,
  onIndexChange,
}: GameDetailPreviewProps) {
  const normalized = useMemo(() => sanitize(items), [items]);
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  const wrap = useRef<HTMLDivElement | null>(null);
  const track = useRef<HTMLDivElement | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const dragStart = useRef<{ x: number } | null>(null);
  const dragDX = useRef(0);

  const canNavigate = normalized.length > 1;

  useEffect(() => {
    const clamped = Math.min(
      Math.max(0, initialIndex),
      Math.max(0, normalized.length - 1),
    );
    setIndex(clamped);
  }, [normalized.length, initialIndex]);

  useEffect(() => {
    onIndexChange?.(index);
  }, [index, onIndexChange]);

  useEffect(() => {
    const onVis = () => {
      if (document.hidden) setIsPlaying(false);
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === index && isPlaying) {
        v.play().catch(() => {
          /* ignore */
        });
      } else {
        v.pause();
        try {
          v.currentTime = 0;
        } catch {
          // Some streamed media does not expose a seekable timeline yet.
        }
      }
    });
  }, [index, isPlaying, normalized.length]);

  const goTo = useCallback(
    (i: number) => {
      const n = normalized.length;
      if (!n) return;
      const next = ((i % n) + n) % n;
      setIndex(next);
    },
    [normalized.length],
  );

  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);
  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!canNavigate) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goNext();
    } else if (e.code === "Space") {
      e.preventDefault();
      setIsPlaying((s) => !s);
    }
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (!wrap.current) return;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    dragStart.current = { x: e.clientX };
    dragDX.current = 0;
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragStart.current || !track.current || !wrap.current) return;
    const dx = e.clientX - dragStart.current.x;
    dragDX.current = dx;
    const width = wrap.current.clientWidth || 1;
    const pct = (dx / width) * 100;
    track.current.style.transform = `translateX(calc(${
      -index * 100
    }% + ${pct}%))`;
  };
  const onPointerUp = () => {
    if (!wrap.current || !track.current) return;
    const dx = dragDX.current;
    dragStart.current = null;
    dragDX.current = 0;
    track.current.style.transform = `translateX(${-index * 100}%)`;

    const width = wrap.current.clientWidth || 1;
    const threshold = Math.min(0.25 * width, 160);
    if (dx > threshold) goPrev();
    else if (dx < -threshold) goNext();
  };

  const onPointerCancel = () => {
    dragStart.current = null;
    dragDX.current = 0;
    if (track.current) {
      track.current.style.transform = `translateX(${-index * 100}%)`;
    }
  };

  const renderedSlides = useMemo(
    () =>
      normalized.map((it, i) => (
        <div
          key={`${it.kind}-${i}-${it.src}`}
          className="relative shrink-0 grow-0 basis-full h-full select-none"
          aria-hidden={i !== index}
        >
          {it.kind === "image" ? (
            <img
              src={it.src}
              alt={`Game preview ${i + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />
          ) : (
            <video
              ref={(el) => {
                videoRefs.current[i] = el;
              }}
              className="h-full w-full object-cover"
              muted
              playsInline
              preload={i === index ? "auto" : "metadata"}
              loop
              controls={i === index}
            >
              <source src={it.src} type="video/mp4" />
            </video>
          )}
        </div>
      )),
    [normalized, index],
  );

  if (!normalized.length) {
    return (
      <div className={["relative w-full", className ?? ""].join(" ")}>
        <div className="relative flex aspect-video items-center justify-center overflow-hidden border border-[var(--color-border-light)] text-sm text-[var(--color-muted-foreground)]">
          No media
        </div>
        {(showThumbnails || htmlElement) && (
          <div className="flex gap-4 overflow-x-auto py-6">
            {htmlElement && htmlElement}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={["relative w-full", className ?? ""].join(" ")}>
      {/* Viewport */}
      <div
        ref={wrap}
        className="relative aspect-video touch-pan-y overflow-hidden border border-[var(--color-border-light)] focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        role="region"
        aria-label="Game media carousel"
      >
        <div
          ref={track}
          className="flex h-full w-full transition-transform duration-300 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(${-index * 100}%)` }}
        >
          {renderedSlides}
        </div>

        {/* Counter */}
        <div className="pointer-events-none absolute left-3 top-3 z-5 bg-[var(--color-overlay-strong)] px-2 py-1 text-xs text-white">
          {`${index + 1} / ${normalized.length}`}
        </div>

        {/* Play/Pause */}
        <button
          type="button"
          onClick={() => setIsPlaying((s) => !s)}
          aria-label={isPlaying ? "Pause autoplay" : "Play autoplay"}
          className="absolute right-3 top-3 z-5 min-h-10 bg-[var(--color-overlay-strong)] px-3 py-1 text-xs text-white transition-colors duration-150 hover:bg-black/80 focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>

        {/* Prev/Next */}
        {canNavigate && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous preview"
              className="group absolute left-2 top-1/2 z-5 flex size-10 -translate-y-1/2 items-center justify-center bg-[var(--color-overlay-strong)] text-white transition-colors duration-150 hover:bg-black/80 focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <Chevron dir="left" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next preview"
              className="group absolute right-2 top-1/2 z-5 flex size-10 -translate-y-1/2 items-center justify-center bg-[var(--color-overlay-strong)] text-white transition-colors duration-150 hover:bg-black/80 focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <Chevron dir="right" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {(showThumbnails || htmlElement) && (
        <div className="flex gap-4 overflow-x-auto py-6">
          {htmlElement && htmlElement}
          {normalized.map((it, i) => (
            <button
              key={`thumb-${i}-${it.src}`}
              type="button"
              onClick={() => goTo(i)}
              className={[
                "relative h-20 aspect-video shrink-0 overflow-hidden border transition-[opacity,border-color] duration-300 motion-reduce:transition-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]",
                i === index
                  ? "border-[var(--color-brand)] opacity-100"
                  : "border-transparent opacity-60 hover:opacity-100",
              ].join(" ")}
              aria-label={`Go to media ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
            >
              {it.kind === "image" ? (
                <img
                  src={it.src}
                  alt={`Media ${i + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <>
                  <video
                    className="h-full w-full object-cover"
                    muted
                    playsInline
                    preload="metadata"
                  >
                    <source src={it.src} type="video/mp4" />
                  </video>
                  <span className="pointer-events-none absolute inset-0 grid place-items-center text-white/90">
                    <svg viewBox="0 0 24 24" className="h-6 w-6 drop-shadow">
                      <path fill="currentColor" d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
