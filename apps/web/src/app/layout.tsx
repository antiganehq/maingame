import type { Metadata } from "next";
import "../../../../packages/styles/src/globals.css";
import { appName, tagline } from "@maingame/brand";
import Navbar from "@/shared/components/common/navbar";
import { Footer } from "@maingame/components";

export const metadata: Metadata = {
  title: appName,
  description: tagline,
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
      <body className={`text-[var(--color-foreground)]`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
