"use client";

import Link from "next/link";
import { Navbar } from "@maingame/components";
import type { NavbarProps } from "@maingame/components";
import { publicNavigation } from "@maingame/brand";

const webData: NavbarProps = {
  brand: (
    <Link href="/" className="text-xl font-display uppercase">
      maingame
    </Link>
  ),
  items: publicNavigation.map((n) => ({
    kind: "link" as const,
    label: n.label,
    href: n.href,
  })),
  actions: [
    { label: "Sign In", href: "/login", variant: "secondary" as const },
    {
      label: "Go Pro",
      href: "https://pro.maingame.fun",
      variant: "primary" as const,
    },
  ],
};

export default function WebNavbar() {
  return <Navbar {...webData} />;
}
