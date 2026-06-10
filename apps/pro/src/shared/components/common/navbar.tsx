"use client";

import Link from "next/link";
import { Navbar } from "@maingame/components";
import type { NavbarProps } from "@maingame/components";
import { proNavigation } from "@maingame/brand";

const proData: NavbarProps = {
  brand: (
    <Link href="/" className="flex gap-2 items-start">
      <span className="font-display text-xl uppercase">maingame</span>
      <span className="border border-(--color-muted) text-xs py-0.5 px-2">
        Pro
      </span>
    </Link>
  ),
  items: proNavigation.map((n) => ({
    kind: "link" as const,
    label: n.label,
    href: n.href,
  })),
  actions: [
    { label: "Dashboard", href: "/", variant: "secondary" as const },
    { label: "Profile", href: "/profile", variant: "primary" as const },
  ],
};

export default function ProNavbar() {
  return <Navbar {...proData} />;
}
