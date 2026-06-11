"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@maingame/utils";

const navItems = [
  { label: "Dashboard", href: "/profile" },
  { label: "My Games", href: "/profile/games" },
  { label: "My Streams", href: "/profile/streams" },
];

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <main>
      <div className="mx-auto max-w-[1400px] flex min-h-[calc(100vh-8rem)]">
        <aside className="w-56 shrink-0 pr-4 pt-4">
          <h3 className="sr-only">Profile</h3>
          <nav className="grid gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-2 text-sm transition-colors",
                  pathname === item.href
                    ? "btn-primary"
                    : "text-[var(--color-muted-foreground)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-foreground)]",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </main>
  );
}
