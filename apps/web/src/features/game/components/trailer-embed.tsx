"use client";

interface TrailerEmbedProps {
  url: string;
  title?: string;
}

function parseVideoUrl(url: string): {
  type: "youtube" | "vimeo" | null;
  embedUrl: string | null;
} {
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.replace("www.", "");

    if (hostname === "youtube.com" || hostname === "youtu.be") {
      let videoId: string | null = null;

      if (hostname === "youtu.be") {
        videoId = parsed.pathname.slice(1);
      } else if (parsed.pathname === "/watch") {
        videoId = parsed.searchParams.get("v");
      } else if (parsed.pathname.startsWith("/embed/")) {
        videoId = parsed.pathname.split("/embed/")[1];
      } else if (parsed.pathname.startsWith("/v/")) {
        videoId = parsed.pathname.split("/v/")[1];
      }

      if (videoId) {
        return {
          type: "youtube",
          embedUrl: `https://www.youtube.com/embed/${videoId}`,
        };
      }
    }

    if (hostname === "vimeo.com") {
      const match = parsed.pathname.match(/^\/(\d+)/);
      if (match) {
        return {
          type: "vimeo",
          embedUrl: `https://player.vimeo.com/video/${match[1]}`,
        };
      }
    }
  } catch {
    // Invalid URL
  }

  return { type: null, embedUrl: null };
}

export function TrailerEmbed({ url, title }: TrailerEmbedProps) {
  const { type, embedUrl } = parseVideoUrl(url);

  if (!embedUrl) {
    return null;
  }

  const safeTitle = title ? `${title} trailer` : "Game trailer";

  return (
    <div className="relative w-full aspect-video overflow-hidden bg-[var(--color-surface)]">
      <iframe
        src={embedUrl}
        title={safeTitle}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full border-0"
      />
    </div>
  );
}
