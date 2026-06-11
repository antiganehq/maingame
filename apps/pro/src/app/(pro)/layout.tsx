"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/shared/components/common/navbar";
import { Footer } from "@maingame/components";

export default function ProLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  useEffect(() => {
    const isAuth = window.sessionStorage.getItem("isAuthenticated");
    if (isAuth !== "true") {
      router.replace("/auth");
    }
  }, [router]);

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
