import type { Metadata } from "next";
import "./globals.css";
import { appName, tagline } from "@maingame/brand";
import Navbar from "@/components/common/navbar";
import { Footer } from "@/components/common/footer";

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
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
