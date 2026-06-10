import type { Metadata } from "next";
import "../../../../packages/styles/src/globals.css";
import { appName } from "@maingame/brand";

export const metadata: Metadata = {
  title: `Pro | ${appName}`,
  description: "Private dashboard for maingame.fun studios and streamers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem("theme");
                  var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                  if (stored === "dark" || (!stored && prefersDark)) {
                    document.documentElement.classList.add("dark");
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="text-[var(--color-foreground)]">{children}</body>
    </html>
  );
}
