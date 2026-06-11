import { SectionHeading } from "@maingame/components";

export default function MyGamesPage() {
  return (
    <div className="px-6 py-12">
      <SectionHeading text1="My" text2="Games" />
      <p className="mt-3 text-sm text-[var(--color-muted-foreground)]">
        Manage and edit your game listings, update cover images, descriptions,
        and campaign settings.
      </p>
    </div>
  );
}
