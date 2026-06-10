import Link from "next/link";
import type { Metadata } from "next";
import { proNavigation } from "@maingame/brand";
import { Button, Card, CardDescription, CardTitle, Badge } from "@maingame/components";
import { UserRole } from "@maingame/types";

export const metadata: Metadata = {
  title: "Profile — maingame.fun",
  description: "Manage your studio or streamer profile.",
};

export default function ProfilePage() {
  return (
    <main className="min-h-screen text-zinc-950">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-zinc-200 bg-zinc-50 p-6 md:block">
        <Link className="text-lg font-semibold tracking-tight" href="/">
          maingame.fun pro
        </Link>
        <nav className="mt-8 grid gap-2 text-sm text-zinc-600">
          {proNavigation.map((item) => (
            <Link
              className="rounded-md px-3 py-2 hover:bg-white hover:text-zinc-950"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <section className="md:pl-64">
        <div className="border-b border-zinc-200 px-6 py-5">
          <p className="text-sm text-zinc-500">Profile</p>
        </div>

        <div className="mx-auto max-w-3xl px-6 py-12 space-y-8">
          <Card>
            <CardTitle>Studio Profile</CardTitle>
            <CardDescription>
              Your public-facing studio information.
            </CardDescription>
            <div className="mt-6 space-y-4">
              <div>
                <p className="text-sm font-medium text-zinc-700">Studio Name</p>
                <p className="text-sm text-zinc-500">Nusantara Games</p>
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-700">Role</p>
                <Badge variant="secondary" className="mt-1">
                  {UserRole.GameDeveloper}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-700">Bio</p>
                <p className="text-sm text-zinc-500 mt-1">
                  Indie studio from Jakarta building games inspired by Southeast Asian
                  folklore. Small team, big stories.
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-700">Website</p>
                <p className="text-sm text-zinc-500 mt-1">
                  https://nusantaragames.id
                </p>
              </div>
            </div>
            <div className="mt-6">
              <Button variant="secondary">Edit Profile</Button>
            </div>
          </Card>

          <Card>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>
              Manage your account preferences and security.
            </CardDescription>
            <div className="mt-6 space-y-4">
              <div>
                <p className="text-sm font-medium text-zinc-700">Email</p>
                <p className="text-sm text-zinc-500">studio@nusantaragames.id</p>
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-700">Connected Wallet</p>
                <p className="text-sm text-zinc-500">0x71C...a9F3</p>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </main>
  );
}
