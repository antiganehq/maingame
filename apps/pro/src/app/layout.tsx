import type { Metadata } from "next";
import "./globals.css";
import { appName } from "@maingame/brand";

export const metadata: Metadata = {
  title: `Pro | ${appName}`,
  description: "Private dashboard for maingame.fun studios and streamers."
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
