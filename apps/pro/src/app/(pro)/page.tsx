import Link from "next/link";
import { brandCopy } from "@maingame/brand";
import { Button, Card, CardDescription, CardTitle } from "@maingame/components";
import { CampaignStatus, UserRole } from "@maingame/types";
import { formatDots } from "@maingame/utils";

const placeholderStats = [
  { label: "Draft campaigns", value: "0" },
  { label: "Dots in escrow", value: formatDots(0) },
  { label: "Streams awaiting approval", value: "0" }
];

export default function ProHome() {
  return (
    <main className="min-h-screen text-zinc-950">
      <div className="border-b border-zinc-200 px-6 py-5">
        <p className="text-sm text-zinc-500">Dashboard</p>
      </div>
      <div className="mx-auto max-w-5xl px-6 py-12">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-zinc-500">
          {UserRole.GameDeveloper} / {UserRole.Streamer}
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight">
          {brandCopy.proHeroTitle}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-600">
          {brandCopy.proHeroBody}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/games/new">
            <Button>Create game</Button>
          </Link>
          <Link href="/campaigns/new">
            <Button variant="secondary">Create campaign</Button>
          </Link>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {placeholderStats.map((stat) => (
            <Card key={stat.label}>
              <CardTitle>{stat.value}</CardTitle>
              <CardDescription>{stat.label}</CardDescription>
            </Card>
          ))}
        </div>

        <Card className="mt-6">
          <CardTitle>MVP campaign state</CardTitle>
          <CardDescription>
            Campaigns will move through {CampaignStatus.Draft}, {CampaignStatus.Funded},{" "}
            {CampaignStatus.Accepted}, {CampaignStatus.Submitted}, and {CampaignStatus.Paid}.
          </CardDescription>
        </Card>
      </div>
    </main>
  );
}
