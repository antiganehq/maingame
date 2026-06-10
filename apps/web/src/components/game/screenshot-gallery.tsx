"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { TrailerEmbed } from "./trailer-embed";

interface ScreenshotGalleryProps {
  screenshots: string[];
  title: string;
  trailerUrl?: string | null;
}

export function ScreenshotGallery({ screenshots, title, trailerUrl }: ScreenshotGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showTrailer, setShowTrailer] = useState(false);

  const totalItems = screenshots.length + (trailerUrl ? 1 : 0);

  const goNext = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null) return null;
      return (prev + 1) % screenshots.length;
    });
  }, [screenshots.length]);

  const goPrev = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null) return null;
      return (prev - 1 + screenshots.length) % screenshots.length;
    });
  }, [screenshots.length]);

  const close = useCallback(() => {
    setSelectedIndex(null);
    setShowTrailer(false);
  }, []);

  if (totalItems === 0) return null;

  return (
    <>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {trailerUrl && (
          <button
            onClick={() => setShowTrailer(true)}
            className="relative flex-shrink-0 w-[324px] h-[182px] overflow-hidden group/thumb focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]"
          >
            <div className="absolute inset-0 bg-[var(--color-surface)] flex items-center justify-center">
              <svg width="48" height="48" viewBox="0 0 48 48" className="text-[var(--color-muted-foreground)] group-hover/thumb:text-[var(--color-brand)] transition-colors">
                <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeWidth="2" />
                <polygon points="19,14 35,24 19,34" fill="currentColor" />
              </svg>
            </div>
            <div className="absolute bottom-2 left-2 bg-black/70 text-white text-[11px] px-1.5 py-0.5">
              WATCH TRAILER
            </div>
            <div className="absolute inset-0 ring-2 ring-transparent group-hover/thumb:ring-[var(--color-brand)] transition-all" />
          </button>
        )}

        {screenshots.map((src, i) => (
          <button
            key={i}
            onClick={() => setSelectedIndex(i)}
            className="relative flex-shrink-0 w-[324px] h-[182px] overflow-hidden group/thumb focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]"
          >
            <Image
              src={src}
              alt={`${title} screenshot ${i + 1}`}
              fill
              className="object-cover transition-transform duration-200 group-hover/thumb:scale-105"
              sizes="324px"
              unoptimized
            />
            <div className="absolute inset-0 ring-2 ring-transparent group-hover/thumb:ring-[var(--color-brand)] transition-all" />
            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[11px] px-1.5 py-0.5">
              {i + 1} of {screenshots.length}
            </div>
          </button>
        ))}
      </div>

      {showTrailer && trailerUrl && (
        <div
          className="fixed inset-0 z-50 bg-[var(--color-overlay-strong)] flex items-center justify-center p-4"
          onClick={close}
        >
          <div
            className="relative w-full max-w-5xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <TrailerEmbed url={trailerUrl} title={title} />

            <button
              onClick={close}
              className="absolute -top-10 right-0 w-8 h-8 flex items-center justify-center text-white hover:text-[var(--color-brand)] transition-colors"
              aria-label="Close trailer"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-[var(--color-overlay-strong)] flex items-center justify-center p-4"
          onClick={close}
        >
          <div
            className="relative w-full max-w-5xl max-h-[90vh] aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={screenshots[selectedIndex]}
              alt={`${title} screenshot ${selectedIndex + 1}`}
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 1024px"
              unoptimized
            />

            {screenshots.length > 1 && (
              <>
                <button
                  onClick={goPrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-black/70 text-white transition-colors"
                  aria-label="Previous screenshot"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  onClick={goNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-black/70 text-white transition-colors"
                  aria-label="Next screenshot"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </>
            )}

            <button
              onClick={close}
              className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-black/70 text-white transition-colors"
              aria-label="Close gallery"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white text-sm bg-black/70 px-3 py-1">
              {selectedIndex + 1} / {screenshots.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
