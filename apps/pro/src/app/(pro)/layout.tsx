import Navbar from "@/shared/components/common/navbar";
import { Footer } from "@maingame/components";

export default function ProLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
