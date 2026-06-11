import { SectionHeading, GameCard, CatalogGrid, Card } from "@maingame/components";
import { allGames, allStreamers } from "@maingame/db";
import { formatDots } from "@maingame/utils";

const DASHBOARD = {
  displayName: "Nusantara Games",
  balance: 10600,
  escrowHold: 4400,
  totalEarned: 15000,
  pendingPayout: 0,
  subscriberCount: 12400,
  totalStreams: 48,
  recentActivity: [
    {
      type: "APPROVED" as const,
      game: "Wayward Warriors",
      dots: 3000,
      date: "2026-06-10",
    },
    {
      type: "SCHEDULED" as const,
      game: "Neon Siege",
      dots: 4000,
      date: "2026-06-08",
    },
    {
      type: "PAID" as const,
      game: "Kopi & Kata",
      dots: 2000,
      date: "2026-06-05",
    },
  ],
};

const ACTIVITY_ICONS: Record<string, string> = {
  APPROVED: "text-[var(--color-success)]",
  PAID: "text-[var(--color-success)]",
  SUBMITTED: "text-[var(--color-warning)]",
  SCHEDULED: "text-[var(--color-info)]",
  FUNDED: "text-[var(--color-info)]",
  DRAFT: "text-[var(--color-muted-foreground)]",
};

const STATUS_VARIANT: Record<string, string> = {
  APPROVED: "✓",
  PAID: "✓",
  SUBMITTED: "⏳",
  SCHEDULED: "🔒",
  FUNDED: "💰",
  DRAFT: "📝",
};

function formatNum(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

export default function DashboardPage() {
  const myGames = allGames.filter(
    (g) => g.developer.studioName === "Nusantara Games",
  );
  const myStreams = allStreamers[0]?.streamArchives.slice(0, 4) ?? [];

  const quickStats = [
    { label: "Subscribers", value: formatNum(DASHBOARD.subscriberCount) },
    { label: "Streams", value: String(DASHBOARD.totalStreams) },
    { label: "Games", value: String(myGames.length) },
    {
      label: "Dots Balance",
      value: formatDots(DASHBOARD.balance),
    },
  ];

  const balanceCards = [
    { label: "Available", value: formatDots(DASHBOARD.balance), highlight: true },
    { label: "In Escrow", value: formatDots(DASHBOARD.escrowHold) },
    { label: "Total Earned", value: formatDots(DASHBOARD.totalEarned) },
    { label: "Pending Payout", value: formatDots(DASHBOARD.pendingPayout) },
  ];

  return (
    <div className="px-6 py-8 space-y-8">
      <div>
        <SectionHeading text1="Welcome" text2={`Back, ${DASHBOARD.displayName}`} />
        <p className="text-sm text-[var(--color-muted-foreground)] mt-1">
          Your studio dashboard overview
        </p>
      </div>

      {/* Quick Stats */}
      <section>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {quickStats.map((stat) => (
            <div
              key={stat.label}
              className="border border-[var(--color-border-light)] bg-[var(--color-surface)] p-5"
            >
              <p className="text-2xl font-bold text-[var(--color-foreground)]">
                {stat.value}
              </p>
              <p className="text-xs text-[var(--color-muted-foreground)] mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Balance Overview */}
      <section>
        <SectionHeading text1="Balance" text2="Overview" />
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {balanceCards.map((card) => (
            <div
              key={card.label}
              className={`border p-4 text-center ${
                card.highlight
                  ? "border-[var(--color-brand)] bg-[var(--color-brand-muted)]"
                  : "border-[var(--color-border-light)] bg-[var(--color-surface)]"
              }`}
            >
              <p
                className={`text-lg font-bold ${
                  card.highlight
                    ? "text-[var(--color-brand)]"
                    : "text-[var(--color-foreground)]"
                }`}
              >
                {card.value}
              </p>
              <p className="text-xs text-[var(--color-muted-foreground)] mt-0.5">
                {card.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section>
        <SectionHeading text1="Recent" text2="Activity" />
        <div className="mt-3 space-y-2">
          {DASHBOARD.recentActivity.map((activity, i) => (
            <div
              key={i}
              className="flex items-center gap-4 border border-[var(--color-border-light)] bg-[var(--color-surface)] px-4 py-3"
            >
              <span
                className={`text-lg ${ACTIVITY_ICONS[activity.type] ?? "text-[var(--color-muted-foreground)]"}`}
              >
                {STATUS_VARIANT[activity.type] ?? "•"}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[var(--color-foreground)] truncate">
                  Campaign {activity.type.toLowerCase()} —{" "}
                  <span className="font-medium">{activity.game}</span>
                </p>
                <p className="text-xs text-[var(--color-muted-foreground)] mt-0.5">
                  {new Date(activity.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
              <span className="text-sm font-semibold text-[var(--color-brand)] shrink-0">
                +{formatDots(activity.dots)} Dots
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* My Games */}
      <section>
        <SectionHeading text1="My" text2="Games" />
        {myGames.length === 0 ? (
          <Card className="mt-3">
            <p className="text-sm text-[var(--color-muted-foreground)]">
              No games published yet.
            </p>
          </Card>
        ) : (
          <div className="mt-3">
            <CatalogGrid
              items={myGames}
              renderItem={(g) => (
                <GameCard
                  title={g.title}
                  slug={g.slug}
                  coverImage={g.coverImage}
                  streamerCount={g.streamerCount}
                  meta={
                    <>
                      {g.genre}
                      {g.platforms.length > 0 && ` · ${g.platforms.join(", ")}`}
                    </>
                  }
                />
              )}
            />
          </div>
        )}
      </section>

      {/* My Streams */}
      <section>
        <SectionHeading text1="Recent" text2="Streams" />
        {myStreams.length === 0 ? (
          <Card className="mt-3">
            <p className="text-sm text-[var(--color-muted-foreground)]">
              No stream archives yet.
            </p>
          </Card>
        ) : (
          <div className="mt-3 flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {myStreams.map((archive) => (
              <a
                key={archive.id}
                href={archive.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block w-[260px] shrink-0"
              >
                <div className="aspect-video relative overflow-hidden group-hover:ring-2 group-hover:ring-[var(--color-brand)] transition-all duration-200 group-hover:-translate-y-1">
                  <img
                    src={archive.thumbnailUrl}
                    alt={archive.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="pt-2">
                  <h3 className="text-sm font-medium text-[var(--color-foreground)] leading-snug line-clamp-2">
                    {archive.title}
                  </h3>
                  <p className="text-xs text-[var(--color-muted-foreground)] mt-0.5">
                    {archive.gameName} &middot;{" "}
                    {new Date(archive.playedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
