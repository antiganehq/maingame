import type { Metadata } from "next";
import "./globals.css";
import { appName, tagline } from "@maingame/brand";

export const metadata: Metadata = {
  title: appName,
  description: tagline
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
